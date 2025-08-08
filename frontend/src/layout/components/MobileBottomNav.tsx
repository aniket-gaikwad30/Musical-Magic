import { Link, useLocation } from "react-router-dom";
import { HomeIcon, Search, Library, MessageCircle } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
	const location = useLocation();

	const navItems = [
		{
			path: "/",
			icon: HomeIcon,
			label: "Home",
		},
		{
			path: "/search",
			icon: Search,
			label: "Search",
		},
		{
			path: "/library",
			icon: Library,
			label: "Your Library",
		},
		{
			path: "/chat",
			icon: MessageCircle,
			label: "Messages",
			requiresAuth: true,
		},
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 z-50">
			<div className="flex items-center justify-around px-2 py-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = location.pathname === item.path;
					
					// Skip auth-required items if not signed in
					if (item.requiresAuth) {
						return (
							<SignedIn key={item.path}>
								<Link
									to={item.path}
									className={cn(
										"flex flex-col items-center justify-center py-2 px-3 transition-colors",
										isActive
											? "text-white"
											: "text-zinc-400 hover:text-white"
									)}
								>
									<Icon className="size-6 mb-1" />
									<span className="text-xs font-medium">{item.label}</span>
								</Link>
							</SignedIn>
						);
					}

					return (
						<Link
							key={item.path}
							to={item.path}
							className={cn(
								"flex flex-col items-center justify-center py-2 px-3 transition-colors",
								isActive
									? "text-white"
									: "text-zinc-400 hover:text-white"
							)}
						>
							<Icon className="size-6 mb-1" />
							<span className="text-xs font-medium">{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default MobileBottomNav; 