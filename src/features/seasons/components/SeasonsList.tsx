import { Link } from "react-router-dom";
import { useSeasons } from "../hooks/useSeasons";

interface SeasonsListProps {
	leagueId: number;
}

export const SeasonsList = ({ leagueId }: SeasonsListProps) => {
	const { data, isLoading, isError, error } = useSeasons(leagueId);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading seasons...</p>
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
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<p className="text-gray-600 text-lg">
					No seasons available for this league
				</p>
			</div>
		);
	}

	const sortedSeasons = [...data].sort((a, b) => b.year - a.year);
	const currentYear = new Date().getFullYear();
	const isCurrentSeason = (seasonYear: number) => {
		const seasonWithCurrentFlag = data.find((s) => s.current === true);
		if (seasonWithCurrentFlag) {
			return seasonWithCurrentFlag.year === seasonYear;
		}
		return seasonYear === currentYear || seasonYear === currentYear - 1;
	};

	return (
		<div className="space-y-5">
			{sortedSeasons.map((season) => (
				<div
					key={season.year}
					className="card hover:shadow-lg transition-shadow duration-200"
				>
					<div className="flex flex-col sm:flex-row sm:items-center gap-6">
						<div className="flex items-center gap-4 flex-1">
							<div className="relative flex-shrink-0">
								<div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
									<span className="text-white font-display font-bold text-xl">
										{season.year.toString().slice(-2)}
									</span>
								</div>
								{isCurrentSeason(season.year) && (
									<div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
										<svg
											className="w-3 h-3 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								)}
							</div>
							<div className="flex-1">
								<div className="flex items-baseline gap-2 mb-1">
									<h3 className="text-2xl font-display font-bold text-gray-900">
										{season.year}/
										{(season.year + 1).toString().slice(-2)}
									</h3>
									{isCurrentSeason(season.year) && (
										<span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
											Current
										</span>
									)}
								</div>
								<p className="text-sm text-gray-500 font-medium">
									{season.startDate} — {season.endDate}
								</p>
							</div>
						</div>
						<div className="flex flex-wrap gap-2 sm:flex-nowrap">
							<Link
								to={`/leagues/${leagueId}/seasons/${season.year}/standings`}
								className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
							>
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
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
								<span>Standings</span>
							</Link>
							<Link
								to={`/leagues/${leagueId}/seasons/${season.year}/teams`}
								className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
							>
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
								<span>Teams</span>
							</Link>
							<Link
								to={`/leagues/${leagueId}/seasons/${season.year}/fixtures`}
								className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
							>
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
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
								<span>Fixtures</span>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
