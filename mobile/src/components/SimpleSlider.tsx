import { useRef } from 'react'
import { View, PanResponder } from 'react-native'

interface Props {
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

export function SimpleSlider({ value, min, max, step, onChange }: Props) {
  const trackWidthRef = useRef(0)
  const startValueRef = useRef(value)

  // Keep latest value/onChange accessible inside stable PanResponder closure
  const valueRef = useRef(value)
  valueRef.current = value
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startValueRef.current = valueRef.current
      },
      onPanResponderMove: (_, gestureState) => {
        if (trackWidthRef.current === 0) { return }
        const deltaValue = (gestureState.dx / trackWidthRef.current) * (max - min)
        const rawValue = startValueRef.current + deltaValue
        const stepped = Math.round(rawValue / step) * step
        const clamped = Math.max(min, Math.min(max, stepped))
        onChangeRef.current(clamped)
      },
    })
  ).current

  const fillPercent = `${((value - min) / (max - min)) * 100}%` as `${number}%`

  return (
    <View
      style={{ height: 44, justifyContent: 'center' }}
      onLayout={e => { trackWidthRef.current = e.nativeEvent.layout.width }}
      {...panResponder.panHandlers}
    >
      {/* Track */}
      <View style={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(245, 237, 224, 0.12)', overflow: 'hidden' }}>
        <View style={{ width: fillPercent, height: '100%', backgroundColor: '#c8a870', borderRadius: 2 }} />
      </View>
      {/* Thumb */}
      <View style={{
        position: 'absolute',
        left: fillPercent,
        marginLeft: -11,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#f5ede0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.35)',
      }} />
    </View>
  )
}
