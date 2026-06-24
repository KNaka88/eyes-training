import { useEffect, useRef, useState } from 'react'

export interface Offsets {
  left: number
  right: number
}

type PaceMode = 'both' | 'leftOnly' | 'rightOnly'

export function useAnimation(speed: number, maxDistance: number, pace: boolean) {
  const [offsets, setOffsets] = useState<Offsets>({ left: 0, right: 0 })
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)
  const paceModeRef = useRef<PaceMode>('both')
  const nextPaceChangeRef = useRef<number>(0)
  const currentLeftRef = useRef<number>(0)
  const currentRightRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = null
    nextPaceChangeRef.current = 0
    paceModeRef.current = 'both'

    function tick(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }
      const elapsed = (timestamp - startTimeRef.current) / 1000
      const t = elapsed * speed * Math.PI * 2
      const baseOffset = maxDistance * (Math.sin(t) * 0.5 + 0.5)

      if (pace && elapsed > nextPaceChangeRef.current) {
        const options: PaceMode[] = ['both', 'both', 'leftOnly', 'rightOnly']
        paceModeRef.current = options[Math.floor(pseudoRandom(elapsed) * options.length)]
        nextPaceChangeRef.current = elapsed + 2 + pseudoRandom(elapsed + 1) * 3
      }

      const mode = pace ? paceModeRef.current : 'both'
      const targetLeft = mode === 'rightOnly' ? 0 : baseOffset
      const targetRight = mode === 'leftOnly' ? 0 : baseOffset

      const lerpFactor = 0.1
      currentLeftRef.current += (targetLeft - currentLeftRef.current) * lerpFactor
      currentRightRef.current += (targetRight - currentRightRef.current) * lerpFactor

      setOffsets({
        left: currentLeftRef.current,
        right: currentRightRef.current,
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed, maxDistance, pace])

  return offsets
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
