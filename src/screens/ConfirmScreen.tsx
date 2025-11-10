import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"

const API_URL = "http://localhost:3000"

const ConfirmScreen = ({ navigation, route }: any) => {
  const [guestName, setGuestName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const {currentUser} = useUser()

  const accommodation = route?.params?.accommodation || {
    name: "Luxury Beach Villa",
    price: 250,
    nights: 3,
  }

const handleConfirmBooking = async () => {
  if (!currentUser) {
    alert("You must be logged in to book")
    return
  }

  const newBooking = {
    userId: currentUser.id, // make sure you have user context
    accomodationId: accommodation.accomodationId,
    bookingDate: new Date().toLocaleDateString(),
    bookingTime: new Date().toLocaleTimeString(),
    paymentMethod: "Credit Card", // or whatever
    totalPrice: accommodation.price * accommodation.nights,
    guestName,
    email,
    phone,
  }

  try {
    // Send booking to backend (json-server or real API)
    await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })

    // Navigate to success screen and pass booking details
    navigation.navigate("Success", { booking: newBooking })
  } catch (err) {
    console.error(err)
    alert("Failed to create booking")
  }
}

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Accommodation</Text>
            <Text style={styles.summaryValue}>{accommodation.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{accommodation.nights} Nights</Text>
          </View>
          <View style={[styles.summaryRow, styles.priceRow]}>
            <Text style={styles.summaryLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>${accommodation.price * accommodation.nights}</Text>
          </View>
        </View>

        {/* Guest Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={guestName}
              onChangeText={setGuestName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Special Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Requests</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Let the host know if you have any special requests..."
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
            textAlignVertical="top"
          />
        </View>

        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <View style={styles.policyBox}>
            <Ionicons name="information-circle" size={20} color="#FF5A5F" />
            <Text style={styles.policyText}>
              Free cancellation up to 7 days before check-in. After that, full refund not applicable.
            </Text>
          </View>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.termsCheckbox} onPress={() => setAgreeTerms(!agreeTerms)}>
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, !agreeTerms && styles.confirmButtonDisabled]}
          onPress={handleConfirmBooking}
          disabled={!agreeTerms}
        >
          <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  summaryCard: {
    backgroundColor: "#FFF5F4",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFD7D0",
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF5A5F",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#FFD7D0",
  },
  priceRow: {
    borderBottomWidth: 0,
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#666",
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF5A5F",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 10,
  },
  policyBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFF5F4",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFD7D0",
  },
  policyText: {
    flex: 1,
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  termsCheckbox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#FF5A5F",
    borderColor: "#FF5A5F",
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  termsLink: {
    color: "#FF5A5F",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  confirmButton: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#ddd",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ConfirmScreen
