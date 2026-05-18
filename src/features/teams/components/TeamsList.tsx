import { Link } from "react-router-dom";
import { useTeams } from "../hooks/useTeams";
import { useState } from "react";

interface TeamsListProps {
	leagueId: number;
	seasonYear: number;
}

export const TeamsList = ({ leagueId, seasonYear }: TeamsListProps) => {
	const { data, isLoading, isError, error } = useTeams(leagueId, seasonYear);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredTeams = data?.filter((team) =>
		team.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading teams...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="card bg-red-50 border-red-200">
				<p className="text-red-600">Error: {error?.message}</p>
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
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				<p className="text-gray-700 text-lg font-semibold mb-2">
					No teams available
				</p>
				<p className="text-gray-600 text-sm">
					No teams found for this season
				</p>
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
						placeholder="Search teams..."
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
						{filteredTeams?.length || 0}{" "}
						{filteredTeams?.length === 1 ? "team" : "teams"}{" "}
						available
					</p>
				</div>
			</div>

			{filteredTeams && filteredTeams.length === 0 ? (
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
						No teams found
					</p>
					<p className="text-gray-600 text-sm mb-4">
						No teams match "{searchTerm}"
					</p>
					<button
						onClick={() => setSearchTerm("")}
						className="text-primary-600 hover:text-primary-700 font-semibold"
					>
						Clear search
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filteredTeams?.map((team) => (
						<Link
							key={team.id}
							to={`/leagues/${leagueId}/seasons/${seasonYear}/teams/${team.id}`}
							className="card hover:shadow-xl transition-all duration-200 hover:scale-105 group"
						>
							<div className="flex items-center gap-4">
								<img
									src={team.logo}
									alt={team.name}
									className="w-16 h-16 object-contain flex-shrink-0"
								/>
								<div className="flex-1 min-w-0">
									<h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 truncate">
										{team.name}
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
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};
