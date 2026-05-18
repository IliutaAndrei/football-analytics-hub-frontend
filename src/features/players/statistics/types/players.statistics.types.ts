export interface PlayerStatistics {
	team: PlayerTeam;
	league: PlayerLeague;
	games: PlayerGames;
	substitutes: PlayerSubstitutes;
	shots: PlayerShots;
	goals: PlayerGoals;
	passes: PlayerPasses;
	tackles: PlayerTackles;
	duels: PlayerDuels;
	dribbles: PlayerDribbles;
	fouls: PlayerFouls;
	cards: PlayerCards;
	penalty: PlayerPenalty;
}

export interface PlayerTeam {
	id: number;
	name: string;
	logo: string;
}

export interface PlayerLeague {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
}

export interface PlayerGames {
	appearences: number;
	minutes: number;
	position: string;
}

export interface PlayerSubstitutes {
	in: number;
	out: number;
	bench: number;
}

export interface PlayerShots {
	total: number;
	on: number;
}

export interface PlayerGoals {
	total: number;
	conceded: number;
	assists: number;
	saved: number;
}

export interface PlayerPasses {
	total: number;
	key: number;
	accuracy: number;
}

export interface PlayerTackles {
	total: number;
	blocks: number;
	interceptions: number;
}

export interface PlayerDuels {
	total: number;
	won: number;
}

export interface PlayerDribbles {
	attempts: number;
	success: number;
}

export interface PlayerFouls {
	drawn: number;
	committed: number;
}

export interface PlayerCards {
	yellow: number;
	red: number;
}

export interface PlayerPenalty {
	win: number;
	committed: number;
	scored: number;
	missed: number;
	saved: number;
}
