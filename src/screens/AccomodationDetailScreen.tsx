import { useState, useEffect } from "react"
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useFetch } from "../hook/useFetch"
import type { Accommodation, Facility, Comment, User, RootStackParamList } from "../type/type"

type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList>

const AccommodationDetailScreen = () => {
  const navigation = useNavigation<DetailNavigationProp>()
  const route = useRoute()
  const accommodationId = (route.params as any)?.accommodationId

  const { data: allAccommodations } = useFetch<Accommodation[]>("/accommodations")
  const { data: allFacilities } = useFetch<Facility[]>("/facilities")
  const { data: allComments } = useFetch<Comment[]>("/comments")
  const { data: allUsers } = useFetch<User[]>("/users")

  const [accommodation, setAccommodation] = useState<Accommodation | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [visibleComments, setVisibleComments] = useState(2)

  useEffect(() => {
    if (allAccommodations && accommodationId) {
      const found = allAccommodations.find((acc) => acc.accomodationId === accommodationId)
      setAccommodation(found || null)
    }
  }, [allAccommodations, accommodationId])

  useEffect(() => {
    if (accommodation && allFacilities) {
      const facilityIds = Array.isArray(accommodation.facilityIds)
        ? accommodation.facilityIds.map((f) => (typeof f === "object" ? (f as any).facilityId : f))
        : []
      const matchedFacilities = allFacilities.filter((f) => facilityIds.includes(f.facilityId))
      setFacilities(matchedFacilities)
    }
  }, [accommodation, allFacilities])

  useEffect(() => {
    if (accommodation && allComments) {
      const accommodationComments = allComments.filter((c) => c.accommodationId === accommodation.accomodationId)
      setComments(accommodationComments)
    }
  }, [accommodation, allComments])

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

  const getCommentUser = (userId: number): User | undefined => {
    return allUsers?.find((u) => u.userId === userId)
  }

  const handleShowAllComments = () => {
    setVisibleComments(comments.length)
  }

  const getFacilityIcon = (facilityName: string): string => {
    const iconMap: { [key: string]: string } = {
      "Free WiFi": "wifi",
      "Swimming Pool": "water",
      Gym: "barbell",
      "Air Conditioning": "snow",
      "Breakfast Included": "restaurant",
      Parking: "car",
    }
    return iconMap[facilityName] || "checkmark-circle"
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: accommodation.image }} style={styles.heroImage} resizeMode="cover" />

          {/* Favorite Button */}
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favoriteButton}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#FF6B6B" : "#fff"} />
          </TouchableOpacity>
        </View>

        {/* Title and Location */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{accommodation.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#00BCD4" />
            <Text style={styles.location}>{accommodation.location}</Text>
            <TouchableOpacity style={styles.viewMapButton}>
              <Text style={styles.viewMapText}>View map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{accommodation.description}</Text>
        </View>

        {/* Facilities & Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities & services</Text>
          <View style={styles.facilitiesGrid}>
            {facilities.slice(0, 4).map((facility) => (
              <View key={facility.facilityId} style={styles.facilityItem}>
                <View style={styles.facilityIconContainer}>
                  <Ionicons name={getFacilityIcon(facility.name) as any} size={24} color="#00BCD4" />
                </View>
                <Text style={styles.facilityName}>{facility.name}</Text>
              </View>
            ))}
          </View>
          {facilities.length > 4 && (
            <TouchableOpacity style={styles.showAllButton}>
              <Text style={styles.showAllText}>Show all</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingNumber}>{accommodation.rating.toFixed(1)}</Text>
            <View>
              <View style={styles.starsContainer}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Text key={i} style={styles.star}>
                    {i < Math.round(accommodation.rating) ? "★" : "☆"}
                  </Text>
                ))}
              </View>
              <Text style={styles.ratingCount}>({comments.length} reviews)</Text>
            </View>
          </View>

          {/* Comments List */}
          {comments.slice(0, visibleComments).map((comment) => {
            const user = getCommentUser(comment.userId)
            return (
              <View key={comment.commentId} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <View style={styles.userInfo}>
                    <Image
                      source={{ uri: user?.profileImage || "https://via.placeholder.com/40" }}
                      style={styles.userAvatar}
                    />
                    <View>
                      <Text style={styles.userName}>
                        {user?.firstName} {user?.lastName}
                      </Text>
                      <Text style={styles.commentDate}>A few days ago</Text>
                    </View>
                  </View>
                  <View style={styles.starsContainer}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Text key={i} style={styles.commentStar}>
                        {i < comment.rating ? "★" : "☆"}
                      </Text>
                    ))}
                  </View>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            )
          })}

          {visibleComments < comments.length && (
            <TouchableOpacity onPress={handleShowAllComments} style={styles.showMoreButton}>
              <Text style={styles.showMoreText}>Show more reviews</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Book Now Button - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.priceLabel}>Price per night</Text>
          <Text style={styles.price}>${accommodation.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => {
            navigation.navigate("BookingDetail", {
              accommodation: accommodation,
            })
          }}
        >
          <Text style={styles.bookButtonText}>Book now</Text>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 280,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 24,
    padding: 10,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  location: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  viewMapButton: {
    paddingHorizontal: 8,
  },
  viewMapText: {
    fontSize: 13,
    color: "#00BCD4",
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 12,
  },
  facilityItem: {
    alignItems: "center",
    width: "48%",
  },
  facilityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f0f8f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  facilityName: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  showAllButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  showAllText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: "#00BCD4",
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  star: {
    fontSize: 16,
    color: "#FFB800",
  },
  commentStar: {
    fontSize: 12,
    color: "#FFB800",
  },
  ratingCount: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  commentCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  commentDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  commentText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  showMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  showMoreText: {
    fontSize: 14,
    color: "#00BCD4",
    fontWeight: "600",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  priceLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  bookButton: {
    backgroundColor: "#00BCD4",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
})

export default AccommodationDetailScreen
