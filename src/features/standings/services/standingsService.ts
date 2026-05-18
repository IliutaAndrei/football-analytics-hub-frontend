import { apiClient } from "../../../shared/api/apiClient";
import type { StandingsResponse } from "../types/standing.types";

export const getStandingsByLeagueIdAndSeasonYear = async (
	leagueId: number,
	seasonYear: number,
): Promise<StandingsResponse> => {
	const response = await apiClient.get<StandingsResponse>(
		`/leagues/${leagueId}/seasons/${seasonYear}/standings`,
	);

	return response.data;
};
