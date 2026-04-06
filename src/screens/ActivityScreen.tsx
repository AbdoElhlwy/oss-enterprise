import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

const TRIPS = [
  { id: '1', from: 'حي الياسمين', to: 'مطار الملك خالد', date: 'اليوم، 2:30 م', price: '45', status: 'completed', type: 'VIP', rating: 5 },
  { id: '2', from: 'جامعة الملك سعود', to: 'الرياض بارك', date: 'أمس، 6:15 م', price: '22', status: 'completed', type: 'اقتصادي', rating: 4 },
  { id: '3', from: 'حي النرجس', to: 'مجمع العثيم', date: '3 أبريل، 10:00 ص', price: '18', status: 'completed', type: 'مريح', rating: 5 },
  { id: '4', from: 'فندق الريتز', to: 'الحرم المكي', date: '1 أبريل، 4:00 ص', price: '120', status: 'completed', type: 'عمرة', rating: 5 },
  { id: '5', from: 'حي الملقا', to: 'مستشفى الملك فيصل', date: '28 مارس، 9:30 ص', price: '30', status: 'cancelled', type: 'سيدات', rating: 0 },
];

const STATS = [
  { label: 'إجمالي الرحلات', value: '127', icon: 'car' as const },
  { label: 'المسافة الكلية', value: '1,842 كم', icon: 'speedometer' as const },
  { label: 'التوفير', value: '340 ر.س', icon: 'wallet' as const },
  { label: 'تقييمك', value: '4.9', icon: 'star' as const },
];

export default function ActivityScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const statsFade = useRef(new Animated.Value(0)).current;
  const statsSlide = useRef(new Animated.Value(30)).current;
  const cardAnims = useRef(TRIPS.map(() => new Animated.Value(0))).current;
  const cardSlides = useRef(TRIPS.map(() => new Animated.Value(40))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(statsFade, { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }),
      Animated.timing(statsSlide, { toValue: 0, duration: 500, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    TRIPS.forEach((_, i) => {
      Animated.parallel([
        Animated.timing(cardAnims[i], { toValue: 1, duration: 400, delay: 400 + i * 100, useNativeDriver: true }),
        Animated.spring(cardSlides[i], { toValue: 0, delay: 400 + i * 100, friction: 7, tension: 50, useNativeDriver: true }),
      ]).start();
    });
  }, []);

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629']} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: headerSlide }] }]}>
          <Text style={styles.headerTitle}>رحلاتي</Text>
          <Text style={styles.headerSub}>سجل رحلاتك وإحصائياتك</Text>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View style={[styles.statsGrid, { opacity: statsFade, transform: [{ translateY: statsSlide }] }]}>
          {STATS.map((stat, i) => (
            <LinearGradient key={i} colors={['rgba(26,34,64,0.9)', 'rgba(26,34,64,0.5)']} style={styles.statCard}>
              <View style={styles.statIconBox}>
                <Ionicons name={stat.icon} size={18} color={COLORS.gold} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </Animated.View>

        {/* Trips Section */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity><Text style={styles.filterText}>تصفية</Text></TouchableOpacity>
          <Text style={styles.sectionTitle}>آخر الرحلات</Text>
        </View>

        {TRIPS.map((trip, i) => (
          <Animated.View key={trip.id} style={{ opacity: cardAnims[i], transform: [{ translateY: cardSlides[i] }] }}>
            <TouchableOpacity style={styles.tripCard} activeOpacity={0.8}>
              <View style={styles.tripCardHeader}>
                <View style={[styles.typeBadge, trip.status === 'cancelled' && styles.typeBadgeCancelled]}>
                  <Text style={[styles.typeBadgeText, trip.status === 'cancelled' && { color: '#FF5252' }]}>
                    {trip.status === 'cancelled' ? 'ملغية' : trip.type}
                  </Text>
                </View>
                <Text style={styles.tripDate}>{trip.date}</Text>
              </View>

              <View style={styles.tripRoute}>
                <View style={styles.routeDots}>
                  <View style={styles.routeDotGreen} />
                  <View style={styles.routeLine} />
                  <View style={styles.routeDotRed} />
                </View>
                <View style={styles.routeTexts}>
                  <Text style={styles.routeFrom}>{trip.from}</Text>
                  <Text style={styles.routeTo}>{trip.to}</Text>
                </View>
              </View>

              <View style={styles.tripCardFooter}>
                <Text style={styles.tripPrice}>{trip.price} ر.س</Text>
                {trip.rating > 0 && (
                  <View style={styles.ratingRow}>
                    {[...Array(trip.rating)].map((_, j) => (
                      <Ionicons key={j} name="star" size={12} color="#FFD700" />
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.md },
  header: { paddingTop: 55, paddingBottom: SIZES.md, alignItems: 'center' },
  headerTitle: { fontSize: SIZES.titleLg, fontWeight: '900', color: COLORS.white, writingDirection: 'rtl' },
  headerSub: { fontSize: SIZES.caption, color: COLORS.textMuted, writingDirection: 'rtl', marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SIZES.sm, marginBottom: SIZES.lg },
  statCard: { width: '48%', flexGrow: 1, borderRadius: SIZES.radiusLg, padding: SIZES.md, borderWidth: 1, borderColor: 'rgba(201,169,110,0.08)', alignItems: 'center' },
  statIconBox: { width: 36, height: 36, borderRadius: SIZES.radius, backgroundColor: 'rgba(201,169,110,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.sm },
  statValue: { fontSize: SIZES.title, fontWeight: '900', color: COLORS.gold },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2, writingDirection: 'rtl' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.md },
  sectionTitle: { fontSize: SIZES.subtitle, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl' },
  filterText: { fontSize: SIZES.caption, color: COLORS.gold, fontWeight: '600' },
  tripCard: { backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: SIZES.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  tripCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.sm },
  typeBadge: { backgroundColor: 'rgba(201,169,110,0.12)', paddingHorizontal: SIZES.sm, paddingVertical: 3, borderRadius: SIZES.radiusSm },
  typeBadgeCancelled: { backgroundColor: 'rgba(255,82,82,0.12)' },
  typeBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.gold },
  tripDate: { fontSize: SIZES.caption, color: COLORS.textMuted },
  tripRoute: { flexDirection: 'row', gap: SIZES.sm, marginBottom: SIZES.sm },
  routeDots: { alignItems: 'center', paddingTop: 4 },
  routeDotGreen: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' },
  routeLine: { width: 1.5, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  routeDotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252' },
  routeTexts: { flex: 1, justifyContent: 'space-between' },
  routeFrom: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.white, writingDirection: 'rtl', textAlign: 'right' },
  routeTo: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.white, writingDirection: 'rtl', textAlign: 'right' },
  tripCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SIZES.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  tripPrice: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.gold },
  ratingRow: { flexDirection: 'row', gap: 2 },
});
