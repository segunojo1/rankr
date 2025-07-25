import { create } from 'zustand';

interface RankSettings {
  isPublic: boolean;
  allowComments: boolean;
  multipleVotes: boolean;
  duration: string;
}

export interface RankOption {
  id: string;
  text: string;
  image?: string; // base64 string or URL
}

interface RankFormData {
  rank_title: string;
  rank_desc: string;
  campus: string;
  options: RankOption[];
  settings: RankSettings;
}

interface RankStore {
  currentStep: number;
  formData: RankFormData;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<RankFormData>) => void;
  addOption: (option: Omit<RankOption, 'id'>) => void;
  updateOption: (id: string, data: Partial<Omit<RankOption, 'id'>>) => void;
  removeOption: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

const initialState: RankFormData = {
  rank_title: '',
  rank_desc: '',
  campus: '',
  options: [],
  settings: {
    isPublic: true,
    allowComments: true,
    multipleVotes: false,
    duration: '24h',
  },
};

export const useRankStore = create<RankStore>((set) => ({
  currentStep: 0,
  formData: { ...initialState },
  
  setCurrentStep: (step: number) => set({ currentStep: step }),
  
  updateFormData: (data: Partial<RankFormData>) => 
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),
    
  addOption: (option: Omit<RankOption, 'id'>) => 
    set((state) => ({
      formData: {
        ...state.formData,
        options: [...state.formData.options, { ...option, id: Date.now().toString() }],
      },
    })),
    
  updateOption: (id: string, data: Partial<Omit<RankOption, 'id'>>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        options: state.formData.options.map(option => 
          option.id === id ? { ...option, ...data } : option
        ),
      },
    })),
    
  removeOption: (id: string) => 
    set((state) => ({
      formData: {
        ...state.formData,
        options: state.formData.options.filter(option => option.id !== id),
      },
    })),
    
  nextStep: () => 
    set((state) => ({ 
      currentStep: Math.min(state.currentStep + 1, 3) 
    })),
    
  prevStep: () => 
    set((state) => ({ 
      currentStep: Math.max(state.currentStep - 1, 0) 
    })),
    
  resetForm: () => 
    set({ 
      currentStep: 0, 
      formData: { ...initialState } 
    }),
}));
