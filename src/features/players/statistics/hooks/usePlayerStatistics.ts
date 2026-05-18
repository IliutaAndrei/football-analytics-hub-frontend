import { useQuery } from "@tanstack/react-query";
import { getPlayerStatisticsByPlayerId } from "../services/playerStatisticsService";

export const usePlayerStatistics = (playerId: number) => {
	return useQuery({
		queryKey: ["playerStatistics", playerId],
		queryFn: () => getPlayerStatisticsByPlayerId(playerId),
	});
};
