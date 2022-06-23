import { useEffect, useRef } from 'react'

export const useAutoResizeTextArea = (value: string | undefined) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    element.style.height = 'auto'
    element.style.height = `calc(${element.scrollHeight}px)`
  }, [value])

  return ref
}
