import { apiClient } from "../../../../shared/api/apiClient";
import type { SquadResponse } from "../types/squad.types";

export const getSquadPlayersByTeamId = async (
	teamId: number,
): Promise<SquadResponse> => {
	const response = await apiClient.get<SquadResponse>(
		`/teams/${teamId}/squad`,
	);

	return response.data;
};
