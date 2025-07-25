'use client'
import UserForm from '@/components/user/user-form';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

const UserDetailsOnboard = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <div className={`flex w-full min-h-screen p-10 px-32 pt-20 instrument-sans`}>
                <aside className='fixed w-1/3 h-screen flex items-start'>
                    <h1 className='text-[80px] font-medium max-w-[395px] tracking-[-3.2px] leading-normal'>

                        <>
                            Wanna get
                            <br />
                            <span className='instrument-serif italic'>Ranked</span>?
                        </>
                    </h1>
                </aside>

                <main className={`w-1/3 ml-[33.333%] flex flex-col items-center pt-[53px] justify-center`}>
                    <h2 className='text-[#737373] instrument-sans text-[29.7px] font-semibold tracking-[-1.19px] mb-6  self-start'>Set Your Display Info</h2>
                    <div className='flex flex-col items-center space-y-2.5 mb-3'>
                        <Image
                            src={theme === 'dark' ? '/assets/profile.png' : '/assets/profile.png'}
                            alt='add your look'
                            width={61}
                            height={63}
                        />
                        <p className='text-[#404040] text-[14px] font-normal tracking-[-0.56px] text-center'>Choose Your Rankr Avatar. <br />
                            (Pick your vibe. This is how the world sees you.)</p>
                        <div className='flex items-center gap-1'>
                            <Image
                                src='/assets/image-add.png'
                                alt='add img'
                                width={16}
                                height={16}
                            />
                            <p className='text-[#404040] text-[14px] font-medium tracking-[-0.56px] underline'>Choose avatar</p>
                        </div>
                    </div>
                    <UserForm />
                </main>

                <div className='w-1/3'></div>
            </div>
        </div>
    )
}

export default UserDetailsOnboard;
