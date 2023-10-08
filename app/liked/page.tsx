import LikedContent from "./cpmponents/LikedContent"
import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/Header"
import Image from "next/image"

export const revalidate = 0

const Liked = async () => {
    const songs = await getLikedSongs()

  return (
    <div className="bg-neutral-900 md:rounded-lg h-full w-ful overflow-hidden overflow-y-auto">
        <Header>
            <div className="mt-10">
                <div className="flex flex-col md:flex-row gap-x-5 items-center">
                    <div className="relative h-32 w-32 lg:h-44 lg:w-44 rounded-lg overflow-hidden">
                        <Image fill src={"/images/liked.png"} alt="heart image" className="object-cover"/>
                    </div>
                    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                        <p className="hidden md:block font-semibold text-sm">Playlist</p>
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">Liked Songs</h1>
                    </div>
                </div>
            </div>
        </Header>
        <LikedContent songs={songs}/>
    </div>
  )
}

export default Liked
