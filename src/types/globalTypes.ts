export type iBook = {
	_id?: number;
	name: string;
	author: string;
	publicationDate: string;
	genre: string;
	summary: string;
	user: string;
	banner: string;
};

export type iComment = {
	_id?: number;
	user: string;
	book: string;
	comment: string;
};

export type iGenre =
	| "Fiction"
	| "Novel"
	| "Thriller"
	| "Mystery"
	| "Non-fiction"
	| "Other";

export const genre: iGenre[] = [
	"Fiction",
	"Mystery",
	"Non-fiction",
	"Novel",
	"Thriller",
	"Other",
];
