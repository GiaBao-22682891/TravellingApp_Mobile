export type Facility = {
  id: string
  name: string
  category: string
}

export type Comment = {
  id: string
  userId: string
  accommodationId: string
  text: string
  rating: number
}

export type User = {
  id: string
  mobileNumber: string
  email: string
  password: string
  firstName: string
  lastName: string
  profileImage: string // URL
}

export type Accommodation = {
  id: string
  title: string
  description: string
  location: string
  price: number
  rating: number
  typeOfPlace: string
  numberOfGuest: number
  image: string
  facilityIds: string[]
}

export type Booking = {
  id: string
  userId: string
  accommodationId: string
  bookingDate: string
  bookingTime: string
  paymentMethod: string
  totalPrice: number
}

export type Favorite = {
  id: string
  userId: string
  accommodationId: string
}

// --- Navigation ---
export type RootStackParamList = {
  Tabs:
    | {
        screen: keyof TabParamList
        params?: TabParamList[keyof TabParamList]
      }
    | undefined
  AccommodationDetail: { accommodationId: string }
  BookingDetail: { accommodation: Accommodation; checkInDate?: string; checkOutDate?: string }
  Success: {
    bookingId: string
    referenceNumber: string
    bookingDate: string
    bookingTime: string
    paymentMethod: string
    amount: number
    accommodationId?: string;
    userId?: string;
  }
  Login: undefined
  Register: undefined
  EditProfile: undefined
}

export type TabParamList = {
  Home: undefined
  Favorites: undefined
  Bookings: undefined
  Profile: { user?: User }
}

export type DataJson = {
  facilities: Facility[]
  users: User[]
  accommodations: Accommodation[]
  bookings: Booking[]
  comments: Comment[]
  favorites: Favorite[]
}
