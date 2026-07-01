import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { SoulJourneyOrbProps } from './types';
import { SOUL_LEVELS, ORB_SIZE, RING_RADIUS, CIRCUMFERENCE } from './const';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function Particle({
  color,
  x,
  y,
  size,
  delay,
}: {
  color: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}) {
  const opacity = useSharedValue(0.2);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(
      delay * 1000,
      withRepeat(withSequence(withTiming(1, { duration: 1200 }), withTiming(0.2, { duration: 1200 })), -1, true),
    );
    scale.value = withDelay(
      delay * 1000,
      withRepeat(withSequence(withTiming(1.4, { duration: 1200 }), withTiming(0.8, { duration: 1200 })), -1, true),
    );
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: x }, { translateY: y }, { scale: scale.value }],
  }));

  return <Animated.View style={[styles.particle, { backgroundColor: color, width: size, height: size }, animatedStyle]} />;
}

function PolarParticles({ count = 16, radius = 105 }: { count?: number; radius?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const angle = (index / count) * 360;
      const orbitRadius = radius + (Math.random() * 20 - 10);
      const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
      const y = Math.sin((angle * Math.PI) / 180) * orbitRadius;
      const size = Math.random() * 3 + 1;
      const delay = index / count;
      const color = index % 3 === 0 ? '#F0A500' : index % 3 === 1 ? '#E84393' : '#C4B5FD';

      return { id: index, x, y, size, delay, color };
    });
  }, [count, radius]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {particles.map((particle) => (
        <Particle key={particle.id} color={particle.color} x={particle.x} y={particle.y} size={particle.size} delay={particle.delay} />
      ))}
    </View>
  );
}

export default function SoulJourneyOrb({ karmaPoints, level, levelName, progressPercent }: SoulJourneyOrbProps) {
  const levelData = SOUL_LEVELS[Math.min(level, SOUL_LEVELS.length - 1)] ?? SOUL_LEVELS[0];
  const orbColor = levelData.color;
  const clampedProgress = Math.max(0, Math.min(100, progressPercent));

  const glowScale = useSharedValue(1);
  const orbitRotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const progressOffset = useSharedValue(CIRCUMFERENCE);

  useEffect(() => {
    glowScale.value = withRepeat(withSequence(withTiming(1.04, { duration: 2200 }), withTiming(1, { duration: 2200 })), -1, true);
    orbitRotation.value = withRepeat(withTiming(360, { duration: 30000, easing: Easing.linear }), -1, false);
    pulseScale.value = withRepeat(withSequence(withTiming(1.02, { duration: 2400 }), withTiming(1, { duration: 2400 })), -1, true);
  }, [glowScale, orbitRotation, pulseScale]);

  useEffect(() => {
    progressOffset.value = withTiming(CIRCUMFERENCE * (1 - clampedProgress / 100), {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedProgress, progressOffset]);

  const glowStyle = useAnimatedStyle(() => ({ transform: [{ scale: glowScale.value }] }));
  const orbitStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${orbitRotation.value}deg` }] }));
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseScale.value }] }));
  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: progressOffset.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.orbWrapper}>
        <Animated.View style={[styles.ambientGlow, { backgroundColor: orbColor }, glowStyle]} />

        <Animated.View style={[styles.orbitRing, orbitStyle]}>
          {[0, 90, 180, 270].map((degree) => (
            <View
              key={degree}
              style={[
                styles.orbitDot,
                {
                  transform: [{ rotate: `${degree}deg` }, { translateX: 125 }],
                },
              ]}
            />
          ))}
        </Animated.View>

        <Svg width={ORB_SIZE} height={ORB_SIZE} viewBox="0 0 260 260" style={styles.svg}>
          <Circle cx="130" cy="130" r={RING_RADIUS} fill="none" stroke="rgba(196,181,253,0.1)" strokeWidth="3" />
          <AnimatedCircle
            cx="130"
            cy="130"
            r={RING_RADIUS}
            fill="none"
            stroke={orbColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE}`}
            animatedProps={animatedCircleProps}
          />
        </Svg>

        <Animated.View style={[styles.innerGlowRing, { borderColor: `${orbColor}22` }, pulseStyle]} />

        <PolarParticles count={16} radius={105} />

        <Animated.View style={[styles.centralOrb, { borderColor: `${orbColor}44`, backgroundColor: '#160D2E' }]}>
          <View style={[styles.centralOrbFill, { backgroundColor: orbColor }]} />
          <View style={styles.shine} />
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: orbColor }]}>{karmaPoints.toLocaleString()}</Text>
            <Text style={styles.karmaLabel}>karma</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: `${orbColor}22`, borderColor: `${orbColor}44` }]}>
          <Text style={[styles.badgeText, { color: orbColor }]}>✦ Level {level} — {levelName || levelData.name} ✦</Text>
        </View>
        <Text style={styles.progressCopy}>{clampedProgress}% to next level</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  orbWrapper: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ambientGlow: {
    ...StyleSheet.absoluteFill,
    borderRadius: ORB_SIZE / 2,
    opacity: 0.25,
    transform: [{ scale: 1.3 }],
  },
  orbitRing: {
    ...StyleSheet.absoluteFill,
    borderRadius: ORB_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(196, 181, 253, 0.1)',
  },
  orbitDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4B5FD',
    opacity: 0.4,
    marginTop: -4,
    marginLeft: -4,
  },
  svg: {
    position: 'absolute',
    transform: [{ rotate: '-90deg' }],
  },
  innerGlowRing: {
    ...StyleSheet.absoluteFill,
    inset: 20,
    borderRadius: 220,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  particle: {
    position: 'absolute',
    borderRadius: 999,
    left: '50%',
    top: '50%',
    marginLeft: -1,
    marginTop: -1,
  },
  centralOrb: {
    position: 'absolute',
    inset: 40,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 6,
  },
  centralOrbFill: {
    ...StyleSheet.absoluteFill,
    opacity: 0.65,
  },
  shine: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '35%',
    height: '35%',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  score: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  karmaLabel: {
    marginTop: 4,
    fontSize: 12,
    color: 'rgba(237,224,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  badgeContainer: {
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  progressCopy: {
    fontSize: 12,
    color: '#8B7DB5',
  },
});