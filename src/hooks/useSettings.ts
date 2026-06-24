import { useState } from 'react'

export interface Settings {
  speed: number
  maxDistance: number
  circleSize: number
  move: boolean
  pace: boolean
}

const DEFAULTS: Settings = {
  speed: 0.15,
  maxDistance: 120,
  circleSize: 36,
  move: false,
  pace: false,
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS)

  function update(patch: Partial<Settings>) {
    setSettings(prev => ({ ...prev, ...patch }))
  }

  return { settings, update }
}
