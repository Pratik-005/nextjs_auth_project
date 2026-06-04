import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get('token')?.value || '';
        const decoded: any = await jwt.verify(token, process.env.JWT_SECRET!);
        return decoded.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}