import { apiClient } from "../../../../shared/api/apiClient";
import type { PlayerStatistics } from "../types/players.statistics.types";

export const getPlayerStatisticsByPlayerId = async (
	playerId: number,
): Promise<PlayerStatistics> => {
	const response = await apiClient.get<PlayerStatistics>(
		`/players/${playerId}/statistics`,
	);

	return response.data;
};
