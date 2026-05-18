import { useQuery } from "@tanstack/react-query";
import { getFixturesByLeagueIdAndSeasonYear } from "../services/fixturesService";

export const useSeasonFixtures = (leagueId: number, seasonYear: number) => {
	return useQuery({
		queryKey: ["seasonFixtures", leagueId, seasonYear],
		queryFn: () => getFixturesByLeagueIdAndSeasonYear(leagueId, seasonYear),
	});
};
