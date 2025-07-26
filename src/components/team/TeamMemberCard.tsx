"use client"
import React from 'react';
import Image from 'next/image';

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
        <div className='md:w-[190px] w-[71px]'>
            <div className='flex items-center md:gap-3 gap-1 p-2'>
                {isWinner && (
                    <Image
                        src='/assets/winner.svg'
                        alt='winner'
                        width={36}
                        height={36}
                        className='w-[13px] h-[13px] md:w-9 md:h-9'
                    />
                )}
                <p className='instrument-serif italic font-normal text-[#001526] text-[10px] md:text-3xl md:-tracking-wide -tracking-[0.42px]'>
                    {name}
                </p>
            </div>

            <div className='w-full md:max-w-[240px] max-w-[66px] md:h-9 h-[13px] md:mb-[25px] mb-[10px] flex items-center px-[2px] border-1 md:rounded-[9px] rounded-[4px] overflow-hidden'
                style={{ borderColor: barColor }}
            >
                <div
                    className='md:h-8 h-[9px] md:rounded-[9px] rounded-[4px] transition-all duration-500'
                    style={{
                        width: `${Math.floor(Math.random() * 60) + 40}%`,
                        backgroundColor: barColor,
                    }}
                />
            </div>

            <div className='flex flex-col md:gap-2 gap-[3px]'>
                <h2 className='text-[7.5px] md:text-xl font-medium text-[#737373] md:-tracking-wide -tracking-[0.3px] instrument-sans'>
                    {role}
                </h2>
                <p className='text-[5px] md:text-base font-normal text-[#737373] md:-tracking-wide -tracking-[0.2px] instrument-sans leading-relaxed'>
                    {description}
                </p>
            </div>
        </div>
    );

    const imageContent = (
        <div
            className='md:p-2.5 p-1 bg-white rounded-xl transition-all duration-300 flex-shrink-0 w-full md:max-w-[240px] max-w-[104px] mx-auto md:mx-0'
            style={{ border: `4.5px solid ${borderColor}` }}
        >
            <div className='relative group cursor-pointer'>
                <Image
                    src="/assets/pic-tag.png"
                    alt="pic-tag"
                    width={15}
                    height={36}
                    className='md:w-3.5 w-[6px] md:h-8 h-[15px] absolute left-[13.4px] -top-[18px]'
                />
                <Image
                    src={image}
                    alt={name}
                    width={247}
                    height={267}
                    className='md:w-full w-[104px] md:h-auto h-[122px] md:aspect-[247/267]  object-cover rounded-md'
                />
            </div>
        </div>
    );

    return (
        <div className='flex  w-fit md:flex-row items-start gap-5'>
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