import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/utils/mailer";
import { connectToDB } from "@/app/db/db";


connectToDB();

export async function POST(
    req: NextRequest
) {


    try {

        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({
            email: email
        });

        if (user) {
            return NextResponse.json(
                { error: 'User already exits' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        await sendEmail({
            email: email,
            emailType: 'VERIFY',
            userId: savedUser._id
        });

        return NextResponse.json(
            { message: 'User saved successfully' },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

}