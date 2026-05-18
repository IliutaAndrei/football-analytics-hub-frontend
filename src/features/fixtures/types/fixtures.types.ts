export interface FixturesResponse {
	response: FixtureItem[];
}

export interface FixtureItem {
	fixture: FixtureDetails;
	league: FixtureLeague;
	teams: FixtureTeams;
	goals: FixtureGoals;
	score: FixtureScore;
}

export interface FixtureDetails {
	id: number;
	referee: string | null;
	date: string;
	venue: FixtureVenue;
	status: FixtureStatus;
}

export interface FixtureVenue {
	id: number | null;
	name: string;
	city: string;
}

export interface FixtureStatus {
	statusLong: string;
	elapsed: number | null;
	extraTime: number | null;
}

export interface FixtureLeague {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
	round: string;
}

export interface FixtureTeams {
	home: FixtureTeam;
	away: FixtureTeam;
}

export interface FixtureTeam {
	id: number;
	name: string;
	logo: string;
	winner: boolean | null;
}

export interface FixtureGoals {
	home: number | null;
	away: number | null;
}

export interface FixtureScore {
	halfTime: FixtureGoals;
	fullTime: FixtureGoals;
	extraTime: FixtureGoals;
	penalty: FixtureGoals;
}
