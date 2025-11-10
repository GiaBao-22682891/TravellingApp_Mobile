import { useState, useMemo, useEffect } from "react"
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFetch } from "../../hook/useFetch"
import AccommodationCard from "../../components/AccommodationCard"
import type { Accommodation, Favorite } from "../../type/type"
import { useUser } from "../../context/UserContext"

const HomeScreen = () => {
  const { currentUser } = useUser()
  const { data: accommodations, loading: loadingAcc, error: errorAcc } = useFetch<Accommodation[]>("/accommodations")
  const { data: allFavorites } = useFetch<Favorite[]>("/favorites")
  
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<Favorite[]>([])

  // Initialize current user's favorites
  useEffect(() => {
    if (currentUser && allFavorites) {
      setFavorites(allFavorites.filter(fav => fav.userId === currentUser.userId))
    }
  }, [currentUser, allFavorites])

  const toggleFavorite = (accommodationId: string) => {
    if (!currentUser) return

    setFavorites(prev => {
      const exists = prev.find(fav => fav.accomodationId === accommodationId)
      if (exists) {
        return prev.filter(fav => fav.accomodationId !== accommodationId)
      } else {
        return [
          ...prev,
          {
            favoriteId: "", // leave empty; backend/state can handle
            userId: currentUser.userId,
            accomodationId: accommodationId,
            id: "", // leave empty
          }
        ]
      }
    })
  }

  // Filter accommodations based on search and category
  const filteredAccommodations = useMemo(() => {
    if (!accommodations) return []

    return accommodations.filter(acc => {
      const matchesCategory = selectedCategory === "All" || acc.typeOfPlace.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch =
        searchText.trim() === "" ||
        acc.title.toLowerCase().includes(searchText.toLowerCase()) ||
        acc.location.toLowerCase().includes(searchText.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [accommodations, searchText, selectedCategory])

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {loadingAcc ? (
        <ActivityIndicator size="large" color="#00BCD4" />
      ) : errorAcc ? (
        <Text style={styles.emptyText}>Error: {errorAcc}</Text>
      ) : (
        <Text style={styles.emptyText}>No accommodations found in {selectedCategory}</Text>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.headerContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput
              placeholder="Where do you want to stay?"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>

          {/* Categories */}
          <View style={styles.categoriesScroll}>
            <View style={styles.categoriesContainer}>
              {["All", "Beach", "Mountain", "Camping"].map(cat => (
                <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)} style={styles.categoryButton}>
                  <Text style={styles.icon}>
                    {cat === "Beach" ? "🏖️" : cat === "Mountain" ? "⛰️" : cat === "Camping" ? "🏕️" : "🗺️"}
                  </Text>
                  <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
                  {selectedCategory === cat && <View style={styles.underline} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Accommodations List */}
        <FlatList
          data={filteredAccommodations}
          keyExtractor={item => item.accomodationId}
          renderItem={({ item }) => (
            <AccommodationCard
              accommodation={item}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: "#1a1a1a" },
  categoriesScroll: { marginBottom: 16 },
  categoriesContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 24 },
  categoryButton: { alignItems: "center", paddingBottom: 8 },
  icon: { fontSize: 32, marginBottom: 4 },
  categoryText: { fontSize: 14, fontWeight: "500", color: "#999" },
  categoryTextActive: { color: "#00BCD4" },
  underline: { width: 48, height: 4, backgroundColor: "#00BCD4", borderRadius: 2, marginTop: 4 },
  listContent: { paddingHorizontal: 16, paddingBottom: 16 },
  emptyContainer: { alignItems: "center", paddingVertical: 32 },
  emptyText: { fontSize: 16, color: "#999" },
})

export default HomeScreen
