import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../services/countriesService";

export const useCountries = () => {
	return useQuery({
		queryKey: ["countries"],
		queryFn: getAllCountries,
	});
};
