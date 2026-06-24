import { useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from 'react-native'

export interface Position {
  x: number
  y: number
}

export function useFloatingPosition(enabled: boolean) {
  const { width, height } = useWindowDimensions()
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const currentPos = useRef<Position>({ x: 0, y: 0 })
  const targetPos = useRef<Position>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const nextChangeAt = useRef<number>(0)

  useEffect(() => {
    if (!enabled) {
      currentPos.current = { x: 0, y: 0 }
      targetPos.current = { x: 0, y: 0 }
      setPosition({ x: 0, y: 0 })
      return
    }

    function pickTarget(timestamp: number) {
      const maxX = width * 0.22
      const maxY = height * 0.18
      const seed = timestamp * 0.001
      targetPos.current = {
        x: (pseudoRandom(seed) * 2 - 1) * maxX,
        y: (pseudoRandom(seed + 5) * 2 - 1) * maxY,
      }
      nextChangeAt.current = timestamp + 3000 + pseudoRandom(seed + 10) * 5000
    }

    function tick(timestamp: number) {
      if (nextChangeAt.current === 0) {
        pickTarget(timestamp)
      }
      if (timestamp >= nextChangeAt.current) {
        pickTarget(timestamp)
      }

      const lerp = 0.018
      currentPos.current = {
        x: currentPos.current.x + (targetPos.current.x - currentPos.current.x) * lerp,
        y: currentPos.current.y + (targetPos.current.y - currentPos.current.y) * lerp,
      }

      setPosition({ x: currentPos.current.x, y: currentPos.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      nextChangeAt.current = 0
    }
  }, [enabled, width, height])

  return position
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
