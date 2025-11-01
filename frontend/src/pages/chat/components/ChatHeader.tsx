

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
	const { selectedUser, onlineUsers, userActivities } = useChatStore();

	if (!selectedUser) return null;

	const activity = userActivities.get(selectedUser.clerkId);
	const isPlaying = activity && activity !== "Idle";

	const song = isPlaying ? activity.replace("Playing ", "").split(" by ")[0] : null;
	const artist = isPlaying ? activity.split(" by ")[1] : null;

	return (
		<div className='p-4 border-b border-zinc-800'>
			<div className='flex items-center gap-3'>
				<Avatar>
					<AvatarImage src={selectedUser.imageUrl} />
					<AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className='font-medium'>{selectedUser.fullName}</h2>

					{/* ---- STATUS + ACTIVITY ---- */}
					<p className='text-sm text-zinc-400'>
						{onlineUsers.has(selectedUser.clerkId)
							? isPlaying
								? `Listening to ${song} by ${artist}`
								: "Online"
							: "Offline"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;



// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useChatStore } from "@/stores/useChatStore";

// const ChatHeader = () => {
// 	const { selectedUser, onlineUsers } = useChatStore();

// 	if (!selectedUser) return null;

// 	return (
// 		<div className='p-4 border-b border-zinc-800'>
// 			<div className='flex items-center gap-3'>
// 				<Avatar>
// 					<AvatarImage src={selectedUser.imageUrl} />
// 					<AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
// 				</Avatar>
// 				<div>
// 					<h2 className='font-medium'>{selectedUser.fullName}</h2>
// 					<p className='text-sm text-zinc-400'>
// 						{onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default ChatHeader;
