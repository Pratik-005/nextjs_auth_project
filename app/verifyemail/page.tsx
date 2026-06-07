'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const VerifyEmailPage = () => {

    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);
    const [token, setToken] = useState("");

    const searchParams = useSearchParams();

    const verifyToken = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (err) {
            setVerified(false);
            setError(true);
        }
    };

    useEffect(() => {
        const token = searchParams.get('token');
        setToken(token || "");
    }, [searchParams]);

    useEffect(() => {
        if (token) verifyToken();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900" >
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl text-center" >
                <h1 className="text-3xl font-bold text-white mb-6" >
                    Email Verification
                </h1>

                {
                    verified && (
                        <p className="text-green-500 text-lg font-medium" >
                            ✅ Your account has been verified successfully.
                        </p>
                    )}

                {
                    error && (
                        <p className="text-red-500 text-lg font-medium" >
                            ❌ An error occurred while verifying your account.
                        </p>
                    )
                }
            </div>
        </div>
    );


}

export default VerifyEmailPage;