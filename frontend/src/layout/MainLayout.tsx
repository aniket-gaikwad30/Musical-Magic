import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import MobileBottomNav from "./components/MobileBottomNav";
import { useEffect, useState } from "react";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			setIsMobile(width < 640);
			setIsTablet(width >= 640 && width < 1024);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	return (
		<div className='h-screen bg-black text-white flex flex-col'>
			{/* Mobile layout - full screen content with bottom navigation */}
			{isMobile ? (
				<>
					<AudioPlayer />
					{/* Main content takes full screen on mobile */}
					<div className='flex-1 overflow-hidden pb-40'>
						<Outlet />
					</div>
					<MobileBottomNav />
					<PlaybackControls />
				</>
			) : (
				/* Desktop layout - resizable panels */
				<>
					<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-1 sm:p-2'>
						<AudioPlayer />
						{/* left sidebar */}
						<ResizablePanel 
							defaultSize={isTablet ? 20 : 20} 
							minSize={10} 
							maxSize={30}
						>
							<LeftSidebar />
						</ResizablePanel>

						<ResizableHandle className='w-1 sm:w-2 bg-black rounded-lg transition-colors' />

						{/* Main content */}
						<ResizablePanel defaultSize={isTablet ? 80 : 60}>
							<Outlet />
						</ResizablePanel>

						<ResizableHandle className='w-1 sm:w-2 bg-black rounded-lg transition-colors' />

						{/* right sidebar */}
						<ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
							<FriendsActivity />
						</ResizablePanel>
					</ResizablePanelGroup>

					<PlaybackControls />
				</>
			)}
		</div>
	);
};
export default MainLayout;
