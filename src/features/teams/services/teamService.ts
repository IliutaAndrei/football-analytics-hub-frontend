import { apiClient } from "../../../shared/api/apiClient";
import type { Team } from "../types/team.types";

export const getTeamByIdInContext = async (
	leagueId: number,
	seasonYear: number,
	teamId: number,
): Promise<Team> => {
	const response = await apiClient.get<Team>(
		`/leagues/${leagueId}/seasons/${seasonYear}/teams/${teamId}`,
	);

	return response.data;
};

export const getTeamsByLeagueIdAndSeasonYear = async (
	leagueId: number,
	seasonYear: number,
): Promise<Team[]> => {
	const response = await apiClient.get<Team[]>(
		`/leagues/${leagueId}/seasons/${seasonYear}/teams`,
	);

	return response.data;
};
