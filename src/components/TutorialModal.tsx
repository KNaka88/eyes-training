import { CirclePair } from './CirclePair'

interface Props {
  onClose: () => void
}

const CIRCLE_SIZE = 36

const DEPTH_PAIRS: Array<{ offset: number; depthLabel: string; hint: string }> = [
  { offset: 15, depthLabel: 'Floats in front',  hint: 'narrow gap' },
  { offset: 22, depthLabel: 'At screen level',  hint: 'medium gap' },
  { offset: 29, depthLabel: 'Recedes behind',   hint: 'wide gap'   },
]

export function TutorialModal({ onClose }: Props) {
  return (
    <div style={styles.overlay}>
      <div style={styles.topBar}>
        <span style={styles.title}>How to Parallel View</span>
        <button style={styles.doneButton} onClick={onClose}>Done</button>
      </div>

      <div style={styles.content}>
        <div style={styles.inner}>
          <p style={styles.bodyText}>
            Relax your gaze and look <em>through</em> the screen as if focusing on something far behind it.
            The two circles will drift together and merge into one — don't force it, just let it happen.
            Once merged, hold that soft focus as the circle moves.
          </p>

          <div style={styles.divider} />

          <p style={styles.sectionLabel}>What you should see</p>
          <p style={styles.bodyText}>
            When your eyes are correctly parallel-focused, these three pairs will each appear at a different depth.
          </p>

          <div style={styles.pairsContainer}>
            {DEPTH_PAIRS.map(({ offset, depthLabel, hint }) => (
              <div key={hint} style={styles.pairRow}>
                <div style={styles.pairLeft}>
                  <CirclePair offsets={{ left: offset, right: offset }} size={CIRCLE_SIZE} />
                </div>
                <div style={styles.pairRight}>
                  <span style={styles.depthLabel}>{depthLabel}</span>
                  <span style={styles.hintLabel}>{hint}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <ul style={styles.tipList}>
            <li style={styles.tipItem}>Hold your device at arm's length</li>
            <li style={styles.tipItem}>Blink slowly if your eyes feel strained — never force it</li>
            <li style={styles.tipItem}>If the circles won't merge, try moving the screen slightly farther away</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: '#080808',
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'max(0px, env(safe-area-inset-top))',
    paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px 14px',
    flexShrink: 0,
    borderBottom: '1px solid rgba(245, 237, 224, 0.06)',
  },
  title: {
    fontSize: 13,
    color: '#c8b89a',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  doneButton: {
    background: 'rgba(245, 237, 224, 0.08)',
    border: '1px solid rgba(245, 237, 224, 0.15)',
    color: '#c8b89a',
    borderRadius: 20,
    padding: '8px 20px',
    fontSize: 14,
    cursor: 'pointer',
    minHeight: 40,
    letterSpacing: '0.04em',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 480,
    padding: '28px 24px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  bodyText: {
    fontSize: 15,
    color: '#a89070',
    lineHeight: 1.65,
    margin: 0,
  },
  divider: {
    height: 1,
    background: 'rgba(245, 237, 224, 0.06)',
  },
  sectionLabel: {
    fontSize: 11,
    color: '#5a4a38',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: 0,
  },
  pairsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  pairRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '10px 0',
    borderBottom: '1px solid rgba(245, 237, 224, 0.04)',
  },
  pairLeft: {
    flex: 1,
  },
  pairRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
    flexShrink: 0,
    width: 120,
  },
  depthLabel: {
    fontSize: 14,
    color: '#c8b89a',
    letterSpacing: '0.02em',
  },
  hintLabel: {
    fontSize: 11,
    color: '#5a4a38',
    letterSpacing: '0.06em',
  },
  tipList: {
    margin: 0,
    padding: '0 0 0 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  tipItem: {
    fontSize: 13,
    color: '#6a5a48',
    lineHeight: 1.5,
  },
}
