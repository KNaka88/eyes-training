import React, { createContext, useContext, useState } from 'react'

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

interface SettingsContextValue {
  settings: Settings
  update: (patch: Partial<Settings>) => void
}

export const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULTS,
  update: () => {},
})

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS)

  function update(patch: Partial<Settings>) {
    setSettings(prev => ({ ...prev, ...patch }))
  }

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
