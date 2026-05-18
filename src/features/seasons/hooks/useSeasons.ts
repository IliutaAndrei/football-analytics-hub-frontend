import { useQuery } from "@tanstack/react-query";
import { getSeasonsByLeagueId } from "../services/seasonsService";

export const useSeasons = (leagueId: number) => {
	return useQuery({
		queryKey: ["seasons", leagueId],
		queryFn: () => getSeasonsByLeagueId(leagueId),
	});
};
