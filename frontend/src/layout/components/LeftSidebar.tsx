import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
	const { albums, fetchAlbums, isLoading } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	console.log({ albums });

	return (
		<div className='h-full flex flex-col gap-1 sm:gap-2'>
			{/* Navigation menu */}
			<div className='rounded-lg bg-zinc-900 p-2 sm:p-4'>
				<div className='space-y-1 sm:space-y-2'>
					<Link
						to={"/"}
						className={cn(
							buttonVariants({
								variant: "ghost",
								className: "w-full justify-center sm:justify-start text-white hover:bg-zinc-800 h-10 sm:h-auto",
							})
						)}
					>
						<HomeIcon className='size-5 sm:size-4 sm:mr-2' />
						<span className='hidden sm:inline'>Home</span>
					</Link>

					<SignedIn>
						<Link
							to={"/chat"}
							className={cn(
								buttonVariants({
									variant: "ghost",
									className: "w-full justify-center sm:justify-start text-white hover:bg-zinc-800 h-10 sm:h-auto",
								})
							)}
						>
							<MessageCircle className='size-5 sm:size-4 sm:mr-2' />
							<span className='hidden sm:inline'>Messages</span>
						</Link>
					</SignedIn>
				</div>
			</div>

			{/* Library section */}
			<div className='flex-1 rounded-lg bg-zinc-900 p-2 sm:p-4'>
				<div className='flex items-center justify-between mb-3 sm:mb-4'>
					<div className='flex items-center text-white px-1 sm:px-2'>
						<Library className='size-5 sm:size-4 sm:mr-2' />
						<span className='hidden sm:inline'>Playlists</span>
					</div>
				</div>

				<ScrollArea className='h-[calc(100vh-280px)] sm:h-[calc(100vh-300px)]'>
					<div className='space-y-1 sm:space-y-2'>
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className='p-1 sm:p-2 hover:bg-zinc-800 rounded-md flex items-center justify-center sm:justify-start gap-1 sm:gap-2 lg:gap-3 group cursor-pointer'
								>
									<img
										src={album.imageUrl}
										alt='Playlist img'
										className='size-10 sm:size-8 lg:size-12 rounded-md flex-shrink-0 object-cover'
									/>

									<div className='flex-1 min-w-0 hidden sm:block'>
										<p className='font-medium truncate text-sm sm:text-base'>{album.title}</p>
										<p className='text-xs sm:text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
									</div>
								</Link>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
export default LeftSidebar;
