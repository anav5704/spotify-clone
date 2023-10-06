"use client"

import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useState, useEffect } from "react"
import { Song } from "@/types"
import MediaItem from "./MediaItem"
import LikeButton from "./LikeButton"
import Slider from "./Slider"
import usePlayer from "@/hooks/usePlayer"
import useSound from "use-sound"

interface PlayerContentProps {
    song: Song, 
    songUrl: string, 
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
    const player = usePlayer()
    const [Volume, setVolume] = useState(1)
    const [playing, setPlaying] = useState(false)

    const Icon = playing ? BsPauseFill : BsPlayFill
    const VolumeIcon = Volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if(player.ids.length === 0) return

        const currentIndex  = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if(!nextSong) return player.setId(player.ids[0])
        player.setId(nextSong)
    }

    const onPlayPrev = () => {
        if(player.ids.length === 0) return

        const currentIndex  = player.ids.findIndex((id) => id === player.activeId)
        const prevSong = player.ids[currentIndex - 1]

        if(!prevSong) return player.setId(player.ids[player.ids.length - 1])
        player.setId(prevSong)
    }

    const [ play, { pause, sound }] = useSound(
        songUrl, 
        { 
            volume: Volume, 
            onplay: () => setPlaying(true), 
            onend: () => {
                setPlaying(false)   
                onPlayNext() 
            },  
            onpause: () => setPlaying(false), 
            format: ["mp3"]
        }
    )

    useEffect(() => {
        sound?.play()
        return () => {
            sound?.unload()
        }
    }, [sound])

    const handlePlay = () => {
        playing ? pause() : play()
    }

    const toggleMute = () => {
        Volume === 0 ? setVolume(1) : setVolume(0)
    }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="flex w-full justify-start">
            <div className="flex items-center gap-x-4">
                <MediaItem song={song} dontHover/>
                <LikeButton songId={song.id}/>
            </div>
        </div>

        <div className="flex md:hidden col-auto w-full justify-end items-center">
            <div onClick={handlePlay} className="rounded-full first-letter:h-10 w-10 flex items-center justify-center bg-white p-1 cursor-pointer">
                <Icon size={30} className="text-black"/>
            </div>
        </div>

        <div className="hidden h-full md:flex justify-center items-center w-full ma-w-[720px] gap-x-6">
            <AiFillStepBackward onClick={onPlayPrev} size={30} className="text-neutral-400 hover:text-white transition cursor-pointer"/>
            <div  onClick={handlePlay} className="rounded-full first-letter:flex items-center justify-center h-10 w-10 bg-white p-1 cursor-pointer">
                <Icon size={30} className="text-black"/>
            </div>
            <AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400 hover:text-white transition cursor-pointer"/>
        </div>

        <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center gap-x-2 w-[120px]">
                <VolumeIcon onClick={toggleMute} size={27} className="cursor-pointer"/>
                <Slider value={Volume} onChange={(value) => setVolume(value)}/>
            </div>
        </div>
    </div>
  )
}

export default PlayerContent
