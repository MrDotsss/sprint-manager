import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timer to update the state after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timer if the value changes before the delay ends
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Restart if value or delay changes

  return debouncedValue
}
