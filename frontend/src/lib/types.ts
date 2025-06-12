export interface Template {
	id: string;
	name: string;
	description: string;
	component_id: string;
	preview: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
	avatar: string;
	created: string;
	updated: string;
	verified: boolean;
}

export interface Obituary {
	id: string;
	first_name: string;
	last_name: string;
	birth_date: Date;
	death_date: Date;
	created_by: User;
	created: Date;
	updated: Date;
	notice: string;
	address: string;
	photo?: string;
	photoUrl?: string;
	template: string;
	slug: string;
}