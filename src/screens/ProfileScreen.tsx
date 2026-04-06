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

interface ProfileScreenProps {
  navigation: { navigate: (screen: string) => void };
}

const MENU_ITEMS = [
  { icon: 'wallet-outline' as const, label: 'المحفظة', badge: '150 ر.س' },
  { icon: 'car-outline' as const, label: 'رحلاتي' },
  { icon: 'heart-outline' as const, label: 'الأماكن المفضلة' },
  { icon: 'card-outline' as const, label: 'طرق الدفع' },
  { icon: 'gift-outline' as const, label: 'العروض والأكواد' },
  { icon: 'people-outline' as const, label: 'ادعُ صديق واحصل على خصم' },
  { icon: 'settings-outline' as const, label: 'الإعدادات' },
  { icon: 'help-circle-outline' as const, label: 'المساعدة والدعم' },
  { icon: 'document-text-outline' as const, label: 'الشروط والأحكام' },
];

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[COLORS.dark, COLORS.navy]}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['#c9a96e', '#f0d78c']}
            style={styles.avatar}
          >
            <Ionicons name="person" size={32} color={COLORS.dark} />
          </LinearGradient>
          <Text style={styles.name}>عبدالرحمن</Text>
          <Text style={styles.phone}>+966 50 123 4567</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>رحلة</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>التقييم</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>VIP</Text>
              <Text style={styles.statLabel}>العضوية</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="chevron-back" size={18} color={COLORS.textMuted} />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <View style={styles.menuItemRight}>
                <Text style={styles.menuItemLabel}>{item.label}</Text>
                <View style={styles.menuItemIcon}>
                  <Ionicons name={item.icon} size={20} color={COLORS.gold} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>

        <Text style={styles.version}>مدار MADAR v1.0.0</Text>
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
    paddingBottom: SIZES.xl,
    borderBottomLeftRadius: SIZES.radiusXl,
    borderBottomRightRadius: SIZES.radiusXl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  name: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.white,
    writingDirection: 'rtl',
  },
  phone: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: SIZES.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: SIZES.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
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
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  menuContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.md,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: SIZES.radiusSm,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: SIZES.body,
    color: COLORS.white,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  badge: {
    backgroundColor: 'rgba(201, 169, 110, 0.15)',
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  badgeText: {
    fontSize: SIZES.caption,
    color: COLORS.gold,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.sm,
    marginTop: SIZES.xl,
    paddingVertical: SIZES.md,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    fontSize: SIZES.body,
    color: COLORS.error,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  version: {
    textAlign: 'center',
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginTop: SIZES.lg,
  },
});
