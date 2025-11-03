import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

interface FavoriteItem {
  id: string
  title: string
  location: string
  rating: number
  price: number
  image?: string
}

const FavoriteScreen = () => {
  const favorites: FavoriteItem[] = [
    {
      id: "1",
      title: "Luxury Beach Villa",
      location: "Maldives",
      rating: 4.8,
      price: 299,
    },
    {
      id: "2",
      title: "Mountain Cabin",
      location: "Switzerland",
      rating: 4.7,
      price: 189,
    },
    {
      id: "3",
      title: "Tropical Paradise",
      location: "Bali",
      rating: 4.9,
      price: 159,
    },
    {
      id: "4",
      title: "City Apartment",
      location: "New York",
      rating: 4.5,
      price: 249,
    },
  ]

  const removeFavorite = (id: string) => {
    console.log("[v0] Removed favorite:", id)
  }

  const renderFavoriteItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.favoriteCard}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image" size={40} color="#ddd" />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.location}>
              <Ionicons name="location" size={12} color="#666" /> {item.location}
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeFavorite(item.id)}>
            <Ionicons name="heart" size={20} color="#FF5A5F" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FF5A5F" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>${item.price}/night</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} saved places</Text>
      </View>

      {/* Favorites List */}
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
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
    backgroundColor: "#fff",
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  favoriteCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    flexDirection: "row",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#FF5A5F",
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A5F",
  },
})

export default FavoriteScreen