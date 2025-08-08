import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";

const LibraryPage = () => {
	const { albums, fetchAlbums, isLoading } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6 pb-8'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Your Library</h1>
					
					<div className='space-y-4'>
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className='flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors group cursor-pointer'
								>
									<img
										src={album.imageUrl}
										alt='Playlist img'
										className='size-16 sm:size-20 rounded-md flex-shrink-0 object-cover'
									/>

									<div className='flex-1 min-w-0'>
										<p className='font-medium truncate text-lg'>{album.title}</p>
										<p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};

export default LibraryPage; 