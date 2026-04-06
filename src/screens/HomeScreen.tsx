import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';
import { SERVICES } from '../constants/services';

const { width } = Dimensions.get('window');

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  briefcase: 'briefcase',
  person: 'person',
  'star-crescent': 'moon',
  cube: 'cube',
  car: 'car',
  airplane: 'airplane',
  leaf: 'leaf',
};

interface HomeScreenProps {
  navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void };
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[COLORS.dark, COLORS.navy]}
        style={styles.headerGradient}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.menuBtn}>
            <Ionicons name="menu" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>مدار</Text>
            <View style={styles.logoIcon}>
              <Ionicons name="car-sport" size={18} color={COLORS.dark} />
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>مرحباً بك</Text>
          <Text style={styles.greetingSub}>إلى أين تريد الذهاب اليوم؟</Text>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Booking', { serviceId: 'daily' })}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={20} color={COLORS.gold} />
          <Text style={styles.searchText}>ابحث عن وجهتك...</Text>
          <View style={styles.searchDivider} />
          <Ionicons name="location" size={18} color={COLORS.gold} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Booking', { serviceId: 'daily' })}
          >
            <LinearGradient
              colors={['#c9a96e', '#f0d78c']}
              style={styles.quickActionIcon}
            >
              <Ionicons name="navigate" size={22} color={COLORS.dark} />
            </LinearGradient>
            <Text style={styles.quickActionText}>رحلة الآن</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.cardLight }]}>
              <Ionicons name="time" size={22} color={COLORS.gold} />
            </View>
            <Text style={styles.quickActionText}>حجز مسبق</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Booking', { serviceId: 'parcels' })}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.cardLight }]}>
              <Ionicons name="cube" size={22} color={COLORS.gold} />
            </View>
            <Text style={styles.quickActionText}>طرد</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Booking', { serviceId: 'airport' })}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: COLORS.cardLight }]}>
              <Ionicons name="airplane" size={22} color={COLORS.gold} />
            </View>
            <Text style={styles.quickActionText}>مطار</Text>
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity>
            <Text style={styles.seeAll}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>خدماتنا</Text>
        </View>

        <View style={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('Booking', { serviceId: service.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.serviceIconBox, { backgroundColor: service.bgColor }]}>
                <Ionicons
                  name={ICON_MAP[service.icon] || 'car'}
                  size={24}
                  color={service.color}
                />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc} numberOfLines={2}>
                {service.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo banner */}
        <LinearGradient
          colors={['rgba(201, 169, 110, 0.15)', 'rgba(201, 169, 110, 0.05)']}
          style={styles.promoBanner}
        >
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>رحلتك الأولى مجاناً!</Text>
            <Text style={styles.promoDesc}>
              استخدم كود MADAR2024 واحصل على خصم 100%
            </Text>
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>استخدم الكود</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.promoIcon}>
            <Ionicons name="gift" size={50} color={COLORS.gold} />
          </View>
        </LinearGradient>

        {/* Recent rides */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity>
            <Text style={styles.seeAll}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>رحلاتك الأخيرة</Text>
        </View>

        <View style={styles.recentRide}>
          <View style={styles.recentRideRight}>
            <Text style={styles.recentRideTitle}>الرياض - المطار</Text>
            <Text style={styles.recentRideDate}>أمس، 3:30 م</Text>
          </View>
          <View style={styles.recentRideIcon}>
            <Ionicons name="airplane" size={20} color={COLORS.gold} />
          </View>
        </View>

        <View style={styles.recentRide}>
          <View style={styles.recentRideRight}>
            <Text style={styles.recentRideTitle}>حي العليا - حي الملقا</Text>
            <Text style={styles.recentRideDate}>أول أمس، 9:00 ص</Text>
          </View>
          <View style={styles.recentRideIcon}>
            <Ionicons name="car" size={20} color={COLORS.gold} />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deep,
  },
  headerGradient: {
    paddingTop: 55,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    borderBottomLeftRadius: SIZES.radiusXl,
    borderBottomRightRadius: SIZES.radiusXl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.lg,
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: SIZES.title,
    fontWeight: '900',
    color: COLORS.gold,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  greetingContainer: {
    alignItems: 'flex-end',
    marginBottom: SIZES.lg,
  },
  greeting: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  greetingSub: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    writingDirection: 'rtl',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.2)',
    borderRadius: SIZES.radiusLg,
    paddingHorizontal: SIZES.md,
    height: 52,
    gap: SIZES.sm,
  },
  searchText: {
    flex: 1,
    color: COLORS.textMuted,
    fontSize: SIZES.body,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  searchDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xl,
  },
  quickAction: {
    alignItems: 'center',
    gap: SIZES.sm,
    width: (width - SIZES.lg * 2 - SIZES.md * 3) / 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: '800',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  seeAll: {
    fontSize: SIZES.caption,
    color: COLORS.gold,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
    marginBottom: SIZES.xl,
  },
  serviceCard: {
    width: (width - SIZES.lg * 2 - SIZES.sm) / 2,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  serviceIconBox: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.sm,
    alignSelf: 'flex-end',
  },
  serviceTitle: {
    fontSize: SIZES.body,
    fontWeight: '700',
    color: COLORS.white,
    writingDirection: 'rtl',
    textAlign: 'right',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: 16,
  },
  promoBanner: {
    flexDirection: 'row',
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.xl,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  promoTitle: {
    fontSize: SIZES.bodyLg,
    fontWeight: '800',
    color: COLORS.gold,
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  promoDesc: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    writingDirection: 'rtl',
    textAlign: 'right',
    marginBottom: SIZES.sm,
  },
  promoBtn: {
    backgroundColor: 'rgba(201, 169, 110, 0.2)',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  promoBtnText: {
    fontSize: SIZES.caption,
    color: COLORS.gold,
    fontWeight: '700',
  },
  promoIcon: {
    justifyContent: 'center',
    paddingLeft: SIZES.md,
  },
  recentRide: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  recentRideRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  recentRideTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  recentRideDate: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    writingDirection: 'rtl',
    marginTop: 2,
  },
  recentRideIcon: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.md,
  },
});
