import { apiClient } from "../../../shared/api/apiClient";
import type { Season } from "../types/season.types";

export const getSeasonsByLeagueId = async (
	leagueId: number,
): Promise<Season[]> => {
	const response = await apiClient.get<Season[]>(
		`/leagues/${leagueId}/seasons`,
	);

	return response.data;
};
