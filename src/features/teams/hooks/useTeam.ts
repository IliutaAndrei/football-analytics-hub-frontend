import { useQuery } from "@tanstack/react-query";
import { getTeamByIdInContext } from "../services/teamService";

export const useTeam = (
	leagueId: number,
	seasonYear: number,
	teamId: number,
) => {
	return useQuery({
		queryKey: ["team", leagueId, seasonYear, teamId],
		queryFn: () => getTeamByIdInContext(leagueId, seasonYear, teamId),
	});
};
