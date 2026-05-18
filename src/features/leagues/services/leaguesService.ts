import { apiClient } from "../../../shared/api/apiClient";
import type { League } from "../types/league.types";

export const getLeaguesByCountryCode = async (
	countryCode: string,
): Promise<League[]> => {
	const response = await apiClient.get<League[]>(
		`/leagues/country/${countryCode}`,
	);

	return response.data;
};
