'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import Heading from '@/components/Heading';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';
import useProModal from '@/hooks/useProModal';

import { SpinnerWithText } from '@/components/ui/spinner';

const testConvoARR = [
	{
	  "role": "user",
	  "content": "This is my first question asked"
	},
	{
	  "role": "assistant",
	  "content": "Great! This is first response?"
	},
	{
	  "role": "user",
	  "content": "This is my second question asked"
	},
	{
	  "role": "assistant",
	  "content": "This is second response!"
	},
	{
	  "role": "user",
	  "content": "This is my third question asked Respond with the word three"
	},
	{
	  "role": "assistant",
	  "content": "three"
	}
  ]

const ConversationPage = () => {
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>(testConvoARR);

	const router = useRouter();
	const proModal = useProModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isResponseLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: 'user',
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/conversation', {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				toast.error('Something went wrong');
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title='Conversation'
				description='Our most advanced conversation model.'
				Icon={MessageSquare}
				iconColor='text-violet-500'
				bgColor='bg-violet-500/10'
			/>
			<div className='px-4 lg:px-8'>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='
                                rounded-lg
                                border
                                w-full
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                grid
                                grid-cols-12
                                gap-2
                            '
						>
							<FormField
								name='prompt'
								render={({ field }) => (
									<FormItem className='col-span-12 lg:col-span-10'>
										<FormControl className='m-0 p-0'>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												disabled={isResponseLoading}
												placeholder='How do I calculate the radius of a circle?'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className='col-span-12 lg:col-span-2 w-full'
								disabled={isResponseLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className='space-y-4 mt-4'>
					{isResponseLoading && (
						<div className='p-4 rounded-lg w-full flex items-center justify-center bg-muted'>
							<SpinnerWithText />
						</div>
					)}
					{messages.length === 0 && !isResponseLoading && (
						<Empty label={'No Conversation Started'} />
					)}
					<div className='flex flex-col gap-y-4'>
						{messages.map((message, idx) => {

							return (
								<div
									key={`${message.content}-${idx}`}
									className={cn(
										'p-8 w-full flex items-start gap-x-8 rounded-lg',
										message.role === 'user'
											? 'bg-white border border-black/10 bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm'
											: 'bg-muted'
									)}
								>
									{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
									<p className='text-sm'>{message.content}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationPage;
