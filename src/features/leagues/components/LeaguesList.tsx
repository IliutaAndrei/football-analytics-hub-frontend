import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useLeagues } from "../hooks/useLeagues";

interface LeaguesListProps {
	countryCode: string;
}

export const LeaguesList = ({ countryCode }: LeaguesListProps) => {
	const { data, isLoading, isError, error } = useLeagues(countryCode);
	const [searchTerm, setSearchTerm] = useState("");

	const groupedLeagues = useMemo(() => {
		if (!data) return { League: [], Cup: [], Other: [] };

		const filtered = data.filter((league) =>
			league.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		type GroupedLeagues = {
			League: typeof filtered;
			Cup: typeof filtered;
			Other: typeof filtered;
		};

		return filtered.reduce<GroupedLeagues>(
			(acc, league) => {
				const type =
					league.type === "League"
						? "League"
						: league.type === "Cup"
							? "Cup"
							: "Other";
				acc[type].push(league);
				return acc;
			},
			{ League: [], Cup: [], Other: [] },
		);
	}, [data, searchTerm]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading leagues...</p>
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

	if (!data || data.length === 0) {
		return (
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
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					/>
				</svg>
				<p className="text-gray-600 text-lg">
					No leagues available for this country
				</p>
			</div>
		);
	}

	const totalFiltered =
		groupedLeagues.League.length +
		groupedLeagues.Cup.length +
		groupedLeagues.Other.length;

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
						placeholder="Search leagues..."
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
				<div className="mt-4 pt-4 border-t border-gray-200">
					<p className="text-sm text-gray-600 font-medium">
						{totalFiltered}{" "}
						{totalFiltered === 1 ? "competition" : "competitions"}{" "}
						available
					</p>
				</div>
			</div>

			{totalFiltered === 0 ? (
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
						No leagues found
					</p>
					<p className="text-gray-600 text-sm mb-4">
						No leagues match "{searchTerm}"
					</p>
					<button
						onClick={() => setSearchTerm("")}
						className="text-primary-600 hover:text-primary-700 font-semibold"
					>
						Clear search
					</button>
				</div>
			) : (
				<div className="space-y-8">
					{groupedLeagues.League.length > 0 && (
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
									<span className="text-2xl">🏆</span>
								</div>
								<h2 className="text-2xl font-display font-bold text-gray-900">
									Leagues
								</h2>
								<div className="flex-1 h-px bg-gray-200"></div>
								<span className="text-sm text-gray-500 font-medium">
									{groupedLeagues.League.length}
								</span>
							</div>
							<div className="grid gap-3">
								{groupedLeagues.League.map((league) => (
									<Link
										key={league.id}
										to={`/leagues/${league.id}/seasons`}
										className="card hover:shadow-lg transition-all duration-200 group flex items-center gap-4 p-4"
									>
										<img
											src={league.logo}
											alt={league.name}
											className="w-14 h-14 object-contain flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
												{league.name}
											</h3>
										</div>
										<svg
											className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								))}
							</div>
						</div>
					)}

					{groupedLeagues.Cup.length > 0 && (
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
									<span className="text-2xl">🏅</span>
								</div>
								<h2 className="text-2xl font-display font-bold text-gray-900">
									Cups
								</h2>
								<div className="flex-1 h-px bg-gray-200"></div>
								<span className="text-sm text-gray-500 font-medium">
									{groupedLeagues.Cup.length}
								</span>
							</div>
							<div className="grid gap-3">
								{groupedLeagues.Cup.map((league) => (
									<Link
										key={league.id}
										to={`/leagues/${league.id}/seasons`}
										className="card hover:shadow-lg transition-all duration-200 group flex items-center gap-4 p-4"
									>
										<img
											src={league.logo}
											alt={league.name}
											className="w-14 h-14 object-contain flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
												{league.name}
											</h3>
										</div>
										<svg
											className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								))}
							</div>
						</div>
					)}

					{groupedLeagues.Other.length > 0 && (
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
									<span className="text-2xl">⚽</span>
								</div>
								<h2 className="text-2xl font-display font-bold text-gray-900">
									Other Competitions
								</h2>
								<div className="flex-1 h-px bg-gray-200"></div>
								<span className="text-sm text-gray-500 font-medium">
									{groupedLeagues.Other.length}
								</span>
							</div>
							<div className="grid gap-3">
								{groupedLeagues.Other.map((league) => (
									<Link
										key={league.id}
										to={`/leagues/${league.id}/seasons`}
										className="card hover:shadow-lg transition-all duration-200 group flex items-center gap-4 p-4"
									>
										<img
											src={league.logo}
											alt={league.name}
											className="w-14 h-14 object-contain flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
												{league.name}
											</h3>
										</div>
										<svg
											className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
