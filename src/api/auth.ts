import { Octokit } from 'octokit';

export const login = async (token: string) => {
	const octokit = new Octokit({
		auth: token,
	});

	try {
		const response = await octokit.request('GET /user', {
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		return response;
	} catch (error) {
		throw new Error('Invalid token');
	}
};
