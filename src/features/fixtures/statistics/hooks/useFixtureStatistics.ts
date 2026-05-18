import { useQuery } from "@tanstack/react-query";
import { getFixtureStatisticsByFixtureId } from "../services/fixtureStatisticsService";

export const useFixtureStatistics = (fixtureId: number) => {
	return useQuery({
		queryKey: ["fixtureStatistics", fixtureId],
		queryFn: () => getFixtureStatisticsByFixtureId(fixtureId),
	});
};
