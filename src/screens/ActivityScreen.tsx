import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

const RIDES = [
  {
    id: '1',
    from: 'حي العليا',
    to: 'مطار الملك خالد',
    date: 'اليوم، 2:30 م',
    price: '45 ر.س',
    status: 'completed',
    type: 'airport',
    icon: 'airplane' as const,
  },
  {
    id: '2',
    from: 'حي الملقا',
    to: 'حي النخيل',
    date: 'أمس، 9:15 ص',
    price: '18 ر.س',
    status: 'completed',
    type: 'daily',
    icon: 'car' as const,
  },
  {
    id: '3',
    from: 'فندق الريتز كارلتون',
    to: 'مركز الملك عبدالله المالي',
    date: '3 أبريل، 7:00 م',
    price: '65 ر.س',
    status: 'completed',
    type: 'vip',
    icon: 'briefcase' as const,
  },
  {
    id: '4',
    from: 'حي الورود',
    to: 'حي العليا',
    date: '2 أبريل، 11:30 ص',
    price: '22 ر.س',
    status: 'cancelled',
    type: 'daily',
    icon: 'car' as const,
  },
  {
    id: '5',
    from: 'حي السليمانية',
    to: 'المسجد الحرام',
    date: '1 أبريل، 5:00 ص',
    price: '350 ر.س',
    status: 'completed',
    type: 'hajj',
    icon: 'moon' as const,
  },
];

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[COLORS.dark, COLORS.navy]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>رحلاتي</Text>
        <Text style={styles.headerSub}>سجل جميع رحلاتك</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>رحلة مكتملة</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValueGold}>2,340 ر.س</Text>
            <Text style={styles.statLabel}>إجمالي الإنفاق</Text>
          </View>
        </View>

        {/* Rides list */}
        {RIDES.map((ride) => (
          <TouchableOpacity key={ride.id} style={styles.rideCard} activeOpacity={0.7}>
            <View style={styles.rideHeader}>
              <View style={styles.rideIconBox}>
                <Ionicons name={ride.icon} size={18} color={COLORS.gold} />
              </View>
              <View style={styles.rideHeaderRight}>
                <View style={styles.rideTopRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      ride.status === 'cancelled' && styles.statusCancelled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        ride.status === 'cancelled' && styles.statusTextCancelled,
                      ]}
                    >
                      {ride.status === 'completed' ? 'مكتملة' : 'ملغية'}
                    </Text>
                  </View>
                  <Text style={styles.rideDate}>{ride.date}</Text>
                </View>
              </View>
            </View>

            <View style={styles.rideRoute}>
              <View style={styles.routeDots}>
                <View style={[styles.routeDot, { backgroundColor: COLORS.gold }]} />
                <View style={styles.routeLine} />
                <View style={[styles.routeDot, { backgroundColor: COLORS.success }]} />
              </View>
              <View style={styles.routeTexts}>
                <Text style={styles.routeFrom}>{ride.from}</Text>
                <Text style={styles.routeTo}>{ride.to}</Text>
              </View>
            </View>

            <View style={styles.rideFooter}>
              <TouchableOpacity style={styles.rebookBtn}>
                <Text style={styles.rebookText}>إعادة الحجز</Text>
              </TouchableOpacity>
              <Text style={styles.ridePrice}>{ride.price}</Text>
            </View>
          </TouchableOpacity>
        ))}

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
    paddingTop: 60,
    paddingBottom: SIZES.lg,
    paddingHorizontal: SIZES.lg,
    borderBottomLeftRadius: SIZES.radiusXl,
    borderBottomRightRadius: SIZES.radiusXl,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  headerSub: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    writingDirection: 'rtl',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
    marginBottom: SIZES.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statValue: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.white,
  },
  statValueGold: {
    fontSize: SIZES.subtitle,
    fontWeight: '800',
    color: COLORS.gold,
  },
  statLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginTop: 2,
    writingDirection: 'rtl',
  },
  rideCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  rideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  rideIconBox: {
    width: 36,
    height: 36,
    borderRadius: SIZES.radiusSm,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.sm,
  },
  rideHeaderRight: {
    flex: 1,
  },
  rideTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rideDate: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    writingDirection: 'rtl',
    textAlign: 'right',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
  },
  statusCancelled: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
  },
  statusText: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '700',
  },
  statusTextCancelled: {
    color: COLORS.error,
  },
  rideRoute: {
    flexDirection: 'row',
    marginBottom: SIZES.md,
  },
  routeDots: {
    alignItems: 'center',
    marginLeft: SIZES.md,
    paddingVertical: 2,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
  },
  routeTexts: {
    flex: 1,
    justifyContent: 'space-between',
  },
  routeFrom: {
    fontSize: SIZES.body,
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  routeTo: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: SIZES.sm,
  },
  ridePrice: {
    fontSize: SIZES.bodyLg,
    fontWeight: '800',
    color: COLORS.gold,
  },
  rebookBtn: {
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  rebookText: {
    fontSize: SIZES.caption,
    color: COLORS.gold,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
});
