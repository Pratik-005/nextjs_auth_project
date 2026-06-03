import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export async function sendEmail({
    email, emailType, userId
}) {
    try {

        const token = await bcrypt.hash(userId.toString(), 10);


        if (emailType == 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }
        }


        var transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: process.env.MAIL_TRAP_API_KEY
            });

        const mailOptions = {
            from: '"Example Team" <team@example.com>', // sender address
            to: email, // list of recipients
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // subject line
            html: `<p>Click <a href="${process.env.BASE_URL}/verifyemail?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.BASE_URL}/verifyemail?token=${token}
            </p>`
        }

        await transporter.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
        console.log('ERROR SENDING AN EMAIL :: ', error);
    }
}