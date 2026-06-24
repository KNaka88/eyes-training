import { View, Text, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAnimation } from '../src/hooks/useAnimation'
import { useFloatingPosition } from '../src/hooks/useFloatingPosition'
import { useSettings } from '../src/context/SettingsContext'
import { CirclePair } from '../src/components/CirclePair'
import { useState, useEffect, useRef } from 'react'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function TrainingScreen() {
  const { settings } = useSettings()
  const offsets = useAnimation(settings.speed, settings.maxDistance, settings.pace)
  const floatPos = useFloatingPosition(settings.move)
  const insets = useSafeAreaInsets()

  const [timeLeft, setTimeLeft] = useState(settings.trainingDuration)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setTimeLeft(settings.trainingDuration)
    setIsRunning(false)
  }, [settings.trainingDuration])

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (!isRunning) {
      return
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
    }
  }, [timeLeft, isRunning])

  const done = timeLeft === 0

  function handleTimerButton() {
    if (isRunning) {
      setIsRunning(false)
    } else {
      if (done) {
        setTimeLeft(settings.trainingDuration)
      }
      setIsRunning(true)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#080808' }}>
      <StatusBar style="light" />

      <View style={{
        paddingTop: Math.max(24, insets.top),
        paddingHorizontal: 24,
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: '300',
          color: '#c8b89a',
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          marginBottom: 6,
        }}>
          Eyes Training
        </Text>
        <Text style={{ fontSize: 13, color: '#6a5a48', letterSpacing: 0.5 }}>
          Relax your gaze — let the circles merge into one
        </Text>
        <Text style={{
          fontSize: 28,
          fontWeight: '200',
          color: done ? '#c8a870' : '#c8b89a',
          letterSpacing: 2,
          marginTop: 12,
          fontVariant: ['tabular-nums'],
        }}>
          {done ? 'Done' : formatTime(timeLeft)}
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
        <View style={{
          transform: [{ translateX: floatPos.x }, { translateY: floatPos.y }],
          width: '100%',
        }}>
          <CirclePair offsets={offsets} size={settings.circleSize} />
        </View>
      </View>

      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        paddingBottom: Math.max(12, insets.bottom),
        paddingHorizontal: 20,
      }}>
        <Link href="/tutorial" asChild>
          <Pressable style={fabStyle}>
            <Text style={fabTextStyle}>? Tutorial</Text>
          </Pressable>
        </Link>
        <Pressable style={fabStyle} onPress={handleTimerButton}>
          <Text style={fabTextStyle}>{isRunning ? '◼ Stop Timer' : '▶ Start Timer'}</Text>
        </Pressable>
        <Link href="/settings" asChild>
          <Pressable style={fabStyle}>
            <Text style={fabTextStyle}>⚙ Settings</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

const fabStyle = {
  backgroundColor: 'rgba(245, 237, 224, 0.08)',
  borderWidth: 1,
  borderColor: 'rgba(245, 237, 224, 0.15)',
  borderRadius: 24,
  paddingVertical: 10,
  paddingHorizontal: 24,
  minHeight: 44,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  borderCurve: 'continuous' as const,
}

const fabTextStyle = {
  color: '#c8b89a',
  fontSize: 14,
  letterSpacing: 0.6,
}
