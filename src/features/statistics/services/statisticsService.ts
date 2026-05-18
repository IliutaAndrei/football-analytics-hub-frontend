import { apiClient } from "../../../shared/api/apiClient";
import type { StatisticsResponse } from "../types/statistics.types";

export const getStatisticsByLeagueIdSeasonYearAndTeamId = async (
	leagueId: number,
	seasonYear: number,
	teamId: number,
): Promise<StatisticsResponse> => {
	const response = await apiClient.get<StatisticsResponse>(
		`/leagues/${leagueId}/seasons/${seasonYear}/teams/${teamId}/statistics`,
	);

	return response.data;
};
