"use client"

import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { dataService } from "../../services/DataService"

const BookingScreen = () => {
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    // Simulating user ID 1 - in real app would come from auth
    const data = dataService.getBookingsByUser(1)
    setBookings(data)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "#FF5A5F"
      case "completed":
        return "#4CAF50"
      case "cancelled":
        return "#999"
      default:
        return "#666"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Upcoming"
      case "completed":
        return "Completed"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming")
  const completedBookings = bookings.filter((b) => b.status === "completed")

  const BookingCard = ({ booking }: { booking: any }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardTop}>
        <View>
          <Text style={styles.bookingTitle}>{"Accommodation " + booking.accommodationId}</Text>
          <Text style={styles.bookingLocation}>
            <Ionicons name="location" size={12} color="#666" /> Check-in: {booking.checkIn}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + "20" }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {getStatusText(booking.status)}
          </Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>Check-in</Text>
          <Text style={styles.dateText}>{booking.checkIn}</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="#ccc" />
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>Check-out</Text>
          <Text style={styles.dateText}>{booking.checkOut}</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.nightsText}>{booking.nights} nights</Text>
          <Text style={styles.totalPrice}>${booking.totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>{bookings.length} total bookings</Text>
      </View>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </View>
      )}

      {/* Completed Bookings */}
      {completedBookings.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed</Text>
          {completedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF5A5F",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  bookingLocation: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  dateBox: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  nightsText: {
    fontSize: 12,
    color: "#666",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF5A5F",
    marginTop: 2,
  },
  detailsBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FF5A5F",
    borderRadius: 6,
  },
  detailsBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
})

export default BookingScreen