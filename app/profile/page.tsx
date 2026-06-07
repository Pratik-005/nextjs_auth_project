'use client';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {

    const [user, setUser] = useState(null);

    const router = useRouter();

    const getUser = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUser(res.data.user);
            toast.success(res.data.message);
            router.push('/login');
        } catch (error: any) {
            toast.success(error.response.data.error);
        }
    }

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            toast.success(res.data.message);

        } catch (error: any) {
            toast.success(error.response.data.error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Profile
                </h1>

                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <p className="text-gray-400 text-sm">Logged in as</p>
                    <p className="text-white text-lg font-semibold break-all">
                        {user?.email}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 transition-colors rounded-lg font-semibold text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfilePage