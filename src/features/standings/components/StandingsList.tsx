import { useStandings } from "../hooks/useStandings";
import type { Standing } from "../types/standing.types";

interface StandingsListProps {
	leagueId: number;
	seasonYear: number;
}

export const StandingsList = ({ leagueId, seasonYear }: StandingsListProps) => {
	const { data, isLoading, isError, error } = useStandings(
		leagueId,
		seasonYear,
	);

	const getRankColorClass = (rank: number, totalTeams: number) => {
		if (rank === 1) return "bg-yellow-400 text-yellow-900";
		if (rank <= 4) return "bg-green-500 text-white";
		if (rank <= 6) return "bg-blue-500 text-white";
		if (rank >= totalTeams - 2) return "bg-red-500 text-white";
		return "bg-gray-100 text-gray-700";
	};

	const getRowColorClass = (rank: number, totalTeams: number) => {
		if (rank === 1) return "bg-yellow-50";
		if (rank <= 4) return "bg-green-50";
		if (rank <= 6) return "bg-blue-50";
		if (rank >= totalTeams - 2) return "bg-red-50";
		return "";
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading standings...</p>
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

	if (!data || !data.standings || data.standings.length === 0) {
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
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				<p className="text-gray-600 text-lg">
					No standings available for this season
				</p>
			</div>
		);
	}
	const getRelevantStandings = () => {
		if (!data?.standings) return [];

		const uniqueTeamIds = new Set(data.standings.map((s) => s.team.id));
		const hasDuplicates = uniqueTeamIds.size !== data.standings.length;

		if (hasDuplicates) {
			return data.standings.slice(0, 6);
		}

		return data.standings;
	};

	const relevantStandings = getRelevantStandings();

	return (
		<div className="card overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
							>
								Pos
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
							>
								Team
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								Played
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								Won
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								Draw
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								Lost
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								GF
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								GA
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								GD
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
							>
								Points
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{relevantStandings.map((standing: Standing) => (
							<tr
								key={standing.team.id}
								className={`hover:bg-gray-100 transition-colors duration-150 ${getRowColorClass(standing.rank, relevantStandings.length)}`}
							>
								<td className="px-4 py-3 whitespace-nowrap">
									<div
										className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankColorClass(standing.rank, relevantStandings.length)}`}
									>
										{standing.rank}
									</div>
								</td>
								<td className="px-4 py-3 whitespace-nowrap">
									<div className="flex items-center gap-3">
										<img
											src={standing.team.logo}
											alt={standing.team.name}
											className="w-8 h-8 object-contain flex-shrink-0"
										/>
										<span className="font-medium text-gray-900 text-sm">
											{standing.team.name}
										</span>
									</div>
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm text-gray-700 font-medium">
									{standing.summary.played}
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm text-gray-700">
									{standing.summary.win}
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm text-gray-700">
									{standing.summary.draw}
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm text-gray-700">
									{standing.summary.lose}
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm text-gray-700">
									{standing.summary.goals.forGoals}
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm text-gray-700">
									{standing.summary.goals.againstGoals}
								</td>
								<td className="px-3 py-3 whitespace-nowrap text-center text-sm font-semibold">
									<span
										className={
											standing.goalsDiff >= 0
												? "text-green-600"
												: "text-red-600"
										}
									>
										{standing.goalsDiff > 0 ? "+" : ""}
										{standing.goalsDiff}
									</span>
								</td>
								<td className="px-4 py-3 whitespace-nowrap">
									<div className="flex justify-center">
										<div className="relative">
											<div className="w-14 h-9 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-md">
												<span className="text-white text-base font-bold">
													{standing.points}
												</span>
											</div>
											{standing.rank === 1 && (
												<div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
													<svg
														className="w-2.5 h-2.5 text-yellow-900"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
													</svg>
												</div>
											)}
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
				<div className="flex flex-wrap gap-x-6 gap-y-2">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-full bg-yellow-400"></div>
						<span className="text-xs text-gray-600 font-medium">
							Champions
						</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-full bg-green-500"></div>
						<span className="text-xs text-gray-600 font-medium">
							Champions League
						</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-full bg-blue-500"></div>
						<span className="text-xs text-gray-600 font-medium">
							Europa League
						</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-full bg-red-500"></div>
						<span className="text-xs text-gray-600 font-medium">
							Relegation Zone
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
