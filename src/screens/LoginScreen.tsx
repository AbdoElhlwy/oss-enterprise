import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

interface LoginScreenProps {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <LinearGradient
      colors={[COLORS.dark, COLORS.navy, COLORS.deep]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-forward" size={24} color={COLORS.white} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['#c9a96e', '#f0d78c', '#c9a96e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoBox}
            >
              <Ionicons name="car-sport" size={28} color={COLORS.dark} />
            </LinearGradient>
            <Text style={styles.title}>
              {isLogin ? 'مرحباً بعودتك' : 'حساب جديد'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? 'سجّل دخولك للمتابعة'
                : 'أنشئ حسابك وابدأ رحلتك الأولى'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Ionicons name="person-outline" size={20} color={COLORS.gold} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="الاسم الكامل"
                  placeholderTextColor={COLORS.textMuted}
                  textAlign="right"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="call-outline" size={20} color={COLORS.gold} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="رقم الجوال"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                textAlign="right"
                value={phone}
                onChangeText={setPhone}
              />
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>966+</Text>
              </View>
            </View>

            {isLogin && (
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Ionicons name="lock-closed-outline" size={20} color={COLORS.gold} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="كلمة المرور"
                  placeholderTextColor={COLORS.textMuted}
                  secureTextEntry
                  textAlign="right"
                />
              </View>
            )}

            {/* Submit button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => navigation.navigate('Main')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#c9a96e', '#f0d78c', '#c9a96e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitBtnGradient}
              >
                <Text style={styles.submitBtnText}>
                  {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>أو</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social login */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-google" size={22} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={22} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* Toggle login/register */}
            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.toggleText}>
                {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
                <Text style={styles.toggleTextGold}>
                  {isLogin ? 'سجّل الآن' : 'سجّل دخول'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingTop: 60,
    paddingBottom: SIZES.xl,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: SIZES.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl + SIZES.md,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.lg,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SIZES.xs,
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    writingDirection: 'rtl',
  },
  form: {
    gap: SIZES.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: SIZES.radiusLg,
    paddingHorizontal: SIZES.md,
    height: 56,
  },
  inputIcon: {
    width: 36,
    height: 36,
    borderRadius: SIZES.radiusSm,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.sm,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: SIZES.body,
    paddingHorizontal: SIZES.sm,
    writingDirection: 'rtl',
  },
  countryCode: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    backgroundColor: 'rgba(201, 169, 110, 0.1)',
  },
  countryCodeText: {
    color: COLORS.gold,
    fontSize: SIZES.caption,
    fontWeight: '600',
  },
  submitBtn: {
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    marginTop: SIZES.sm,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtnGradient: {
    paddingVertical: SIZES.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: SIZES.bodyLg,
    fontWeight: '700',
    color: COLORS.dark,
    writingDirection: 'rtl',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: SIZES.caption,
    marginHorizontal: SIZES.md,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.md,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radiusLg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtn: {
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  toggleText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    writingDirection: 'rtl',
  },
  toggleTextGold: {
    color: COLORS.gold,
    fontWeight: '700',
  },
});
