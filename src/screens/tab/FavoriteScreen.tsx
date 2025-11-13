import { useState, useMemo, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator, Alert } from "react-native"
import AccommodationCard from "../../components/AccommodationCard"
import type { Accommodation, Favorite } from "../../type/type"
import { useUser } from "../../context/UserContext"
import { useFetch } from "../../hook/useFetch"

const API_URL = "http://localhost:3000"

const FavoriteScreen = () => {
  const { currentUser } = useUser()
  const { data: accommodations, loading: loadingAcc } = useFetch<Accommodation[]>("/accommodations")
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loadingFav, setLoadingFav] = useState(false)

  // Fetch current user's favorites
  const fetchFavorites = async () => {
    if (!currentUser) return
    setLoadingFav(true)
    try {
      const res = await fetch(`${API_URL}/favorites`)
      const data: Favorite[] = await res.json()
      setFavorites(data.filter(fav => fav.userId === currentUser.id))
    } catch (err) {
      console.error("Failed to fetch favorites:", err)
    } finally {
      setLoadingFav(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [currentUser])

  // Toggle favorite
  const toggleFavorite = async (accommodationId: string) => {
    if (!currentUser) {
      Alert.alert("Not logged in", "You must log in to favorite accommodations.")
      return
    }

    const exists = favorites.find(fav => fav.accommodationId === accommodationId)

    try {
      if (exists) {
        // DELETE from backend
        await fetch(`${API_URL}/favorites/${exists.id}`, { method: "DELETE" })
        setFavorites(prev => prev.filter(fav => fav.accommodationId !== accommodationId))
      } else {
        // POST to backend
        const newFav: Omit<Favorite, "id"> = { userId: currentUser.id, accommodationId }
        const res = await fetch(`${API_URL}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFav),
        })
        const saved = await res.json()
        setFavorites(prev => [...prev, saved])
      }
    } catch (err) {
      console.error("Error updating favorites:", err)
      Alert.alert("Error", "Failed to update favorites.")
    }
  }

  // Get favorite accommodations
  const favoriteAccommodations = useMemo(() => {
    if (!accommodations) return []
    const favIds = favorites.map(fav => fav.accommodationId)
    return accommodations.filter(acc => favIds.includes(acc.id))
  }, [favorites, accommodations])

  // Apply search filter
  const filteredAccommodations = useMemo(() => {
    return favoriteAccommodations.filter(acc =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [favoriteAccommodations, searchQuery])

  if (loadingAcc || loadingFav) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Favorites List */}
      {filteredAccommodations.length > 0 ? (
        <FlatList
          data={filteredAccommodations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AccommodationCard
              accommodation={item}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Add accommodations to your favorites to see them here</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  searchContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, backgroundColor: "#fff" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  listContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  emptyText: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#333" },
  emptySubtext: { fontSize: 14, color: "#999", textAlign: "center" },
})

export default FavoriteScreen
