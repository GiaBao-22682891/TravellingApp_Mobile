"use client"

import { useState } from "react"
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import type { RootStackParamList, Accommodation } from "../type/type"

type BookingNavigationProp = NativeStackNavigationProp<RootStackParamList>

const BookingDetailScreen = () => {
  const navigation = useNavigation<BookingNavigationProp>()
  const route = useRoute()
  const accommodation = (route.params as any)?.accommodation as Accommodation

  const [paymentOption, setPaymentOption] = useState<"full" | "partial">("full")
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash")

  // Calculate price details
  const basePrice = accommodation.price
  const kayakFee = 5
  const parkingFee = 5
  const totalPrice = basePrice + kayakFee + parkingFee
  const depositAmount = Math.ceil(totalPrice * 0.5)

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.headerTitle}>Confirm and pay</Text>

        {/* Accommodation Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.priceDisplay}>${accommodation.price}/night</Text>
            <Text style={styles.accommodationTitle}>{accommodation.title}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.rating}>{accommodation.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>(262 reviews)</Text>
            </View>
          </View>
          <Image source={{ uri: accommodation.image }} style={styles.summaryImage} />
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment method</Text>

          {/* Cash Option */}
          <TouchableOpacity
            style={[styles.paymentMethodOption, paymentMethod === "cash" && styles.paymentMethodSelected]}
            onPress={() => setPaymentMethod("cash")}
          >
            <View style={styles.radioButton}>
              {paymentMethod === "cash" && <View style={styles.radioButtonInner} />}
            </View>
            <View style={styles.paymentMethodContent}>
              <Ionicons name="wallet" size={24} color="#00BCD4" />
              <Text style={styles.paymentMethodTitle}>Cash</Text>
            </View>
          </TouchableOpacity>

          {/* Credit Card Option */}
          <TouchableOpacity
            style={[styles.paymentMethodOption, paymentMethod === "card" && styles.paymentMethodSelected]}
            onPress={() => setPaymentMethod("card")}
          >
            <View style={styles.radioButton}>
              {paymentMethod === "card" && <View style={styles.radioButtonInner} />}
            </View>
            <View style={styles.paymentMethodContent}>
              <Ionicons name="card" size={24} color="#00BCD4" />
              <Text style={styles.paymentMethodTitle}>Credit Card</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Price Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price details</Text>

          <View style={styles.priceDetail}>
            <Text style={styles.priceDetailLabel}>
              ${accommodation.price}
            </Text>
            <Text style={styles.priceDetailValue}>${basePrice}</Text>
          </View>

          <View style={styles.priceDetail}>
            <Text style={styles.priceDetailLabel}>Kayak fee</Text>
            <Text style={styles.priceDetailValue}>${kayakFee}</Text>
          </View>

          <View style={styles.priceDetail}>
            <Text style={styles.priceDetailLabel}>Street parking fee</Text>
            <Text style={styles.priceDetailValue}>${parkingFee}</Text>
          </View>

          <View style={[styles.priceDetail, styles.totalPrice]}>
            <Text style={styles.totalPriceLabel}>Total (USD)</Text>
            <Text style={styles.totalPriceValue}>${totalPrice}</Text>
          </View>
        </View>

        {/* Spacing for bottom button */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Book Now Button - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bookButton}>
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
  scrollContent: {
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  summaryContent: {
    flex: 1,
  },
  priceDisplay: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00BCD4",
    marginBottom: 4,
  },
  accommodationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  reviewCount: {
    fontSize: 12,
    color: "#999",
  },
  summaryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  tripItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  tripLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  tripValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  paymentOptionSelected: {
    backgroundColor: "#f9fafb",
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00BCD4",
  },
  paymentOptionContent: {
    flex: 1,
  },
  paymentOptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  paymentOptionDesc: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
  paymentMethodOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  paymentMethodSelected: {
    backgroundColor: "#f9fafb",
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  paymentMethodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: 12,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  priceDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  priceDetailLabel: {
    fontSize: 13,
    color: "#666",
  },
  priceDetailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  totalPrice: {
    borderBottomWidth: 0,
    paddingTop: 12,
    marginTop: 8,
  },
  totalPriceLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  totalPriceValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  bookButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
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

export default BookingDetailScreen
