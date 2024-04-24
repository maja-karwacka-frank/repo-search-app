import * as z from 'zod';

export const LoginSchema = z.object({
	username: z.string().min(1, {
		message: 'Username is required',
	}),
	token: z.string().min(1, {
		message: 'Token is required',
	}),
});

export const SearchValueSchema = z.object({
	searchValue: z.string().min(1, {
		message: 'Search is required',
	}),
});
