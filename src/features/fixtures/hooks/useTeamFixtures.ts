import { useQuery } from "@tanstack/react-query";
import { getFixturesByLeagueIdSeasonYearAndTeamId } from "../services/fixturesService";

export const useTeamFixtures = (
	leagueId: number,
	seasonYear: number,
	teamId: number,
) => {
	return useQuery({
		queryKey: ["teamFixtures", leagueId, seasonYear, teamId],
		queryFn: () =>
			getFixturesByLeagueIdSeasonYearAndTeamId(
				leagueId,
				seasonYear,
				teamId,
			),
	});
};
