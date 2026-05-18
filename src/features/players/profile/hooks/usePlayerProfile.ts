import { useQuery } from "@tanstack/react-query";
import { getPlayerProfileByPlayerId } from "../services/playeProfileService";

export const usePlayerProfile = (playerId: number) => {
	return useQuery({
		queryKey: ["playerProfile", playerId],
		queryFn: () => getPlayerProfileByPlayerId(playerId),
	});
};
