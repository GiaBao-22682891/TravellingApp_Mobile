"use client"

import type React from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import type { Accommodation } from "../type/type"
import { useState } from "react"

interface AccommodationCardProps {
  accommodation: Accommodation
  onPress?: () => void
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: accommodation.image }} style={styles.image} resizeMode="cover" />

          {/* Heart Icon - Top Right */}
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            {/* <Heart
              size={24}
              color={isFavorite ? "#FF6B6B" : "#999"}
              fill={isFavorite ? "#FF6B6B" : "none"}
              strokeWidth={2}
            /> */}
            <Ionicons
              name={isFavorite? "heart" : "heart-outline"}
              size={24}
              color = {isFavorite? "#FF6B6B" : "#999"}
            />
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View style={styles.dotsContainer}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotInactive]} />
            <View style={[styles.dot, styles.dotInactive]} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>{accommodation.title}</Text>

          {/* Type/Category */}
          <Text style={styles.category}>{accommodation.typeOfPlace}</Text>

          {/* Rating and Price Row */}
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
  cardContainer: {
    marginBottom: 16,
  },
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
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 192,
  },
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
  dotsContainer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  dotInactive: {
    opacity: 0.5,
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
  },
  ratingPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  star: {
    fontSize: 14,
    color: "#FFB800",
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999",
  },
})

export default AccommodationCard
