import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

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
      // Replace with your sign-in logic (e.g., API call)
      console.log('Signing in with:', form);
      Alert.alert('Success', 'Signed in successfully');

      // Navigate to the home page after successful sign-in
      navigation.navigate('TabLayout'); // Update with your navigation route
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>

      <View style={styles.formContainer}>
        <Image
          source={require('@/public/Icon.png')} // Replace with your logo path
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={[styles.title, { color: themeColors.text }]}>Log in to Your Account</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: themeColors.icon }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.cardBackground, color: themeColors.text }]}
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor={themeColors.icon}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: themeColors.icon }]}>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.cardBackground, color: themeColors.text }]}
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor={themeColors.icon}
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
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.footerLink, { color: themeColors.AuthButton }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
