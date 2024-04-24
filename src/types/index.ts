export interface Repository {
	id: number;
    name: string;
	url: string;
	owner: {
		login: string;
	};
}