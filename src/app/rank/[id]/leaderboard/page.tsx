import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Leaderboard = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-[80px] instrument-sans font-medium text-center mb-8 text-gray-500'>
                You voted <span className='instrument-serif italic text-[#001526]'>segun</span>!
            </h1>
            <p className='text-[24px] font-normal instrument-sans p-[5px] rounded-[7px] bg-[#F0F0EF] w-fit'>Current Stats:</p>
            <div className='flex flex-col items-start gap-6 mb-[100px] w-fit'>
                <div className='flex items-center gap-6'>
                    <Image
                        src={'/assets/profile.png'}
                        alt='add your look'
                        width={61}
                        height={63}
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <div className='flex p-[10px] gap-[10px]'>
                            <Image
                                src={'/assets/winner.svg'}
                                alt='winner'
                                width={35}
                                height={32}
                            />
                            <p className='text-[28px] instrument-serif italic font-normal -leading-[1.12px]'>Theboygenius</p>
                        </div>
                        <div className='w-[178px] h-[36px] flex items-center px-[2px] border border-[#B48A47] rounded-[13px]'>
                            <div className='w-[115px] h-[32px] bg-[#ECC25F] rounded-[13px]'></div>
                        </div>
                    </div>
                    <p className='text-[28px] instrument-sans font-medium text-[#737373] p-[10px] self-end'><span className='text-[#001526] instrument-serif italic'>330</span>/400 votes</p>
                </div>


                <div className='flex items-center gap-6'>
                    <Image
                        src={'/assets/profile.png'}
                        alt='add your look'
                        width={61}
                        height={63}
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <p className='text-[28px] instrument-serif italic font-normal -leading-[1.12px]'>Theboygenius</p>

                        <div className='w-[178px] h-[36px] flex items-center px-[2px] border border-[#B48A47] rounded-[13px]'>
                            <div className='w-[115px] h-[32px] bg-[#ECC25F] rounded-[13px]'></div>
                        </div>
                    </div>
                    <p className='text-[28px] instrument-sans font-medium text-[#737373] p-[10px] self-end'><span className='text-[#001526] instrument-serif italic'>330</span>/400 votes</p>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-[#737373) text-xl  font-medium leading-[normal] tracking-[-0.8px] mb-[14px]'>Wanna get Ranked?</p>
                <Button className='w-[341px] h-[45px] bg-[#1F92FF] rounded-[5px] mb-6'>Create Your  Rankr</Button>
                <Button className='w-[341px] h-[45px] bg-[#001526] rounded-[5px]'>Vote in another Rankr</Button>
                <div className='min-w-full h-[1px] bg-[#D4D4D4] mt-[20px] mb-[10px]'></div>
                <Button className='w-[341px] h-[45px] bg-[#fff] text-[#001526] border-[#001526] rounded-[5px] mb-[50px]'>Share</Button>
                <Link href='/devs' className=' text-[#737373] text-[20px] -leading-[0.8px] instrument-sans font-medium' >Meet the <span className=' instrument-serif text-[#0A0A0A]'>devs</span> →</Link>
            </div>
        </div>
    )
}

export default Leaderboard