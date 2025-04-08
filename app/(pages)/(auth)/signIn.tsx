import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { signIn, getCurrentUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const scrollViewRef = useRef<ScrollView>(null); // Reference to ScrollView
  const passwordInputRef = useRef<TextInput>(null); // Reference to Password Input

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email.toLowerCase(), form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      navigation.replace('TabLayout');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToPassword = () => {
    scrollViewRef.current?.scrollTo({
      y: 100, // Adjust this value based on the layout to focus on the password field
      animated: true,
    });
  };

  const backgroundImage =
    colorScheme === 'dark'
      ? require('@/public/MapDark.webp') // Dark mode map
      : require('@/public/MapLight.webp'); // Light mode map

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Image
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            <Image
              source={require('@/public/Icon.png')} // Replace with your logo path
              resizeMode="contain"
              style={styles.logo}
            />

            <Text style={[styles.title, { color: themeColors.text }]}>Welcome to Green Roots!</Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: themeColors.icon }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: themeColors.cardBackground, color: themeColors.text },
                ]}
                value={form.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor={themeColors.icon}
                returnKeyType="next"
                onSubmitEditing={() => {
                  scrollToPassword(); // Scroll to the password field
                  passwordInputRef.current?.focus(); // Focus the password input
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: themeColors.icon }]}>Password</Text>
              <TextInput
                ref={passwordInputRef}
                style={[
                  styles.input,
                  { backgroundColor: themeColors.cardBackground, color: themeColors.text },
                ]}
                value={form.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
                placeholder="Enter your password"
                placeholderTextColor={themeColors.icon}
                onFocus={scrollToPassword} // Scroll when the password field is focused
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: themeColors.AuthButton }]}
              onPress={handleSignIn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={themeColors.text} />
              ) : (
                <Text style={[styles.buttonText, { color: themeColors.background }]}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={[styles.footerText, { color: themeColors.icon }]}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                <Text style={[styles.footerLink, { color: themeColors.AuthButton }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '130%',
    height: '130%',
    opacity: 0.2
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    paddingTop: '20%',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default SignIn;
