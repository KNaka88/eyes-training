import { Settings } from '../hooks/useSettings'

interface Props {
  settings: Settings
  onUpdate: (patch: Partial<Settings>) => void
  isOpen: boolean
  onToggle: () => void
  onTutorial: () => void
}

export function SettingsPanel({ settings, onUpdate, isOpen, onToggle, onTutorial }: Props) {
  return (
    <>
      {isOpen && <div style={styles.backdrop} onClick={onToggle} />}

      {!isOpen && (
        <div style={styles.fab}>
          <button style={styles.fabButton} onClick={onTutorial}>
            ? Tutorial
          </button>
          <button style={styles.fabButton} onClick={onToggle}>
            ⚙ Settings
          </button>
        </div>
      )}

      {isOpen && (
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelTitle}>Settings</span>
            <button style={styles.closeButton} onClick={onToggle}>✕</button>
          </div>

          <div style={styles.scrollArea}>
            <div style={styles.section}>
              <p style={styles.sectionTitle}>Motion</p>
              <ToggleRow
                label="Move"
                description="Pair floats to random positions"
                value={settings.move}
                onChange={v => onUpdate({ move: v })}
              />
              <ToggleRow
                label="Pace"
                description="One circle freezes randomly"
                value={settings.pace}
                onChange={v => onUpdate({ pace: v })}
              />
            </div>

            <div style={styles.divider} />

            <div style={styles.section}>
              <p style={styles.sectionTitle}>Tuning</p>
              <SliderRow
                label="Speed"
                value={settings.speed}
                min={0.05}
                max={0.25}
                step={0.01}
                displayValue={`${(settings.speed / 0.15).toFixed(1)}×`}
                onChange={v => onUpdate({ speed: v })}
              />
              <SliderRow
                label="Max Distance"
                value={settings.maxDistance}
                min={40}
                max={200}
                step={10}
                displayValue={`${settings.maxDistance}px`}
                onChange={v => onUpdate({ maxDistance: v })}
              />
              <SliderRow
                label="Circle Size"
                value={settings.circleSize}
                min={20}
                max={52}
                step={4}
                displayValue={`${settings.circleSize}px`}
                onChange={v => onUpdate({ circleSize: v })}
              />
            </div>
          </div>
        </div>
      )}
    </>
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
    <button style={styles.toggleRow} onClick={() => onChange(!value)}>
      <div>
        <p style={styles.toggleLabel}>{label}</p>
        <p style={styles.toggleDesc}>{description}</p>
      </div>
      <div style={{ ...styles.pill, ...(value ? styles.pillOn : styles.pillOff) }}>
        <div style={{ ...styles.pillThumb, ...(value ? styles.pillThumbOn : styles.pillThumbOff) }} />
      </div>
    </button>
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

function SliderRow({ label, value, min, max, step, displayValue, onChange }: SliderRowProps) {
  return (
    <div style={styles.sliderRow}>
      <div style={styles.labelRow}>
        <span style={styles.sliderLabel}>{label}</span>
        <span style={styles.sliderValue}>{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={styles.slider}
      />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(8, 8, 8, 0.55)',
    zIndex: 9,
  },
  fab: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
    zIndex: 10,
  },
  fabButton: {
    background: 'rgba(245, 237, 224, 0.08)',
    border: '1px solid rgba(245, 237, 224, 0.15)',
    color: '#c8b89a',
    borderRadius: 24,
    padding: '10px 24px',
    fontSize: 14,
    cursor: 'pointer',
    minHeight: 44,
    letterSpacing: '0.04em',
  },
  panel: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '85dvh',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(12, 9, 6, 0.97)',
    backdropFilter: 'blur(16px)',
    borderTop: '1px solid rgba(245, 237, 224, 0.08)',
    zIndex: 10,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px 10px',
    flexShrink: 0,
    borderBottom: '1px solid rgba(245, 237, 224, 0.06)',
  },
  panelTitle: {
    fontSize: 13,
    color: '#c8b89a',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#a89070',
    fontSize: 18,
    cursor: 'pointer',
    padding: '4px 8px',
    minHeight: 44,
    minWidth: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArea: {
    overflowY: 'auto',
    padding: '12px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    color: '#5a4a38',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  divider: {
    height: 1,
    background: 'rgba(245, 237, 224, 0.06)',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    minHeight: 44,
    width: '100%',
    textAlign: 'left',
  },
  toggleLabel: {
    fontSize: 15,
    color: '#e8dcc8',
    marginBottom: 2,
  },
  toggleDesc: {
    fontSize: 12,
    color: '#6a5a48',
  },
  pill: {
    width: 48,
    height: 28,
    borderRadius: 14,
    flexShrink: 0,
    position: 'relative',
    transition: 'background 0.2s',
  },
  pillOn: {
    background: '#c8a870',
  },
  pillOff: {
    background: 'rgba(245, 237, 224, 0.12)',
  },
  pillThumb: {
    position: 'absolute',
    top: 3,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: '#f5ede0',
    transition: 'left 0.2s',
  },
  pillThumbOn: {
    left: 23,
  },
  pillThumbOff: {
    left: 3,
  },
  sliderRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sliderLabel: {
    fontSize: 15,
    color: '#e8dcc8',
  },
  sliderValue: {
    fontSize: 13,
    color: '#a89070',
    fontVariantNumeric: 'tabular-nums',
  },
  slider: {
    width: '100%',
    height: 44,
    cursor: 'pointer',
    accentColor: '#c8a870',
  },
}
