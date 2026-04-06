import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';
import { SERVICES } from '../constants/services';

const { width, height } = Dimensions.get('window');

const CAR_OPTIONS = [
  { id: 'economy', name: 'اقتصادي', price: '15', time: '3 دقائق', icon: 'car-outline' as const },
  { id: 'comfort', name: 'مريح', price: '25', time: '5 دقائق', icon: 'car' as const },
  { id: 'vip', name: 'VIP', price: '45', time: '7 دقائق', icon: 'car-sport' as const },
];

interface BookingScreenProps {
  navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void; goBack: () => void };
  route: { params?: { serviceId?: string } };
}

export default function BookingScreen({ navigation, route }: BookingScreenProps) {
  const serviceId = route.params?.serviceId || 'daily';
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[4];
  const [selectedCar, setSelectedCar] = useState('comfort');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Map placeholder */}
      <View style={styles.mapPlaceholder}>
        <LinearGradient
          colors={[COLORS.navy, COLORS.deep, COLORS.card]}
          style={styles.mapGradient}
        >
          {/* Grid pattern to simulate map */}
          <View style={styles.mapGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <View key={`h-${i}`} style={[styles.mapGridLineH, { top: i * 40 }]} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`v-${i}`} style={[styles.mapGridLineV, { left: i * (width / 7) }]} />
            ))}
          </View>

          {/* User location marker */}
          <View style={styles.userMarker}>
            <View style={styles.userMarkerPulse} />
            <LinearGradient
              colors={['#c9a96e', '#f0d78c']}
              style={styles.userMarkerDot}
            >
              <Ionicons name="person" size={14} color={COLORS.dark} />
            </LinearGradient>
          </View>

          {/* Destination marker */}
          <View style={styles.destMarker}>
            <Ionicons name="location" size={32} color={COLORS.gold} />
          </View>

          {/* Route line */}
          <View style={styles.routeLine} />
        </LinearGradient>
      </View>

      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
      </TouchableOpacity>

      {/* Service badge */}
      <View style={[styles.serviceBadge, { backgroundColor: service.bgColor, borderColor: service.color + '40' }]}>
        <Text style={[styles.serviceBadgeText, { color: service.color }]}>
          {service.title}
        </Text>
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        {/* Location inputs */}
        <View style={styles.locationContainer}>
          <View style={styles.locationDots}>
            <View style={[styles.dot, { backgroundColor: COLORS.gold }]} />
            <View style={styles.dotLine} />
            <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
          </View>
          <View style={styles.locationInputs}>
            <View style={styles.locationInput}>
              <TextInput
                style={styles.locationText}
                placeholder="موقعك الحالي"
                placeholderTextColor={COLORS.textMuted}
                textAlign="right"
                defaultValue="حي العليا، الرياض"
              />
            </View>
            <View style={styles.locationDivider} />
            <View style={styles.locationInput}>
              <TextInput
                style={styles.locationText}
                placeholder="إلى أين؟"
                placeholderTextColor={COLORS.textMuted}
                textAlign="right"
              />
            </View>
          </View>
        </View>

        {/* Car options */}
        <View style={styles.carOptions}>
          {CAR_OPTIONS.map((car) => (
            <TouchableOpacity
              key={car.id}
              style={[
                styles.carOption,
                selectedCar === car.id && styles.carOptionSelected,
              ]}
              onPress={() => setSelectedCar(car.id)}
              activeOpacity={0.7}
            >
              <View style={styles.carOptionRight}>
                <Ionicons
                  name={car.icon}
                  size={24}
                  color={selectedCar === car.id ? COLORS.gold : COLORS.textSecondary}
                />
                <View>
                  <Text
                    style={[
                      styles.carName,
                      selectedCar === car.id && styles.carNameSelected,
                    ]}
                  >
                    {car.name}
                  </Text>
                  <Text style={styles.carTime}>{car.time}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.carPrice,
                  selectedCar === car.id && styles.carPriceSelected,
                ]}
              >
                {car.price} ر.س
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm button */}
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => navigation.navigate('RideConfirmation', { carType: selectedCar, serviceId })}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#c9a96e', '#f0d78c', '#c9a96e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmBtnGradient}
          >
            <Text style={styles.confirmBtnText}>تأكيد الرحلة</Text>
            <Ionicons name="checkmark-circle" size={22} color={COLORS.dark} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deep,
  },
  mapPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
  },
  mapGradient: {
    flex: 1,
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
  },
  mapGridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(201, 169, 110, 0.03)',
  },
  mapGridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(201, 169, 110, 0.03)',
  },
  userMarker: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarkerPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
  },
  userMarkerDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destMarker: {
    position: 'absolute',
    top: height * 0.12,
    left: width * 0.3,
  },
  routeLine: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.35,
    width: width * 0.25,
    height: 2,
    backgroundColor: 'rgba(201, 169, 110, 0.3)',
    transform: [{ rotate: '35deg' }],
  },
  backBtn: {
    position: 'absolute',
    top: 55,
    right: SIZES.lg,
    width: 44,
    height: 44,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(10, 14, 26, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  serviceBadge: {
    position: 'absolute',
    top: 55,
    left: SIZES.lg,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    zIndex: 10,
  },
  serviceBadgeText: {
    fontSize: SIZES.caption,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
    paddingBottom: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(201, 169, 110, 0.1)',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
    marginBottom: SIZES.lg,
  },
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  locationDots: {
    alignItems: 'center',
    paddingRight: SIZES.md,
    paddingVertical: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
  },
  locationInputs: {
    flex: 1,
  },
  locationInput: {
    paddingVertical: SIZES.sm,
  },
  locationText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    writingDirection: 'rtl',
  },
  locationDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  carOptions: {
    gap: SIZES.sm,
    marginBottom: SIZES.lg,
  },
  carOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  carOptionSelected: {
    borderColor: COLORS.goldBorder,
    backgroundColor: 'rgba(201, 169, 110, 0.08)',
  },
  carOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.md,
  },
  carName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
    writingDirection: 'rtl',
  },
  carNameSelected: {
    color: COLORS.white,
  },
  carTime: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  carPrice: {
    fontSize: SIZES.bodyLg,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  carPriceSelected: {
    color: COLORS.gold,
  },
  confirmBtn: {
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  confirmBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md + 2,
    gap: SIZES.sm,
  },
  confirmBtnText: {
    fontSize: SIZES.bodyLg,
    fontWeight: '700',
    color: COLORS.dark,
    writingDirection: 'rtl',
  },
});
