'use client';

import { RankrService } from '@/services/rankr.service';
import { HeartIcon } from 'lucide-react';
import { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRankStore } from '@/store/rank.store';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

// Dynamically import ReactConfetti to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), {
    ssr: false,
});

interface VoteOption {
    id: string;
    name: string;
    image: string;
}

const Rank = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isCopied, setIsCopied] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportForm, setReportForm] = useState({
        name: '',
        email: '',
        complaint: ''
    });
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [comment, setComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [comments, setComments] = useState<Array<{
        id: string;
        comment: string;
        createdAt: string;
    }>>([]);
    const {
        currentRank,
        isLoading,
        error,
        fetchRank,
        setCurrentRank
    } = useRankStore();

    // const rankId = params.id;
    const { id } = useParams();
    const rankId = Array.isArray(id) ? id[0] : id || '';

    // Check if user has already voted on this rank
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const voteKey = `rank_${rankId}_vote`;
            const voteData = localStorage.getItem(voteKey);
            if (voteData) {
                // User has already voted, redirect to leaderboard
                router.push(`/rank/${rankId}/leaderboard`);
            }
        }
    }, [rankId, router]);

    const options = React.useMemo(() => {
        if (!currentRank) return [];
        return [
            {
                id: '1',
                name: currentRank.person_one_name,
                image: currentRank.person_one_image_url,
                votes: currentRank.person1Votecount
            },
            {
                id: '2',
                name: currentRank.person_two_name,
                image: currentRank.person_two_image_url,
                votes: currentRank.person2Votecount
            }
        ];
    }, [currentRank]);

    // Check for existing vote and fetch rank data on mount
    useEffect(() => {
        // Set window size for confetti
        const updateWindowSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial size
        updateWindowSize();

        // Add event listener for window resize
        window.addEventListener('resize', updateWindowSize);

        if (!rankId) return;

        // Check for existing vote
        const voteKey = `rank_${rankId}_vote`;
        const voteData = localStorage.getItem(voteKey);

        if (voteData) {
            const { hasVoted: voted, optionId } = JSON.parse(voteData);
            if (voted && optionId) {
                setHasVoted(true);
                setSelectedOption(optionId);
            }
        }

            // Fetch rank data and comments
        const fetchData = async () => {
            try {
                await fetchRank(rankId);
                if (rankId) {
                    const response = await RankrService.getInstance().getComments(rankId);
                    if (response && response.comments) {
                        setComments(response.comments);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load comments');
            }
        };

        // Only fetch data on client side to prevent hydration issues
        if (typeof window !== 'undefined') {
            fetchData();
        }

        // Cleanup function
        return () => {
            setCurrentRank(null);
            window.removeEventListener('resize', updateWindowSize);
        };
    }, [id, fetchRank, setCurrentRank]);

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
            toast.error('Failed to post comment. Please try again.');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleReportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reportForm.name || !reportForm.email || !reportForm.complaint) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setIsSubmittingReport(true);
            await RankrService.getInstance().reportRankr(rankId, {
                name: reportForm.name,
                email: reportForm.email,
                complaint: reportForm.complaint
            });
            
            toast.success('Report submitted successfully');
            setIsReportModalOpen(false);
            setReportForm({ name: '', email: '', complaint: '' });
        } catch (error) {
            console.error('Error submitting report:', error);
            toast.error('Failed to submit report. Please try again.');
        } finally {
            setIsSubmittingReport(false);
        }
    };

    const handleVote = async (optionId: string) => {
        if (hasVoted || !id || !currentRank) return;

        try {
            setSelectedOption(optionId);
            setHasVoted(true);

            // Show confetti
            setShowConfetti(true);

            // Hide confetti after animation
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);

            const voteKey = `rank_${rankId}_vote`;
            localStorage.setItem(voteKey, JSON.stringify({
                hasVoted: true,
                optionId: optionId,
                personName: optionId === '1' ? currentRank.person_one_name : currentRank.person_two_name,
                votedAt: new Date().toISOString()
            }));

            const rankrService = RankrService.getInstance();
            try {
                await rankrService.vote(rankId, optionId);
                
                
                
            } catch (error: unknown) {
                if (error && typeof error === 'object' && 'response' in error) {
                    const axiosError = error as AxiosError<{ error?: string }>;
                    const errorMessage = axiosError.response?.data?.error || 'Failed to submit vote. Please try again.';
                    toast(errorMessage);
                } else {
                    toast('An unexpected error occurred');
                }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
                router.push(`/rank/${rankId}/leaderboard`);

        } catch (error) {
            console.error('Error submitting vote:', error);
            // Revert optimistic update on error
            setHasVoted(false);
            setSelectedOption(null);
            setShowConfetti(false);
            localStorage.removeItem(`rank_${id}_vote`);
        }
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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
                <p className="text-gray-700">Loading rank data...</p>
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

    return (
        <div className='relative flex flex-col items-center min-h-screen pt-[100px] pb-[40px] px-4'>
            {showConfetti && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                    colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7CAC9', '#92A8D1']}
                />
            )}
            <h1 className='lg:text-[80px] text-[50px] lg:tracking-[-3.2px] tracking-[-2px] instrument-serif italic font-medium text-center text-gray-500'>
                {currentRank.title}
            </h1>
            {/* {currentRank.description && (
                <p className="text-gray-600 mb-6 text-center max-w-2xl">
                    {currentRank.description}
                </p>
            )}
            <div className="text-sm text-gray-500 mb-6">
                Total Votes: {currentRank.totalVotes}
            </div> */}

            <div className='flex flex-col md:flex-row items-center justify-center gap-8 lg:mt-[50px] mt-[20px] w-full max-w-4xl mx-auto'>
                {options.map((option, index: number) => (
                    <React.Fragment key={option.id}>
                        {index === 1 && (
                            <div className='md:flex hidden items-center self-start -mt-7 justify-center w-16 h-16'>
                                <Image 
                                    src="/assets/vs.png"
                                    alt="versus"
                                    width={63}
                                    height={63}
                                    className='w-[63px] h-[63px] '
                                />
                            </div>
                        )}
                        <div className='flex flex-col items-center gap-4'>
                            <div className='text-center'>
                                <p className='font-semibold lg:text-[30px] text-[22px] instrument-sans text-[#001526] tracking-[-0.8px]'>
                                    {option.name}
                                </p>
                            </div>
                            <div className='relative group cursor-pointer' onClick={() => handleVote(option.id)}>
                                <Image
                                    src="/assets/pic-tag.png"
                                    alt="pic-tag"
                                    width={220}
                                    height={32}
                                    className={`w-[13px] h-[32px] absolute ${index % 2 === 0 ? 'right-[13.4px]' : 'left-[13.4px]'} -top-[15px]`}
                                />
                                <div className={getCardClasses(option.id)}>
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
                                    className={`mt-2 hover:text-pink-600 text-[#737373] transition-colors ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
                                    aria-label={`Vote for ${option.name}`}
                                >
                                    <HeartIcon className='w-8 h-8' />
                                </button>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className='mt-12 flex flex-col items-center gap-6'>
                <button 
                    onClick={() => {
                        const url = `https://userankr.vercel.app/rank/${id}`;
                        navigator.clipboard.writeText(url);
                        setIsCopied(true);
                        toast.success('Link copied to clipboard!');
                        setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className={`p-2 rounded-full transition-colors ${isCopied ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                    title="Copy link to share"
                >
                    <Image
                        src="/assets/share.png"
                        alt="share"
                        width={30}
                        height={30}
                        className={`w-[30px] h-[30px] ${isCopied ? 'opacity-70' : ''}`}
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
                        
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-[55px]'>
                        {/* <Link href={`/rank/${id}/leaderboard`} className='bg-black h-12 w-[250px] flex items-center justify-center text-[20px] font-bold  text-white rounded-md'>View Leaderboard</Link> */}
                        <div className='flex items-center gap-2'>
                            <p className='md:text-[24px] text-[20px] instrument-sans tracking-[-0.8px] font-normal text-[#737373]'>That Vote Was a Little Too <span className='text-[#0a0a0a] instrument-serif font-normal italic'>Personal.</span>  </p>
                            <Image
                                src="/assets/mdi_flame.svg"
                                alt="mdi_flame"
                                width={42}
                                height={42}
                                className='w-[42px] h-[42px]'
                            />
                        </div>

                    </div>
                )}
                <p className='lg:text-[20px] text-[14px] instrument-sans font-normal text-[#737373] text-center'>
                            All images are uploaded by creators. If something looks off,{' '}
                            <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
                                <DialogTrigger asChild>
                                    <button className='text-[#0a0a0a] hover:underline'>
                                        report it →
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Report Inappropriate Content</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleReportSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Name
                                            </label>
                                            <Input
                                                id="name"
                                                value={reportForm.name}
                                                onChange={(e) => setReportForm({...reportForm, name: e.target.value})}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={reportForm.email}
                                                onChange={(e) => setReportForm({...reportForm, email: e.target.value})}
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 mb-1">
                                                What's the issue?
                                            </label>
                                            <Textarea
                                                id="complaint"
                                                value={reportForm.complaint}
                                                onChange={(e) => setReportForm({...reportForm, complaint: e.target.value})}
                                                placeholder="Please describe the issue..."
                                                rows={4}
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2 pt-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsReportModalOpen(false)}
                                                disabled={isSubmittingReport}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={isSubmittingReport}>
                                                {isSubmittingReport ? 'Submitting...' : 'Submit Report'}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </p>

                {/* Comments Section */}
                <div className='mt-12 w-full max-w-3xl mx-auto'>
                    <h3 className='text-xl font-medium text-[#001526] mb-6'>Comments ({comments.length})</h3>
                    
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
                                    <div className='bg-[#F9F9F9] rounded-lg '>
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
                            <p className='text-center text-[#737373] py-8'>No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rank