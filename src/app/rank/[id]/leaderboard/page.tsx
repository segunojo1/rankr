'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRankStore } from '@/store/rank.store';
import { useParams } from 'next/navigation';

// interface LeaderboardProps {
//     params: {
//         id: string;
//     };
// }

const Leaderboard = () => {
    const { currentRank, isLoading, error, fetchRank } = useRankStore();
    // const id = params.id;
const {id} = useParams();
    useEffect(() => {
        if (id) {
            fetchRank(id);
        }
    }, [id, fetchRank]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
                <p className="text-gray-700">Loading leaderboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!currentRank) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-700">No rank data available</p>
            </div>
        );
    }

    const totalVotes = currentRank.person1Votecount + currentRank.person2Votecount;
    
    // Get the voted person's name from localStorage
    const voteKey = `rank_${id}_vote`;
    const voteData = typeof window !== 'undefined' ? localStorage.getItem(voteKey) : null;
    const votedPersonName = voteData ? JSON.parse(voteData).personName : 'your choice';
    
    const winnerName = currentRank.person1Votecount > currentRank.person2Votecount 
        ? currentRank.person_one_name 
        : currentRank.person_two_name;
    const winnerVotes = Math.max(currentRank.person1Votecount, currentRank.person2Votecount);
    const loserVotes = Math.min(currentRank.person1Votecount, currentRank.person2Votecount);

    return (
        <div className='flex flex-col items-center py-[100px] px-6'>
            <h1 className='lg:text-[80px] text-[50px] instrument-sans font-medium text-center mb-8 text-[#737373]'>
                You voted for <span className='instrument-serif italic text-[#001526]'>{votedPersonName}</span>!
            </h1>
            <div className='p-[1.2px] border border-[#f0f0ef]'>
                <p className='md:text-[24px] text-[14px] font-medium instrument-sans p-[5px] rounded-[7px] bg-[#F0F0EF] w-fit'>Current Stats:</p>
            </div>
            <div className='flex flex-col items-start gap-6 mb-[100px] w-fit'>
                <div className='flex items-center lg:gap-6 gap-5'>
                    <Image
                        src={currentRank.person_one_image_url}
                        alt={currentRank.person_one_name}
                        width={61}
                        height={63}
                        className='w-[38px] md:w-[61px] h-auto rounded-full object-cover aspect-square'
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <div className='flex items-center md:gap-[10px] gap-[6px]'>
                            <Image
                                src={'/assets/winner.svg'}
                                alt='winner'
                                width={35}
                                height={32}
                            />
                            <p className='md:text-[28px] text-[17px] instrument-serif italic font-normal md:-leading-[1.12px] -leading-[0.69px]'>
                                {currentRank.person_one_name}
                            </p>
                        </div>
                        <div className='lg:w-[178px] w-[110px] lg:h-[36px] h-[22px] flex items-center px-[2px] border border-[#B48A47] lg:rounded-[13px] rounded-[5px]'>
                            <div 
                                className='lg:h-[32px] h-[18px] bg-[#ECC25F] lg:rounded-[13px] rounded-[5px] transition-all duration-500'
                                style={{
                                    width: `${(currentRank.person1Votecount / totalVotes) * 100}%`,
                                    minWidth: '10px',
                                }}
                            ></div>
                        </div>
                    </div>
                    <p className='lg:text-[28px] text-[17px] tracking-[-0.69px] instrument-sans font-medium text-[#737373] p-[10px] self-end'>
                        <span className='text-[#001526] instrument-serif italic'>{currentRank.person1Votecount}</span>/{totalVotes} votes
                    </p>
                </div>

                <div className='flex items-center lg:gap-6 gap-5'>
                    <Image
                        src={currentRank.person_two_image_url}
                        alt={currentRank.person_two_name}
                        width={61}
                        height={63}
                        className='w-[38px] md:w-[61px] h-auto rounded-full object-cover aspect-square'
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <div className='flex items-center md:gap-[10px] gap-[6px]'>
                            <div className='w-[35px] h-8 flex items-center justify-center'>
                                <span className='text-gray-400 text-lg'>2</span>
                            </div>
                            <p className='md:text-[28px] text-[17px] instrument-serif italic font-normal md:-leading-[1.12px] -leading-[0.69px]'>
                                {currentRank.person_two_name}
                            </p>
                        </div>
                        <div className='lg:w-[178px] w-[110px] lg:h-[36px] h-[22px] flex items-center px-[2px] border border-[#a3a3a3] lg:rounded-[13px] rounded-[5px]'>
                            <div 
                                className='lg:h-[32px] h-[18px] bg-[#a3a3a3] lg:rounded-[13px] rounded-[5px] transition-all duration-500'
                                style={{
                                    width: `${(currentRank.person2Votecount / totalVotes) * 100}%`,
                                    minWidth: '10px',
                                }}
                            ></div>
                        </div>
                    </div>
                    <p className='lg:text-[28px] text-[17px] tracking-[-0.69px] instrument-sans font-medium text-[#737373] p-[10px] self-end'>
                        <span className='text-[#001526] instrument-serif italic'>{currentRank.person2Votecount}</span>/{totalVotes} votes
                    </p>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-[#737373) text-xl  font-medium leading-[normal] tracking-[-0.8px] mb-[14px]'>Wanna get Ranked?</p>
                <Link href='/rank' className='w-[341px] h-[45px] bg-[#1F92FF] rounded-[5px] mb-6 text-white flex items-center justify-center'>Create Your  Rankr</Link>
                <Link href='/rank' className='w-[341px] h-[45px] bg-[#001526] rounded-[5px] text-white flex items-center justify-center'>Vote in another Rankr</Link>
                <div className='min-w-full h-[1px] bg-[#D4D4D4] mt-[20px] mb-[10px]'></div>
                <Link href='/rank' className='w-[341px] h-[45px] bg-[#fff] text-[#001526] border-[#001526] rounded-[5px] mb-[50px] flex items-center justify-center'>Share</Link>
                <Link href='/devs' className=' text-[#737373] text-[20px] -leading-[0.8px] instrument-sans font-medium' >Meet the <span className=' instrument-serif text-[#0A0A0A]'>devs</span> →</Link>
            </div>
        </div>
    )
}

export default Leaderboard