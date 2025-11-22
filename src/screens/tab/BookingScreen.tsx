import { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../../context/UserContext"
import data from "../../../data/data.json"
import type { Booking, Accommodation } from "../../type/type"

interface BookingWithAccommodation extends Booking {
  accommodation?: Accommodation
}
const API_URL = "http://localhost:3000"
// const API_URL = "http://172.20.10.2:3000"

const BookingScreen = () => {
  const { currentUser } = useUser()
  const [bookings, setBookings] = useState<BookingWithAccommodation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleCancelBooking = async (bookingId: string) => {
    // Alert.alert(
    //   "Cancel Booking",
    //   "Are you sure you want to cancel this booking?",
    //   [
    //     { text: "No", style: "cancel" },
    //     {
    //       text: "Yes",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await fetch(`${API_URL}/bookings/${bookingId}`, { method: "DELETE" })
    //           setBookings(prev => prev.filter(b => b.id !== bookingId))
    //         } catch (err) {
    //           console.error(err)
    //           Alert.alert("Error", "Failed to cancel booking.")
    //         }
    //       }
    //     }
    //   ]
    // )
    try {
      await fetch(`${API_URL}/bookings/${bookingId}`, { method: "DELETE" })
      setBookings(prev => prev.filter(b => b.id !== bookingId))
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to cancel booking.")
    }
  }

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return

      try {
        const bookingsRes = await fetch(`${API_URL}/bookings`)
        const bookingsData: Booking[] = await bookingsRes.json()
        const accommodationsRes = await fetch(`${API_URL}/accommodations`)
        const accommodationsData: Accommodation[] = await accommodationsRes.json()

        // Filter user bookings and merge with accommodations
        const userBookings = bookingsData.filter((b) => b.userId === currentUser.id)
        const merged = userBookings.map((b) => ({
          ...b,
          accommodation: accommodationsData.find((acc) => acc.id === b.accommodationId),
        }))

        setBookings(merged)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [currentUser])

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Please login to view bookings</Text>
        </View>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" animating={true} />
      </View>
    )
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No bookings yet</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookingCard booking={item} accommodation={item.accommodation} onCancel={handleCancelBooking} />}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

//đáng ra cái này phải tạo ở chỗ components
interface BookingCardProps {
  booking: Booking
  accommodation?: Accommodation
  onCancel: (id: string) => void
}

const BookingCard = ({ booking, accommodation, onCancel }: BookingCardProps) => {
  if (!accommodation) return null

  return (
    <View style={styles.bookingCard}>
      <Image source={{ uri: accommodation.image }} style={styles.bookingImage} />

      <View style={styles.bookingContent}>
        <Text style={styles.bookingTitle}>{accommodation.title}</Text>
        <Text style={styles.bookingLocation}>{accommodation.location}</Text>

        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#00BCD4" />
            <Text style={styles.detailText}>{booking.bookingDate}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#00BCD4" />
            <Text style={styles.detailText}>{booking.bookingTime}</Text>
          </View>
        </View>

        <View style={{ position: "absolute", top: 8, right: 8 }}>
          <Ionicons
            name="close-circle"
            size={22}
            color="#ff4444"
            onPress={() => onCancel(booking.id)}
          />
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.bookingPrice}>${booking.totalAmount}</Text>
          <View style={styles.paymentBadge}>
            <Text style={styles.paymentText}>{booking.paymentMethod}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bookingCard: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  bookingImage: {
    width: 100,
    height: 100,
  },
  bookingContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  bookingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  bookingLocation: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  bookingDetails: {
    gap: 6,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00BCD4",
  },
  paymentBadge: {
    backgroundColor: "#e8f4f8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paymentText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#00BCD4",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
})

export default BookingScreen
