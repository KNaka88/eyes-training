import { Offsets } from '../hooks/useAnimation'

interface Props {
  offsets: Offsets
  size: number
}

const CIRCLE_COLOR = '#f5ede0'

export function CirclePair({ offsets, size }: Props) {
  const circleStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: CIRCLE_COLOR,
    boxShadow: `0 0 ${size * 0.4}px ${size * 0.1}px rgba(245, 220, 180, 0.25)`,
    flexShrink: 0,
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        userSelect: 'none',
      }}
    >
      <div style={{ transform: `translateX(-${offsets.left}px)` }}>
        <div style={circleStyle} />
      </div>
      <div style={{ transform: `translateX(${offsets.right}px)` }}>
        <div style={circleStyle} />
      </div>
    </div>
  )
}
