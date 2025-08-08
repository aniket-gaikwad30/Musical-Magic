import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

const SearchPage = () => {
	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6 pb-8'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Search</h1>
					
					<div className='flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg'>
						<Search className='size-6 text-zinc-400' />
						<input
							type='text'
							placeholder='What do you want to listen to?'
							className='flex-1 bg-transparent text-white placeholder-zinc-400 outline-none'
						/>
					</div>
					
					<div className='mt-8'>
						<h2 className='text-lg font-semibold mb-4'>Browse Categories</h2>
						<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
							{['Podcasts', 'Made For You', 'Charts', 'New Releases', 'Discover', 'Concerts', 'Hip-Hop', 'Pop', 'Rock', 'Jazz', 'Classical', 'Electronic'].map((category) => (
								<div
									key={category}
									className='aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-end p-4 cursor-pointer hover:scale-105 transition-transform'
								>
									<span className='font-bold text-white'>{category}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};

export default SearchPage; 