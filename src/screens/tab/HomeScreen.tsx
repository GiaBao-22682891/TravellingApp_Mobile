import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Explore the World</Text>
        <Text style={styles.subheading}>Find your perfect accommodation</Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput placeholder="Search destinations..." style={styles.searchInput} placeholderTextColor="#999" />
      </View>

      {/* Quick Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter" size={16} color="#FF5A5F" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="star" size={16} color="#FF5A5F" />
          <Text style={styles.filterText}>Top Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="pricetag" size={16} color="#FF5A5F" />
          <Text style={styles.filterText}>Budget</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Accommodations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Stays</Text>

        <View style={styles.accommodationCard}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image" size={40} color="#ddd" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Luxury Beach Villa</Text>
              <View style={styles.rating}>
                <Ionicons name="star" size={14} color="#FF5A5F" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
            <Text style={styles.location}>
              <Ionicons name="location" size={12} color="#666" /> Maldives
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$299/night</Text>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.accommodationCard}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image" size={40} color="#ddd" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Mountain Resort</Text>
              <View style={styles.rating}>
                <Ionicons name="star" size={14} color="#FF5A5F" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </View>
            <Text style={styles.location}>
              <Ionicons name="location" size={12} color="#666" /> Switzerland
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>$199/night</Text>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Popular Destinations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular This Month</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {["Paris", "Tokyo", "Barcelona", "Dubai"].map((dest, idx) => (
            <TouchableOpacity key={idx} style={styles.destinationCard}>
              <View style={styles.destImagePlaceholder}>
                <Text style={styles.destEmoji}>{["🗼", "🗾", "🏛️", "🏙️"][idx]}</Text>
              </View>
              <Text style={styles.destName}>{dest}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  subheading: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF5A5F",
    gap: 6,
  },
  filterText: {
    fontSize: 12,
    color: "#FF5A5F",
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#000",
  },
  accommodationCard: {
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
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#FF5A5F",
    fontWeight: "600",
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A5F",
  },
  viewBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FF5A5F",
    borderRadius: 6,
  },
  viewBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  destinationCard: {
    marginRight: 12,
    alignItems: "center",
  },
  destImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  destEmoji: {
    fontSize: 32,
  },
  destName: {
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
})

export default HomeScreen
