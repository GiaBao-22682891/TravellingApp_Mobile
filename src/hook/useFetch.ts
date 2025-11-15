import { useEffect, useState } from "react"

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export const useFetch = <T,>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const fullUrl = url.startsWith("http") ? url : `http://localhost:3000${url}`
        // const fullUrl = url.startsWith("http") ? url : `http://192.168.1.7:3000${url}`
        const response = await fetch(fullUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}
