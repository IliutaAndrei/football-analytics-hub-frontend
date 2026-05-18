export interface StatisticsResponse {
	league: StatsLeague;
	team: StatsTeam;
	form: string;
	fixture: StatsFixture;
	goal: StatsGoal;
	biggest: StatsBiggest;
	cleanSheet: StatsCleanSheet;
	failedToScore: StatsFailedToScore;
	penalty: StatsPenalty;
	lineUps: StatsLineUp[];
}

export interface StatsLeague {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
}

export interface StatsTeam {
	id: number;
	name: string;
	logo: string;
}

export interface StatsFixture {
	played: StatsFixtureStatus;
	wins: StatsFixtureStatus;
	draws: StatsFixtureStatus;
	loses: StatsFixtureStatus;
}

export interface StatsFixtureStatus {
	home: number;
	away: number;
	total: number;
}

export interface StatsGoal {
	forGoals: StatsGoalValue;
	againstGoals: StatsGoalValue;
}

export interface StatsGoalValue {
	total: StatsTotalGoals;
	average: StatsAverageGoals;
}

export interface StatsTotalGoals {
	home: number;
	away: number;
	total: number;
}

export interface StatsAverageGoals {
	home: string;
	away: string;
	total: string;
}

export interface StatsBiggest {
	wins: StatsBiggestMatchResult;
	loses: StatsBiggestMatchResult;
	goals: StatsBiggestGoal;
}

export interface StatsBiggestMatchResult {
	home: string;
	away: string;
}

export interface StatsBiggestGoal {
	forGoals: StatsBiggestGoalCount;
	againstGoals: StatsBiggestGoalCount;
}

export interface StatsBiggestGoalCount {
	home: number;
	away: number;
}

export interface StatsCleanSheet {
	home: number;
	away: number;
	total: number;
}

export interface StatsFailedToScore {
	home: number;
	away: number;
	total: number;
}

export interface StatsPenalty {
	scored: StatsPenaltyStatus;
	missed: StatsPenaltyStatus;
	total: number;
}

export interface StatsPenaltyStatus {
	total: number;
	percentage: string;
}

export interface StatsLineUp {
	formation: string;
	played: number;
}
