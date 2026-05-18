import { apiClient } from "../../../shared/api/apiClient";
import type { FixturesResponse } from "../types/fixtures.types";

export const getFixturesByLeagueIdAndSeasonYear = async (
	leagueId: number,
	seasonYear: number,
): Promise<FixturesResponse> => {
	const response = await apiClient.get<FixturesResponse>(
		`/leagues/${leagueId}/seasons/${seasonYear}/fixtures`,
	);

	return response.data;
};

export const getFixturesByLeagueIdSeasonYearAndTeamId = async (
	leagueId: number,
	seasonYear: number,
	teamId: number,
): Promise<FixturesResponse> => {
	const response = await apiClient.get<FixturesResponse>(
		`/leagues/${leagueId}/seasons/${seasonYear}/teams/${teamId}/fixtures`,
	);

	return response.data;
};
