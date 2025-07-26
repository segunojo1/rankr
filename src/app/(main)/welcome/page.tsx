'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Welcome = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Get user data from localStorage
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            if (userData) {
                try {
                    const { username: storedUsername } = JSON.parse(userData);
                    setUsername(storedUsername);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        }
    }, []);
    return (
        <div className='px-[26px]'>
            <div className='flex flex-col items-center pt-[186px] instrument-sans'>
                <h1 className='lg:tracking-[-3.2px] tracking-[-2.4px] leading-normal lg:text-[80px] text-[60px] font-medium text-[#0A0A0A] mb-[105px] text-center'>
                    <span className='text-[#737373]'>Welcome to</span> Rankr,{' '}
                    <span className='instrument-serif italic'>{username || 'there'}!</span>
                </h1>
                <Link href='/rank' className='py-3 text-base font-medium rounded-[5px] bg-[#1F92FF] text-white w-full max-w-[500px] lg:w-[341px] flex items-center justify-center mb-6'>Create Your First Rank</Link>
                <Link href='/rank' className='py-3 text-base font-medium rounded-[5px] bg-[#001526] text-white w-full max-w-[500px] lg:w-[341px] flex items-center justify-center'>Start Voting</Link>
                <div className=' h-[1px] bg-[#D4D4D4] mt-[20px] mb-[10px] w-[341px]'></div>
                <Link href='/rank' className='py-3 text-base font-medium rounded-[5px] bg-[#fff] border-[#000000] border text-black w-full max-w-[500px] lg:w-[341px] hover:bg-black hover:text-white transition-all flex items-center justify-center'>Check the Leaderboard</Link>

            </div>
        </div>
    )
}

export default Welcome
