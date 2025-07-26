import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { userSchema } from '@/models/validations/user.validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { Input } from '../ui/input'

const UserForm = () => {

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            email: ""
        },
    })

    function onSubmit(values: z.infer<typeof userSchema>) {

        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="satoshi flex flex-col w-full lg:max-w-[341px] max-w-[500px]">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="!font-medium  !text-[16px] instrument-sans tracking-[-0.64px]">What should we call you?</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} className='py-[11px] px-4 h-full' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-[16px] instrument-sans tracking-[-0.64px] mt-3 ">Enter your email.</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} className='py-[11px] px-4 h-full' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='min-w-full h-[1px] bg-[#D4D4D4] my-[30px]'></div>
                <Button type="submit" className="bg-[#001526] w-full py-[13px] h-[45px]">Submit</Button>
            </form>
        </Form>
    )
}

export default UserForm