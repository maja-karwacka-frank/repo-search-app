import * as z from 'zod';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { SearchValueSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { getRepositories } from '@/api/repository';
import { useToken } from '@/store/use-token';
import { FormError } from './FormError';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Repository } from '@/types';
import { RepoList } from './RepoList';

export const SearchForm = () => {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [error, setError] = useState<string | undefined>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { token, userName } = useToken();

	const form = useForm<z.infer<typeof SearchValueSchema>>({
		resolver: zodResolver(SearchValueSchema),
		defaultValues: {
			searchValue: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof SearchValueSchema>) => {
		const { searchValue } = values;
        setError('');

		try {
			setIsLoading(true);
			const response = await getRepositories(token, searchValue);
            if (response.length === 0) {
                setError('No repositories found. Please try again.');
            }
			const repositories = response.map((repo) => ({
				id: repo.id,
				name: repo.name,
				url: repo.svn_url,
				owner: {
					login: repo.owner?.login || '',
				},
			}));
			setRepositories(repositories);
		} catch (error) {
			setError('Something went wrong. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='h-full pt-10'>
			<Card className='max-w-[1012px] shadow-md mx-auto'>
                <CardHeader>Hello {userName}!</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 flex-col'>
							<div className='flex-col flex-1 space-y-2'>
								<FormField
									control={form.control}
									name='searchValue'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Find GitHub projects</FormLabel>
											<FormControl>
												<div className='w-full relative'>
													<Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
													<Input
														className='w-full pl-9 bg-white'
														{...field}
														placeholder='grid_project'
														disabled={isLoading}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormError message={error} />
							</div>
							<Button type='submit' disabled={isLoading}>
								Search
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
			{!!repositories.length && <RepoList repositories={repositories} />}
		</div>
	);
};
