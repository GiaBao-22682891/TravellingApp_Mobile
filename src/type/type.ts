export type Facility = {
  facilityId: number;
  name: string;
  category: string;
};

export type Comment = {
  commentId: number;
  userId: number;
  accommodationId: number;
  text: string;
  rating: number;
};

export type User = {
    userId: number;
    mobileNumber: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImage: string; // URL
};

export type Accommodation = {
  accomodationId: number;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  typeOfPlace: string;
  numberOfGuest: number;
  image: string;
  facilityIds: Facility[]; 
};

export type Booking = {
  bookingId: number;
  userId: number;
  accomodationId: number;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
  totalPrice: number;
//   status: 'Confirmed' | 'Pending' | 'Cancelled';
};

export type Favorite = {
    favoriteId: number;
    userId: number;
    accomodationId: number;
};


// --- Định nghĩa cho Navigation ---
export type RootStackParamList = {
    Tabs: undefined;
    AccommodationDetail: { accommodationId: number };
    BookingDetail: { bookingId: number };
    Filter: undefined;
    Login: undefined;
    Register: undefined;
};

export type TabParamList = {
    Home: undefined;
    Favorites: undefined;
    Bookings: undefined;
    Profile: undefined;
};