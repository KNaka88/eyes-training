import React, { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

export interface Settings {
  speed: number
  maxDistance: number
  circleSize: number
  move: boolean
  pace: boolean
  trainingDuration: number
}

const DEFAULTS: Settings = {
  speed: 0.15,
  maxDistance: 120,
  circleSize: 36,
  move: false,
  pace: false,
  trainingDuration: 60,
}

const STORAGE_KEY = 'eyes_training_settings'

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

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY).then(raw => {
      if (!raw) { return }
      try {
        const stored = JSON.parse(raw) as Partial<Settings>
        setSettings(prev => ({ ...prev, ...stored }))
      } catch {
        // ignore corrupt data
      }
    })
  }, [])

  function update(patch: Partial<Settings>) {
    setSettings(prev => {
      const next = { ...prev, ...patch }
      SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(next))
      return next
    })
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
