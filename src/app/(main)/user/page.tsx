// src/app/user/page.tsx
'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRef, ChangeEvent, useState } from 'react';
import UserForm from '@/components/user/user-form';
import { useRankStore } from '@/store/rank.store';

export default function UserDetailsOnboard() {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setProfileImage } = useRankStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={`flex lg:flex-row flex-col gap-[59px] w-full min-h-screen p-10 lg:px-32 px-[27px] lg:pt-[161px] pt-[100px] instrument-sans`}>
        <aside className='lg:fixed lg:w-1/3 lg:h-screen flex lg:items-start items-center justify-center lg:justify-start text-center lg:text-start'>
          <h1 className='lg:text-[80px] text-[60px] font-medium max-w-[395px] lg:tracking-[-3.2px] tracking-[-2.4px] leading-normal'>

            <>
              Wanna get
              <br />
              <span className='instrument-serif italic'>Ranked</span> ?
            </>
          </h1>
        </aside>
        <main className={`lg:w-1/3 lg:ml-[33.333%] flex flex-col items-center justify-center`}>
          <h2 className='text-[#737373] instrument-sans text-[29.7px] font-semibold tracking-[-1.19px] mb-6 self-center lg:self-start'>Set Your Display Info</h2>
          <div className='flex flex-col items-center space-y-2.5 mb-3'>
            <div className='relative w-[61px] h-[63px] rounded-full overflow-hidden'>
              <Image
                src={previewUrl || (theme === 'dark' ? '/assets/profile.png' : '/assets/profile.png')}
                alt='Profile'
                width={61}
                height={63}
                className='w-full h-full object-cover'
              />
            </div>
            <p className='text-[#404040] text-[14px] font-normal tracking-[-0.56px] text-center'>
              Choose Your Rankr Avatar. <br />
              (Pick your vibe. This is how the world sees you.)
            </p>
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='flex items-center gap-1 cursor-pointer'
            >
              <Image
                src='/assets/image-add.png'
                alt='add img'
                width={16}
                height={16}
              />
              <span className='text-[#404040] text-[14px] font-medium tracking-[-0.56px] underline'>
                Choose avatar
              </span>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleImageChange}
                accept='image/*'
                className='hidden'
              />
            </button>
          </div>
          <UserForm />
        </main>
      </div>
    </div>
  );
}