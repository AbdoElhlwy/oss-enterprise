import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  I18nManager,
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
  return (
    <LinearGradient
      colors={[COLORS.dark, COLORS.navy, COLORS.deep]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Decorative elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      {/* Logo area */}
      <View style={styles.logoContainer}>
        <LinearGradient
          colors={['#c9a96e', '#f0d78c', '#c9a96e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoBox}
        >
          <Ionicons name="car-sport" size={40} color={COLORS.dark} />
        </LinearGradient>
        <Text style={styles.logoText}>مدار</Text>
        <Text style={styles.logoSubText}>MADAR</Text>
      </View>

      {/* Tagline */}
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>وجهتك الأولى</Text>
        <Text style={styles.taglineGold}>للتنقل الذكي</Text>
        <Text style={styles.taglineDesc}>
          تجربة نقل فاخرة واحترافية بمعايير عالمية{'\n'}في المملكة العربية السعودية
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresRow}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.gold} />
          </View>
          <Text style={styles.featureText}>آمان مطلق</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="time" size={20} color={COLORS.gold} />
          </View>
          <Text style={styles.featureText}>متوفر 24/7</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="star" size={20} color={COLORS.gold} />
          </View>
          <Text style={styles.featureText}>جودة فاخرة</Text>
        </View>
      </View>

      {/* CTA Buttons */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#c9a96e', '#f0d78c', '#c9a96e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryBtnGradient}
          >
            <Text style={styles.primaryBtnText}>ابدأ الآن</Text>
            <Ionicons name="arrow-back" size={20} color={COLORS.dark} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>تسجيل دخول</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom text */}
      <Text style={styles.bottomText}>
        متوفر على iOS و Android
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xl,
  },
  decorCircle1: {
    position: 'absolute',
    top: height * 0.1,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(201, 169, 110, 0.05)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: height * 0.15,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(201, 169, 110, 0.03)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radiusXl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: SIZES.heroLg,
    fontWeight: '900',
    color: COLORS.gold,
    writingDirection: 'rtl',
  },
  logoSubText: {
    fontSize: SIZES.caption,
    color: 'rgba(201, 169, 110, 0.6)',
    letterSpacing: 4,
    fontWeight: '500',
    marginTop: -4,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  tagline: {
    fontSize: SIZES.titleLg,
    fontWeight: '700',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  taglineGold: {
    fontSize: SIZES.titleLg,
    fontWeight: '700',
    color: COLORS.gold,
    writingDirection: 'rtl',
    marginBottom: SIZES.md,
  },
  taglineDesc: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    writingDirection: 'rtl',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.lg,
    marginBottom: SIZES.xxl,
  },
  featureItem: {
    alignItems: 'center',
    gap: SIZES.sm,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  ctaContainer: {
    width: '100%',
    gap: SIZES.md,
    marginBottom: SIZES.lg,
  },
  primaryBtn: {
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md + 2,
    gap: SIZES.sm,
  },
  primaryBtnText: {
    fontSize: SIZES.bodyLg,
    fontWeight: '700',
    color: COLORS.dark,
    writingDirection: 'rtl',
  },
  secondaryBtn: {
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md + 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  secondaryBtnText: {
    fontSize: SIZES.bodyLg,
    fontWeight: '600',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  bottomText: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginTop: SIZES.md,
  },
});
