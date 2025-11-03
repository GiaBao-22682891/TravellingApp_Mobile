import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const BookingDetailScreen = ({ navigation, route }: any) => {
  const booking = route?.params?.booking || {
    id: "BK001",
    accommodation: "Luxury Beach Villa",
    location: "Bali, Indonesia",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guests: 2,
    totalPrice: 750,
    status: "confirmed",
    bookingDate: "2024-01-10",
    confirmationNumber: "CONF-12345",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#4CAF50"
      case "pending":
        return "#FF9800"
      case "cancelled":
        return "#f44336"
      default:
        return "#999"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "CONFIRMED"
      case "pending":
        return "PENDING"
      case "cancelled":
        return "CANCELLED"
      default:
        return "UNKNOWN"
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
          </View>
          <Text style={styles.confirmationNumber}>Confirmation: {booking.confirmationNumber}</Text>
        </View>

        {/* Accommodation Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accommodation</Text>
          <View style={styles.infoCard}>
            <Ionicons name="home" size={24} color="#FF5A5F" />
            <View style={{ flex: 1 }}>
              <Text style={styles.accommodationName}>{booking.accommodation}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={14} color="#666" />
                <Text style={styles.locationText}>{booking.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Booking Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates & Guests</Text>
          <View style={styles.datesGrid}>
            <View style={styles.dateCard}>
              <Text style={styles.dateLabel}>Check In</Text>
              <Text style={styles.dateValue}>{booking.checkIn}</Text>
              <Text style={styles.dateTime}>From 2:00 PM</Text>
            </View>
            <View style={styles.dateCard}>
              <Text style={styles.dateLabel}>Check Out</Text>
              <Text style={styles.dateValue}>{booking.checkOut}</Text>
              <Text style={styles.dateTime}>Until 11:00 AM</Text>
            </View>
          </View>
          <View style={styles.guestsRow}>
            <Ionicons name="people" size={20} color="#FF5A5F" />
            <Text style={styles.guestsText}>{booking.guests} Guests</Text>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>3 Nights × $250</Text>
              <Text style={styles.priceValue}>$750</Text>
            </View>
            <View style={[styles.priceRow, styles.priceDivider]}>
              <Text style={styles.priceLabel}>Taxes & Fees</Text>
              <Text style={styles.priceValue}>Included</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalValue}>${booking.totalPrice}</Text>
            </View>
          </View>
        </View>

        {/* Guest Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Information</Text>
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>John Doe</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>john@example.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+1 (555) 000-0000</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Contact Host</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="document" size={20} color="#FF5A5F" />
            <Text style={styles.secondaryButtonText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  statusCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  confirmationNumber: {
    fontSize: 12,
    color: "#999",
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
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  accommodationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#666",
  },
  datesGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  dateCard: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  dateLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 11,
    color: "#666",
  },
  guestsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  guestsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  priceBreakdown: {
    gap: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceDivider: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF5A5F",
  },
  infoBox: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f9f9f9",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF5A5F",
  },
  secondaryButtonText: {
    color: "#FF5A5F",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default BookingDetailScreen
