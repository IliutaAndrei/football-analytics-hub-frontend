export interface FixturePlayersResponse {
	response: TeamPlayersStats[];
}

export interface TeamPlayersStats {
	team: Team;
	players: PlayerStats[];
}

export interface Team {
	id: number;
	name: string;
	logo: string;
}

export interface PlayerStats {
	player: Player;
	statistics: PlayerStatistic[];
}

export interface Player {
	id: number;
	name: string;
	photo: string;
}

export interface PlayerStatistic {
	games: Games;
	shots: Shots;
	goals: Goals;
	passes: Passes;
	tackles: Tackles;
	duels: Duels;
	dribbles: Dribbles;
	fouls: Fouls;
	cards: Cards;
	penalty: Penalty;
}

export interface Games {
	minutes: number | null;
}

export interface Shots {
	total: number | null;
	on: number | null;
}

export interface Goals {
	total: number | null;
	conceded: number | null;
	assists: number | null;
	saved: number | null;
}

export interface Passes {
	total: number | null;
	key: number | null;
	accuracy: number | null;
}

export interface Tackles {
	total: number | null;
	blocks: number | null;
	interceptions: number | null;
}

export interface Duels {
	total: number | null;
	won: number | null;
}

export interface Dribbles {
	attempts: number | null;
	success: number | null;
}

export interface Fouls {
	drawn: number | null;
	committed: number | null;
}

export interface Cards {
	yellow: number;
	red: number;
}

export interface Penalty {
	won: number | null;
	committed: number | null;
	scored: number;
	missed: number;
	saved: number | null;
}
