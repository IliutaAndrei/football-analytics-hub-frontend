import { CountriesList } from "../features/countries/components/CountriesList";

const CountriesPage = () => {
	return (
		<div>
			<div className="card bg-gradient-to-br from-primary-50 via-white to-primary-50 mb-8">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
						<span className="text-4xl">🌍</span>
					</div>
					<div>
						<h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
							Explore Football Worldwide
						</h1>
						<p className="text-gray-600">
							Select a country to discover leagues, teams, and
							players
						</p>
					</div>
				</div>
			</div>
			<CountriesList />
		</div>
	);
};

export default CountriesPage;
