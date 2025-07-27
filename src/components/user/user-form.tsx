'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRankStore } from '@/store/rank.store';
import { RankrService } from '@/services/rankr.service';
import Cookies from 'js-cookie';

export default function UserForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profileImage } = useRankStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const rankrService = RankrService.getInstance();
      const response = await rankrService.signup({
        username,
        email: email || undefined,
        user_image: profileImage || undefined
      });
      
      // Store user data in cookies
      if (response && response.token) {
        const userData = {
          token: response.token,
          username: username,
          timestamp: new Date().toISOString()
        };
        
        // Set cookie to expire in 30 days
        Cookies.set('user', JSON.stringify(userData), { 
          expires: 30,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/'
        });
      }
      
      router.push('/welcome');
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-6 max-w-[500px]'>
      <div className='space-y-2'>
        <Label htmlFor='username' className='font-medium text-[16px] instrument-sans tracking-[-0.64px]'>
          What should we call you?
        </Label>
        <Input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='John Doe'
          className='py-[11px] px-4 h-full'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email' className='font-medium text-[16px] instrument-sans tracking-[-0.64px] mt-3'>
          Enter your email.
        </Label>
        <Input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='you@example.com'
          className='py-[11px] px-4 h-full'
        />
      </div>

      <Button
        type='submit'
        className='w-full h-[44px] bg-[#001526] text-white rounded-[5px] hover:bg-[#001a33]'
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Continue'}
      </Button>

      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </form>
  );
}