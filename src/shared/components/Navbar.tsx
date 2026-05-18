import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
			<div className="container-app">
				<div className="flex items-center justify-between h-16">
					<Link
						to="/"
						className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
					>
						<div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-md">
							<span className="text-white font-bold text-xl">
								⚽
							</span>
						</div>
						<div className="hidden sm:block">
							<h1 className="text-xl font-display font-bold text-gray-900">
								Football Analytics
							</h1>
							<p className="text-xs text-gray-500">
								Statistics & Data Hub
							</p>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};
