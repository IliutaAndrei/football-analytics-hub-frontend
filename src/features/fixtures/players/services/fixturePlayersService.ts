import { apiClient } from "../../../../shared/api/apiClient";
import type { FixturePlayersResponse } from "../types/fixtures.players.types";

export const getFixturePlayers = async (
	fixtureId: number,
): Promise<FixturePlayersResponse> => {
	const response = await apiClient.get<FixturePlayersResponse>(
		`fixtures/${fixtureId}/players`,
	);

	return response.data;
};
