import { apiClient } from "../../../shared/api/apiClient";
import type { Country } from "../types/country.types";

export const getAllCountries = async (): Promise<Country[]> => {
	const response = await apiClient.get<Country[]>("/countries");

	return response.data;
};
