import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

interface RideConfirmationScreenProps {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
  route?: { params?: { carType?: string; payment?: string; price?: string } };
}

export default function RideConfirmationScreen({ navigation, route }: RideConfirmationScreenProps) {
  const price = route?.params?.price || '25';
  const [phase, setPhase] = useState<'searching' | 'found' | 'arriving'>('searching');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const radarSpin = useRef(new Animated.Value(0)).current;
  const radarPulse1 = useRef(new Animated.Value(0)).current;
  const radarPulse2 = useRef(new Animated.Value(0)).current;
  const radarPulse3 = useRef(new Animated.Value(0)).current;
  const dotPulse = useRef(new Animated.Value(1)).current;
  const driverSlide = useRef(new Animated.Value(100)).current;
  const driverFade = useRef(new Animated.Value(0)).current;
  const carFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    // Radar spin
    Animated.loop(Animated.timing(radarSpin, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true })).start();

    // Radar pulses (staggered)
    const pulseFn = (a: Animated.Value, delay: number) => {
      Animated.loop(Animated.sequence([
        Animated.delay(delay),
        Animated.timing(a, { toValue: 1, duration: 2000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])).start();
    };
    pulseFn(radarPulse1, 0);
    pulseFn(radarPulse2, 600);
    pulseFn(radarPulse3, 1200);

    // Dot pulse
    Animated.loop(Animated.sequence([
      Animated.timing(dotPulse, { toValue: 1.3, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(dotPulse, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();

    // Car float
    Animated.loop(Animated.sequence([
      Animated.timing(carFloat, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(carFloat, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();

    // Simulate finding driver
    const t1 = setTimeout(() => {
      setPhase('found');
      Animated.parallel([
        Animated.spring(driverSlide, { toValue: 0, friction: 6, tension: 40, useNativeDriver: true }),
        Animated.timing(driverFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 4000);

    const t2 = setTimeout(() => setPhase('arriving'), 7000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const spin = radarSpin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const renderPulse = (anim: Animated.Value) => (
    <Animated.View style={[styles.radarPulse, {
      opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 0.2, 0] }),
      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2.5] }) }],
    }]} />
  );

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629']} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {phase === 'searching' ? 'جاري البحث عن سائق...' : phase === 'found' ? 'تم العثور على سائق!' : 'السائق في الطريق إليك'}
          </Text>
          <View style={{ width: 44 }} />
        </Animated.View>

        {/* Radar Animation */}
        <Animated.View style={[styles.radarContainer, { opacity: fadeAnim }]}>
          {renderPulse(radarPulse1)}
          {renderPulse(radarPulse2)}
          {renderPulse(radarPulse3)}

          {/* Radar line */}
          <Animated.View style={[styles.radarLine, { transform: [{ rotate: spin }] }]}>
            <LinearGradient colors={['rgba(201,169,110,0.5)', 'transparent']} style={styles.radarLineGradient} />
          </Animated.View>

          {/* Center */}
          <Animated.View style={[styles.radarCenter, { transform: [{ scale: dotPulse }] }]}>
            <LinearGradient colors={['#c9a96e', '#f0d78c']} style={styles.radarCenterGrad}>
              <Animated.View style={{ transform: [{ translateY: carFloat.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }}>
                <Ionicons name={phase === 'searching' ? 'search' : 'car-sport'} size={28} color={COLORS.dark} />
              </Animated.View>
            </LinearGradient>
          </Animated.View>

          {/* Nearby cars dots */}
          {phase === 'searching' && (
            <>
              <Animated.View style={[styles.carDot, { top: '20%', left: '30%', transform: [{ scale: dotPulse }] }]}>
                <Ionicons name="car" size={10} color={COLORS.gold} />
              </Animated.View>
              <Animated.View style={[styles.carDot, { top: '60%', right: '25%', transform: [{ scale: dotPulse }] }]}>
                <Ionicons name="car" size={10} color={COLORS.gold} />
              </Animated.View>
              <Animated.View style={[styles.carDot, { bottom: '25%', left: '20%', transform: [{ scale: dotPulse }] }]}>
                <Ionicons name="car" size={10} color={COLORS.gold} />
              </Animated.View>
            </>
          )}
        </Animated.View>

        {/* Status Badge */}
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: phase === 'searching' ? '#f0c06b' : '#4CAF50' }]} />
          <Text style={styles.statusText}>
            {phase === 'searching' ? 'جاري البحث في منطقتك...' : phase === 'found' ? 'تم تأكيد الرحلة' : 'السائق على بعد 3 دقائق'}
          </Text>
        </View>

        {/* Driver Card */}
        {phase !== 'searching' && (
          <Animated.View style={[styles.driverCard, { opacity: driverFade, transform: [{ translateY: driverSlide }] }]}>
            <LinearGradient colors={['rgba(26,34,64,0.95)', 'rgba(26,34,64,0.8)']} style={styles.driverCardInner}>
              <View style={styles.driverRow}>
                <View style={styles.driverAvatar}>
                  <LinearGradient colors={['#c9a96e', '#f0d78c']} style={styles.driverAvatarGrad}>
                    <Ionicons name="person" size={28} color={COLORS.dark} />
                  </LinearGradient>
                </View>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>عبدالله محمد</Text>
                  <View style={styles.driverRatingRow}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.driverRating}>4.9</Text>
                    <Text style={styles.driverTrips}>• 2,450 رحلة</Text>
                  </View>
                </View>
                <View style={styles.driverActions}>
                  <TouchableOpacity style={styles.driverActionBtn}>
                    <Ionicons name="call" size={18} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.driverActionBtn}>
                    <Ionicons name="chatbubble" size={18} color={COLORS.gold} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.carInfoRow}>
                <View style={styles.carInfoItem}>
                  <Ionicons name="car" size={14} color={COLORS.textMuted} />
                  <Text style={styles.carInfoText}>كامري 2024</Text>
                </View>
                <View style={styles.carInfoItem}>
                  <Text style={styles.carInfoText}>أبيض</Text>
                </View>
                <View style={styles.plateBox}>
                  <Text style={styles.plateText}>أ ب ج 1234</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Trip Details */}
        <View style={styles.tripDetails}>
          <Text style={styles.tripDetailTitle}>تفاصيل الرحلة</Text>

          <View style={styles.tripRow}>
            <View style={styles.tripDot}><View style={styles.tripDotGreen} /></View>
            <View style={styles.tripTextCol}>
              <Text style={styles.tripLabel}>نقطة الانطلاق</Text>
              <Text style={styles.tripValue}>حي الياسمين، الرياض</Text>
            </View>
          </View>

          <View style={styles.tripLine} />

          <View style={styles.tripRow}>
            <View style={styles.tripDot}><View style={styles.tripDotRed} /></View>
            <View style={styles.tripTextCol}>
              <Text style={styles.tripLabel}>الوجهة</Text>
              <Text style={styles.tripValue}>مطار الملك خالد الدولي</Text>
            </View>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.priceSummary}>
          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>{price} ر.س</Text>
            <Text style={styles.priceLabel}>التكلفة التقديرية</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>12.5 كم</Text>
            <Text style={styles.priceLabel}>المسافة</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>18 دقيقة</Text>
            <Text style={styles.priceLabel}>الوقت المتوقع</Text>
          </View>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>إلغاء الرحلة</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingBottom: SIZES.md },
  backBtn: { width: 44, height: 44, borderRadius: SIZES.radius, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.white, writingDirection: 'rtl' },
  radarContainer: { width: 220, height: 220, alignSelf: 'center', marginVertical: SIZES.lg, alignItems: 'center', justifyContent: 'center' },
  radarPulse: { position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 1.5, borderColor: 'rgba(201,169,110,0.3)' },
  radarLine: { position: 'absolute', width: '50%', height: 2, left: '50%', top: '50%', transformOrigin: '0% 50%' },
  radarLineGradient: { width: '100%', height: '100%', borderRadius: 1 },
  radarCenter: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center' },
  radarCenterGrad: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
  carDot: { position: 'absolute', width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(201,169,110,0.12)', alignItems: 'center', justifyContent: 'center' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SIZES.sm, backgroundColor: 'rgba(201,169,110,0.08)', borderRadius: SIZES.radiusFull, paddingHorizontal: SIZES.md, paddingVertical: SIZES.sm, marginBottom: SIZES.lg, alignSelf: 'center', borderWidth: 1, borderColor: 'rgba(201,169,110,0.15)' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: SIZES.body, color: COLORS.white, fontWeight: '600', writingDirection: 'rtl' },
  driverCard: { borderRadius: SIZES.radiusLg, overflow: 'hidden', marginBottom: SIZES.md, borderWidth: 1, borderColor: 'rgba(201,169,110,0.15)' },
  driverCardInner: { padding: SIZES.md },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.md },
  driverAvatar: {},
  driverAvatarGrad: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  driverInfo: { flex: 1 },
  driverName: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl' },
  driverRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  driverRating: { fontSize: SIZES.body, fontWeight: '700', color: '#FFD700' },
  driverTrips: { fontSize: SIZES.caption, color: COLORS.textMuted },
  driverActions: { flexDirection: 'row', gap: SIZES.sm },
  driverActionBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  carInfoRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.md, marginTop: SIZES.md, paddingTop: SIZES.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  carInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  carInfoText: { fontSize: SIZES.caption, color: COLORS.textSecondary },
  plateBox: { backgroundColor: 'rgba(201,169,110,0.1)', paddingHorizontal: SIZES.sm, paddingVertical: 4, borderRadius: SIZES.radiusSm, marginLeft: 'auto' },
  plateText: { fontSize: SIZES.caption, fontWeight: '700', color: COLORS.gold, letterSpacing: 1 },
  tripDetails: { backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: SIZES.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  tripDetailTitle: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl', textAlign: 'right', marginBottom: SIZES.md },
  tripRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.md },
  tripDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  tripDotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50' },
  tripDotRed: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF5252' },
  tripLine: { width: 2, height: 24, backgroundColor: 'rgba(255,255,255,0.08)', marginLeft: 11, marginVertical: 4 },
  tripTextCol: { flex: 1 },
  tripLabel: { fontSize: SIZES.caption, color: COLORS.textMuted, writingDirection: 'rtl', textAlign: 'right' },
  tripValue: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.white, writingDirection: 'rtl', textAlign: 'right' },
  priceSummary: { backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: SIZES.md, borderWidth: 1, borderColor: 'rgba(201,169,110,0.1)', gap: SIZES.sm },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: SIZES.body, color: COLORS.textSecondary, writingDirection: 'rtl' },
  priceValue: { fontSize: SIZES.body, fontWeight: '700', color: COLORS.gold },
  cancelBtn: { alignItems: 'center', paddingVertical: SIZES.md, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', backgroundColor: 'rgba(255,82,82,0.05)' },
  cancelBtnText: { fontSize: SIZES.body, fontWeight: '700', color: '#FF5252', writingDirection: 'rtl' },
});
