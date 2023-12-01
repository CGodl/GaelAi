'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import Heading from '@/components/Heading';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectItem,
	SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardFooter } from '@/components/ui/card';
import useProModal from '@/hooks/useProModal';


const ImagePage = () => {
	const [images, setImages] = useState<string[]>([]);
	const router = useRouter();
	const proModal = useProModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			amount: '1',
			resolution: '512x512',
		},
	});

	const isResponseLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([]);

			const response = await axios.post('/api/image', values);

			const urls = response.data.map((image: { url: string }) => image.url);

			setImages(urls);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen()
			} else {
				toast.error("Something went wrong");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title='Image Generation'
				description='Prompts to image made easy'
				Icon={ImageIcon}
				iconColor='text-pink-700'
				bgColor='bg-pink-700/10'
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
									<FormItem className='col-span-12 lg:col-span-6'>
										<FormControl className='m-0 p-0'>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												disabled={isResponseLoading}
												placeholder='A picture of a duck in space'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='amount'
								render={({ field }) => (
									<FormItem className='col-span-12 lg:col-span-2'>
										<Select
											disabled={isResponseLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOptions.map((option, idx) => (
													<SelectItem
														key={`${option.value}--${idx}`}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='resolution'
								render={({ field }) => (
									<FormItem className='col-span-12 lg:col-span-2'>
										<Select
											disabled={isResponseLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionOptions.map((option, idx) => (
													<SelectItem
														key={`${option.value}--${idx}`}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
						<div className='p-20'>
							<Loader />
						</div>
					)}
					{images.length === 0 && !isResponseLoading && (
						<Empty label={'No images generated'} />
					)}
					<div className='grid grid-cols-1 md:god-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8'>
						{images.map((src, idx) => (
							<Card
								key={`${src}-${idx}`}
								className='rounded-lg overflow-hidden'
							>
								<div className='relative aspect-square'>
									<Image 
										alt="Image"
										fill
										src={src}
									/>
								</div>
								<CardFooter className='p-2'>
									<Button 
										variant='secondary' 
										className='w-full'
										onClick={() => window.open(src)}
										>
										<Download className='h-4 w-4 mr-2'/>
										Download
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImagePage;
