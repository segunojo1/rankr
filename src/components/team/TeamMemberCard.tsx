"use client"
import React, { useRef, useState, useEffect } from 'react';
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
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Increased rotation multipliers for more pronounced effect
        const rotateX = ((y - centerY) / centerY) * 12; // Increased from 5 to 12
        const rotateY = ((centerX - x) / centerX) * 12; // Increased from 5 to 12
        
        setMousePosition({ x: rotateX, y: rotateY });
    };
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
    };
    
    const cardStyle: React.CSSProperties = {
        transform: isHovered 
            ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) scale3d(1.05, 1.05, 1.05)`
            : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease-out',
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform'
    };
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
                <p className='instrument-serif italic font-normal text-[#001526] dark:text-white text-[10px] md:text-3xl md:-tracking-wide -tracking-[0.42px]'>
                    {name}
                </p>
            </div>

            <div className='w-full md:max-w-[240px] max-w-[66px] md:h-9 h-[13px] md:mb-[25px] mb-[10px] flex items-center px-[2px] border-1 md:rounded-[9px] rounded-[4px] overflow-hidden dark:border-gray-600'
                style={{ borderColor: barColor }}
            >
                <div
                    className='md:h-8 h-[9px] md:rounded-[9px] rounded-[4px] transition-all duration-500 dark:opacity-90'
                    style={{
                        width: `${Math.floor(Math.random() * 60) + 40}%`,
                        backgroundColor: barColor,
                    }}
                />
            </div>

            <div className='flex flex-col md:gap-2 gap-[3px]'>
                <h2 className='text-[7.5px] md:text-xl font-medium text-[#737373] dark:text-gray-300 md:-tracking-wide -tracking-[0.3px] instrument-sans'>
                    {role}
                </h2>
                <p className='text-[5px] md:text-base font-normal text-[#737373] dark:text-gray-400 md:-tracking-wide -tracking-[0.2px] instrument-sans leading-relaxed'>
                    {description}
                </p>
            </div>
        </div>
    );

    const imageContent = (
        <div
            className='md:p-2.5 p-1 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 flex-shrink-0 w-full md:max-w-[240px] max-w-[104px] mx-auto md:mx-0 transform-style-preserve-3d'
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
                    draggable={false}
                    className='md:w-full w-[104px] md:h-auto h-[122px] md:aspect-[247/267]  object-cover rounded-md'
                />
            </div>
        </div>
    );

    return (
        <div 
            ref={cardRef}
            className='flex w-fit md:flex-row items-start gap-5 will-change-transform relative z-10'
            style={cardStyle}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
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