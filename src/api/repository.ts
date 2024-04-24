import { Octokit } from 'octokit';

export const getRepositories = async (token: string, searchValue: string) => {
	const octokit = new Octokit({
		auth: token,
	});

	try {
		const response = await octokit.request('GET /search/repositories', {
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
			q: searchValue,
			sort: 'stars',
		});

		return response.data.items;
	} catch (error) {
		throw new Error('Invalid token');
	}
};
