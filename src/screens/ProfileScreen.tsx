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

const MENU_SECTIONS = [
  {
    title: 'الحساب',
    items: [
      { icon: 'person-outline' as const, label: 'معلوماتي الشخصية', sub: 'الاسم، الإيميل، الجوال' },
      { icon: 'wallet-outline' as const, label: 'المحفظة', sub: 'الرصيد: 250 ر.س', badge: '250 ر.س' },
      { icon: 'card-outline' as const, label: 'طرق الدفع', sub: 'Apple Pay, مدى, Visa' },
      { icon: 'location-outline' as const, label: 'العناوين المحفوظة', sub: 'المنزل، العمل، المطار' },
    ],
  },
  {
    title: 'الخدمات',
    items: [
      { icon: 'gift-outline' as const, label: 'العروض والخصومات', sub: '3 عروض متاحة', badge: '3' },
      { icon: 'people-outline' as const, label: 'دعوة أصدقاء', sub: 'اكسب 20 ر.س لكل صديق' },
      { icon: 'ribbon-outline' as const, label: 'برنامج الولاء', sub: 'المستوى: ذهبي' },
      { icon: 'business-outline' as const, label: 'حساب الشركات', sub: 'ربط حساب شركتك' },
    ],
  },
  {
    title: 'الإعدادات',
    items: [
      { icon: 'language-outline' as const, label: 'اللغة', sub: 'العربية' },
      { icon: 'notifications-outline' as const, label: 'الإشعارات', sub: 'مفعّلة' },
      { icon: 'shield-checkmark-outline' as const, label: 'الأمان والخصوصية', sub: 'التحقق بخطوتين' },
      { icon: 'help-circle-outline' as const, label: 'المساعدة والدعم', sub: 'تواصل معنا 24/7' },
      { icon: 'document-text-outline' as const, label: 'الشروط والأحكام', sub: '' },
      { icon: 'information-circle-outline' as const, label: 'عن مدار', sub: 'الإصدار 1.0.0' },
    ],
  },
];

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const profileSlide = useRef(new Animated.Value(-30)).current;
  const profileScale = useRef(new Animated.Value(0.8)).current;
  const sectionAnims = useRef(MENU_SECTIONS.map(() => new Animated.Value(0))).current;
  const sectionSlides = useRef(MENU_SECTIONS.map(() => new Animated.Value(30))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(profileSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.spring(profileScale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }),
    ]).start();

    MENU_SECTIONS.forEach((_, i) => {
      Animated.parallel([
        Animated.timing(sectionAnims[i], { toValue: 1, duration: 400, delay: 300 + i * 150, useNativeDriver: true }),
        Animated.timing(sectionSlides[i], { toValue: 0, duration: 400, delay: 300 + i * 150, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    });
  }, []);

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629']} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Animated.View style={[styles.profileHeader, { opacity: fadeAnim, transform: [{ translateY: profileSlide }] }]}>
          <Animated.View style={[styles.avatarContainer, { transform: [{ scale: profileScale }] }]}>
            <LinearGradient colors={['#c9a96e', '#f0d78c']} style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.dark} />
            </LinearGradient>
            <View style={styles.levelBadge}>
              <Ionicons name="diamond" size={10} color={COLORS.dark} />
              <Text style={styles.levelText}>ذهبي</Text>
            </View>
          </Animated.View>

          <Text style={styles.profileName}>أحمد محمد العتيبي</Text>
          <Text style={styles.profilePhone}>+966 5XX XXX XXXX</Text>
          <Text style={styles.profileEmail}>ahmed@email.com</Text>

          <View style={styles.profileStats}>
            <View style={styles.profileStatItem}>
              <Text style={styles.profileStatNum}>127</Text>
              <Text style={styles.profileStatLabel}>رحلة</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStatItem}>
              <Text style={styles.profileStatNum}>4.9</Text>
              <Text style={styles.profileStatLabel}>تقييم</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStatItem}>
              <Text style={styles.profileStatNum}>250</Text>
              <Text style={styles.profileStatLabel}>ر.س رصيد</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.7}>
            <LinearGradient colors={['rgba(201,169,110,0.15)', 'rgba(201,169,110,0.05)']} style={styles.editProfileGrad}>
              <Ionicons name="create-outline" size={16} color={COLORS.gold} />
              <Text style={styles.editProfileText}>تعديل الملف الشخصي</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section, si) => (
          <Animated.View key={si} style={[styles.menuSection, { opacity: sectionAnims[si], transform: [{ translateY: sectionSlides[si] }] }]}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, ii) => (
                <TouchableOpacity key={ii} style={[styles.menuItem, ii < section.items.length - 1 && styles.menuItemBorder]} activeOpacity={0.7}>
                  <View style={styles.menuIconBox}>
                    <Ionicons name={item.icon} size={20} color={COLORS.gold} />
                  </View>
                  <View style={styles.menuTextCol}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.sub ? <Text style={styles.menuSub}>{item.sub}</Text> : null}
                  </View>
                  {item.badge && (
                    <View style={styles.menuBadge}>
                      <Text style={styles.menuBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-back" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#FF5252" />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>مدار MADAR • الإصدار 1.0.0</Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.md },
  profileHeader: { alignItems: 'center', paddingTop: 55, paddingBottom: SIZES.lg },
  avatarContainer: { marginBottom: SIZES.md },
  avatar: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  levelBadge: { position: 'absolute', bottom: -4, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: COLORS.gold, paddingHorizontal: 10, paddingVertical: 3, borderRadius: SIZES.radiusFull, alignSelf: 'center' },
  levelText: { fontSize: 10, fontWeight: '800', color: COLORS.dark },
  profileName: { fontSize: SIZES.title, fontWeight: '900', color: COLORS.white, writingDirection: 'rtl' },
  profilePhone: { fontSize: SIZES.body, color: COLORS.textSecondary, marginTop: 4, direction: 'ltr' },
  profileEmail: { fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: 2 },
  profileStats: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginTop: SIZES.md, borderWidth: 1, borderColor: 'rgba(201,169,110,0.1)', gap: SIZES.md },
  profileStatItem: { flex: 1, alignItems: 'center' },
  profileStatNum: { fontSize: SIZES.title, fontWeight: '900', color: COLORS.gold },
  profileStatLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2, writingDirection: 'rtl' },
  profileStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  editProfileBtn: { marginTop: SIZES.md, borderRadius: SIZES.radiusLg, overflow: 'hidden' },
  editProfileGrad: { flexDirection: 'row', alignItems: 'center', gap: SIZES.sm, paddingHorizontal: SIZES.lg, paddingVertical: SIZES.sm + 2, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(201,169,110,0.2)' },
  editProfileText: { fontSize: SIZES.body, color: COLORS.gold, fontWeight: '600', writingDirection: 'rtl' },
  menuSection: { marginBottom: SIZES.md },
  menuSectionTitle: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl', textAlign: 'right', marginBottom: SIZES.sm },
  menuCard: { backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: SIZES.md, gap: SIZES.md },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  menuIconBox: { width: 36, height: 36, borderRadius: SIZES.radius, backgroundColor: 'rgba(201,169,110,0.08)', alignItems: 'center', justifyContent: 'center' },
  menuTextCol: { flex: 1, alignItems: 'flex-end' },
  menuLabel: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.white, writingDirection: 'rtl' },
  menuSub: { fontSize: SIZES.caption, color: COLORS.textMuted, writingDirection: 'rtl', marginTop: 1 },
  menuBadge: { backgroundColor: 'rgba(201,169,110,0.15)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: SIZES.radiusSm },
  menuBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.gold },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SIZES.sm, paddingVertical: SIZES.md, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(255,82,82,0.2)', backgroundColor: 'rgba(255,82,82,0.04)', marginTop: SIZES.sm },
  logoutText: { fontSize: SIZES.body, fontWeight: '700', color: '#FF5252', writingDirection: 'rtl' },
  versionText: { fontSize: SIZES.caption, color: COLORS.textMuted, textAlign: 'center', marginTop: SIZES.md },
});
