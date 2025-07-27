import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export interface SignupData {
  username: string;
  email?: string;
  user_image?: File;
}

export class RankrService {
  private api: AxiosInstance;
  private static instance: RankrService;
  private readonly COOKIE_OPTIONS = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    expires: 7 // 7 days
  };

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_RANKR_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  public static getInstance(): RankrService {
    if (!RankrService.instance) {
      RankrService.instance = new RankrService();
    }
    return RankrService.instance;
  }

  public async signup(data: SignupData) {
    try {
      const formData = new FormData();
      formData.append('username', data.username);

      if (data.email) {
        formData.append('email', data.email);
      }

      if (data.user_image) {
        formData.append('user_image', data.user_image);
      }

      const response = await this.api.post('/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  public async createRankr({
    person1,
    person2,
    name_one,
    name_two,
    title,
    description,
    location,
    expiresAt,
    is_public
  }: {
    person1: File;
    person2: File;
    name_one: string;
    name_two: string;
    title: string;
    description?: string;
    location?: string;
    expiresAt: string;
    is_public: boolean;
  }) {
    try {
      // Get token from cookies
      let token = '';
      const userData = Cookies.get('user');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          token = parsedData.token || '';
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }

      const formData = new FormData();
      
      // Append files
      formData.append('person1', person1);
      formData.append('person2', person2);
      
      formData.append('name_one', name_one);
      formData.append('name_two', name_two);
      formData.append('title', title);
      if (description) formData.append('description', description);
      if (location) formData.append('location', location);
      formData.append('expiresAt', expiresAt);
      formData.append('is_public', is_public.toString());
      
      const headers: Record<string, string> = {
        'Content-Type': 'multipart/form-data',
      };

      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await this.api.post('/rankr', formData, { headers });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async vote(rankId: string, vote: string) {
    try {
      const response = await this.api.post('/vote', {
        rankId,
        vote
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getRankr(rankId: string) {
    try {
      const response = await this.api.get(`/rankr/${rankId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async reportRankr(rankrId: string, reportData: { name: string; email: string; complaint: string }) {
    try {
      const response = await this.api.post(`/rankr/report`, {
        rankrId,
        ...reportData
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postComment(postId: string, comment: string) {
    try {
      const response = await this.api.post(`/comment`, {
        postId,
        comment
      });
      return response.data;
    }  catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError<{ error?: string }>;
        const errorMessage = axiosError.response?.data?.error || 'Failed to submit comment. Please try again.';
        toast(errorMessage);
      } else {
        toast('An unexpected error occurred');
      }
    }
  }

  public async getComments(postId: string) {
    try {
      const response = await this.api.get(`/comments/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async selectRandomRankr() {
    try {
      const response = await this.api.get('/randomRankr');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}