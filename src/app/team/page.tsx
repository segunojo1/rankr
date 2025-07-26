import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TeamMemberProps {
    name: string;
    role: string;
    description: string;
    borderColor: string;
    barColor: string;
    image: string;
    isWinner?: boolean;
    isOddIndex?: boolean;
}

const Team = () => {
    const teamMembers: TeamMemberProps[] = [
        {
            name: 'Sherrif',
            role: 'Backend Developer',
            description: 'Lives in terminal windows, speaks fluent database.',
            borderColor: '#ff3d00', // red
            barColor: '#ff3d00',
            image: '/assets/team/sherrif.png',
            isWinner: true
        },
        {
            name: 'Seyi',
            role: 'Product Designer',
            description: 'Every swipe and scroll in Rankr has his fingerprint on it.',
            borderColor: '#0a0a0a', // Red
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
            description: 'If you’ve ever tapped something and said “damn,” they probably built it.',
            borderColor: '#F2C761', // Yellow
            barColor: '#F2C761',
            image: '/assets/team/segun.png'
        }
    ];

    return (
        <div className='max-w-6xl mx-auto px-4 pb-4'>
            <Link href="/" className='mx-auto w-fit relative '>
                <Button className='w-[160px] h-[44px] bg-[#001526] text-white rounded-[5px] flex items-center mb-8'>
                    Back Home
                </Button>
            </Link>

            <h1 className='text-5xl md:text-7xl lg:text-8xl instrument-sans font-medium text-center text-gray-500 -tracking-wider mb-4'>
                <span className='instrument-serif italic text-[#001526]'>Rankr</span> was not an Accident.
            </h1>

            <p className='text-xl md:text-2xl font-medium instrument-sans text-center mb-16 text-[#737373] -tracking-wide'>
                Ranked Ourselves First (<span className='instrument-serif italic text-[#001526]'>Sorry</span>).
            </p>

            <div className='flex flex-wrap items-center justify-center gap-20'>
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} {...member} isOddIndex={index % 2 === 1} />
                ))}
            </div>
        </div>
    );
};

export default Team;

export const TeamMemberCard: React.FC<TeamMemberProps> = ({
    name,
    role,
    description,
    borderColor,
    barColor,
    image,
    isWinner = true,
    isOddIndex = false
}) => {
    const bioContent = (
        <div className='w-[190px]'>
            <div className='flex items-center gap-3 p-2'>
                {isWinner && (
                    <Image
                        src='/assets/winner.svg'
                        alt='winner'
                        width={36}
                        height={36}
                        className='w-8 h-8 md:w-9 md:h-9'
                    />
                )}
                <p className='instrument-serif italic font-normal text-[#001526] text-2xl md:text-3xl -tracking-wide'>
                    {name}
                </p>
            </div>

            <div className='w-full max-w-[240px] h-9 mb-[25px] flex items-center px-[2px] border-1 rounded-[9px] overflow-hidden'
                style={{ borderColor: barColor }}
            >
                <div
                    className='h-8 rounded-[9px] transition-all duration-500'
                    style={{
                        width: `${Math.floor(Math.random() * 60) + 40}%`,
                        backgroundColor: barColor,
                    }}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <h2 className='text-lg md:text-xl font-medium text-[#737373] -tracking-wide instrument-sans'>
                    {role}
                </h2>
                <p className='text-sm md:text-base font-normal text-[#737373] -tracking-wide instrument-sans leading-relaxed'>
                    {description}
                </p>
            </div>
        </div>
    );

    const imageContent = (
        <div
            className='p-2.5 bg-white rounded-xl transition-all duration-300 flex-shrink-0 w-full max-w-[240px] mx-auto md:mx-0'
            style={{ border: `4.5px solid ${borderColor}` }}
        >
            <div className='relative group cursor-pointer'>
                <Image
                    src="/assets/pic-tag.png"
                    alt="pic-tag"
                    width={15}
                    height={36}
                    className='w-3.5 h-8 absolute left-[13.4px] -top-[18px]'
                />
                <Image
                    src={image}
                    alt={name}
                    width={247}
                    height={267}
                    className='w-full h-auto aspect-[247/267] object-cover rounded-lg'
                />
            </div>
        </div>
    );

    return (
        <div className='flex flex-col w-fit md:flex-row items-start gap-5'>
            {isOddIndex ? (
                <>
                    {imageContent}
                    {bioContent}
                </>
            ) : (
                <>
                    {bioContent}
                    {imageContent}
                </>
            )}
        </div>
    );
};
