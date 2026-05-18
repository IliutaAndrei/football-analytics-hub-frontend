import { apiClient } from "../../../../shared/api/apiClient";
import type { FixtureStatisticsResponse } from "../types/fixture.statistics.types";

export const getFixtureStatisticsByFixtureId = async (
	fixtureId: number,
): Promise<FixtureStatisticsResponse> => {
	const response = await apiClient.get<FixtureStatisticsResponse>(
		`fixtures/${fixtureId}/statistics`,
	);

	return response.data;
};
