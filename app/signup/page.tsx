'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SignupPage = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.trim().length < 0 && user.password.trim().length < 0) {
            setDisabled(true)
        }
        setDisabled(false);
    }, [user]);


    const singup = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await axios.post('/api/users/signup', user);
            router.push('/login');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Sign Up
                </h1>

                <form className="space-y-5" onSubmit={singup}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        disabled={disabled}
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage