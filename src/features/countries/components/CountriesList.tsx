import { Link } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import { useState, useMemo } from "react";

export const CountriesList = () => {
	const { data, isLoading, isError, error } = useCountries();
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCountries = useMemo(() => {
		if (!data) return [];
		return data.filter((country) =>
			country.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [data, searchTerm]);

	const groupedCountries = useMemo(() => {
		const groups: Record<string, typeof filteredCountries> = {};
		filteredCountries.forEach((country) => {
			const firstLetter = country.name[0].toUpperCase();
			if (!groups[firstLetter]) {
				groups[firstLetter] = [];
			}
			groups[firstLetter].push(country);
		});
		return groups;
	}, [filteredCountries]);

	const sortedLetters = Object.keys(groupedCountries).sort();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading countries...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="card bg-red-50 border-red-200">
				<p className="text-red-600">Error: {error.message}</p>
			</div>
		);
	}

	return (
		<div>
			<div className="card mb-8">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<svg
							className="h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						type="text"
						placeholder="Search countries..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
					/>
					{searchTerm && (
						<button
							onClick={() => setSearchTerm("")}
							className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					)}
				</div>
				<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
					<p className="text-sm text-gray-600 font-medium">
						{filteredCountries.length}{" "}
						{filteredCountries.length === 1
							? "country"
							: "countries"}{" "}
						available
					</p>
					{sortedLetters.length > 0 && !searchTerm && (
						<div className="flex flex-wrap gap-1">
							{sortedLetters.map((letter) => (
								<a
									key={letter}
									href={`#section-${letter}`}
									className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-gray-600 hover:text-white hover:bg-primary-600 rounded transition-colors"
								>
									{letter}
								</a>
							))}
						</div>
					)}
				</div>
			</div>

			{filteredCountries.length === 0 ? (
				<div className="card text-center py-12">
					<svg
						className="mx-auto h-12 w-12 text-gray-400 mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-gray-800 text-lg font-semibold mb-2">
						No countries found
					</p>
					<p className="text-gray-600 text-sm mb-4">
						No countries match "{searchTerm}"
					</p>
					<button
						onClick={() => setSearchTerm("")}
						className="text-primary-600 hover:text-primary-700 font-semibold"
					>
						Clear search
					</button>
				</div>
			) : searchTerm ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filteredCountries.map((country) => (
						<Link
							key={country.code}
							to={`/leagues/${country.code}`}
							className="card hover:shadow-xl transition-all duration-200 hover:scale-105 group"
						>
							<div className="flex items-center gap-4">
								<img
									src={country.flag}
									alt={country.name}
									className="w-16 h-16 object-cover rounded-lg shadow-md"
								/>
								<div className="flex-1 min-w-0">
									<h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
										{country.name}
									</h3>
									<p className="text-sm text-gray-500 uppercase tracking-wide">
										{country.code}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className="space-y-8">
					{sortedLetters.map((letter) => (
						<div
							key={letter}
							id={`section-${letter}`}
							className="scroll-mt-6"
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
									<span className="text-2xl font-bold text-white">
										{letter}
									</span>
								</div>
								<h2 className="text-2xl font-display font-bold text-gray-900">
									{letter}
								</h2>
								<div className="flex-1 h-px bg-gray-200"></div>
								<span className="text-sm text-gray-500 font-medium">
									{groupedCountries[letter].length}
								</span>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{groupedCountries[letter].map((country) => (
									<Link
										key={country.code}
										to={`/leagues/${country.code}`}
										className="card hover:shadow-xl transition-all duration-200 hover:scale-105 group"
									>
										<div className="flex items-center gap-4">
											<img
												src={country.flag}
												alt={country.name}
												className="w-16 h-16 object-cover rounded-lg shadow-md"
											/>
											<div className="flex-1 min-w-0">
												<h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
													{country.name}
												</h3>
												<p className="text-sm text-gray-500 uppercase tracking-wide">
													{country.code}
												</p>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
