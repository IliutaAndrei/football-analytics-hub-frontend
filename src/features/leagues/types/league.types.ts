import type { Country } from "../../countries/types/country.types";

export interface League {
	id: number;
	externalId: number;
	name: string;
	type: string;
	logo: string;
	country: Country;
}
