'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { useRankStore } from '@/store/rank.store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { RankInfoSchema } from '@/models/validations/rankinfo.validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const Step1 = () => {
  const form = useForm<z.infer<typeof RankInfoSchema>>({
    resolver: zodResolver(RankInfoSchema),
    defaultValues: {
      rank_title: "",
      rank_desc: "",
      campus: ""
    },
  })

  const { updateFormData, nextStep } = useRankStore();

  function onSubmit(values: z.infer<typeof RankInfoSchema>) {
    updateFormData({
      rank_title: values.rank_title,
      rank_desc: values.rank_desc,
      campus: values.campus
    });
    nextStep();
  }

  return (
    <div className="w-full ">
      <h1 className='text-[80px] font-medium text-center mb-12 text-gray-500'>
        What do you want people to <span className='instrument-serif font-normal italic text-[#001526]'>rank</span>?
      </h1>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="satoshi flex flex-col w-full max-w-[341px] mx-auto">
          <FormField
            control={form.control}
            name="rank_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!font-medium  !text-[16px] instrument-sans leading-[-0.64px]">Rank Title</FormLabel>
                <FormControl>
                  <Input placeholder="Finest Girls in CSC" {...field} className='py-[11px] px-4 h-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rank_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-[16px] instrument-sans leading-[-0.64px] mt-3 ">Description:</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional*  Add a description to allow people understand how they should rank" {...field} className='py-[11px] px-4 h-[119px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-[16px] instrument-sans leading-[-0.64px] mt-3 ">Add Campus/Location</FormLabel>
                <FormControl>
                  <Input placeholder="(optional but useful for local ranks)" {...field} className='py-[11px] px-4 h-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='min-w-full h-[1px] bg-[#D4D4D4] my-[30px]'></div>
          <Button type="submit" className="bg-[#001526] w-full py-[13px] h-[45px] font-medium text-[16px] instrument-sans leading-[-0.64px]">Continue</Button>
        </form>
      </Form>
    </div>
  )
};

const OptionInput = ({
  option,
  onUpdate,
  onRemove,
  showAddMore,
  onAdd
}: {
  option: { id: string; text: string; image?: string };
  onUpdate: (id: string, data: { text?: string; image?: string }) => void;
  onRemove: (id: string) => void;
  showAddMore: boolean;
  onAdd: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        onUpdate(option.id, { image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(option.id, { text: e.target.value });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center space-x-4 w-full max-w-[341px]">
      <div className="flex-1 flex flex-col gap-[10px] justify-center items-center">
        {/* Text Input */}
        <div className="w-full">
          <Input
            type="text"
            value={option.text}
            onChange={handleTextChange}
            placeholder="Option 1 - Ade"
            className="min-w-full"
          />
        </div>

        {/* Image Upload Button */}
        <div className="relative">
          <div
            className="w-16 h-16 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={triggerFileInput}
          >
            {option.image ? (
              <img
                src={option.image}
                alt="Option preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src='/assets/profile.png'
                alt='add your look'
                width={61}
                height={63}
              />)}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
        <p className="text-sm font-normal text-[#404040] text-center">
          Let people see who they're ranking. Images make it more personal — use with permission 😉
        </p>
        <div className='flex items-center gap-1' onClick={triggerFileInput}>
          <Image
            src='/assets/image-add.png'
            alt='add img'
            width={16}
            height={16}
          />
          <p className='text-[#404040] text-[14px] font-medium tracking-[-0.56px] underline'>Upload a picture</p>
        </div>

      </div>

      {/* Remove Button */}
      {/* <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(option.id)}
        className="text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-5 w-5" />
      </Button> */}

      {/* Add More Button - Only show on the last option */}
      {/* {showAddMore && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:bg-blue-50"
          onClick={onAdd}
        >
          <Plus className="h-5 w-5" />
        </Button>
      )} */}
    </div>
  );
};

const Step2 = () => {
  const { formData, addOption, updateOption, removeOption, nextStep, prevStep } = useRankStore();
  const [showAddMore, setShowAddMore] = useState(false);

  const handleAddOption = () => {
    addOption({
      text: '',
      image: ''
    });
    setShowAddMore(false);
  };

  const handleUpdateOption = (id: string, data: { text?: string; image?: string }) => {
    updateOption(id, data);
  };

  const handleRemoveOption = (id: string) => {
    if (formData.options.length > 2) {
      removeOption(id);
    }
  };

  // Ensure we always have at least 2 options
  useEffect(() => {
    if (formData.options.length < 2) {
      const newOptions = [...formData.options];
      while (newOptions.length < 2) {
        newOptions.push({ id: `${Date.now()}${newOptions.length}`, text: '', image: '' });
      }
      if (newOptions.length > formData.options.length) {
        useRankStore.getState().updateFormData({ options: newOptions });
      }
    }
  }, [formData.options.length]);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center mx-auto">
      <h1 className='text-[80px] instrument-sans font-medium text-center mb-[10px] text-gray-500'>
        Add <span className='instrument-serif font-normal italic text-[#001526]'>Options</span>
      </h1>

      <div className="space-y-6 max-w-[341px]">
        <p className='text-[#191919] text-[16px] font-normal tracking-[-0.64px]'>Who are the contenders?</p>
        <div className="space-y-7 flex flex-col ">
          {formData.options.map((option, index) => (
            <OptionInput
              option={option}
              onUpdate={handleUpdateOption}
              onRemove={handleRemoveOption}
              showAddMore={index === formData.options.length - 1 && formData.options.length < 10}
              onAdd={handleAddOption}
            />
          ))}
          <Button onClick={handleAddOption}
            className='py-1 px-5 bg-[#1F92FF] rounded-[5px] text-white text-[14px] font-medium self-end justify-self-end'>Add another option</Button>
        </div>
        <div className='min-w-full h-[1px] bg-[#D4D4D4] my-[30px]'></div>

        <div className="flex justify-between">
          {/* <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="bg-white border-gray-300"
          >
            Back
          </Button> */}
          <Button
            type="button"
            onClick={nextStep}
            disabled={formData.options.length < 2 || formData.options.some(opt => !opt.text.trim())}
            className="bg-[#001526] h-[45px] w-[341px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

const Step3 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useRankStore();

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({
      settings: {
        ...formData.settings,
        isPublic: e.target.value === 'public'
      }
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({
      settings: {
        ...formData.settings,
        duration: e.target.value
      }
    });
  };

  const durationOptions = [
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' },
    { value: '3d', label: '3 days' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className='text-[80px] instrument-sans font-medium text-center mb-8 text-gray-500'>
        Choose <span className='instrument-serif italic text-[#001526]'>Voting</span> Style
      </h1>

      <div className=" gap-3 bg-white rounded-lg max-w-[340px] w-full flex flex-col items-center mx-auto">
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
          <Select
            value={formData.settings.isPublic ? 'public' : 'private'}
            onValueChange={(value) => handleVisibilityChange({ target: { value } } as any)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public - Anyone can view and vote</SelectItem>
              <SelectItem value="private">Private - Only people with the link can vote</SelectItem>
            </SelectContent>
          </Select>
          {/* <p className="text-xs text-gray-500 mt-1">
            {formData.settings.isPublic 
              ? "Your ranking will be visible to everyone" 
              : "Only people with the link can view and vote"}
          </p> */}
        </div>

        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Voting Duration</label>
          <Select
            value={formData.settings.duration}
            onValueChange={(value) => handleDurationChange({ target: { value } } as any)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <p className="text-xs text-gray-500 mt-1">
            The ranking will automatically close after this duration
          </p> */}
        </div>

        <div className='min-w-full h-[1px] bg-[#D4D4D4] my-[30px]'></div>

        <Button
          type="button"
          onClick={nextStep}
          className="bg-[#001526]  h-[45px] w-[341px]"
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

const Step4 = () => {
  const { formData, prevStep, resetForm, updateOption } = useRankStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleRemoveImage = (optionId: string) => {
    updateOption(optionId, { image: '' });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Here you would typically make an API call to save the ranking
      console.log('Launching ranking:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset form and show success message
      resetForm();
      // You might want to redirect to the ranking page or show a success message
      alert('Ranking launched successfully!');
    } catch (error) {
      console.error('Error launching ranking:', error);
      alert('Failed to launch ranking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <h1 className='text-[80px] instrument-sans font-medium text-center mb-6 text-[#737373]'>
        Preview & <span className='instrument-serif italic text-[#001526]'>Launch</span>
      </h1>
      <div className='flex flex-col  w-full gap-[30px] items-center mx-auto'>
        <div className='px-[50px] py-[26px] flex gap-[100px] shadow-sm w-fit rounded-[10px]'>
          <div>
            <p>Name:</p>
            <p>No of Options:</p>
            <p>Duration:</p>
            <p>Visibility:</p>
          </div>
          <div>
            <p>{formData.rank_title}</p>
            <p>{formData.options.length}</p>
            <p>{formData.settings.duration}</p>
            <p>{formData.settings.isPublic ? 'Public' : 'Private'}</p>
          </div>
        </div>
        <Image src='/assets/editsharedel.png' alt="Option Image" width={100} height={20} />
        <Button
          onClick={toggleOptions}
          className='w-[341px] border border-[#001526] rounded-[5px] h-[45px] bg-white text-[#001526] hover:text-white'
        >
          {showOptions ? 'Hide Options' : 'Preview Options'}
        </Button>

        {showOptions && (
          <div className="w-full mt-4 rounded-lg">
            <div className="flex justify-center gap-[30px]">
              {formData.options.map((option, index) => (
                <div 
                  key={option.id} 
                  className={`rounded-lg overflow-hidden transition-shadow transform ${
                    index === 0 ? '-rotate-[4deg]' : 
                    index === 1 ? 'rotate-[4deg]' : ''
                  }`}
                >
                  <div className="p-3">
                    <p className="font-medium text-gray-900">{option.text}</p>
                  </div>
                  <div className='p-2 bg-white rounded-[13px] w-fit'>
                    {option.image ? (
                      <div className="relative group">
                        <Image
                          src="/assets/pic-tag.png"
                          alt="pic-tag"
                          width={220}
                          height={237}
                          className={`w-[13px] h-[32px] absolute ${index % 2 == 0 ? 'right-[13.4px]' : 'left-[13.4px]'} -top-[15px]`}
                        />
                        <Image
                          src={option.image}
                          alt={option.text}
                          width={220}
                          height={237}
                          className="w-[220px] h-[237px] object-cover rounded-[13px]"
                        />
                        <button
                          onClick={() => handleRemoveImage(option.id)}
                          className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-red-50 transition-colors group-hover:opacity-100 opacity-0"
                          title="Remove image"
                        >
                          <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-[220px] h-[237px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-[13px]">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        <div className='h-[1px] bg-[#D4D4D4] my-4 w-[341px]'></div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='w-[341px] border border-[#001526] rounded-[5px] h-[45px] bg-[#001526] text-white hover:bg-[#001a33]'
        >
          {isSubmitting ? 'Publishing...' : 'Publish and Copy Link'}
        </Button>
      </div>

      {/* Main Preview Card */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Header with Title and Status */}
        {/* <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{formData.rank_title || 'Untitled Ranking'}</h2>
              {formData.rank_desc && (
                <p className="mt-2 text-gray-600">{formData.rank_desc}</p>
              )}
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {formData.settings.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          {formData.campus && (
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {formData.campus}
            </div>
          )}
        </div> */}

        {/* Options Grid */}
        {/* <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Options ({formData.options.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.options.map((option) => (
              <div key={option.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {option.image ? (
                  <div className="relative group">
                    <img
                      src={option.image}
                      alt={option.text}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(option.id)}
                      className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-red-50 transition-colors group-hover:opacity-100 opacity-0"
                      title="Remove image"
                    >
                      <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="p-3">
                  <p className="font-medium text-gray-900">{option.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Settings Summary */}
        {/* <div className="p-6 bg-gray-50 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-gray-700">
                {formData.settings.isPublic ? 'Public - Anyone can view and vote' : 'Private - Only people with the link can vote'}
              </span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {/* <span className="text-gray-700">
                Voting duration: {durationOptions.find(d => d.value === formData.settings.duration)?.label || '24 hours'}
              </span> 
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        {/* <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Back to Settings
          </button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || formData.options.length < 2}
              className="px-6 py-3 bg-[#001526] border border-transparent rounded-lg text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              {isSubmitting ? 'Launching...' : 'Launch Ranking'}
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
const Rank = () => {
  const { currentStep, nextStep, prevStep } = useRankStore();

  const steps = [
    { title: 'Basic Info', component: <Step1 /> },
    { title: 'Options', component: <Step2 /> },
    { title: 'Settings', component: <Step3 /> },
    { title: 'Review', component: <Step4 /> },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="flex justify-center gap-12 max-w-6xl mx-auto">


        {/* Form content */}
        <div className="flex-1 max-w-2xl">
          {steps[currentStep].component}
        </div>

        {/* Navigation buttons */}
        {/* <div className="flex justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-md ${currentStep === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // Handle final submission here if needed
              }}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Create Ranking
            </button>
          )}
        </div> */}

        {/* Progress bar */}
        <div className='fixed top-0 bottom-0 h-fit my-auto right-1/4 '>
          <div className="relative hidden md:block max-h-[212px]">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2">
              <div
                className="absolute left-0 w-full bg-[#001526] transition-all duration-300"
                style={{
                  height: `${(currentStep / (steps.length - 1)) * 100}%`,
                  top: 0
                }}
              ></div>
            </div>
            <div className="relative flex flex-col h-full py-2">
              {steps.map((_, index) => (
                <div key={index} className="relative z-10 flex items-center py-4">
                  <div
                    className={`w-[10px] h-[10px] rounded-full ${index <= currentStep ? 'bg-[#001526]' : 'bg-gray-200'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rank;