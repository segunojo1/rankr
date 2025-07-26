import { create } from 'zustand';
import { RankrService } from '@/services/rankr.service';

interface RankSettings {
  isPublic: boolean;
  allowComments: boolean;
  multipleVotes: boolean;
  duration: string;
}

export interface RankOption {
  id: string;
  text: string;
  image: File | null; // File object for the image
}

interface RankFormData {
  rank_title: string;
  rank_desc: string;
  campus: string;
  options: RankOption[];
  settings: RankSettings;
}

export interface RankData {
  id: string;
  title: string;
  description: string;
  expiresAt: number;
  is_public: boolean;
  location: string;
  person_one_name: string;
  person_one_image_url: string;
  person_two_name: string;
  person_two_image_url: string;
  person1Votecount: number;
  person2Votecount: number;
  totalVotes: number;
}

interface RankStore {
  // Form state
  currentStep: number;
  formData: RankFormData;
  
  // Rank data state
  currentRank: RankData | null;
  isLoading: boolean;
  error: string | null;
  
  // Form actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<RankFormData>) => void;
  addOption: (option: Omit<RankOption, 'id'>) => void;
  updateOption: (id: string, data: Partial<Omit<RankOption, 'id'>>) => void;
  removeOption: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  
  // Rank data actions
  setCurrentRank: (rank: RankData | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchRank: (rankId: string) => Promise<void>;
  
  profileImage: File | null;
  setProfileImage: (file: File | null) => void;
  clearProfileImage: () => void;
}

const initialState: RankFormData = {
  rank_title: '',
  rank_desc: '',
  campus: '',
  options: [
    { id: '1', text: '', image: null },
    { id: '2', text: '', image: null },
  ],
  settings: {
    isPublic: true,
    allowComments: true,
    multipleVotes: false,
    duration: '1',
  },
};

export const useRankStore = create<RankStore>((set, get) => ({
  // Form state
  currentStep: 0,
  formData: initialState,
  
  // Rank data state
  currentRank: null,
  isLoading: false,
  error: null,
  
  // Form actions
  profileImage: null,
  setProfileImage: (file) => set({ profileImage: file }),
  clearProfileImage: () => set({ profileImage: null }),
  setCurrentStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  addOption: (option) =>
    set((state) => ({
      formData: {
        ...state.formData,
        options: [
          ...state.formData.options,
          { ...option, id: Date.now().toString() },
        ],
      },
    })),
  updateOption: (id, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        options: state.formData.options.map((option) =>
          option.id === id ? { ...option, ...data } : option
        ),
      },
    })),
  removeOption: (id) =>
    set((state) => ({
      formData: {
        ...state.formData,
        options: state.formData.options.filter((option) => option.id !== id),
      },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  resetForm: () =>
    set({
      currentStep: 0,
      formData: initialState,
    }),
  
  // Rank data actions
  setCurrentRank: (rank) => set({ currentRank: rank }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  fetchRank: async (rankId) => {
    const { setLoading, setError, setCurrentRank } = get();
    
    try {
      setLoading(true);
      setError(null);
      
      const rankrService = RankrService.getInstance();
      const response = await rankrService.getRankr(rankId);
      
      if (response) {
        setCurrentRank({
          id: response.rank.id,
          title: response.rank.title,
          description: response.rank.description,
          expiresAt: response.rank.expiresAt,
          is_public: response.rank.is_public,
          location: response.rank.location,
          person_one_name: response.rank.person_one_name,
          person_one_image_url: response.rank.person_one_image_url,
          person_two_name: response.rank.person_two_name,
          person_two_image_url: response.rank.person_two_image_url,
          person1Votecount: response.person1Votecount || 0,
          person2Votecount: response.person2Votecount || 0,
          totalVotes: response.totalVotes || 0
        });
      }
    } catch (error: unknown) {
      console.error('Error fetching rank:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch rank data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  },
}));
