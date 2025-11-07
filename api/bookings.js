import data from "../data/data.json" assert { type: "json" }
import fs from "fs"
import path from "path"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { accommodationId, paymentMethod, totalPrice, paymentOption } = req.body

    // Validate input
    if (!accommodationId || !paymentMethod || !totalPrice) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Get the next booking ID
    const nextBookingId = Math.max(...data.bookings.map((b) => b.bookingId), 0) + 1

    // Create new booking
    const newBooking = {
      bookingId: nextBookingId,
      userId: 1, // TODO: Get from authenticated user
      accomodationId: accommodationId,
      bookingDate: new Date().toLocaleDateString("en-GB"),
      bookingTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
    }

    // Add booking to data
    data.bookings.push(newBooking)

    // Save updated data to file
    const dataPath = path.join(process.cwd(), "data", "data.json")
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))

    return res.status(200).json(newBooking)
  } catch (error) {
    console.error("[v0] Booking API error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
