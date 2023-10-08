"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import useDebounce from "@/hooks/useDebounce"
import Input from "./Input"
import qs from "query-string"

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const deboundedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = { title: deboundedValue }
        const url = qs.stringifyUrl({url: "/search", query})
        router.push(url)
    }, [deboundedValue, router])

  return (
    <Input placeholder="What are we listening to?" value={value} onChange={(e) => setValue(e.target.value)}/>
  )
}

export default SearchInput
