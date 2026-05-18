import { apiClient } from "../../../../shared/api/apiClient";
import type { PlayerProfile } from "../types/playerProfile.types";

export const getPlayerProfileByPlayerId = async (
	playerID: number,
): Promise<PlayerProfile> => {
	const response = await apiClient.get<PlayerProfile>(
		`/players/${playerID}/profile`,
	);

	return response.data;
};
