export interface StandingsResponse {
	leagueId: number;
	leagueName: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
	standings: Standing[];
}

export interface Standing {
	rank: number;
	team: StandingTeam;
	points: number;
	goalsDiff: number;
	form: string;
	summary: StandingSummary;
}

export interface StandingTeam {
	id: number;
	name: string;
	logo: string;
}

export interface StandingSummary {
	played: number;
	win: number;
	draw: number;
	lose: number;
	goals: StandingGoals;
}

export interface StandingGoals {
	forGoals: number;
	againstGoals: number;
}
