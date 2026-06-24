import { View } from 'react-native'
import { Offsets } from '../hooks/useAnimation'

interface Props {
  offsets: Offsets
  size: number
}

const CIRCLE_COLOR = '#f5ede0'

export function CirclePair({ offsets, size }: Props) {
  const circleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: CIRCLE_COLOR,
    boxShadow: `0 0 ${Math.round(size * 0.4)}px rgba(245, 220, 180, 0.25)`,
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <View style={{ transform: [{ translateX: -offsets.left }] }}>
        <View style={circleStyle} />
      </View>
      <View style={{ transform: [{ translateX: offsets.right }] }}>
        <View style={circleStyle} />
      </View>
    </View>
  )
}
