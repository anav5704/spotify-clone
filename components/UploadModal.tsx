"use client"

import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"
import uniqid from "uniqid"
import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"

const UploadModal = () => {
    const router = useRouter()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const uploadModal = useUploadModal()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    })

    const handleUpload: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user) {
                toast.error("Missing Fields")
                return
            }

            const UID = uniqid()

            const { data: songData, error: songError } = await supabaseClient.storage.from("songs").upload(`song-${values.title}-${UID}`, songFile, { cacheControl: "3600", upsert: false })
            if(songError){
                setIsLoading(false)
                return  toast.error("Song upload failed")
            }

            const { data: imageData, error: imageError } = await supabaseClient.storage.from("images").upload(`image-${values.title}-${UID}`, imageFile, { cacheControl: "3600", upsert: false })
            if(imageError){
                setIsLoading(false)
                return  toast.error("Image upload failed")
            }

            const { error: supabaseError } = await supabaseClient.from("songs").insert({
                user_id: user.id, 
                title: values.title, 
                author: values.author, 
                image_path: imageData.path, 
                song_path: songData.path
            })
            
            if(supabaseError){
                setIsLoading(false)
                return  toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success("Song successfully added")
            uploadModal.onClose()
            reset()

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (open: boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose()
        }
    }

    return (
        <Modal title="Upload A Song" isOpen={uploadModal.isOpen} onChange={handleChange}>
            <form onSubmit={handleSubmit(handleUpload)} className="flex flex-col gap-y-4">
                <Input id="title" disabled={isLoading} {...register("title", { required: true })} placeholder="Song title" />
                <Input id="author" disabled={isLoading} {...register("author", { required: true })} placeholder="Song author" />
                <div>
                    <div className="pb-1">Select a song</div>
                    <Input id="song" type="file" disabled={isLoading} accept=".mp3" {...register("song", { required: true })} />
                </div>
                <div>
                    <div className="pb-1">Select a cover</div>
                    <Input id="image" type="file" disabled={isLoading} accept="image/*" {...register("image", { required: true })} />
                </div>
                <Button className="mb-5" disabled={isLoading} type="submit">Create</Button>
            </form>
        </Modal>
    )
}

export default UploadModal
