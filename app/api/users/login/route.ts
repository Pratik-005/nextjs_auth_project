import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 400 }
            );
        }

        const isValidPasssword = await bcrypt.compare(password, user.password);

        if (isValidPasssword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            );
        }

        const data = {
            id: user._id,
            email: user.email
        }

        const token = await jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: '1hr' });


        const res = NextResponse.json(
            { error: 'User logged in successfully' },
            { status: 200 }
        );

        res.cookies.set('token', token, {
            httpOnly: true
        });

        return res;



    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}