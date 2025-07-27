'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useCallback } from 'react';
import { useRankStore } from '@/store/rank.store';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RankrService } from '@/services/rankr.service';
import { formatDistanceToNow } from 'date-fns';

// interface LeaderboardProps {
//     params: {
//         id: string;
//     };
// }

interface Comment {
    id: string;
    comment: string;
    createdAt: string;
}

const Leaderboard = () => {
    const { currentRank, isLoading, error, fetchRank } = useRankStore();
    const { id } = useParams();
    const rankId = Array.isArray(id) ? id[0] : id || '';
    const [isCopied, setIsCopied] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const handleShare = async () => {
        const url = `https://userankr.vercel.app/rank/${rankId}`;
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
            toast.error('Failed to copy link');
        }
    };

    const fetchComments = useCallback(async () => {
        try {
            if (rankId) {
                const response = await RankrService.getInstance().getComments(rankId);
                if (response && response.comments) {
                    setComments(response.comments);
                }
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            toast.error('Failed to load comments');
        }
    }, [rankId]);

    useEffect(() => {
        if (rankId) {
            fetchRank(rankId);
            if (typeof window !== 'undefined') {
                fetchComments();
            }
        }
    }, [rankId, fetchRank, fetchComments]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || !rankId) return;

        try {
            setIsSubmittingComment(true);
            const response = await RankrService.getInstance().postComment(rankId, comment);
            
            // Update the comments list with the new comment from the response
            setComments(prevComments => [{
                id: response.comment.id,
                comment: response.comment.comment,
                createdAt: response.comment.createdAt
            }, ...prevComments]);
            
            setComment('');
            toast.success('Comment added!');
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment');
        } finally {
            setIsSubmittingComment(false);
        }
    };

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
    const voteKey = `rank_${rankId}_vote`;
    const voteData = typeof window !== 'undefined' ? localStorage.getItem(voteKey) : null;
    const votedPersonName = voteData ? JSON.parse(voteData).personName : 'your choice';
    
    const winnerName = currentRank.person1Votecount > currentRank.person2Votecount 
        ? currentRank.person_one_name 
        : currentRank.person_two_name;
    // const winnerVotes = Math.max(currentRank.person1Votecount, currentRank.person2Votecount);
    // const loserVotes = Math.min(currentRank.person1Votecount, currentRank.person2Votecount);

    return (
        <div className='flex flex-col items-center py-[100px] px-6'>
            <h1 className='lg:text-[80px] text-[50px] instrument-sans font-medium text-center mb-8 text-[#737373]'>
                You voted for <span className='instrument-serif italic text-[#001526]'>{votedPersonName}</span>!
            </h1>
            <div className='p-[1.2px] border border-[#f0f0ef]'>
                <p className='md:text-[24px] text-[14px] font-medium instrument-sans p-[5px] rounded-[7px] bg-[#F0F0EF] w-fit'>Current Stats:</p>
            </div>
            <div className='flex flex-col items-start gap-6 mb-[100px] w-fit'>
                {[{
                    id: '1',
                    name: currentRank.person_one_name,
                    image: currentRank.person_one_image_url,
                    votes: currentRank.person1Votecount,
                    position: currentRank.person1Votecount > currentRank.person2Votecount ? 1 : 
                              currentRank.person1Votecount < currentRank.person2Votecount ? 2 : 0 // 0 means tie
                }, {
                    id: '2',
                    name: currentRank.person_two_name,
                    image: currentRank.person_two_image_url,
                    votes: currentRank.person2Votecount,
                    position: currentRank.person2Votecount > currentRank.person1Votecount ? 1 : 
                              currentRank.person2Votecount < currentRank.person1Votecount ? 2 : 0 // 0 means tie
                }]
                .sort((a, b) => b.votes - a.votes)
                .map((person, index) => {
                    const isWinner = person.position === 1;
                    const isTie = person.position === 0;
                    const barColor = isWinner ? '#ECC25F' : '#a3a3a3';
                    const borderColor = isWinner ? '#B48A47' : '#a3a3a3';
                    
                    return (
                        <div key={person.id} className='flex items-center lg:gap-6 gap-5'>
                            <Image
                                src={person.image}
                                alt={person.name}
                                width={61}
                                height={63}
                                className='w-[38px] md:w-[61px] h-auto rounded-full object-cover aspect-square'
                            />
                            <div className='flex flex-col gap-[5px]'>
                                <div className='flex items-center md:gap-[10px] gap-[6px]'>
                                    {isWinner && !isTie ? (
                                        <Image
                                            src={'/assets/winner.svg'}
                                            alt='winner'
                                            width={35}
                                            height={32}
                                        />
                                    ) : (
                                        <div className='w-[35px] h-8 flex items-center justify-center'>
                                            <span className={`${isTie ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                                                {index + 1}
                                            </span>
                                        </div>
                                    )}
                                    <p className='md:text-[28px] text-[17px] instrument-serif italic font-normal md:-leading-[1.12px] -leading-[0.69px]'>
                                        {person.name}
                                    </p>
                                </div>
                                <div className='lg:w-[178px] w-[110px] lg:h-[36px] h-[22px] flex items-center px-[2px] border lg:rounded-[13px] rounded-[5px]'
                                    style={{ borderColor }}
                                >
                                    <div 
                                        className='lg:h-[32px] h-[18px] lg:rounded-[13px] rounded-[5px] transition-all duration-500'
                                        style={{
                                            width: `${(person.votes / totalVotes) * 100}%`,
                                            minWidth: '10px',
                                            backgroundColor: isTie ? '#a3a3a3' : barColor
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <p className='lg:text-[28px] text-[17px] tracking-[-0.69px] instrument-sans font-medium text-[#737373] p-[10px] self-end'>
                                <span className='text-[#001526] instrument-serif italic'>{person.votes}</span>/{totalVotes} votes
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-[#737373) text-xl  font-medium leading-[normal] tracking-[-0.8px] mb-[14px]'>Wanna get Ranked?</p>
                <Link href='/rank' className='w-[341px] h-[45px] bg-[#1F92FF] rounded-[5px] mb-6 text-white flex items-center justify-center'>Create Your  Rankr</Link>
                <Link href='/rank' className='w-[341px] h-[45px] bg-[#001526] rounded-[5px] text-white flex items-center justify-center'>Vote in another Rankr</Link>
                <div className='min-w-full h-[1px] bg-[#D4D4D4] mt-[20px] mb-[10px]'></div>
                <Button 
                    onClick={handleShare}
                    className={`w-[341px] h-[45px] bg-[#fff] hover:text-white text-[#001526] border border-[#001526] rounded-[5px] mb-[50px] flex items-center justify-center ${isCopied ? 'bg-green-50' : ''}`}
                    disabled={isCopied}
                >
                    {isCopied ? 'Copied!' : 'Share'}
                </Button>
                <Link href='/team' className=' text-[#737373] text-[20px] -leading-[0.8px] instrument-sans font-medium' >Meet the <span className=' instrument-serif text-[#0A0A0A]'>team</span> →</Link>
            </div>
            
            {/* Comments Section */}
            <div className='mt-12 max-w-3xl mx-auto sm:px-6 lg:px-8'>
                <h2 className='text-2xl font-bold text-[#001526] mb-6'>Comments</h2>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className='mb-8'>
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Add an anonymous comment...'
                        className='min-h-[100px] resize-none border-[#D4D4D4] focus-visible:ring-1 focus-visible:ring-[#001526] w-full'
                        disabled={isSubmittingComment}
                    />
                    <div className='flex justify-end mt-2'>
                        <Button 
                            type='submit' 
                            className='bg-[#001526] hover:bg-[#001526]/90'
                            disabled={!comment.trim() || isSubmittingComment}
                        >
                            {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                        </Button>
                    </div>
                </form>

                {/* Comments List */}
                <div className='space-y-4'>
                    {comments.map((comment) => (
                        <div key={comment.id} className='flex gap-3'>
                            <div className='flex-shrink-0'>
                                <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium'>
                                    A
                                </div>
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='bg-[#F9F9F9] rounded-lg'>
                                    <div className='flex items-center gap-2 mb-1'>
                                        <span className='text-sm font-medium text-[#001526]'>Anonymous</span>
                                        <span className='text-xs text-[#737373]'>
                                            {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : 'Just now'}
                                        </span>
                                    </div>
                                    <p className='text-[#0A0A0A] whitespace-pre-wrap break-words'>{comment.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {comments.length === 0 && (
                        <p className='text-center text-gray-500 py-4'>No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Leaderboard