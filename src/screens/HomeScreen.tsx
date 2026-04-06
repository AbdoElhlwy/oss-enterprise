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

const { width } = Dimensions.get('window');

const SERVICES = [
  { id: '1', icon: 'briefcase' as const, title: 'رجال الأعمال', subtitle: 'VIP', desc: 'سيارات فاخرة مع سائقين محترفين', color: '#c9a96e', gradient: ['#c9a96e', '#f0d78c'] as [string, string] },
  { id: '2', icon: 'woman' as const, title: 'خدمة السيدات', subtitle: 'سائقات فقط', desc: 'خصوصية وأمان تام', color: '#e88ca5', gradient: ['#e88ca5', '#f4b8c8'] as [string, string] },
  { id: '3', icon: 'moon' as const, title: 'نقل العمرة والحج', subtitle: 'مقدسة', desc: 'رحلات مريحة للأماكن المقدسة', color: '#7ecba1', gradient: ['#7ecba1', '#a8e6c3'] as [string, string] },
  { id: '4', icon: 'cube' as const, title: 'توصيل الطرود', subtitle: 'سريع', desc: 'توصيل آمن وسريع', color: '#6bb5f0', gradient: ['#6bb5f0', '#a0d4ff'] as [string, string] },
  { id: '5', icon: 'car' as const, title: 'نقل يومي', subtitle: 'داخل المدن', desc: 'تنقل يومي مريح وبأسعار منافسة', color: '#b58ef0', gradient: ['#b58ef0', '#d4b8ff'] as [string, string] },
  { id: '6', icon: 'airplane' as const, title: 'خدمة المطار', subtitle: 'استقبال وتوصيل', desc: 'من وإلى المطار بدقة', color: '#f0c06b', gradient: ['#f0c06b', '#ffe0a0'] as [string, string] },
  { id: '7', icon: 'leaf' as const, title: 'سيارات كهربائية', subtitle: 'Eco Ride', desc: 'صديقة للبيئة وموفرة', color: '#4ecdc4', gradient: ['#4ecdc4', '#7eddd6'] as [string, string] },
];

const QUICK_ACTIONS = [
  { icon: 'location' as const, label: 'أقرب سائق', sub: '3 دقائق' },
  { icon: 'time' as const, label: 'حجز مسبق', sub: 'جدولة رحلة' },
  { icon: 'gift' as const, label: 'العروض', sub: '3 عروض جديدة' },
  { icon: 'star' as const, label: 'المفضلة', sub: 'أماكنك' },
];

interface HomeScreenProps {
  navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void };
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const searchFade = useRef(new Animated.Value(0)).current;
  const quickFade = useRef(new Animated.Value(0)).current;
  const quickSlide = useRef(new Animated.Value(30)).current;
  const cardAnims = useRef(SERVICES.map(() => new Animated.Value(0))).current;
  const cardSlides = useRef(SERVICES.map(() => new Animated.Value(60))).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Header entrance
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    // Search bar
    Animated.timing(searchFade, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }).start();

    // Quick actions
    Animated.parallel([
      Animated.timing(quickFade, { toValue: 1, duration: 400, delay: 350, useNativeDriver: true }),
      Animated.timing(quickSlide, { toValue: 0, duration: 400, delay: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    // Staggered cards
    SERVICES.forEach((_, i) => {
      Animated.parallel([
        Animated.timing(cardAnims[i], { toValue: 1, duration: 500, delay: 450 + i * 80, useNativeDriver: true }),
        Animated.spring(cardSlides[i], { toValue: 0, delay: 450 + i * 80, friction: 7, tension: 50, useNativeDriver: true }),
      ]).start();
    });

    // Pulse for online indicator
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.3, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629']} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: headerSlide }] }]}>
          <TouchableOpacity style={styles.menuBtn}>
            <Ionicons name="menu" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>مرحباً بك في</Text>
            <View style={styles.brandRow}>
              <Text style={styles.brandName}>مدار</Text>
              <View style={styles.onlineBadge}>
                <Animated.View style={[styles.onlineDot, { transform: [{ scale: pulseAnim }] }]} />
                <Text style={styles.onlineText}>متصل</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </Animated.View>

        {/* Search */}
        <Animated.View style={[styles.searchContainer, { opacity: searchFade }]}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={COLORS.textMuted} />
            <TextInput style={styles.searchInput} placeholder="إلى أين تريد الذهاب؟" placeholderTextColor={COLORS.textMuted} value={searchText} onChangeText={setSearchText} />
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic" size={16} color={COLORS.gold} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickRow, { opacity: quickFade, transform: [{ translateY: quickSlide }] }]}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={styles.quickItem} activeOpacity={0.7}>
              <LinearGradient colors={['rgba(201,169,110,0.12)', 'rgba(201,169,110,0.04)']} style={styles.quickIcon}>
                <Ionicons name={action.icon} size={20} color={COLORS.gold} />
              </LinearGradient>
              <Text style={styles.quickLabel}>{action.label}</Text>
              <Text style={styles.quickSub}>{action.sub}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Promo Banner */}
        <Animated.View style={[styles.promoBanner, { opacity: quickFade }]}>
          <LinearGradient colors={['#c9a96e', '#f0d78c']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.promoGradient}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>خصم 30% على أول رحلة!</Text>
              <Text style={styles.promoSub}>استخدم كود: MADAR30</Text>
              <TouchableOpacity style={styles.promoBtn}>
                <Text style={styles.promoBtnText}>احجز الآن</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.promoIconWrap}>
              <Ionicons name="car-sport" size={50} color="rgba(10,14,26,0.2)" />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Services Section */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity><Text style={styles.seeAll}>عرض الكل</Text></TouchableOpacity>
          <Text style={styles.sectionTitle}>خدماتنا</Text>
        </View>

        {SERVICES.map((service, i) => (
          <Animated.View key={service.id} style={{ opacity: cardAnims[i], transform: [{ translateY: cardSlides[i] }] }}>
            <TouchableOpacity
              style={styles.serviceCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Booking', { serviceId: service.id, serviceTitle: service.title })}
            >
              <LinearGradient colors={['rgba(26,34,64,0.9)', 'rgba(26,34,64,0.6)']} style={styles.serviceCardInner}>
                <LinearGradient colors={service.gradient} style={[styles.serviceIconBox]}>
                  <Ionicons name={service.icon} size={26} color={COLORS.dark} />
                </LinearGradient>
                <View style={styles.serviceInfo}>
                  <View style={styles.serviceTitleRow}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <View style={[styles.serviceBadge, { backgroundColor: `${service.color}20` }]}>
                      <Text style={[styles.serviceBadgeText, { color: service.color }]}>{service.subtitle}</Text>
                    </View>
                  </View>
                  <Text style={styles.serviceDesc}>{service.desc}</Text>
                </View>
                <View style={styles.serviceArrow}>
                  <Ionicons name="chevron-back" size={18} color={COLORS.textMuted} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { num: '+50K', label: 'مستخدم نشط' },
            { num: '+1M', label: 'رحلة مكتملة' },
            { num: '4.9', label: 'تقييم المستخدمين' },
          ].map((s, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingBottom: SIZES.md },
  menuBtn: { width: 44, height: 44, borderRadius: SIZES.radius, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  greeting: { fontSize: SIZES.caption, color: COLORS.textMuted, writingDirection: 'rtl' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.sm },
  brandName: { fontSize: SIZES.title, fontWeight: '900', color: COLORS.gold, writingDirection: 'rtl' },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(76,175,80,0.12)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: SIZES.radiusFull },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50' },
  onlineText: { fontSize: 10, color: '#4CAF50', fontWeight: '600' },
  bellBtn: { width: 44, height: 44, borderRadius: SIZES.radius, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252' },
  searchContainer: { marginBottom: SIZES.md },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', paddingHorizontal: SIZES.md, height: 50, gap: SIZES.sm },
  searchInput: { flex: 1, color: COLORS.white, fontSize: SIZES.body, textAlign: 'right', writingDirection: 'rtl' },
  micBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(201,169,110,0.12)', alignItems: 'center', justifyContent: 'center' },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SIZES.lg },
  quickItem: { alignItems: 'center', flex: 1 },
  quickIcon: { width: 50, height: 50, borderRadius: SIZES.radiusLg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(201,169,110,0.1)', marginBottom: 6 },
  quickLabel: { fontSize: 11, color: COLORS.white, fontWeight: '600', writingDirection: 'rtl' },
  quickSub: { fontSize: 9, color: COLORS.textMuted, writingDirection: 'rtl' },
  promoBanner: { marginBottom: SIZES.lg, borderRadius: SIZES.radiusLg, overflow: 'hidden', shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 },
  promoGradient: { flexDirection: 'row', padding: SIZES.lg, borderRadius: SIZES.radiusLg },
  promoContent: { flex: 1, justifyContent: 'center' },
  promoTitle: { fontSize: SIZES.subtitle, fontWeight: '800', color: COLORS.dark, writingDirection: 'rtl', marginBottom: 4 },
  promoSub: { fontSize: SIZES.caption, color: 'rgba(10,14,26,0.6)', writingDirection: 'rtl', marginBottom: SIZES.sm },
  promoBtn: { backgroundColor: COLORS.dark, paddingHorizontal: SIZES.md, paddingVertical: 8, borderRadius: SIZES.radiusSm, alignSelf: 'flex-end' },
  promoBtnText: { fontSize: SIZES.caption, color: COLORS.gold, fontWeight: '700', writingDirection: 'rtl' },
  promoIconWrap: { justifyContent: 'center', paddingLeft: SIZES.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.md },
  sectionTitle: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl' },
  seeAll: { fontSize: SIZES.caption, color: COLORS.gold, fontWeight: '600' },
  serviceCard: { marginBottom: SIZES.sm, borderRadius: SIZES.radiusLg, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  serviceCardInner: { flexDirection: 'row', alignItems: 'center', padding: SIZES.md, gap: SIZES.md },
  serviceIconBox: { width: 52, height: 52, borderRadius: SIZES.radiusLg, alignItems: 'center', justifyContent: 'center' },
  serviceInfo: { flex: 1 },
  serviceTitleRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.sm, marginBottom: 4 },
  serviceTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.white, writingDirection: 'rtl' },
  serviceBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: SIZES.radiusSm },
  serviceBadgeText: { fontSize: 10, fontWeight: '700' },
  serviceDesc: { fontSize: SIZES.caption, color: COLORS.textSecondary, writingDirection: 'rtl' },
  serviceArrow: { paddingLeft: SIZES.xs },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: SIZES.lg, borderWidth: 1, borderColor: 'rgba(201,169,110,0.1)' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: SIZES.title, fontWeight: '900', color: COLORS.gold },
  statLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2, writingDirection: 'rtl' },
});
