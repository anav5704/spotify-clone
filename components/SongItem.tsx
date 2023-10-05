"use client"

import { Song } from "@/types"
import useLoadImage from "@/hooks/useLoadImage"
import Image from "next/image"
import PlayButton from "./PlayButton"

interface SongItemProps {
    song: Song, 
    onClick: (id: string) => void
}

const SongItem = ({ song, onClick }: SongItemProps) => {
    const imagePath = useLoadImage(song)

  return (
    <div onClick={() => onClick(song.id)} className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
        <div className="relative aspect-square h-full w-full rounded-md overflow-hidden">
            <Image src={imagePath || ""} alt={`image cover for song titled ${song.title}`} fill className="object-cover" />
        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">{song.title}</p>
            <p className="text-neutral-400 text-sm truncate w-full">By {song.author}</p>
        </div>
        <div className="absolute bottom-24 right-5">
            <PlayButton />
        </div>
    </div>
  )
}

export default SongItem
