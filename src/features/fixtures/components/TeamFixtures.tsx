import { Link } from "react-router-dom";
import { useTeamFixtures } from "../hooks/useTeamFixtures";
import type { FixtureItem } from "../types/fixtures.types";
import { useState, useMemo } from "react";

interface TeamFixturesProps {
	leagueId: number;
	seasonYear: number;
	teamId: number;
}

export const TeamFixtures = ({
	leagueId,
	seasonYear,
	teamId,
}: TeamFixturesProps) => {
	const { data, isLoading, isError, error } = useTeamFixtures(
		leagueId,
		seasonYear,
		teamId,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [statusFilter, setStatusFilter] = useState<
		"all" | "finished" | "live" | "scheduled"
	>("all");

	const filteredAndSortedFixtures = useMemo(() => {
		if (!data?.response) return [];

		const filtered = data.response.filter((fixtureItem: FixtureItem) => {
			const searchLower = searchTerm.toLowerCase();
			const matchesSearch =
				fixtureItem.teams.home.name
					.toLowerCase()
					.includes(searchLower) ||
				fixtureItem.teams.away.name.toLowerCase().includes(searchLower);

			if (!matchesSearch) return false;

			if (statusFilter === "all") return true;

			const status = fixtureItem.fixture.status.statusLong.toUpperCase();
			if (statusFilter === "finished") {
				return (
					status.includes("FINISHED") ||
					status.includes("MATCH FINISHED")
				);
			}
			if (statusFilter === "live") {
				return (
					status.includes("LIVE") ||
					status.includes("IN PLAY") ||
					status.includes("HALF")
				);
			}
			if (statusFilter === "scheduled") {
				return (
					status.includes("NOT STARTED") ||
					status.includes("SCHEDULED")
				);
			}

			return true;
		});

		filtered.sort((a, b) => {
			const dateA = new Date(a.fixture.date).getTime();
			const dateB = new Date(b.fixture.date).getTime();
			return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
		});

		return filtered;
	}, [data, searchTerm, sortOrder, statusFilter]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading fixtures...</p>
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

	if (!data || !data.response || data.response.length === 0) {
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
					No fixtures available for this team
				</p>
			</div>
		);
	}

	const getStatusBadge = (statusLong: string) => {
		const status = statusLong.toUpperCase();
		if (status.includes("FINISHED") || status.includes("MATCH FINISHED")) {
			return (
				<span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
					Finished
				</span>
			);
		}
		if (
			status.includes("LIVE") ||
			status.includes("IN PLAY") ||
			status.includes("HALF")
		) {
			return (
				<span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded animate-pulse">
					Live
				</span>
			);
		}
		if (status.includes("NOT STARTED") || status.includes("SCHEDULED")) {
			return (
				<span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
					Scheduled
				</span>
			);
		}
		return (
			<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
				{statusLong}
			</span>
		);
	};

	const formatDateTime = (dateString: string) => {
		const date = new Date(dateString);
		const dateFormatted = date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
		const timeFormatted = date.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
		});
		return { date: dateFormatted, time: timeFormatted };
	};

	const isFinished = (statusLong: string) => {
		const status = statusLong.toUpperCase();
		return status.includes("FINISHED") || status.includes("MATCH FINISHED");
	};

	return (
		<div>
			<div className="card mb-6">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
								placeholder="Search by opponent..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
					</div>
					<div className="flex gap-2">
						<select
							value={sortOrder}
							onChange={(e) =>
								setSortOrder(e.target.value as "asc" | "desc")
							}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none bg-white text-gray-700 font-medium"
						>
							<option value="desc">Newest First</option>
							<option value="asc">Oldest First</option>
						</select>
						<select
							value={statusFilter}
							onChange={(e) =>
								setStatusFilter(
									e.target.value as
										| "all"
										| "finished"
										| "live"
										| "scheduled",
								)
							}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none bg-white text-gray-700 font-medium"
						>
							<option value="all">All Matches</option>
							<option value="finished">Finished</option>
							<option value="live">Live</option>
							<option value="scheduled">Scheduled</option>
						</select>
					</div>
				</div>
				{(searchTerm || statusFilter !== "all") && (
					<div className="mt-4 pt-4 border-t border-gray-200">
						<p className="text-sm text-gray-700 font-medium">
							Showing {filteredAndSortedFixtures.length} of{" "}
							{data.response.length} matches
						</p>
					</div>
				)}
			</div>

			{filteredAndSortedFixtures.length === 0 ? (
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
						No matches found
					</p>
					<p className="text-gray-600 text-sm">
						Try adjusting your search or filter criteria
					</p>
					<button
						onClick={() => {
							setSearchTerm("");
							setStatusFilter("all");
						}}
						className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm"
					>
						Clear all filters
					</button>
				</div>
			) : (
				<div className="space-y-4">
					{filteredAndSortedFixtures.map(
						(fixtureItem: FixtureItem) => {
							const { date, time } = formatDateTime(
								fixtureItem.fixture.date,
							);
							const isScheduled =
								fixtureItem.fixture.status.statusLong.includes(
									"Not Started",
								) ||
								fixtureItem.fixture.status.statusLong.includes(
									"Scheduled",
								);
							const matchFinished = isFinished(
								fixtureItem.fixture.status.statusLong,
							);
							const homeWinner =
								matchFinished &&
								fixtureItem.teams.home.winner === true;
							const awayWinner =
								matchFinished &&
								fixtureItem.teams.away.winner === true;

							return (
								<div
									key={fixtureItem.fixture.id}
									className="card hover:shadow-lg transition-shadow duration-200"
								>
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
										<div className="flex items-center gap-4 flex-1">
											<div className="text-center min-w-[80px]">
												<div className="text-sm text-gray-700 font-medium mb-1">
													{date}
												</div>
												<div className="text-xs text-gray-600">
													{time}
												</div>
												<div className="mt-2">
													{getStatusBadge(
														fixtureItem.fixture
															.status.statusLong,
													)}
												</div>
											</div>
											<div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
												<div className="flex items-center justify-end gap-3">
													<span
														className={`text-right ${homeWinner ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}
													>
														{
															fixtureItem.teams
																.home.name
														}
													</span>
													<div className="relative">
														<img
															src={
																fixtureItem
																	.teams.home
																	.logo
															}
															alt={
																fixtureItem
																	.teams.home
																	.name
															}
															className="w-8 h-8 object-contain"
														/>
														{homeWinner && (
															<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
																<svg
																	className="w-2.5 h-2.5 text-white"
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
												</div>
												<div className="flex items-center justify-center min-w-[60px]">
													{isScheduled ? (
														<span className="text-gray-400 text-sm font-medium">
															vs
														</span>
													) : (
														<div className="text-center">
															<div className="text-2xl font-bold text-gray-900">
																{fixtureItem
																	.goals
																	.home ??
																	0}{" "}
																-{" "}
																{fixtureItem
																	.goals
																	.away ?? 0}
															</div>
														</div>
													)}
												</div>
												<div className="flex items-center gap-3">
													<div className="relative">
														<img
															src={
																fixtureItem
																	.teams.away
																	.logo
															}
															alt={
																fixtureItem
																	.teams.away
																	.name
															}
															className="w-8 h-8 object-contain"
														/>
														{awayWinner && (
															<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
																<svg
																	className="w-2.5 h-2.5 text-white"
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
													<span
														className={`${awayWinner ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}
													>
														{
															fixtureItem.teams
																.away.name
														}
													</span>
												</div>
											</div>
										</div>
										<div className="flex gap-2">
											<Link
												to={`/fixtures/${fixtureItem.fixture.id}/statistics`}
												state={{
													homeGoals:
														fixtureItem.goals
															.home ?? 0,
													awayGoals:
														fixtureItem.goals
															.away ?? 0,
												}}
												className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
											>
												Statistics
											</Link>
											<Link
												to={`/fixtures/${fixtureItem.fixture.id}/players`}
												className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
											>
												Players
											</Link>
										</div>
									</div>
								</div>
							);
						},
					)}
				</div>
			)}
		</div>
	);
};
