import { useQuery } from "@tanstack/react-query";
import { getTeamsByLeagueIdAndSeasonYear } from "../services/teamService";

export const useTeams = (leagueId: number, seasonYear: number) => {
	return useQuery({
		queryKey: ["teams", leagueId, seasonYear],
		queryFn: () => getTeamsByLeagueIdAndSeasonYear(leagueId, seasonYear),
	});
};
