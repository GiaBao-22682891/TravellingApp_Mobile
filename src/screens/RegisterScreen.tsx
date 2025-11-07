import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native"
import { useNavigation, type NavigationProp } from "@react-navigation/native"
import type { RootStackParamList } from "../type/type"

type AuthMode = "phone" | "google"

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [authMode, setAuthMode] = useState<AuthMode>("phone")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [phonePassword, setPhonePassword] = useState("")
  const [phoneConfirmPassword, setPhoneConfirmPassword] = useState("")
  const [googleEmail, setGoogleEmail] = useState("")
  const [googlePassword, setGooglePassword] = useState("")
  const [googleConfirmPassword, setGoogleConfirmPassword] = useState("")

  const handlePhoneContinue = () => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      mobileNumber.trim() &&
      phonePassword.trim() &&
      phoneConfirmPassword.trim()
    ) {
      if (phonePassword !== phoneConfirmPassword) {
        Alert.alert("Error", "Passwords do not match")
        return
      }
      console.log("Continuing with phone:", { firstName, lastName, mobileNumber, phonePassword })
      navigation.navigate("Login")
    } else {
      Alert.alert("Error", "Please fill in all fields")
    }
  }

  const handleGoogleSignIn = () => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      googleEmail.trim() &&
      googlePassword.trim() &&
      googleConfirmPassword.trim()
    ) {
      if (googlePassword !== googleConfirmPassword) {
        Alert.alert("Error", "Passwords do not match")
        return
      }
      console.log("Signing in with Google:", { firstName, lastName, googleEmail, googlePassword })
      navigation.navigate("Login")
    } else {
      Alert.alert("Error", "Please fill in all fields")
    }
  }

  const toggleAuthMode = (mode: AuthMode) => {
    setAuthMode(mode)
    if (mode === "google") {
      setMobileNumber("")
      setPhonePassword("")
      setPhoneConfirmPassword("")
    } else {
      setGoogleEmail("")
      setGooglePassword("")
      setGoogleConfirmPassword("")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Create an account</Text>

          <View style={styles.nameContainer}>
              <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#bbb"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#bbb"
            />
          </View>
          

          {authMode === "phone" ? (
            <>
              {/* Phone Number Section */}
              <Text style={styles.label}>Enter your mobile number:</Text>

              <TextInput
                style={styles.input}
                placeholder="Mobile number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#bbb"
              />

              {/* Password Input Field */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={phonePassword}
                onChangeText={setPhonePassword}
                secureTextEntry
                placeholderTextColor="#bbb"
              />

              {/* Confirm Password Input Field */}
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={phoneConfirmPassword}
                onChangeText={setPhoneConfirmPassword}
                secureTextEntry
                placeholderTextColor="#bbb"
              />

              {/* Continue Button */}
              <TouchableOpacity style={styles.continueButton} onPress={handlePhoneContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Login Button */}
              <TouchableOpacity
                style={[styles.socialButton, styles.googleButton]}
                onPress={() => toggleAuthMode("google")}
              >
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Google Login Section */}
              <View style={styles.googleSection}>
                <Text style={styles.googleSectionTitle}>Sign in with Google</Text>

                {/* Email Input Field */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={googleEmail}
                  onChangeText={setGoogleEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#bbb"
                />

                {/* Password Input Field */}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={googlePassword}
                  onChangeText={setGooglePassword}
                  secureTextEntry
                  placeholderTextColor="#bbb"
                />

                {/* Confirm Password Input Field */}
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={googleConfirmPassword}
                  onChangeText={setGoogleConfirmPassword}
                  secureTextEntry
                  placeholderTextColor="#bbb"
                />

                {/* Sign In Button */}
                <TouchableOpacity style={styles.continueButton} onPress={handleGoogleSignIn}>
                  <Text style={styles.continueButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Back to Phone Button */}
                <TouchableOpacity
                  style={[styles.socialButton, styles.phoneBackButton]}
                  onPress={() => toggleAuthMode("phone")}
                >
                  <Text style={styles.phoneBackButtonText}>Sign in with phone number</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Terms and Conditions */}
          <Text style={styles.termsText}>
            By signing up, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already had an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1a1a1a",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    fontWeight: "500",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  phoneInput: {
    flex: 1,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  googleSection: {
    marginBottom: 20,
  },
  googleSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  continueButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#ddd",
  },
  googleButton: {
    borderColor: "#ddd",
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    color: "#EA4335",
  },
  googleButtonText: {
    color: "#EA4335",
    fontSize: 16,
    fontWeight: "600",
  },
  phoneBackButton: {
    borderColor: "#00BCD4",
  },
  phoneBackButtonText: {
    color: "#00BCD4",
    fontSize: 16,
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    marginTop: 20,
    lineHeight: 20,
  },
  linkText: {
    color: "#00BCD4",
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
  },
  loginText: {
    fontSize: 15,
    color: "#666",
  },
  loginLink: {
    fontSize: 15,
    color: "#00BCD4",
    fontWeight: "600",
    marginLeft: 5,
  },
})

export default RegisterScreen
