import { View, Text, Switch, ScrollView, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSettings } from '../src/context/SettingsContext'
import { SimpleSlider } from '../src/components/SimpleSlider'

export default function SettingsScreen() {
  const { settings, update } = useSettings()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(12, 9, 6, 0.97)' }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(245, 237, 224, 0.08)',
      }}>
        <Text style={{ fontSize: 13, color: '#c8b89a', letterSpacing: 1.2, textTransform: 'uppercase' }}>
          Settings
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 15, color: '#c8a870' }}>Done</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 24, paddingBottom: Math.max(32, insets.bottom) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, color: '#5a4a38', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Motion
          </Text>
          <ToggleRow
            label="Move"
            description="Pair floats to random positions"
            value={settings.move}
            onChange={v => update({ move: v })}
          />
          <ToggleRow
            label="Pace"
            description="One circle freezes randomly"
            value={settings.pace}
            onChange={v => update({ pace: v })}
          />
        </View>

        <View style={{ height: 1, backgroundColor: 'rgba(245, 237, 224, 0.06)' }} />

        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 11, color: '#5a4a38', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Tuning
          </Text>
          <SliderRow
            label="Speed"
            value={settings.speed}
            min={0.05}
            max={0.25}
            step={0.01}
            displayValue={`${(settings.speed / 0.15).toFixed(1)}×`}
            onChange={v => update({ speed: v })}
          />
          <SliderRow
            label="Max Distance"
            value={settings.maxDistance}
            min={40}
            max={200}
            step={10}
            displayValue={`${settings.maxDistance}px`}
            onChange={v => update({ maxDistance: v })}
          />
          <SliderRow
            label="Circle Size"
            value={settings.circleSize}
            min={20}
            max={52}
            step={4}
            displayValue={`${settings.circleSize}px`}
            onChange={v => update({ circleSize: v })}
          />
          <SliderRow
            label="Training Duration"
            value={settings.trainingDuration}
            min={30}
            max={300}
            step={30}
            displayValue={formatDuration(settings.trainingDuration)}
            onChange={v => update({ trainingDuration: v })}
          />
        </View>
      </ScrollView>
    </View>
  )
}

interface ToggleRowProps {
  label: string
  description: string
  value: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 52 }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ fontSize: 15, color: '#e8dcc8' }}>{label}</Text>
        <Text style={{ fontSize: 12, color: '#6a5a48' }}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: 'rgba(245, 237, 224, 0.12)', true: '#c8a870' }}
        thumbColor="#f5ede0"
      />
    </Pressable>
  )
}

interface SliderRowProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  displayValue: string
  onChange: (v: number) => void
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s === 0 ? `${m}:00` : `${m}:${String(s).padStart(2, '0')}`
}

function SliderRow({ label, value, min, max, step, displayValue, onChange }: SliderRowProps) {
  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={{ fontSize: 15, color: '#e8dcc8' }}>{label}</Text>
        <Text style={{ fontSize: 13, color: '#a89070', fontVariant: ['tabular-nums'] }}>{displayValue}</Text>
      </View>
      <SimpleSlider value={value} min={min} max={max} step={step} onChange={onChange} />
    </View>
  )
}
