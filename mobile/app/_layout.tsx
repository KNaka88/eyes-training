import { Stack } from 'expo-router/stack'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SettingsProvider } from '../src/context/SettingsContext'

// Known RN 0.81 / Expo SDK 54 bug: Event phase constants (NONE etc.) are
// defined without configurable:true, so event-target-shim (used by fetch)
// throws on startup. Non-fatal; tracked at github.com/facebook/react-native/issues/54732
LogBox.ignoreLogs(["Cannot assign to read-only property 'None'", "Cannot assign to read-only property 'NONE'"])

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="settings"
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: [0.65, 1.0],
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="tutorial"
            options={{ presentation: 'modal' }}
          />
        </Stack>
      </SettingsProvider>
    </SafeAreaProvider>
  )
}
