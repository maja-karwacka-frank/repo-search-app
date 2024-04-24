import { Repository } from '@/types';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface RepoListProps {
	repositories: Repository[];
}

export const RepoList = ({ repositories }: RepoListProps) => {
	return (
		<div className='p-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
			{repositories.map((repo) => (
				<Card key={repo.id}>
					<CardHeader>
						<CardTitle>{repo.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>{repo.owner.login}</CardDescription>
					</CardContent>
					<CardFooter>
						<a
							href={repo.url}
							target='_blank'
							className='text-blue-500 hover:underline'>
							{repo.url}
						</a>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};
