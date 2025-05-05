// import React, { use } from 'react'
import { useChatStore } from "@/stores/useChatStore";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
// import { UserResource } from '@clerk/types';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);

const FriendsActivity = () => {
  const { users, fetchUsers } = useChatStore();
  const isPlaying = true;

  const { user } = useUser();
  // console.log( user );

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, users]);

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0"></Users>
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      {!users && <LoginPrompt />}
      {/* <div>{ console.log({ users }) }</div> */}
      {/* <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="size-10 border-zinc-800">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback> {user.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={
                      "absolute bottom-0 right-0 rounded-full w-3 h-3 border-zinc-900 border-2 bg-zinc-500"
                    }
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug">
                    {user.fullName} 
                  </p>
                  
                  {isPlaying && (
                    <Music className="size-5 text-zinc-500 group-hover:text-zinc-300"></Music>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div> */}
      {/* </ScrollArea> */}
    </div>
  );
};

export default FriendsActivity;
