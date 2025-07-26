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
                <div className='w-2 h-2 rounded-full' style={{ backgroundColor: borderColor }}></div>
                <h3 className='md:text-lg text-xs font-bold'>{name}</h3>
            </div>
            <p className='text-xs text-gray-600 px-2'>{role}</p>
            <p className='text-xs text-gray-500 px-2 mt-2'>{description}</p>
        </div>
    );

    return (
        <div className='relative w-full p-4 rounded-lg shadow-md mb-8'>
            <div 
                className={`flex ${isOddIndex ? 'flex-row-reverse' : 'flex-row'} items-center justify-between`}
                style={{ borderLeft: `4px solid ${borderColor}` }}
            >
                {!isOddIndex && bioContent}
                <div className='relative w-24 h-24 md:w-32 md:h-32'>
                    <Image 
                        src={image} 
                        alt={name} 
                        fill 
                        className='rounded-full object-cover'
                        priority
                    />
                </div>
                {isOddIndex && bioContent}
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg'>
                <div 
                    className='h-full transition-all duration-1000 ease-out rounded-b-lg'
                    style={{ 
                        width: isWinner ? '100%' : '50%',
                        backgroundColor: barColor,
                        marginLeft: isOddIndex ? 'auto' : '0',
                        marginRight: isOddIndex ? '0' : 'auto'
                    }}
                />
            </div>
        </div>
    );
};
