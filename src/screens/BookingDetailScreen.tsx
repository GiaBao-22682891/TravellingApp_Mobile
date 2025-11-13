import { useState } from "react"
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../context/UserContext"
import type { RootStackParamList, Accommodation } from "../type/type"

type BookingNavigationProp = NativeStackNavigationProp<RootStackParamList, "BookingDetail">
type BookingRouteProp = RouteProp<RootStackParamList, "BookingDetail">
const API_URL = "http://localhost:3000"

const BookingDetailScreen = () => {
  const navigation = useNavigation<BookingNavigationProp>()
  const route = useRoute<BookingRouteProp>()
  const { currentUser } = useUser()

  const accommodation = route.params.accommodation as Accommodation

  const [paymentOption, setPaymentOption] = useState<"full" | "partial">("full")
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash")
  const [isLoading, setIsLoading] = useState(false)

  // Price calculation
  const basePrice = accommodation?.price ?? 0
  const kayakFee = 5
  const parkingFee = 5
  const totalPrice = basePrice + kayakFee + parkingFee

  const handleBookingSubmit = async () => {
    if (!accommodation || !currentUser) {
      Alert.alert("Error", "You must be logged in to book.")
      return
    }

    setIsLoading(true)

    try {
      const referenceNumber = String(Math.floor(Math.random() * 10000000000000)).padStart(14, "0")
      const now = new Date()
      const bookingDate = now.toLocaleDateString("en-US")
      const bookingTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      const paymentMethodDisplay = paymentMethod === "card" ? "Credit card" : "Cash"

      const newBooking = {
        userId: currentUser.id,
        accommodationId: accommodation.id,
        title: accommodation.title,
        price: accommodation.price,
        image: accommodation.image,
        paymentOption,
        paymentMethod: paymentMethodDisplay,
        bookingDate,
        bookingTime,
        referenceNumber,
        totalAmount: totalPrice,
      }

      // ✅ Post booking to backend
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      })

      if (!res.ok) {
        throw new Error("Failed to save booking")
      }

      const createdBooking = await res.json()

      // ✅ Navigate to success screen
      navigation.navigate("Success", {
        bookingId: createdBooking.id,
        referenceNumber,
        bookingDate,
        bookingTime,
        paymentMethod: paymentMethodDisplay,
        amount: totalPrice,
        accommodationId: accommodation.id,
        userId: currentUser.id,
      })
    } catch (error) {
      console.error("[BookingDetail] Booking error:", error)
      Alert.alert("Error", "Failed to complete booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  if (!accommodation) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
        </TouchableOpacity>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
        <Text style={styles.headerTitle}>Confirm and Pay</Text>

        {/* Accommodation Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.priceDisplay}>${accommodation.price}/night</Text>
            <Text style={styles.accommodationTitle}>{accommodation.title}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.rating}>{accommodation.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Image source={{ uri: accommodation.image }} style={styles.summaryImage} />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={[styles.paymentMethodOption, paymentMethod === "cash" && styles.paymentMethodSelected]}
            onPress={() => setPaymentMethod("cash")}
          >
            <View style={styles.radioButton}>{paymentMethod === "cash" && <View style={styles.radioButtonInner} />}</View>
            <View style={styles.paymentMethodContent}>
              <Ionicons name="wallet" size={24} color="#00BCD4" />
              <Text style={styles.paymentMethodTitle}>Cash</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentMethodOption, paymentMethod === "card" && styles.paymentMethodSelected]}
            onPress={() => setPaymentMethod("card")}
          >
            <View style={styles.radioButton}>{paymentMethod === "card" && <View style={styles.radioButtonInner} />}</View>
            <View style={styles.paymentMethodContent}>
              <Ionicons name="card" size={24} color="#00BCD4" />
              <Text style={styles.paymentMethodTitle}>Credit Card</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>

          <View style={styles.priceDetail}>
            <Text style={styles.priceDetailLabel}>Base Price</Text>
            <Text style={styles.priceDetailValue}>${basePrice}</Text>
          </View>
          <View style={styles.priceDetail}>
            <Text style={styles.priceDetailLabel}>Kayak Fee</Text>
            <Text style={styles.priceDetailValue}>${kayakFee}</Text>
          </View>
          <View style={styles.priceDetail}>
            <Text style={styles.priceDetailLabel}>Parking Fee</Text>
            <Text style={styles.priceDetailValue}>${parkingFee}</Text>
          </View>
          <View style={[styles.priceDetail, styles.totalPrice]}>
            <Text style={styles.totalPriceLabel}>Total (USD)</Text>
            <Text style={styles.totalPriceValue}>${totalPrice}</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.bookButton, isLoading && styles.bookButtonDisabled]}
          onPress={handleBookingSubmit}
          disabled={isLoading}
        >
          <Text style={styles.bookButtonText}>{isLoading ? "Processing..." : "Book Now"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: { position: "absolute", top: 40, left: 16, backgroundColor: "#fff", borderRadius: 24, padding: 8, zIndex: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
  scrollContent: { paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#1a1a1a", textAlign: "center", marginBottom: 16, marginHorizontal: 16 },
  summaryCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  summaryContent: { flex: 1 },
  priceDisplay: { fontSize: 18, fontWeight: "700", color: "#00BCD4", marginBottom: 4 },
  accommodationTitle: { fontSize: 14, fontWeight: "600", color: "#1a1a1a", marginBottom: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  rating: { fontSize: 13, fontWeight: "600", color: "#1a1a1a" },
  summaryImage: { width: 80, height: 80, borderRadius: 8 },
  section: { paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1a1a1a", marginBottom: 12 },
  paymentMethodOption: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  paymentMethodSelected: { backgroundColor: "#f9fafb", marginHorizontal: -16, paddingHorizontal: 16 },
  radioButton: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#ddd", justifyContent: "center", alignItems: "center", marginRight: 12, marginTop: 2 },
  radioButtonInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#00BCD4" },
  paymentMethodContent: { flexDirection: "row", alignItems: "center", gap: 12, marginLeft: 12 },
  paymentMethodTitle: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  priceDetail: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  priceDetailLabel: { fontSize: 13, color: "#666" },
  priceDetailValue: { fontSize: 13, fontWeight: "600", color: "#1a1a1a" },
  totalPrice: { borderBottomWidth: 0, paddingTop: 12, marginTop: 8 },
  totalPriceLabel: { fontSize: 14, fontWeight: "700", color: "#1a1a1a" },
  totalPriceValue: { fontSize: 14, fontWeight: "700", color: "#1a1a1a" },
  bottomContainer: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#f0f0f0", backgroundColor: "#fff" },
  bookButton: { backgroundColor: "#00BCD4", paddingVertical: 14, borderRadius: 8, alignItems: "center" },
  bookButtonDisabled: { opacity: 0.6 },
  bookButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 16, color: "#666" },
})

export default BookingDetailScreen
