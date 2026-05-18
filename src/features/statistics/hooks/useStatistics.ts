import { useQuery } from "@tanstack/react-query";
import { getStatisticsByLeagueIdSeasonYearAndTeamId } from "../services/statisticsService";

export const useStatistics = (
	leagueId: number,
	seasonYear: number,
	teamId: number,
) => {
	return useQuery({
		queryKey: ["statistics", leagueId, seasonYear, teamId],
		queryFn: () =>
			getStatisticsByLeagueIdSeasonYearAndTeamId(
				leagueId,
				seasonYear,
				teamId,
			),
	});
};
