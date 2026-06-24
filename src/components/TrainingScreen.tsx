import { useState } from 'react'
import { useAnimation } from '../hooks/useAnimation'
import { useFloatingPosition } from '../hooks/useFloatingPosition'
import { useSettings } from '../hooks/useSettings'
import { CirclePair } from './CirclePair'
import { SettingsPanel } from './SettingsPanel'
import { TutorialModal } from './TutorialModal'

export function TrainingScreen() {
  const { settings, update } = useSettings()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const offsets = useAnimation(settings.speed, settings.maxDistance, settings.pace)
  const floatPos = useFloatingPosition(settings.move)

  return (
    <div style={styles.screen}>
      <div style={styles.header}>
        <h1 style={styles.title}>Eyes Training</h1>
        <p style={styles.subtitle}>Relax your gaze — let the circles merge into one</p>
      </div>

      <div style={styles.stage}>
        <div
          style={{
            transform: `translate(${floatPos.x}px, ${floatPos.y}px)`,
            width: '100%',
          }}
        >
          <CirclePair offsets={offsets} size={settings.circleSize} />
        </div>
      </div>

      <SettingsPanel
        settings={settings}
        onUpdate={update}
        isOpen={settingsOpen}
        onToggle={() => setSettingsOpen(o => !o)}
        onTutorial={() => setTutorialOpen(true)}
      />

      {tutorialOpen && <TutorialModal onClose={() => setTutorialOpen(false)} />}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    height: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    background: '#080808',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    paddingTop: 'max(24px, env(safe-area-inset-top))',
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 300,
    color: '#c8b89a',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#6a5a48',
    letterSpacing: '0.04em',
  },
  stage: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
}
