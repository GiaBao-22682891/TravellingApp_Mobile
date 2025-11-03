import type React from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import type { Accommodation, Facility, Comment } from "../type/type"
import type { RootStackParamList } from "../type/type"

type Props = NativeStackScreenProps<RootStackParamList, "AccommodationDetail">

const AccomodationDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Mock data - trong thực tế sẽ lấy từ API dựa vào route.params.accommodationId
  const accommodation: Accommodation = {
    accomodationId: 1,
    title: "Luxury Beach Villa",
    description:
      "A stunning beachfront villa with private pool, spa, and world-class amenities. Perfect for romantic getaways or family vacations.",
    location: "Maldives",
    price: 299,
    rating: 4.8,
    typeOfPlace: "Villa",
    numberOfGuest: 6,
    image: "https://via.placeholder.com/400x300?text=Beach+Villa",
    facilityIds: [
      { facilityId: 1, name: "WiFi", category: "Internet" },
      { facilityId: 2, name: "Pool", category: "Recreation" },
      { facilityId: 3, name: "Air Conditioning", category: "Climate" },
      { facilityId: 4, name: "Kitchen", category: "Kitchen" },
      { facilityId: 5, name: "Gym", category: "Fitness" },
      { facilityId: 6, name: "Spa", category: "Wellness" },
    ],
  }

  const reviews: Comment[] = [
    {
      commentId: 1,
      userId: 101,
      accommodationId: 1,
      text: "Amazing stay! The villa is even more beautiful than the photos. Highly recommended!",
      rating: 5,
    },
    {
      commentId: 2,
      userId: 102,
      accommodationId: 1,
      text: "Great location and friendly staff. Would definitely come back.",
      rating: 4,
    },
    {
      commentId: 3,
      userId: 103,
      accommodationId: 1,
      text: "Perfect for honeymoon. Everything was perfect.",
      rating: 5,
    },
  ]

  const handleBooking = () => {
    navigation.navigate("BookingDetail", { bookingId: 0 })
  }

  const renderFacility = (facility: Facility) => (
    <View key={facility.facilityId} style={styles.facilityItem}>
      <View style={styles.facilityIcon}>
        <Ionicons
          name={
            facility.name === "WiFi"
              ? "wifi"
              : facility.name === "Pool"
                ? "water"
                : facility.name === "Kitchen"
                  ? "restaurant"
                  : "checkmark"
          }
          size={16}
          color="#FF5A5F"
        />
      </View>
      <Text style={styles.facilityName}>{facility.name}</Text>
    </View>
  )

  const renderReview = (review: Comment) => (
    <View key={review.commentId} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewRating}>
          {Array(review.rating)
            .fill(0)
            .map((_, i) => (
              <Ionicons key={i} name="star" size={14} color="#FFB800" />
            ))}
        </View>
        <Text style={styles.reviewDate}>2 weeks ago</Text>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color="#FF5A5F" />
        </TouchableOpacity>
      </View>

      {/* Main Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: accommodation.image }}
          style={styles.mainImage}
          defaultSource={require("../components/card")}
        />
        <View style={styles.imageBadge}>
          <Text style={styles.badgeText}>{accommodation.typeOfPlace}</Text>
        </View>
      </View>

      {/* Title and Rating */}
      <View style={styles.titleSection}>
        <View>
          <Text style={styles.title}>{accommodation.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.location}>{accommodation.location}</Text>
          </View>
        </View>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={16} color="#FFB800" />
          <Text style={styles.ratingValue}>{accommodation.rating}</Text>
        </View>
      </View>

      {/* Price and Guests */}
      <View style={styles.priceSection}>
        <View>
          <Text style={styles.priceLabel}>Price per night</Text>
          <Text style={styles.price}>${accommodation.price}</Text>
        </View>
        <View>
          <Text style={styles.guestLabel}>Guests</Text>
          <Text style={styles.guests}>Up to {accommodation.numberOfGuest}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{accommodation.description}</Text>
      </View>

      {/* Facilities */}
      <View style={styles.facilitiesSection}>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesGrid}>{accommodation.facilityIds.map(renderFacility)}</View>
      </View>

      {/* Reviews */}
      <View style={styles.reviewsSection}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>Guest Reviews</Text>
          <Text style={styles.reviewCount}>({reviews.length})</Text>
        </View>
        {reviews.map(renderReview)}
        <TouchableOpacity style={styles.seeAllReviews}>
          <Text style={styles.seeAllText}>See all reviews</Text>
          <Ionicons name="chevron-forward" size={16} color="#FF5A5F" />
        </TouchableOpacity>
      </View>

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.bookingButtonText}>Book Now</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  imageContainer: {
    position: "relative",
    height: 280,
    width: "100%",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  imageBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#FF5A5F",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3cd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFB800",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f9f9f9",
  },
  priceLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF5A5F",
  },
  guestLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  guests: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  facilitiesSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  facilityItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    gap: 8,
  },
  facilityIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ffe8eb",
    justifyContent: "center",
    alignItems: "center",
  },
  facilityName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  reviewsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewCount: {
    fontSize: 14,
    color: "#999",
    marginLeft: 6,
  },
  reviewCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewRating: {
    flexDirection: "row",
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  seeAllReviews: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF5A5F",
  },
  bookingButton: {
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    backgroundColor: "#FF5A5F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bookingButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
})

export default AccomodationDetailScreen
