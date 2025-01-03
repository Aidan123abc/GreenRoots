import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignUp = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Refs for input fields and scroll
  const scrollViewRef = useRef<ScrollView>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const scrollToField = (yPosition: number) => {
    scrollViewRef.current?.scrollTo({
      y: yPosition,
      animated: true,
    });
  };

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const result = await createUser(form.email.toLowerCase(), form.password, form.username);
      setUser(result);
      setIsLogged(true);
      console.log(result);

      navigation.replace('TabLayout');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const backgroundImage =
  colorScheme === 'dark'
    ? require('@/public/MapDark.webp') // Dark mode map
    : require('@/public/MapLight.webp'); // Light mode map

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
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
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('@/public/Icon.png')} // Replace with your logo path
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={[styles.title, { color: themeColors.text }]}>Create an Account</Text>

          {/* Username Field */}
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.cardBackground, color: themeColors.text }]}
            placeholder="Username"
            placeholderTextColor={themeColors.icon}
            value={form.username}
            onChangeText={(value) => setForm({ ...form, username: value })}
            returnKeyType="next"
            onSubmitEditing={() => {
              scrollToField(100); // Adjust based on layout
              emailInputRef.current?.focus();
            }}
          />

          {/* Email Field */}
          <TextInput
            ref={emailInputRef}
            style={[styles.input, { backgroundColor: themeColors.cardBackground, color: themeColors.text }]}
            placeholder="Email"
            placeholderTextColor={themeColors.icon}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            returnKeyType="next"
            onSubmitEditing={() => {
              scrollToField(200); // Adjust based on layout
              passwordInputRef.current?.focus();
            }}
          />

          {/* Password Field */}
          <TextInput
            ref={passwordInputRef}
            style={[styles.input, { backgroundColor: themeColors.cardBackground, color: themeColors.text }]}
            placeholder="Password"
            placeholderTextColor={themeColors.icon}
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.button,
              isSubmitting ? styles.buttonDisabled : { backgroundColor: themeColors.AuthButton },
            ]}
            onPress={submit}
            disabled={isSubmitting}
          >
            <Text style={[styles.buttonText, { color: themeColors.background }]}>
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Navigation to Login */}
          <View style={styles.footerContainer}>
            <Text style={[styles.footerText, { color: themeColors.icon }]}>Already have an account?</Text>
            <Text
              style={[styles.footerLink, { color: themeColors.AuthButton }]}
              onPress={() => navigation.replace('SignIn')}
            >
              Log In
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    paddingTop: '20%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '130%',
    height: '130%',
    opacity: 0.2
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#5A5A5A',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  footerLink: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default SignUp;
