import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: { navigate: (screen: string) => void; goBack: () => void };
}

type AuthMode = 'login' | 'register' | 'otp';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const formFade = useRef(new Animated.Value(0)).current;
  const formSlide = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(formFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(formSlide, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  useEffect(() => {
    if (mode === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [mode, otpTimer]);

  const switchMode = (newMode: AuthMode) => {
    Animated.sequence([
      Animated.timing(formFade, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(formFade, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    setMode(newMode);
    if (newMode === 'otp') setOtpTimer(60);
  };

  const handleSubmit = () => {
    if (mode === 'login' || mode === 'register') {
      switchMode('otp');
    } else {
      navigation.navigate('Main');
    }
  };

  const renderOTPInput = () => (
    <View style={styles.otpContainer}>
      <View style={styles.otpIconWrap}>
        <LinearGradient colors={['rgba(201,169,110,0.2)', 'rgba(201,169,110,0.05)']} style={styles.otpIconBg}>
          <Ionicons name="phone-portrait" size={32} color={COLORS.gold} />
        </LinearGradient>
      </View>
      <Text style={styles.otpTitle}>التحقق من رقم الجوال</Text>
      <Text style={styles.otpDesc}>أدخل الرمز المرسل إلى {'\n'}+966 {phone || '5X XXX XXXX'}</Text>
      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <View key={i} style={[styles.otpBox, digit ? styles.otpBoxActive : null]}>
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(val) => {
                const newOtp = [...otp];
                newOtp[i] = val;
                setOtp(newOtp);
              }}
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
        ))}
      </View>
      <View style={styles.otpTimerRow}>
        {otpTimer > 0 ? (
          <Text style={styles.otpTimerText}>إعادة الإرسال بعد {otpTimer} ثانية</Text>
        ) : (
          <TouchableOpacity onPress={() => setOtpTimer(60)}>
            <Text style={styles.otpResend}>إعادة إرسال الرمز</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      {mode === 'register' && (
        <>
          <Text style={styles.inputLabel}>الاسم الكامل</Text>
          <View style={styles.inputWrap}>
            <TextInput style={styles.input} placeholder="مثال: أحمد محمد" placeholderTextColor={COLORS.textMuted} value={name} onChangeText={setName} />
            <View style={styles.inputIcon}><Ionicons name="person-outline" size={18} color={COLORS.gold} /></View>
          </View>

          <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
          <View style={styles.inputWrap}>
            <TextInput style={styles.input} placeholder="example@email.com" placeholderTextColor={COLORS.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <View style={styles.inputIcon}><Ionicons name="mail-outline" size={18} color={COLORS.gold} /></View>
          </View>
        </>
      )}

      <Text style={styles.inputLabel}>رقم الجوال</Text>
      <View style={styles.inputWrap}>
        <TextInput style={[styles.input, { paddingRight: 80 }]} placeholder="5XX XXX XXXX" placeholderTextColor={COLORS.textMuted} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <View style={styles.countryCode}>
          <Text style={styles.countryFlag}>🇸🇦</Text>
          <Text style={styles.countryText}>966+</Text>
        </View>
      </View>

      <Text style={styles.inputLabel}>كلمة المرور</Text>
      <View style={styles.inputWrap}>
        <TouchableOpacity style={styles.inputIconLeft} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={COLORS.textMuted} />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={COLORS.textMuted} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
        <View style={styles.inputIcon}><Ionicons name="lock-closed-outline" size={18} color={COLORS.gold} /></View>
      </View>

      {mode === 'register' && (
        <TouchableOpacity style={styles.termsRow} onPress={() => setAgreedToTerms(!agreedToTerms)}>
          <Text style={styles.termsText}>أوافق على <Text style={styles.termsLink}>الشروط والأحكام</Text> و <Text style={styles.termsLink}>سياسة الخصوصية</Text></Text>
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxActive]}>
            {agreedToTerms && <Ionicons name="checkmark" size={14} color={COLORS.dark} />}
          </View>
        </TouchableOpacity>
      )}

      {mode === 'login' && (
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#050810', '#0a0e1a', '#0f1629']} style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => mode === 'otp' ? switchMode('login') : navigation.goBack()}>
            <Ionicons name="arrow-forward" size={22} color={COLORS.white} />
          </TouchableOpacity>

          {/* Logo */}
          <Animated.View style={[styles.logoArea, { opacity: fadeAnim, transform: [{ scale: logoScale }, { translateY: slideAnim }] }]}>
            <LinearGradient colors={['#c9a96e', '#f0d78c']} style={styles.logoIcon}>
              <Ionicons name="car-sport" size={28} color={COLORS.dark} />
            </LinearGradient>
            <Text style={styles.headerTitle}>
              {mode === 'login' ? 'مرحباً بعودتك' : mode === 'register' ? 'إنشاء حساب جديد' : 'التحقق من الهوية'}
            </Text>
            <Text style={styles.headerSub}>
              {mode === 'login' ? 'سجل دخولك للمتابعة' : mode === 'register' ? 'انضم لعائلة مدار اليوم' : 'خطوة أخيرة للتأكد من هويتك'}
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={{ opacity: formFade, transform: [{ translateY: formSlide }] }}>
            {mode === 'otp' ? renderOTPInput() : renderLoginForm()}

            {/* Submit */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
              <LinearGradient colors={['#c9a96e', '#f0d78c', '#dfc07a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitGradient}>
                <Text style={styles.submitText}>
                  {mode === 'login' ? 'تسجيل الدخول' : mode === 'register' ? 'إنشاء الحساب' : 'تأكيد الرمز'}
                </Text>
                <Ionicons name="arrow-back" size={18} color={COLORS.dark} />
              </LinearGradient>
            </TouchableOpacity>

            {mode !== 'otp' && (
              <>
                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>أو التسجيل بواسطة</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social logins */}
                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                    <Ionicons name="logo-google" size={22} color="#DB4437" />
                    <Text style={styles.socialText}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                    <Ionicons name="logo-apple" size={22} color={COLORS.white} />
                    <Text style={styles.socialText}>Apple</Text>
                  </TouchableOpacity>
                </View>

                {/* Switch mode */}
                <TouchableOpacity style={styles.switchBtn} onPress={() => switchMode(mode === 'login' ? 'register' : 'login')}>
                  <Text style={styles.switchText}>
                    {mode === 'login' ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
                    <Text style={styles.switchLink}>{mode === 'login' ? 'سجل الآن' : 'تسجيل الدخول'}</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.lg, paddingTop: 55, paddingBottom: 40 },
  backBtn: { width: 44, height: 44, borderRadius: SIZES.radius, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  logoArea: { alignItems: 'center', marginVertical: SIZES.xl },
  logoIcon: { width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.md, shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  headerTitle: { fontSize: SIZES.titleLg, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl', textAlign: 'center' },
  headerSub: { fontSize: SIZES.body, color: COLORS.textSecondary, writingDirection: 'rtl', marginTop: 4 },
  formContainer: { marginBottom: SIZES.md },
  inputLabel: { fontSize: SIZES.caption, color: COLORS.textSecondary, writingDirection: 'rtl', textAlign: 'right', marginBottom: 6, marginTop: SIZES.md, fontWeight: '600' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', height: 52, paddingHorizontal: SIZES.md },
  input: { flex: 1, color: COLORS.white, fontSize: SIZES.body, textAlign: 'right', writingDirection: 'rtl', height: '100%' },
  inputIcon: { marginLeft: SIZES.sm },
  inputIconLeft: { marginRight: SIZES.sm },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(201,169,110,0.1)', paddingHorizontal: SIZES.sm, paddingVertical: 4, borderRadius: SIZES.radiusSm, marginLeft: SIZES.xs },
  countryFlag: { fontSize: 16 },
  countryText: { fontSize: SIZES.caption, color: COLORS.gold, fontWeight: '700' },
  termsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: SIZES.md, gap: SIZES.sm },
  termsText: { fontSize: SIZES.caption, color: COLORS.textSecondary, writingDirection: 'rtl', flex: 1, textAlign: 'right' },
  termsLink: { color: COLORS.gold, fontWeight: '600' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  forgotBtn: { alignSelf: 'flex-end', marginTop: SIZES.sm },
  forgotText: { fontSize: SIZES.caption, color: COLORS.gold, fontWeight: '600' },
  submitBtn: { borderRadius: SIZES.radiusLg, overflow: 'hidden', marginTop: SIZES.lg, shadowColor: '#c9a96e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14, elevation: 10 },
  submitGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SIZES.md + 2, gap: SIZES.sm },
  submitText: { fontSize: SIZES.bodyLg, fontWeight: '800', color: COLORS.dark },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: SIZES.lg, gap: SIZES.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  dividerText: { fontSize: SIZES.caption, color: COLORS.textMuted, writingDirection: 'rtl' },
  socialRow: { flexDirection: 'row', gap: SIZES.sm },
  socialBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SIZES.sm, paddingVertical: SIZES.md, backgroundColor: COLORS.card, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  socialText: { fontSize: SIZES.body, color: COLORS.white, fontWeight: '600' },
  switchBtn: { alignItems: 'center', marginTop: SIZES.lg },
  switchText: { fontSize: SIZES.body, color: COLORS.textSecondary, writingDirection: 'rtl' },
  switchLink: { color: COLORS.gold, fontWeight: '700' },
  // OTP styles
  otpContainer: { alignItems: 'center', marginVertical: SIZES.lg },
  otpIconWrap: { marginBottom: SIZES.lg },
  otpIconBg: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  otpTitle: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.white, writingDirection: 'rtl', marginBottom: SIZES.sm },
  otpDesc: { fontSize: SIZES.body, color: COLORS.textSecondary, textAlign: 'center', writingDirection: 'rtl', lineHeight: 22 },
  otpRow: { flexDirection: 'row', gap: SIZES.sm, marginTop: SIZES.xl, direction: 'ltr' },
  otpBox: { width: 48, height: 56, borderRadius: SIZES.radius, backgroundColor: COLORS.card, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  otpBoxActive: { borderColor: COLORS.gold, backgroundColor: 'rgba(201,169,110,0.08)' },
  otpInput: { fontSize: SIZES.title, color: COLORS.white, textAlign: 'center', fontWeight: '700', width: '100%', height: '100%' },
  otpTimerRow: { marginTop: SIZES.lg },
  otpTimerText: { fontSize: SIZES.body, color: COLORS.textMuted, writingDirection: 'rtl' },
  otpResend: { fontSize: SIZES.body, color: COLORS.gold, fontWeight: '700', writingDirection: 'rtl' },
});
