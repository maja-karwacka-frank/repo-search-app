import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { Header } from './Header';
import { login } from '@/api/auth';
import { useToken } from '@/store/use-token';

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setToken, setUserName } = useToken();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: '',
			token: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		const { token, username } = values;
		setError('');
		try {
			setIsLoading(true);
			await login(token);
			form.reset();
			setToken(token);
			setUserName(username);
		} catch (error) {
			setError('Invalid token');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
			<Card className='w-[400px] shadow-md'>
				<CardHeader>
					<Header />
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='john-doe'
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='token'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Token</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='******'
													type='password'
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormError message={error} />
							<Button type='submit' className='w-full' disabled={isLoading}>
								Login
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
