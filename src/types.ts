export interface Destination {
  id: number;
  place: string;
  hotel: string;
  budget: string;
  food: string;
  imageUrl?: string;
  description?: string;
}

export interface Booking {
  id: string;
  destination: string;
  hotel: string;
  bookingDate: string;
  budget: string;
  status: "Confirmed" | "Pending" | "Completed";
  ticketNumber: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: "Transportation" | "Accommodation" | "Food" | "Sightseeing" | "Other";
  date: string;
}

export interface Activity {
  time: string;
  activity: string;
  description: string;
  cost: string;
}

export interface DayItinerary {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface BudgetBreakdown {
  transportation: string;
  accommodation: string;
  food: string;
  sightseeing: string;
}

export interface TravelPlan {
  title: string;
  destination: string;
  startDate: string;
  budget: string;
  transport: string;
  itinerary: DayItinerary[];
  budgetBreakdown: BudgetBreakdown;
  packingChecklist: string[];
  localTips: string[];
}
