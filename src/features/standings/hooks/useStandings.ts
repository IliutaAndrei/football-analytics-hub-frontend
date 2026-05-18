import { useQuery } from "@tanstack/react-query";
import { getStandingsByLeagueIdAndSeasonYear } from "../services/standingsService";

export const useStandings = (leagueId: number, seasonYear: number) => {
	return useQuery({
		queryKey: ["standings", leagueId, seasonYear],
		queryFn: () =>
			getStandingsByLeagueIdAndSeasonYear(leagueId, seasonYear),
	});
};
