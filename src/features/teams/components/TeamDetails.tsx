import { Link } from "react-router-dom";
import { useTeam } from "../hooks/useTeam";

interface TeamDetailsProps {
	leagueId: number;
	seasonYear: number;
	teamId: number;
}

export const TeamDetails = ({
	leagueId,
	seasonYear,
	teamId,
}: TeamDetailsProps) => {
	const {
		data: team,
		isLoading,
		isError,
		error,
	} = useTeam(leagueId, seasonYear, teamId);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading team details...</p>
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

	if (!team) {
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
				<p className="text-gray-600 text-lg">Team not found</p>
			</div>
		);
	}

	return (
		<div>
			<div className="card mb-8">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="flex justify-center md:justify-start">
						<img
							src={team.logo}
							alt={team.name}
							className="w-48 h-48 object-contain"
						/>
					</div>
					<div className="flex-1">
						<h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
							{team.name}
						</h1>
						<div className="space-y-4">
							{team.country && (
								<div className="flex items-center gap-3">
									<img
										src={`https://flagcdn.com/w40/${team.country.toLowerCase()}.png`}
										alt={team.country}
										className="w-10 h-7 object-cover rounded shadow-sm"
										onError={(e) => {
											e.currentTarget.style.display =
												"none";
										}}
									/>
									<div>
										<p className="text-sm text-gray-500">
											Country
										</p>
										<p className="text-lg font-semibold text-gray-900">
											{team.country}
										</p>
									</div>
								</div>
							)}
							{team.founded && (
								<div>
									<p className="text-sm text-gray-500">
										Founded
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{team.founded}
									</p>
								</div>
							)}
							{team.venue && (
								<div>
									<p className="text-sm text-gray-500 mb-2">
										Home Stadium
									</p>
									<p className="text-xl font-bold text-gray-900 mb-2">
										{team.venue.name}
									</p>
									<div className="flex flex-wrap gap-4 text-gray-600">
										<div className="flex items-center gap-2">
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											<span className="font-medium">
												{team.venue.city}
											</span>
										</div>
										{team.venue.capacity && (
											<div className="flex items-center gap-2">
												<svg
													className="w-4 h-4"
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
												<span className="font-medium">
													{team.venue.capacity.toLocaleString()}{" "}
													seats
												</span>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Link
					to={`/leagues/${leagueId}/seasons/${seasonYear}/teams/${teamId}/statistics`}
					className="card hover:shadow-xl transition-all duration-200 group"
				>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
								Statistics
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Performance metrics and analytics
							</p>
						</div>
					</div>
				</Link>

				<Link
					to={`/leagues/${leagueId}/seasons/${seasonYear}/teams/${teamId}/squad`}
					className="card hover:shadow-xl transition-all duration-200 group"
				>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
							<svg
								className="w-6 h-6 text-white"
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
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
								Squad
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Player roster and profiles
							</p>
						</div>
					</div>
				</Link>

				<Link
					to={`/leagues/${leagueId}/seasons/${seasonYear}/teams/${teamId}/fixtures`}
					className="card hover:shadow-xl transition-all duration-200 group"
				>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
								Fixtures
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Match schedule and results
							</p>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};
