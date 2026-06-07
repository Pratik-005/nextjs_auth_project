import { connectToDB } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function POST(req: NextRequest) {
    try {

        const { token } = await req.json();
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: 'Email verfied successfully' }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}