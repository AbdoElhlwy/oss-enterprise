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
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const CAR_TYPES = [
  { id: 'eco', name: 'اقتصادي', nameEn: 'Economy', price: '15', time: '3 دقائق', icon: 'car-outline' as const, color: '#4ecdc4' },
  { id: 'comfort', name: 'مريح', nameEn: 'Comfort', price: '25', time: '5 دقائق', icon: 'car' as const, color: '#6bb5f0' },
  { id: 'vip', name: 'VIP', nameEn: 'Business', price: '45', time: '7 دقائق', icon: 'car-sport' as const, color: '#c9a96e' },
  { id: 'luxury', name: 'فاخر', nameEn: 'Luxury', price: '85', time: '10 دقائق', icon: 'diamond' as const, color: '#e88ca5' },
];

const PAYMENT_METHODS = [
  { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' as const, color: '#FFFFFF' },
  { id: 'mada', name: 'مدى', icon: 'card' as const, color: '#004B87' },
  { id: 'visa', name: 'Visa', icon: 'card-outline' as const, color: '#1A1F71' },
  { id: 'master', name: 'Mastercard', icon: 'card-outline' as const, color: '#EB001B' },
  { id: 'stc', name: 'STC Pay', icon: 'phone-portrait' as const, color: '#6C3D9E' },
  { id: 'cash', name: 'نقداً', icon: 'cash' as const, color: '#4CAF50' },
];

interface BookingScreenProps {
  navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void; goBack: () => void };
  route?: { params?: { serviceTitle?: string } };
}

export default function BookingScreen({ navigation, route }: BookingScreenProps) {
  const serviceTitle = route?.params?.serviceTitle || 'حجز رحلة';
  const [selectedCar, setSelectedCar] = useState('comfort');
  const [selectedPayment, setSelectedPayment] = useState('apple');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mapSlide = useRef(new Animated.Value(-50)).current;
  const formFade = useRef(new Animated.Value(0)).current;
  const formSlide = useRef(new Animated.Value(40)).current;
  const carsFade = useRef(new Animated.Value(0)).current;
  const carsSlide = useRef(new Animated.Value(50)).current;
  const payFade = useRef(new Animated.Value(0)).current;
  const paySlide = useRef(new Animated.Value(50)).current;
  const pinBounce = useRef(new Animated.Value(0)).current;
  const pinPulse = useRef(new Animated.Value(1)).current;
  const carDrive = useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(mapSlide, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(pinBounce, { toValue: 1, friction: 4, tension: 50, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(formFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(formSlide, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(carsFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(carsSlide, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(payFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(paySlide, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();

    // Pin pulse
    Animated.loop(Animated.sequence([
      Animated.timing(pinPulse, { toValue: 1.2, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pinPulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();

    // Car driving animation
    Animated.loop(Animated.timing(carDrive, { toValue: width + 60, duration: 4000, easing: Easing.linear, useNativeDriver: true })).start();
  }, []);

  const selectedCarData = CAR_TYPES.find(c => c.id === selectedCar);

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629']} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{serviceTitle}</Text>
          <View style={{ width: 44 }} />
        </Animated.View>

        {/* Map Area */}
        <Animated.View style={[styles.mapContainer, { opacity: fadeAnim, transform: [{ translateY: mapSlide }] }]}>
          <LinearGradient colors={['#0d1a2e', '#162240', '#1a2a4a']} style={styles.mapGradient}>
            {/* Grid lines to simulate map */}
            {[...Array(8)].map((_, i) => (
              <View key={`h${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 11}%` }]} />
            ))}
            {[...Array(6)].map((_, i) => (
              <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 14}%` }]} />
            ))}

            {/* Roads */}
            <View style={[styles.road, { top: '40%', width: '100%', height: 3 }]} />
            <View style={[styles.road, { top: '60%', width: '100%', height: 2, opacity: 0.3 }]} />
            <View style={[styles.road, { left: '35%', width: 3, height: '100%', top: 0 }]} />
            <View style={[styles.road, { left: '65%', width: 2, height: '100%', top: 0, opacity: 0.3 }]} />

            {/* Route line */}
            <View style={styles.routeLine} />

            {/* Animated car on road */}
            <Animated.View style={[styles.movingCar, { transform: [{ translateX: carDrive }] }]}>
              <Ionicons name="car" size={16} color={COLORS.gold} />
            </Animated.View>

            {/* Pin A - Pickup */}
            <Animated.View style={[styles.pinA, { transform: [{ scale: pinBounce }] }]}>
              <View style={styles.pinDot}><Ionicons name="locate" size={14} color={COLORS.white} /></View>
              <View style={styles.pinLabel}><Text style={styles.pinText}>موقعك</Text></View>
            </Animated.View>

            {/* Pin B - Destination */}
            <Animated.View style={[styles.pinB, { transform: [{ scale: pinBounce }] }]}>
              <View style={[styles.pinDot, { backgroundColor: '#FF5252' }]}><Ionicons name="flag" size={12} color={COLORS.white} /></View>
              <View style={styles.pinLabel}><Text style={styles.pinText}>الوجهة</Text></View>
            </Animated.View>

            {/* Nearby drivers */}
            {[
              { top: '25%', left: '20%', rotate: '45deg' },
              { top: '55%', left: '75%', rotate: '-30deg' },
              { top: '70%', left: '40%', rotate: '120deg' },
            ].map((d, i) => (
              <Animated.View key={i} style={[styles.nearbyDriver, { top: d.top, left: d.left, transform: [{ scale: pinPulse }] }]}>
                <Ionicons name="car" size={12} color={COLORS.gold} style={{ transform: [{ rotate: d.rotate }] }} />
              </Animated.View>
            ))}

            {/* Pulse ring around pickup */}
            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pinPulse }], opacity: pinPulse.interpolate({ inputRange: [1, 1.2], outputRange: [0.3, 0] }) }]} />

            {/* Map label */}
            <View style={styles.mapLabelBox}>
              <Ionicons name="navigate" size={12} color={COLORS.gold} />
              <Text style={styles.mapLabel}>خريطة تفاعلية حية</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Location Inputs */}
        <Animated.View style={[styles.locationContainer, { opacity: formFade, transform: [{ translateY: formSlide }] }]}>
          <View style={styles.locationRow}>
            <View style={styles.locDots}>
              <View style={styles.locDotGreen} />
              <View style={styles.locLine} />
              <View style={styles.locDotRed} />
            </View>
            <View style={styles.locInputs}>
              <View style={styles.locInputWrap}>
                <TextInput style={styles.locInput} placeholder="نقطة الانطلاق" placeholderTextColor={COLORS.textMuted} value={pickup} onChangeText={setPickup} />
                <TouchableOpacity style={styles.locBtn}><Ionicons name="locate" size={16} color={COLORS.gold} /></TouchableOpacity>
              </View>
              <View style={styles.locDivider} />
              <View style={styles.locInputWrap}>
                <TextInput style={styles.locInput} placeholder="الوجهة" placeholderTextColor={COLORS.textMuted} value={destination} onChangeText={setDestination} />
                <TouchableOpacity style={styles.locBtn}><Ionicons name="search" size={16} color={COLORS.gold} /></TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Car Types */}
        <Animated.View style={{ opacity: carsFade, transform: [{ translateY: carsSlide }] }}>
          <Text style={styles.sectionTitle}>اختر نوع السيارة</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carsRow}>
            {CAR_TYPES.map((car) => (
              <TouchableOpacity
                key={car.id}
                style={[styles.carCard, selectedCar === car.id && styles.carCardSelected]}
                onPress={() => setSelectedCar(car.id)}
                activeOpacity={0.8}
              >
                {selectedCar === car.id && (
                  <LinearGradient colors={[`${car.color}20`, `${car.color}05`]} style={StyleSheet.absoluteFill} />
                )}
                <LinearGradient colors={[`${car.color}30`, `${car.color}10`]} style={styles.carIconBox}>
                  <Ionicons name={car.icon} size={24} color={car.color} />
                </LinearGradient>
                <Text style={styles.carName}>{car.name}</Text>
                <Text style={styles.carNameEn}>{car.nameEn}</Text>
                <View style={styles.carPriceRow}>
                  <Text style={[styles.carPrice, selectedCar === car.id && { color: car.color }]}>{car.price}</Text>
                  <Text style={styles.carCurrency}>ر.س</Text>
                </View>
                <View style={styles.carTimeRow}>
                  <Ionicons name="time-outline" size={10} color={COLORS.textMuted} />
                  <Text style={styles.carTime}>{car.time}</Text>
                </View>
                {selectedCar === car.id && (
                  <View style={[styles.carCheck, { backgroundColor: car.color }]}>
                    <Ionicons name="checkmark" size={12} color={COLORS.dark} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Payment Methods */}
        <Animated.View style={{ opacity: payFade, transform: [{ translateY: paySlide }] }}>
          <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          <View style={styles.paymentGrid}>
            {PAYMENT_METHODS.map((pm) => (
              <TouchableOpacity
                key={pm.id}
                style={[styles.paymentCard, selectedPayment === pm.id && styles.paymentCardSelected]}
                onPress={() => setSelectedPayment(pm.id)}
                activeOpacity={0.7}
              >
                <Ionicons name={pm.icon} size={20} color={selectedPayment === pm.id ? COLORS.gold : COLORS.textSecondary} />
                <Text style={[styles.paymentName, selectedPayment === pm.id && { color: COLORS.gold }]}>{pm.name}</Text>
                {selectedPayment === pm.id && (
                  <View style={styles.paymentCheck}>
                    <Ionicons name="checkmark-circle" size={14} color={COLORS.gold} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Trip Summary */}
        <Animated.View style={[styles.summaryCard, { opacity: payFade }]}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>{selectedCarData?.price} ر.س</Text>
            <Text style={styles.summaryLabel}>التكلفة التقديرية</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>{selectedCarData?.time}</Text>
            <Text style={styles.summaryLabel}>وقت الوصول</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>12.5 كم</Text>
            <Text style={styles.summaryLabel}>المسافة</Text>
          </View>
        </Animated.View>

        {/* Book Button */}
        <Animated.View style={{ opacity: payFade }}>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => navigation.navigate('RideConfirmation', { carType: selectedCar, payment: selectedPayment, price: selectedCarData?.price })}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#c9a96e', '#f0d78c', '#dfc07a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bookBtnGradient}>
              <Text style={styles.bookBtnText}>تأكيد الحجز • {selectedCarData?.price} ر.س</Text>
              <View style={styles.bookBtnArrow}><Ionicons name="arrow-back" size={18} color={COLORS.dark} /></View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

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
  headerTitle: { fontSize: SIZES.subtitle, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl' },
  mapContainer: { borderRadius: SIZES.radiusXl, overflow: 'hidden', marginBottom: SIZES.md, height: 220, borderWidth: 1, borderColor: 'rgba(201,169,110,0.1)' },
  mapGradient: { flex: 1, position: 'relative' },
  gridLineH: { position: 'absolute', width: '100%', height: 1, backgroundColor: 'rgba(201,169,110,0.04)' },
  gridLineV: { position: 'absolute', height: '100%', width: 1, backgroundColor: 'rgba(201,169,110,0.04)' },
  road: { position: 'absolute', backgroundColor: 'rgba(201,169,110,0.08)', borderRadius: 1 },
  routeLine: { position: 'absolute', top: '35%', left: '30%', width: '40%', height: 3, backgroundColor: COLORS.gold, borderRadius: 2, opacity: 0.4 },
  movingCar: { position: 'absolute', top: '38%' },
  pinA: { position: 'absolute', top: '28%', left: '25%', alignItems: 'center' },
  pinB: { position: 'absolute', top: '28%', right: '22%', alignItems: 'center' },
  pinDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 4 },
  pinLabel: { backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
  pinText: { fontSize: 9, color: COLORS.white, fontWeight: '600' },
  nearbyDriver: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(201,169,110,0.15)', alignItems: 'center', justifyContent: 'center' },
  pulseRing: { position: 'absolute', top: '26%', left: '21%', width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: '#4CAF50' },
  mapLabelBox: { position: 'absolute', bottom: 8, right: 8, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  mapLabel: { fontSize: 9, color: COLORS.gold, fontWeight: '600' },
  locationContainer: { backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: SIZES.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  locationRow: { flexDirection: 'row', gap: SIZES.md },
  locDots: { alignItems: 'center', paddingTop: 14, gap: 0 },
  locDotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50' },
  locLine: { width: 2, height: 30, backgroundColor: 'rgba(255,255,255,0.1)' },
  locDotRed: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF5252' },
  locInputs: { flex: 1 },
  locInputWrap: { flexDirection: 'row', alignItems: 'center', height: 44 },
  locInput: { flex: 1, color: COLORS.white, fontSize: SIZES.body, textAlign: 'right', writingDirection: 'rtl' },
  locBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(201,169,110,0.1)', alignItems: 'center', justifyContent: 'center' },
  locDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 2 },
  sectionTitle: { fontSize: SIZES.subtitle, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl', textAlign: 'right', marginBottom: SIZES.sm },
  carsRow: { gap: SIZES.sm, paddingBottom: SIZES.md },
  carCard: { width: 110, backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  carCardSelected: { borderColor: 'rgba(201,169,110,0.4)' },
  carIconBox: { width: 48, height: 48, borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.sm },
  carName: { fontSize: SIZES.body, fontWeight: '700', color: COLORS.white, writingDirection: 'rtl' },
  carNameEn: { fontSize: 10, color: COLORS.textMuted, marginBottom: 4 },
  carPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  carPrice: { fontSize: SIZES.title, fontWeight: '900', color: COLORS.white },
  carCurrency: { fontSize: 10, color: COLORS.textMuted },
  carTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  carTime: { fontSize: 10, color: COLORS.textMuted },
  carCheck: { position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  paymentGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SIZES.sm, marginBottom: SIZES.lg },
  paymentCard: { width: (width - SIZES.md * 2 - SIZES.sm * 2) / 3, backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: SIZES.sm, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.06)', gap: 4 },
  paymentCardSelected: { borderColor: 'rgba(201,169,110,0.4)', backgroundColor: 'rgba(201,169,110,0.05)' },
  paymentName: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' },
  paymentCheck: { position: 'absolute', top: 4, left: 4 },
  summaryCard: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: SIZES.md, borderWidth: 1, borderColor: 'rgba(201,169,110,0.1)' },
  summaryRow: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 10, color: COLORS.textMuted, writingDirection: 'rtl', marginTop: 2 },
  summaryValue: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.gold },
  summaryDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  bookBtn: { borderRadius: SIZES.radiusLg, overflow: 'hidden', shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14, elevation: 10 },
  bookBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SIZES.md + 4, gap: SIZES.sm },
  bookBtnText: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.dark },
  bookBtnArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(10,14,26,0.15)', alignItems: 'center', justifyContent: 'center' },
});
