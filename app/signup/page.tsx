'use client';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const SignupPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({ email: '', password: '' });

    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.trim().length === 0 || user.password.trim().length === 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [user]);


    const singup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            setLoading(true);
            setDisabled(true);
            const res = await axios.post('/api/users/signup', user);
            toast.success(res.data.message);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Sign Up
                </h1>

                <form className="space-y-5" >

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
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={singup}
                        disabled={disabled}
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold text-white
                        disabled:cursor-not-allowed disabled:opacity-50">
                        {loading ? 'Loading ...' : 'Submit'}
                    </button>

                    <p className='text-center text-white' ><span>Already have an account ?</span>  <Link className='text-blue-400' href='/login' ><span>Login</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignupPage