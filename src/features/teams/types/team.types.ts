export interface Team {
	id: number;
	externalId: number;
	name: string;
	code: string;
	country: string;
	founded: number;
	national: boolean;
	logo: string;
	leagueName: string;
	leagueId: number;
	seasonYear: number;
	venue: Venue;
}

export interface Venue {
	name: string;
	city: string;
	capacity: number;
}
