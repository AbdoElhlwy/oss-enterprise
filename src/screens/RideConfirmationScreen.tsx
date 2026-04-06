import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

interface RideConfirmationScreenProps {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
  route: { params?: { carType?: string; serviceId?: string } };
}

const CAR_NAMES: Record<string, string> = {
  economy: 'اقتصادي',
  comfort: 'مريح',
  vip: 'VIP',
};

const CAR_PRICES: Record<string, string> = {
  economy: '15',
  comfort: '25',
  vip: '45',
};

export default function RideConfirmationScreen({ navigation, route }: RideConfirmationScreenProps) {
  const carType = route.params?.carType || 'comfort';
  const [searching, setSearching] = useState(true);
  const [driverFound, setDriverFound] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearching(false);
      setDriverFound(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.dark, COLORS.navy, COLORS.deep]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {searching ? 'جاري البحث...' : 'تم العثور على سائق!'}
        </Text>
        <View style={{ width: 44 }} />
      </View>

      {searching ? (
        /* Searching animation */
        <View style={styles.searchingContainer}>
          <View style={styles.searchingCircle}>
            <View style={styles.searchingPulse1} />
            <View style={styles.searchingPulse2} />
            <LinearGradient
              colors={['#c9a96e', '#f0d78c']}
              style={styles.searchingIcon}
            >
              <Ionicons name="car-sport" size={32} color={COLORS.dark} />
            </LinearGradient>
          </View>
          <ActivityIndicator size="large" color={COLORS.gold} style={{ marginTop: SIZES.xl }} />
          <Text style={styles.searchingText}>
            جاري البحث عن سائق قريب منك...
          </Text>
          <Text style={styles.searchingSubText}>
            {CAR_NAMES[carType]} • {CAR_PRICES[carType]} ر.س
          </Text>
        </View>
      ) : (
        /* Driver found */
        <View style={styles.driverContainer}>
          {/* Driver card */}
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <LinearGradient
                colors={['#c9a96e', '#f0d78c']}
                style={styles.avatarGradient}
              >
                <Ionicons name="person" size={32} color={COLORS.dark} />
              </LinearGradient>
            </View>
            <Text style={styles.driverName}>أحمد محمد</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>4.9</Text>
              <Ionicons name="star" size={14} color={COLORS.gold} />
              <Text style={styles.tripsText}>• 2,340 رحلة</Text>
            </View>

            {/* Car info */}
            <View style={styles.carInfoRow}>
              <View style={styles.carInfoItem}>
                <Text style={styles.carInfoLabel}>السيارة</Text>
                <Text style={styles.carInfoValue}>كامري 2024</Text>
              </View>
              <View style={styles.carInfoDivider} />
              <View style={styles.carInfoItem}>
                <Text style={styles.carInfoLabel}>اللوحة</Text>
                <Text style={styles.carInfoValue}>ABC 1234</Text>
              </View>
              <View style={styles.carInfoDivider} />
              <View style={styles.carInfoItem}>
                <Text style={styles.carInfoLabel}>اللون</Text>
                <Text style={styles.carInfoValue}>أبيض</Text>
              </View>
            </View>
          </View>

          {/* Trip summary */}
          <View style={styles.tripSummary}>
            <View style={styles.tripRow}>
              <Text style={styles.tripValue}>3 دقائق</Text>
              <View style={styles.tripRowRight}>
                <Text style={styles.tripLabel}>وقت الوصول</Text>
                <Ionicons name="time-outline" size={18} color={COLORS.gold} />
              </View>
            </View>
            <View style={styles.tripDivider} />
            <View style={styles.tripRow}>
              <Text style={styles.tripValueGold}>{CAR_PRICES[carType]} ر.س</Text>
              <View style={styles.tripRowRight}>
                <Text style={styles.tripLabel}>التكلفة</Text>
                <Ionicons name="cash-outline" size={18} color={COLORS.gold} />
              </View>
            </View>
            <View style={styles.tripDivider} />
            <View style={styles.tripRow}>
              <Text style={styles.tripValue}>Apple Pay</Text>
              <View style={styles.tripRowRight}>
                <Text style={styles.tripLabel}>طريقة الدفع</Text>
                <Ionicons name="card-outline" size={18} color={COLORS.gold} />
              </View>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-ellipses" size={22} color={COLORS.gold} />
              <Text style={styles.actionBtnText}>محادثة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="call" size={22} color={COLORS.gold} />
              <Text style={styles.actionBtnText}>اتصال</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-social" size={22} color={COLORS.gold} />
              <Text style={styles.actionBtnText}>مشاركة</Text>
            </TouchableOpacity>
          </View>

          {/* Cancel button */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.cancelBtnText}>إلغاء الرحلة</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 55,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: '700',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  searchingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  searchingCircle: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchingPulse1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(201, 169, 110, 0.08)',
  },
  searchingPulse2: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(201, 169, 110, 0.12)',
  },
  searchingIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchingText: {
    fontSize: SIZES.bodyLg,
    color: COLORS.white,
    fontWeight: '600',
    marginTop: SIZES.lg,
    writingDirection: 'rtl',
  },
  searchingSubText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  driverContainer: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
  },
  driverCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusXl,
    padding: SIZES.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    marginBottom: SIZES.lg,
  },
  driverAvatar: {
    marginBottom: SIZES.md,
  },
  avatarGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  driverName: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.white,
    writingDirection: 'rtl',
    marginBottom: SIZES.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SIZES.lg,
  },
  ratingText: {
    fontSize: SIZES.body,
    fontWeight: '700',
    color: COLORS.gold,
  },
  tripsText: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginLeft: SIZES.xs,
  },
  carInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  carInfoItem: {
    alignItems: 'center',
  },
  carInfoLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    writingDirection: 'rtl',
    marginBottom: 2,
  },
  carInfoValue: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
  },
  carInfoDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tripSummary: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.sm,
  },
  tripRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  tripLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    writingDirection: 'rtl',
  },
  tripValue: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
  },
  tripValueGold: {
    fontSize: SIZES.bodyLg,
    fontWeight: '800',
    color: COLORS.gold,
  },
  tripDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.md,
    marginBottom: SIZES.lg,
  },
  actionBtn: {
    width: (width - SIZES.lg * 2 - SIZES.md * 2) / 3,
    alignItems: 'center',
    gap: SIZES.xs,
    backgroundColor: 'rgba(201, 169, 110, 0.08)',
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  actionBtnText: {
    fontSize: SIZES.caption,
    color: COLORS.gold,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: SIZES.md,
  },
  cancelBtnText: {
    fontSize: SIZES.body,
    color: COLORS.error,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
});
