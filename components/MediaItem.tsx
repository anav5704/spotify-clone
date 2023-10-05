"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"

interface MediaItemProps {
    song: Song, 
    onClick?: (id: string) => void
}

const MediaItem = ({ song, onClick }: MediaItemProps) => {
    const imagePath = useLoadImage(song)

    const handleClick = () => {
        if(onClick){
            return onClick(song.id)
        }

        // turn on player
    }

  return (
    <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-500/50 w-full p-2 rounded-md"> 
      <div className="relative overflow-hidden rounded-md min-w-[48px] min-h-[48px]">
            <Image src={imagePath || ""} alt={`image cover for song titled ${song.title}`} fill className="object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
            <p className="truncate text-white">{song.title}</p>
            <p className="text-neutral-400 text-sm truncate">{song.author}</p>
        </div>
    </div>
  )
}

export default MediaItem
