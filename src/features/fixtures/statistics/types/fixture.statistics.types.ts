export interface FixtureStatisticsResponse {
	response: TeamStatistics[];
}

export interface TeamStatistics {
	team: Team;
	statistics: StatisticItem[];
}

export interface Team {
	id: number;
	name: string;
	logo: string;
}

export interface StatisticItem {
	type: StatisticType;
	value: string | number | null;
}

export type StatisticType =
	| "Shots on Goal"
	| "Shots off Goal"
	| "Total Shots"
	| "Blocked Shots"
	| "Shots insidebox"
	| "Shots outsidebox"
	| "Fouls"
	| "Corner Kicks"
	| "Offsides"
	| "Ball Possession"
	| "Yellow Cards"
	| "Red Cards"
	| "Goalkeeper Saves"
	| "Total passes"
	| "Passes accurate"
	| "Passes %"
	| "expected_goals"
	| "goals_prevented";
