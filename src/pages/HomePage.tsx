import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="min-h-[calc(100vh-4rem)]">
			<div className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 rounded-3xl mb-8">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
					<div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
				</div>

				<div className="relative px-8 md:px-16 py-16 md:py-24">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
							<span className="text-2xl">⚽</span>
							<span className="text-white/90 font-semibold">
								Live Football Data
							</span>
						</div>

						<h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
							Your Ultimate
							<br />
							Football Stats Platform
						</h1>

						<p className="text-xl md:text-2xl text-green-100 mb-10 max-w-2xl mx-auto">
							Track teams, analyze players, explore matches. All
							the football data you need in one place.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/countries"
								className="inline-flex items-center justify-center gap-2 bg-white text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:scale-105"
							>
								<span>Explore Now</span>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-6 mb-8">
				<div className="card hover:shadow-lg transition-shadow">
					<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
						<span className="text-2xl">🏆</span>
					</div>
					<h3 className="text-xl font-display font-bold text-gray-900 mb-3">
						League Standings
					</h3>
					<p className="text-gray-600 leading-relaxed">
						Live tables, rankings, and performance metrics across
						top leagues worldwide.
					</p>
				</div>

				<div className="card hover:shadow-lg transition-shadow">
					<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
						<span className="text-2xl">👥</span>
					</div>
					<h3 className="text-xl font-display font-bold text-gray-900 mb-3">
						Team & Player Stats
					</h3>
					<p className="text-gray-600 leading-relaxed">
						Deep dive into squad profiles, player performance data,
						and detailed season statistics.
					</p>
				</div>

				<div className="card hover:shadow-lg transition-shadow">
					<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
						<span className="text-2xl">📊</span>
					</div>
					<h3 className="text-xl font-display font-bold text-gray-900 mb-3">
						Match Analytics
					</h3>
					<p className="text-gray-600 leading-relaxed">
						Complete match breakdowns with possession stats, shots,
						passes, and player analysis.
					</p>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				<div className="card hover:shadow-lg transition-shadow">
					<div className="text-center">
						<div className="text-5xl font-black text-green-600 mb-2">
							1000+
						</div>
						<p className="text-gray-600 font-medium">
							Teams Tracked
						</p>
					</div>
				</div>
				<div className="card hover:shadow-lg transition-shadow">
					<div className="text-center">
						<div className="text-5xl font-black text-blue-600 mb-2">
							50+
						</div>
						<p className="text-gray-600 font-medium">
							Leagues Covered
						</p>
					</div>
				</div>
				<div className="card hover:shadow-lg transition-shadow">
					<div className="text-center">
						<div className="text-5xl font-black text-purple-600 mb-2">
							Live
						</div>
						<p className="text-gray-600 font-medium">
							Real-time Updates
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
