import React from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { Accommodation, Favorite } from "../type/type"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../type/type"
import { useUser } from "../context/UserContext"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

interface AccommodationCardProps {
  accommodation: Accommodation
  favorites: Favorite[]          // All favorites of current user
  onToggleFavorite: (accommodationId: string) => void
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  favorites,
  onToggleFavorite,
}) => {
  const navigation = useNavigation<NavigationProp>()
  const { currentUser } = useUser()

  // Determine if current accommodation is favorited
  const isFavorite = favorites.some(
    (fav) => fav.accomodationId === accommodation.accomodationId && fav.userId === currentUser?.userId
  )

  const handlePress = () => {
    navigation.navigate("AccommodationDetail", { accommodationId: accommodation.accomodationId })
  }

  const handleToggleFavorite = () => {
    if (!currentUser) return
    onToggleFavorite(accommodation.accomodationId)
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: accommodation.image }} style={styles.image} resizeMode="cover" />

          {/* Heart Icon */}
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF6B6B" : "#999"}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{accommodation.title}</Text>
          <Text style={styles.category}>{accommodation.typeOfPlace}</Text>

          <View style={styles.ratingPriceRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>{accommodation.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.price}>
              ${accommodation.price}
              <Text style={styles.priceLabel}>/night</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 16 },
  cardWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 192 },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  contentContainer: { padding: 12 },
  title: { fontSize: 16, fontWeight: "600", color: "#1a1a1a", marginBottom: 4 },
  category: { fontSize: 14, color: "#999", marginBottom: 8 },
  ratingPriceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ratingContainer: { flexDirection: "row", alignItems: "center", gap: 4 },
  star: { fontSize: 14, color: "#FFB800" },
  rating: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  price: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  priceLabel: { fontSize: 12, fontWeight: "400", color: "#999" },
})

export default AccommodationCard
