import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CirclePair } from '../src/components/CirclePair'

const CIRCLE_SIZE = 36

const DEPTH_PAIRS: Array<{ offset: number; depthLabel: string; hint: string }> = [
  { offset: 15, depthLabel: 'Floats in front', hint: 'narrow gap' },
  { offset: 22, depthLabel: 'At screen level', hint: 'medium gap' },
  { offset: 29, depthLabel: 'Recedes behind',  hint: 'wide gap'   },
]

export default function TutorialScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: '#080808' }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Math.max(16, insets.top),
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(245, 237, 224, 0.06)',
      }}>
        <Text style={{ fontSize: 13, color: '#c8b89a', letterSpacing: 1.2, textTransform: 'uppercase' }}>
          How to Parallel View
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: 'rgba(245, 237, 224, 0.08)',
            borderWidth: 1,
            borderColor: 'rgba(245, 237, 224, 0.15)',
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 20,
            minHeight: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderCurve: 'continuous',
          }}
        >
          <Text style={{ fontSize: 14, color: '#c8b89a', letterSpacing: 0.5 }}>Done</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 20,
          paddingBottom: Math.max(32, insets.bottom),
          maxWidth: 480,
          alignSelf: 'center',
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 15, color: '#a89070', lineHeight: 24 }}>
          Relax your gaze and look{' '}
          <Text style={{ fontStyle: 'italic' }}>through</Text>
          {' '}the screen as if focusing on something far behind it.
          The two circles will drift together and merge into one — don't force it, just let it happen.
          Once merged, hold that soft focus as the circle moves.
        </Text>

        <View style={{ height: 1, backgroundColor: 'rgba(245, 237, 224, 0.06)' }} />

        <Text style={{ fontSize: 11, color: '#5a4a38', letterSpacing: 1.5, textTransform: 'uppercase' }}>
          What you should see
        </Text>
        <Text style={{ fontSize: 15, color: '#a89070', lineHeight: 24 }}>
          When your eyes are correctly parallel-focused, these three pairs will each appear at a different depth.
        </Text>

        <View style={{ gap: 4 }}>
          {DEPTH_PAIRS.map(({ offset, depthLabel, hint }) => (
            <View
              key={hint}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(245, 237, 224, 0.04)',
              }}
            >
              <View style={{ flex: 1 }}>
                <CirclePair offsets={{ left: offset, right: offset }} size={CIRCLE_SIZE} />
              </View>
              <View style={{ width: 120, alignItems: 'flex-end', gap: 4 }}>
                <Text style={{ fontSize: 14, color: '#c8b89a', letterSpacing: 0.3 }}>{depthLabel}</Text>
                <Text style={{ fontSize: 11, color: '#5a4a38', letterSpacing: 0.9 }}>{hint}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 1, backgroundColor: 'rgba(245, 237, 224, 0.06)' }} />

        <View style={{ gap: 10 }}>
          {[
            'Hold your device at arm\'s length',
            'Blink slowly if your eyes feel strained — never force it',
            'If the circles won\'t merge, try moving the screen slightly farther away',
          ].map(tip => (
            <Text key={tip} style={{ fontSize: 13, color: '#6a5a48', lineHeight: 20 }}>
              • {tip}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
