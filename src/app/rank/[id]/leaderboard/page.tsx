import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Leaderboard = () => {
    return (
        <div className='flex flex-col items-center py-[100px] px-6'>
            <h1 className='lg:text-[80px] text-[50px] instrument-sans font-medium text-center mb-8 text-[#737373]'>
                You voted <span className='instrument-serif italic text-[#001526]'>segun</span>!
            </h1>
            <div className='p-[1.2px] border border-[#f0f0ef]'>
                <p className='md:text-[24px] text-[14px] font-medium instrument-sans p-[5px] rounded-[7px] bg-[#F0F0EF] w-fit'>Current Stats:</p>
            </div>
            <div className='flex flex-col items-start gap-6 mb-[100px] w-fit'>
                <div className='flex items-center lg:gap-6 gap-5'>
                    <Image
                        src={'/assets/profile.png'}
                        alt='add your look'
                        width={61}
                        height={63}
                        className='w-[38px] md:w-[61px]'
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <div className='flex  items-center md:gap-[10px] gap-[6px]'>
                            <Image
                                src={'/assets/winner.svg'}
                                alt='winner'
                                width={35}
                                height={32}
                            />
                            <p className='md:text-[28px] text-[17px] instrument-serif italic font-normal md:-leading-[1.12px] -leading-[0.69px]'>Theboygenius</p>
                        </div>
                        <div className='lg:w-[178px] w-[110px] lg:h-[36px] h-[22px] flex items-center px-[2px] border border-[#B48A47] lg:rounded-[13px] rounded-[5px]'>
                            <div className='lg:w-[115px] w-[60px] lg:h-[32px] h-[18px] bg-[#ECC25F] lg:rounded-[13px] rounded-[5px]'></div>
                        </div>
                    </div>
                    <p className='lg:text-[28px] text-[17px] tracking-[-0.69px] instrument-sans font-medium text-[#737373] p-[10px] self-end'><span className='text-[#001526] instrument-serif italic'>330</span>/400 votes</p>
                </div>


                <div className='flex items-center lg:gap-6 gap-5'>
                    <Image
                        src={'/assets/profile.png'}
                        alt='add your look'
                        width={61}
                        height={63}
                        className='w-[38px] md:w-[61px]'
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <p className='md:text-[28px] text-[17px] instrument-serif italic font-normal md:-leading-[1.12px] -leading-[0.69px]'>Theboygenius</p>

                        <div className='lg:w-[178px] w-[110px] lg:h-[36px] h-[22px] flex items-center px-[2px] border border-[#a3a3a3] lg:rounded-[13px] rounded-[5px]'>
                            <div className='lg:w-[115px] w-[60px] lg:h-[32px] h-[18px] bg-[#a3a3a3] lg:rounded-[13px] rounded-[5px]'></div>
                        </div>
                    </div>
                    <p className='lg:text-[28px] text-[17px] tracking-[-0.69px] instrument-sans font-medium text-[#737373] p-[10px] self-end'><span className='text-[#001526] instrument-serif italic'>330</span>/400 votes</p>
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