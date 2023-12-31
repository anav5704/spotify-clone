"use client"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import useAuthModal from "@/hooks/useAuthModal"
import useUploadModal from "@/hooks/useUploadModal"
import MediaItem from "./MediaItem"
import useOnPlay from "@/hooks/useOnPlay"

interface LibraryProps {
    songs: Song[]
}

const Library = ({ songs }: LibraryProps    ) => {
    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const { user } = useUser()
    const onPlay = useOnPlay(songs)

    const handleClick = () => {
        if(!user){
            return authModal.onOpen()
        }

        // check for subscription
        
        return uploadModal.onOpen()
    }

  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist size={26} className="text-neutral-400"/>
                <p className="text-neutral-400 font-medium text-md">Your Library</p>
            </div>
            <AiOutlinePlus onClick={handleClick} size={20} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
        </div>
        <div className="flex flex-col gap-y-2 my-4 px-3 ">
            {songs.map((song) => (
               <MediaItem onClick={(id: string) => onPlay(id)} song={song} key={song.id}/>
            ))}
        </div>
    </div>
  )
}

export default Library
