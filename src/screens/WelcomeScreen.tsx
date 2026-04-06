import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: { navigate: (screen: string) => void };
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(30)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;
  const featuresFade = useRef(new Animated.Value(0)).current;
  const featuresSlide = useRef(new Animated.Value(40)).current;
  const btnFade = useRef(new Animated.Value(0)).current;
  const btnSlide = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const orbit1 = useRef(new Animated.Value(0)).current;
  const orbit2 = useRef(new Animated.Value(0)).current;
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;
  const bgShimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Cinematic entrance sequence
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(subtitleFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(featuresFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(featuresSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(btnFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(btnSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();

    // Continuous pulse
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.08, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();

    // Glow
    Animated.loop(Animated.sequence([
      Animated.timing(glowAnim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();

    // Orbits
    Animated.loop(Animated.timing(orbit1, { toValue: 1, duration: 8000, easing: Easing.linear, useNativeDriver: true })).start();
    Animated.loop(Animated.timing(orbit2, { toValue: 1, duration: 12000, easing: Easing.linear, useNativeDriver: true })).start();

    // Particles
    const animParticle = (a: Animated.Value, d: number) => {
      Animated.loop(Animated.sequence([
        Animated.timing(a, { toValue: 1, duration: d, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: d, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])).start();
    };
    animParticle(particle1, 3000);
    animParticle(particle2, 4000);
    animParticle(particle3, 3500);

    Animated.loop(Animated.timing(bgShimmer, { toValue: 1, duration: 5000, easing: Easing.linear, useNativeDriver: true })).start();
  }, []);

  const spin1 = orbit1.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const spin2 = orbit2.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629', '#0a1020']} style={styles.container}>
      <StatusBar style="light" />

      {/* Floating particles */}
      <Animated.View style={[styles.particle, { top: '15%', right: '20%',
        opacity: particle1.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.1, 0.5, 0.1] }),
        transform: [{ translateY: particle1.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }],
      }]} />
      <Animated.View style={[styles.particle, { top: '25%', left: '10%', width: 4, height: 4,
        opacity: particle2.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.1, 0.4, 0.1] }),
        transform: [{ translateY: particle2.interpolate({ inputRange: [0, 1], outputRange: [0, -30] }) }],
      }]} />
      <Animated.View style={[styles.particleStar, { top: '40%', right: '8%',
        opacity: particle3.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.6, 0] }),
        transform: [{ rotate: particle3.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }],
      }]} />

      {/* Orbiting rings */}
      <View style={styles.orbitCenter}>
        <Animated.View style={[styles.orbitRing1, { transform: [{ rotate: spin1 }] }]}>
          <View style={styles.orbitDot} />
        </Animated.View>
        <Animated.View style={[styles.orbitRing2, { transform: [{ rotate: spin2 }] }]}>
          <View style={[styles.orbitDot, { width: 4, height: 4, opacity: 0.5 }]} />
        </Animated.View>
      </View>

      {/* Logo with glow pulse */}
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: Animated.multiply(logoScale, pulseAnim) }] }]}>
        <Animated.View style={[styles.logoGlow, {
          opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.5] }),
          transform: [{ scale: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) }],
        }]} />
        <LinearGradient colors={['#c9a96e', '#f0d78c', '#dfc07a', '#c9a96e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.logoBox}>
          <Ionicons name="car-sport" size={44} color={COLORS.dark} />
        </LinearGradient>
      </Animated.View>

      {/* Brand */}
      <Animated.View style={[styles.brandContainer, { opacity: titleFade, transform: [{ translateY: titleSlide }] }]}>
        <Text style={styles.logoText}>مدار</Text>
        <Text style={styles.logoSubText}>M A D A R</Text>
        <View style={styles.goldLine} />
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[styles.taglineContainer, { opacity: subtitleFade }]}>
        <Text style={styles.tagline}>وجهتك الأولى</Text>
        <Text style={styles.taglineGold}>للتنقل الذكي في المملكة</Text>
        <Text style={styles.taglineDesc}>تجربة نقل فاخرة واحترافية بمعايير عالمية{'\n'}سيارات فاخرة • سائقين محترفين • خدمة 24/7</Text>
      </Animated.View>

      {/* Features */}
      <Animated.View style={[styles.featuresRow, { opacity: featuresFade, transform: [{ translateY: featuresSlide }] }]}>
        {[
          { icon: 'shield-checkmark' as const, label: 'آمان مطلق', sub: 'تتبع مباشر' },
          { icon: 'time' as const, label: 'متوفر 24/7', sub: 'في خدمتك' },
          { icon: 'diamond' as const, label: 'جودة فاخرة', sub: 'معايير عالمية' },
          { icon: 'flash' as const, label: 'حجز فوري', sub: 'في ثوانٍ' },
        ].map((f, i) => (
          <View key={i} style={styles.featureItem}>
            <LinearGradient colors={['rgba(201,169,110,0.15)', 'rgba(201,169,110,0.05)']} style={styles.featureIcon}>
              <Ionicons name={f.icon} size={22} color={COLORS.gold} />
            </LinearGradient>
            <Text style={styles.featureText}>{f.label}</Text>
            <Text style={styles.featureSub}>{f.sub}</Text>
          </View>
        ))}
      </Animated.View>

      {/* CTA */}
      <Animated.View style={[styles.ctaContainer, { opacity: btnFade, transform: [{ translateY: btnSlide }] }]}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')} activeOpacity={0.85}>
          <LinearGradient colors={['#c9a96e', '#f0d78c', '#dfc07a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGradient}>
            <Text style={styles.primaryBtnText}>ابدأ رحلتك الآن</Text>
            <View style={styles.btnArrow}><Ionicons name="arrow-back" size={18} color={COLORS.dark} /></View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
          <Text style={styles.secondaryBtnText}>لديك حساب؟ تسجيل دخول</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.bottomBadge}>
        <Ionicons name="logo-apple" size={14} color={COLORS.textMuted} />
        <Text style={styles.bottomText}>متوفر على iOS و Android</Text>
        <Ionicons name="logo-google-playstore" size={14} color={COLORS.textMuted} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SIZES.lg },
  particle: { position: 'absolute', width: 3, height: 3, borderRadius: 2, backgroundColor: COLORS.gold },
  particleStar: { position: 'absolute', width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(201,169,110,0.3)' },
  orbitCenter: { position: 'absolute', top: height * 0.22, alignSelf: 'center', width: 300, height: 300, alignItems: 'center', justifyContent: 'center' },
  orbitRing1: { position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(201,169,110,0.06)', alignItems: 'center', justifyContent: 'flex-start' },
  orbitRing2: { position: 'absolute', width: 260, height: 260, borderRadius: 130, borderWidth: 1, borderColor: 'rgba(201,169,110,0.04)', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'flex-start' },
  orbitDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(201,169,110,0.3)', marginTop: -3 },
  logoContainer: { alignItems: 'center', marginBottom: SIZES.md },
  logoGlow: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(201,169,110,0.15)', top: -15 },
  logoBox: { width: 90, height: 90, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 },
  brandContainer: { alignItems: 'center', marginBottom: SIZES.lg },
  logoText: { fontSize: 52, fontWeight: '900', color: COLORS.gold, writingDirection: 'rtl', textShadowColor: 'rgba(201,169,110,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  logoSubText: { fontSize: 14, color: 'rgba(201,169,110,0.5)', letterSpacing: 8, fontWeight: '300', marginTop: -2 },
  goldLine: { width: 60, height: 2, backgroundColor: COLORS.gold, marginTop: SIZES.sm, borderRadius: 1, opacity: 0.4 },
  taglineContainer: { alignItems: 'center', marginBottom: SIZES.xl },
  tagline: { fontSize: SIZES.titleLg, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl' },
  taglineGold: { fontSize: SIZES.title, fontWeight: '700', color: COLORS.gold, writingDirection: 'rtl', marginBottom: SIZES.sm },
  taglineDesc: { fontSize: SIZES.caption, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, writingDirection: 'rtl' },
  featuresRow: { flexDirection: 'row', justifyContent: 'center', gap: SIZES.md, marginBottom: SIZES.xl },
  featureItem: { alignItems: 'center', gap: 4, width: 75 },
  featureIcon: { width: 48, height: 48, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(201,169,110,0.15)', alignItems: 'center', justifyContent: 'center' },
  featureText: { fontSize: 11, color: COLORS.white, fontWeight: '600', writingDirection: 'rtl' },
  featureSub: { fontSize: 9, color: COLORS.textMuted, writingDirection: 'rtl' },
  ctaContainer: { width: '100%', gap: SIZES.sm, marginBottom: SIZES.md },
  primaryBtn: { borderRadius: SIZES.radiusLg, overflow: 'hidden', shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
  primaryBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SIZES.md + 4, gap: SIZES.sm },
  primaryBtnText: { fontSize: SIZES.subtitle, fontWeight: '800', color: COLORS.dark, writingDirection: 'rtl' },
  btnArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(10,14,26,0.15)', alignItems: 'center', justifyContent: 'center' },
  secondaryBtn: { borderRadius: SIZES.radiusLg, paddingVertical: SIZES.md + 2, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(201,169,110,0.2)', backgroundColor: 'rgba(201,169,110,0.05)' },
  secondaryBtnText: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.gold, writingDirection: 'rtl' },
  bottomBadge: { flexDirection: 'row', alignItems: 'center', gap: SIZES.sm, opacity: 0.5 },
  bottomText: { fontSize: SIZES.caption, color: COLORS.textMuted },
});
