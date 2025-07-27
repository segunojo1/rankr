'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';

export default function Team() {
    const teamMembers = [
        {
            name: 'Sherrif',
            role: 'Backend Developer',
            description: 'Lives in terminal windows, speaks fluent database.',
            borderColor: '#ff3d00',
            barColor: '#ff3d00',
            image: '/assets/team/sherrif.png',
            isWinner: true
        },
        {
            name: 'Seyi',
            role: 'Product Designer',
            description: 'Every swipe and scroll in Rankr has his fingerprint on it.',
            borderColor: '#0a0a0a',
            barColor: '#0a0a0a',
            image: '/assets/team/seyi.png'
        },
        {
            name: 'Joe',
            role: 'Product Designer',
            description: 'Quietly running the interface while making you feel every pixel.',
            borderColor: '#1F92FF',
            barColor: '#1F92FF',
            image: '/assets/team/joe.png'
        },
        {
            name: 'Segun',
            role: 'Frontend Developer',
            description: 'If you\'ve ever tapped something and said "damn," they probably built it.',
            borderColor: '#F2C761',
            barColor: '#F2C761',
            image: '/assets/team/segun.png'
        }
    ];

    return (
        <div className='max-w-6xl mx-auto px-4 pb-4'>
            <Link href="/welcome" className='z-[9999999] relative mx-auto w-[160px] flex mt-[30px]'>
                <Button className='w-[160px] h-[44px] bg-[#001526] text-white rounded-[5px] flex items-center justify-center mb-8'>
                    Back Home
                </Button>
            </Link>

            <h1 className='text-5xl md:text-7xl instrument-sans font-medium text-center text-gray-500 -tracking-wider mb-4'>
                <span className='instrument-serif italic text-[#001526]'>Rankr</span> was not an Accident.
            </h1>

            <p className='text-xl md:text-2xl font-medium instrument-sans text-center mb-16 text-[#737373] -tracking-wide'>
                Ranked Ourselves First (<span className='instrument-serif italic text-[#001526]'>Sorry</span>).
            </p>

            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4 md:gap-20 max-w-[393px] md:max-w-full md:w-full justify-center mx-auto'>
                {teamMembers.map((member, index) => (
                    <div key={index} className={`w-full md:w-fit flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                        <TeamMemberCard {...member} isOddIndex={index % 2 === 1} />
                    </div>
                ))}
            </div>
        </div>
    );

};
