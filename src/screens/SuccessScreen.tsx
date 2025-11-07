import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import type { RootStackParamList } from "../type/type"

type SuccessNavigationProp = NativeStackNavigationProp<RootStackParamList>

const SuccessScreen = () => {
  const navigation = useNavigation<SuccessNavigationProp>()
  const route = useRoute()

  const bookingDetails = (route.params as any) || {
    referenceNumber: "00000072697027",
    bookingDate: "09-05-2023",
    bookingTime: "05:40 AM",
    paymentMethod: "Credit card",
    amount: 30,
  }

  const handleViewBooking = () => {
    navigation.navigate("Tabs", {
      screen: "Bookings",
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={60} color="#fff" />
          </View>
        </View>

        {/* Success Title */}
        <Text style={styles.successTitle}>Payment success!</Text>

        {/* Booking Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ref number</Text>
            <Text style={styles.detailValue}>{bookingDetails.referenceNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{bookingDetails.bookingDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{bookingDetails.bookingTime}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment method</Text>
            <Text style={styles.detailValue}>{bookingDetails.paymentMethod}</Text>
          </View>

          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>${bookingDetails.amount}</Text>
          </View>
        </View>

        {/* PDF Receipt Button */}
        <TouchableOpacity style={styles.pdfButton}>
          <Ionicons name="download" size={20} color="#00BCD4" />
          <Text style={styles.pdfButtonText}>Get PDF receipt</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* View Booking Button - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.viewBookingButton} onPress={handleViewBooking}>
          <Text style={styles.viewBookingButtonText}>View booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 32,
    textAlign: "center",
  },
  detailsCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: "#fafafa",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  pdfButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00BCD4",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 24,
  },
  pdfButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00BCD4",
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  viewBookingButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  viewBookingButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
})

export default SuccessScreen
