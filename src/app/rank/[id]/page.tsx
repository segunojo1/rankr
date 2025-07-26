'use client';

import { HeartIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface VoteOption {
    id: string;
    name: string;
    image: string;
}

const Rank = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [options, setOptions] = useState<VoteOption[]>([
        { id: '1', name: 'segun', image: '/assets/black-person.png' },
        { id: '2', name: 'segun', image: '/assets/black-person.png' },
    ]);

    // Check for existing vote on component mount
    useEffect(() => {
        const voteStatus = localStorage.getItem('hasVoted');
        const votedOption = localStorage.getItem('votedOption');

        if (voteStatus === 'true' && votedOption) {
            setHasVoted(true);
            setSelectedOption(votedOption);
        }
    }, []);

    const handleVote = (optionId: string) => {
        if (hasVoted) return;

        setSelectedOption(optionId);
        setHasVoted(true);

        // Save to localStorage to persist the vote
        localStorage.setItem('hasVoted', 'true');
        localStorage.setItem('votedOption', optionId);

        // Here you would typically send the vote to your backend
        // Example: await api.vote(optionId);
    };

    const getCardClasses = (optionId: string) => {
        const baseClasses = 'p-2 bg-white rounded-[13px] transition-all duration-300';
        const rotation = optionId === options[0].id ? '-rotate-[4.07deg]' : 'rotate-[4.07deg]';

        if (!hasVoted) return `${baseClasses} ${rotation}`;

        if (selectedOption === optionId) {
            return `${baseClasses} scale-110 border-[4.9px] border-[#1F92FF] ${rotation}`;
        } else {
            return `${baseClasses} scale-80 opacity-75 ${rotation}`;
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen pt-[100px] pb-[40px] px-4'>
            <h1 className='lg:text-[80px] text-[50px] lg:tracking-[-3.2px] tracking-[-2px] instrument-sans font-medium text-center  text-gray-500'>
                Who's <span className='instrument-serif italic text-[#001526]'>Hotter</span> in CSC?
            </h1>

            <div className='flex flex-col md:flex-row items-center justify-center gap-8 lg:mt-[130px] mt-[20px] w-full max-w-4xl mx-auto'>
                {options.map((option, index) => (
                    <div key={option.id} className='flex flex-col items-center gap-4'>
                        <div className='text-center'>
                            <p className='font-semibold lg:text-[30px] text-[22px] instrument-sans text-[#001526] tracking-[-0.8px]'>
                                {option.name}
                            </p>
                        </div>

                        <div
                            className={getCardClasses(option.id)}
                            onClick={() => handleVote(option.id)}
                        >
                            <div className='relative group cursor-pointer'>
                                <Image
                                    src="/assets/pic-tag.png"
                                    alt="pic-tag"
                                    width={220}
                                    height={237}
                                    className={`w-[13px] h-[32px] absolute ${index % 2 === 0 ? 'right-[13.4px]' : 'left-[13.4px]'
                                        } -top-[15px]`}
                                />
                                <Image
                                    src={option.image}
                                    alt={option.name}
                                    width={220}
                                    height={237}
                                    className='w-[220px] h-[237px] object-cover rounded-[13px]'
                                />
                            </div>
                        </div>

                        {!hasVoted && (
                            <button
                                onClick={() => handleVote(option.id)}
                                className='mt-2 p-2 hover:text-pink-600 transition-colors'
                                aria-label={`Vote for ${option.name}`}
                            >
                                <HeartIcon className='w-8 h-8' />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className='mt-12 flex flex-col items-center gap-6'>
                <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                    <Image
                        src="/assets/share.png"
                        alt="share"
                        width={30}
                        height={30}
                        className='w-[30px] h-[30px]'
                    />
                </button>

                {!hasVoted ? (
                    <div className='flex flex-col items-center gap-2'>
                        <Image
                            src="/assets/taptochoose.svg"
                            alt="Tap to choose"
                            width={175}
                            height={36}
                            className='w-[175px] h-[36px]'
                        />
                        <p className='lg:text-[20px] text-[14px] instrument-sans font-normal text-[#737373] text-center'>
                            All images are uploaded by creators. If something looks off,{' '}
                            <button className='text-[#0a0a0a] hover:underline'>
                                report it →
                            </button>
                        </p>
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-[55px]'>
                        <div className='flex items-center gap-2'>
                            <p className='text-[24px] instrument-sans tracking-[-0.8px] font-normal text-[#737373]'>That Vote Was a Little Too <span className='text-[#0a0a0a] instrument-serif font-normal italic'>Personal.</span>  </p>
                            <Image
                                src="/assets/mdi_flame.svg"
                                alt="mdi_flame"
                                width={42}
                                height={42}
                                className='w-[42px] h-[42px]'
                            />
                        </div>

                        <p className='lg:text-[20px] text-[14px] instrument-sans font-normal text-[#737373] text-center'>
                            All images are uploaded by creators. If something looks off,{' '}
                            <button className='text-[#0a0a0a] hover:underline'>
                                report it →.
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Rank