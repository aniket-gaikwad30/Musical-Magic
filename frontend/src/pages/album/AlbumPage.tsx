import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const spotifyGradients = [
  "from-[#1DB954]/80 via-[#191414]/80 to-[#121212]",
  "from-[#ff5f6d]/80 via-[#ffc371]/80 to-[#191414]",
  "from-[#ee9ca7]/80 via-[#ffdde1]/80 to-[#191414]",
  "from-[#00c6ff]/80 via-[#0072ff]/80 to-[#191414]",
  "from-[#f953c6]/80 via-[#b91d73]/80 to-[#191414]",
  "from-[#fc466b]/80 via-[#3f5efb]/80 to-[#191414]",
  "from-[#11998e]/80 via-[#38ef7d]/80 to-[#191414]",
];

const AlbumPage = () => {
  const location = useLocation();
  const [gradient, setGradient] = useState(spotifyGradients[0]);

  useEffect(() => {
    const random =
      spotifyGradients[Math.floor(Math.random() * spotifyGradients.length)];
    setGradient(random);
  }, [location]);

  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* main content */}
        <div className="relative min-h-full">
          {/* background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none transition-all duration-1000`}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            {/* header */}
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>

            {/* song table */}
            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* songs list */}
            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum?.songs.map((song, index) => (
                  <div
                    key={song._id}
                    className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5"
                  >
                    <div>{index + 1}</div>
                    <div>{song.title}</div>
                    <div>{currentAlbum?.releaseYear}</div>
                    <div>{formatDuration(song.duration)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
