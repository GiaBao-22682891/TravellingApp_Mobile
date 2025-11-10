import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const FilterScreen = ({ navigation }: any) => {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [amenities, setAmenities] = useState({
    wifi: false,
    pool: false,
    ac: false,
    kitchen: false,
    gym: false,
    spa: false,
  })

  const accommodationTypes = ["Hotel", "Apartment", "Villa", "Cabin", "Hostel"]
  const ratings = [5, 4, 3, 2, 1]

  const toggleAmenity = (key: keyof typeof amenities) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleType = (type: string) => {
    setSelectedType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleApplyFilters = () => {
    navigation.goBack()
  }

  const handleResetFilters = () => {
    setPriceRange([0, 500])
    setSelectedRating(null)
    setSelectedType([])
    setAmenities({
      wifi: false,
      pool: false,
      ac: false,
      kitchen: false,
      gym: false,
      spa: false,
    })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={handleResetFilters}>
          <Text style={styles.resetBtn}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Price Range */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <Text style={styles.priceDisplay}>
            ${priceRange[0]} - ${priceRange[1]}
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.priceLabel}>Min</Text>
            <Text style={styles.priceLabel}>Max</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Rating</Text>
          <View style={styles.ratingOptions}>
            {ratings.map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[styles.ratingOption, selectedRating === rating && styles.ratingOptionSelected]}
                onPress={() => setSelectedRating(rating)}
              >
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={[styles.ratingOptionText, selectedRating === rating && styles.ratingOptionTextSelected]}>
                  {rating}+
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accommodation Type */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Accommodation Type</Text>
          <View style={styles.typeGrid}>
            {accommodationTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeOption, selectedType.includes(type) && styles.typeOptionSelected]}
                onPress={() => toggleType(type)}
              >
                <Text style={[styles.typeOptionText, selectedType.includes(type) && styles.typeOptionTextSelected]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            <View style={styles.amenityRow}>
              <View style={styles.amenityLeft}>
                <Ionicons name="wifi" size={20} color="#FF5A5F" />
                <Text style={styles.amenityLabel}>WiFi</Text>
              </View>
              <Switch
                value={amenities.wifi}
                onValueChange={() => toggleAmenity("wifi")}
                trackColor={{ false: "#e0e0e0", true: "#FF5A5F" }}
              />
            </View>

            <View style={styles.amenityRow}>
              <View style={styles.amenityLeft}>
                <Ionicons name="water" size={20} color="#FF5A5F" />
                <Text style={styles.amenityLabel}>Pool</Text>
              </View>
              <Switch
                value={amenities.pool}
                onValueChange={() => toggleAmenity("pool")}
                trackColor={{ false: "#e0e0e0", true: "#FF5A5F" }}
              />
            </View>

            <View style={styles.amenityRow}>
              <View style={styles.amenityLeft}>
                <Ionicons name="snow" size={20} color="#FF5A5F" />
                <Text style={styles.amenityLabel}>AC</Text>
              </View>
              <Switch
                value={amenities.ac}
                onValueChange={() => toggleAmenity("ac")}
                trackColor={{ false: "#e0e0e0", true: "#FF5A5F" }}
              />
            </View>

            <View style={styles.amenityRow}>
              <View style={styles.amenityLeft}>
                <Ionicons name="restaurant" size={20} color="#FF5A5F" />
                <Text style={styles.amenityLabel}>Kitchen</Text>
              </View>
              <Switch
                value={amenities.kitchen}
                onValueChange={() => toggleAmenity("kitchen")}
                trackColor={{ false: "#e0e0e0", true: "#FF5A5F" }}
              />
            </View>

            <View style={styles.amenityRow}>
              <View style={styles.amenityLeft}>
                <Ionicons name="barbell" size={20} color="#FF5A5F" />
                <Text style={styles.amenityLabel}>Gym</Text>
              </View>
              <Switch
                value={amenities.gym}
                onValueChange={() => toggleAmenity("gym")}
                trackColor={{ false: "#e0e0e0", true: "#FF5A5F" }}
              />
            </View>

            <View style={styles.amenityRow}>
              <View style={styles.amenityLeft}>
                <Ionicons name="leaf" size={20} color="#FF5A5F" />
                <Text style={styles.amenityLabel}>Spa</Text>
              </View>
              <Switch
                value={amenities.spa}
                onValueChange={() => toggleAmenity("spa")}
                trackColor={{ false: "#e0e0e0", true: "#FF5A5F" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  closeBtn: {
    fontSize: 24,
    color: "#666",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  resetBtn: {
    fontSize: 14,
    color: "#FF5A5F",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  priceDisplay: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF5A5F",
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: {
    fontSize: 12,
    color: "#999",
  },
  ratingOptions: {
    flexDirection: "row",
    gap: 12,
  },
  ratingOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  ratingOptionSelected: {
    borderColor: "#FF5A5F",
    backgroundColor: "#FFF5F4",
  },
  ratingOptionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginTop: 4,
  },
  ratingOptionTextSelected: {
    color: "#FF5A5F",
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeOption: {
    flex: 1,
    minWidth: "48%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  typeOptionSelected: {
    borderColor: "#FF5A5F",
    backgroundColor: "#FFF5F4",
  },
  typeOptionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  typeOptionTextSelected: {
    color: "#FF5A5F",
  },
  amenitiesList: {
    gap: 12,
  },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  amenityLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  amenityLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  applyButton: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default FilterScreen
