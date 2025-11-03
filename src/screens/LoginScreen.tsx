import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../type/type';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (isGoogleLogin) {
      console.log('Logging in with Google (email/password):', email, password);
    } else {
      console.log('Logging in with phone number:', mobileNumber);
    }
    navigation.navigate('Tabs');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>

        {!isGoogleLogin ? (
          <>
            <Text style={styles.label}>Enter your mobile number:</Text>

            <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="+1 Mobile number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />

            <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => setIsGoogleLogin(true)}
            >
              <Ionicons name="logo-google" size={22} color="#DB4437" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Sign in with Google</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
              <Text style={styles.continueButtonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsGoogleLogin(false)}>
              <Text style={styles.backText}>← Back to phone login</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already had an account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#111',
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#333',
  },
  flag: { fontSize: 20, marginRight: 8 },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  continueButton: {
    backgroundColor: '#00BCD4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    width: 30,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  backText: {
    marginTop: 15,
    fontSize: 15,
    color: '#00BCD4',
    textAlign: 'center',
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    marginTop: 20,
  },
  linkText: {
    color: '#00BCD4',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  registerText: { fontSize: 15, color: '#666' },
  registerLink: { fontSize: 15, color: '#00BCD4', fontWeight: 'bold' },
});

export default LoginScreen;
