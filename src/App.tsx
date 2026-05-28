import { useState, useEffect } from "react";
import { Destination, Booking, ExpenseItem, TravelPlan } from "./types";
import DestinationCard from "./components/DestinationCard";
import AddQuickTripForm from "./components/AddQuickTripForm";
import BookedTripsView from "./components/BookedTripsView";
import BudgetPlannerView from "./components/BudgetPlannerView";
import ItineraryView from "./components/ItineraryView";
import { Compass, Sparkles, AlertCircle } from "lucide-react";

const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 1,
    place: "Goa, India (Goa State)",
    hotel: "The Heritage Palms Resort & Spa",
    budget: "₹15,000",
    food: "Fiery Vindaloo & Coastal Thali",
    description: "Bask under swaying palms on pristine coastal sands. Savor fiery curries and vibrant local beach thalis by the warm Arabian Sea."
  },
  {
    id: 2,
    place: "Manali, India (Himachal Pradesh State)",
    hotel: "Elixir Mountain Sanctuary",
    budget: "₹20,000",
    food: "Siddu & Himachali Mountain Tea",
    description: "Inhale fresh pine breeze amidst majestic cedar trees and snow peaks. Experience authentic warm Himachali hospitality and scenic hiking trails."
  },
  {
    id: 3,
    place: "Kashmir Valley, India (Jammu & Kashmir UT)",
    hotel: "The Oberoi Dal Lake Floating Palace",
    budget: "₹25,000",
    food: "Traditional Kashmiri Wazwan Feast",
    description: "Glide across reflective mirrors of cold lakes on traditional cedarwood houseboats. Savor the majestic multicourse feast of Wazwan spices."
  },
  {
    id: 4,
    place: "Udaipur, India (Rajasthan State)",
    hotel: "The Taj Lake Palace Luxury Hotel",
    budget: "₹30,000",
    food: "Dal Baati Churma & Royal Mewar Thali",
    description: "Behold the breathtaking lakeside palaces and historic Mewar architecture. Savor handcrafted ghee-infused traditional delicacies in open structures."
  },
  {
    id: 5,
    place: "Kerala Backwaters, India (Kerala State)",
    hotel: "Kumarakom Lake Heritage Resort",
    budget: "₹18,500",
    food: "Karimeen Pollichathu & Kappa",
    description: "Drift along serene lagoons shaded by interlocking green canopies. Experience restorative Ayurvedic therapies and native banana leaf delicacies."
  },
  {
    id: 6,
    place: "Ladakh, India (Ladakh UT)",
    hotel: "The Grand Dragon Mountain Lodge",
    budget: "₹28,000",
    food: "Ladakhi Thukpa & Butter Tea",
    description: "Traverse high altitude mountain passes bordering deep cobalt-blue salt lakes. Find tranquility within ancient cliffside Buddhist monasteries."
  },
  {
    id: 7,
    place: "Amritsar, India (Punjab State)",
    hotel: "Taj Swarna Amritsar",
    budget: "₹14,000",
    food: "Amritsari Kulcha & Creamy Lassi",
    description: "Immerse in the celestial golden reflections and spiritual hymns of the Golden Temple. Enjoy legendary culinary service at the community Langar and local dhabas."
  },
  {
    id: 8,
    place: "Varanasi, India (Uttar Pradesh State)",
    hotel: "BrijRama Palace Heritage Hotel",
    budget: "₹16,500",
    food: "Banarasi Tamatar Chaat & Malaiyo",
    description: "Witness timeless spiritual ceremonies and glowing lanterns on the sacred river steps of the Ganges. Wander historical pathways smelling of sandalwood and fresh incense."
  },
  {
    id: 9,
    place: "Darjeeling, India (West Bengal State)",
    hotel: "Windamere Colonial Hotel",
    budget: "₹17,000",
    food: "Darjeeling First Flush Tea & steamed Momos",
    description: "Walk through high-altitude green tea plantations nestled beneath the majestic Kanchenjunga peak. Ride the historic vintage Himalayan Steam Toy Train."
  },
  {
    id: 10,
    place: "Hampi, India (Karnataka State)",
    hotel: "Evolve Back Kamlapura Palace",
    budget: "₹22,000",
    food: "Bisi Bele Bath & Mysore Pak",
    description: "Roam across a surreal, boulder-strewn landscape scattered with magnificent monolithic stone temples of the historic Vijayanagara Empire."
  },
  {
    id: 11,
    place: "Shillong, India (Meghalaya State)",
    hotel: "Ri Kynjai Serene Lake Resort",
    budget: "₹19,000",
    food: "Traditional Jadoh & Bamboo Shoot Stew",
    description: "Explore misty highlands, cascading crystal waterfalls, and organic living root bridges handcrafted by generational Khasi tribal architects."
  },
  {
    id: 12,
    place: "Tawang, India (Arunachal Pradesh State)",
    hotel: "Tawang Orchid Lodge",
    budget: "₹21,000",
    food: "Zan Thukpa & Traditional Monpa Stew",
    description: "Ascend snow-dusted peak trails to discover one of the world's largest, most peaceful Buddhist monasteries floating above high clouds."
  },
  {
    id: 13,
    place: "Rann of Kutch, India (Gujarat State)",
    hotel: "The Gateway Resort Devgadh",
    budget: "₹23,000",
    food: "Kutchi Dabeli & Gujarati Thali",
    description: "Marvel at the infinite glaring white desert expanse glowing under a cold, starry full moon. Discover ancient handloom weaving in local village communities."
  },
  {
    id: 14,
    place: "Khajuraho, India (Madhya Pradesh State)",
    hotel: "The Lalit Temple View Hotel",
    budget: "₹15,500",
    food: "Bhutte Ka Kees & Mawa Bati",
    description: "Ponder the incredibly intricate, artistic sandstone carvings of UNESCO-recognized Chandela-era temples depicting fine human emotions."
  },
  {
    id: 15,
    place: "Mahabalipuram, India (Tamil Nadu State)",
    hotel: "Radisson Blu Resort Temple Bay",
    budget: "₹18,000",
    food: "Filter Coffee & Fresh Sea Bass Curry",
    description: "Gaze at the remarkable 7th-century rock-cut monolithic structure shore temples, standing firm against the crashing waves of the Bay of Bengal."
  },
  {
    id: 16,
    place: "Hyderabad, India (Telangana State)",
    hotel: "Taj Falaknuma Palace Hotel",
    budget: "₹26,000",
    food: "Hyderabadi Dum Biryani & Double Ka Meetha",
    description: "Walk inside opulent royal palaces and the towering historic Charminar, surrounding busy markets with authentic rare pearls and fine embroidery."
  },
  {
    id: 17,
    place: "Ajanta & Ellora, India (Maharashtra State)",
    hotel: "Vivanta Aurangabad Heritage Stay",
    budget: "₹17,500",
    food: "Maharashtrian Misal Pav & Puran Poli",
    description: "Discover spectacular ancient rock-cut cave temples and legendary hand-carved monolithic structures outstanding for their sheer artistic scale."
  },
  {
    id: 18,
    place: "Gangtok, India (Sikkim State)",
    hotel: "The Elgin Nor-Khill Heritage Lodge",
    budget: "₹20,500",
    food: "Sikkimese Shaphaley & Local Cheese Stew",
    description: "Savor premium views of snow Himalayan horizons, alpine orchid forests, and tranquil monasteries overlooking high mountain passes."
  },
  {
    id: 19,
    place: "Konark & Puri, India (Odisha State)",
    hotel: "Mayfair Waves Beach Resort Puri",
    budget: "₹16,000",
    food: "Chenna Poda & Traditional Dalma Thali",
    description: "Adore the staggering stone-carved Sun Temple constructed as a giant cosmic chariot. Walk along pure white sands facing the Bay of Bengal."
  },
  {
    id: 20,
    place: "Araku Valley, India (Andhra Pradesh State)",
    hotel: "The Valley View Coffee Bungalow",
    budget: "₹13,500",
    food: "Bespoke Bamboo Chicken & Araku Coffee",
    description: "Venture through misty green coffee plantations, dense eucalyptus groves, and majestic subterranean caves hidden under deep limestone hills."
  },
  {
    id: 21,
    place: "Chitrakote, India (Chhattisgarh State)",
    hotel: "Dandami Luxury Bison Resort",
    budget: "₹14,500",
    food: "Bastar Tribal Thali & Mahua Sweets",
    description: "Witness the magnificent horse-shoe shaped Chitrakote Falls, often called India's miniature Niagara Falls, roaring within pristine tribal reserve valleys."
  },
  {
    id: 22,
    place: "Ranchi Hills, India (Jharkhand State)",
    hotel: "Radisson Blu Ranchi",
    budget: "₹12,550",
    food: "Litti Chokha & Rugda Mushroom Curry",
    description: "Hike through sweeping deciduous sal tree woods to watch cascading, sparkling water cascades rushing down ancient basalt cliffs."
  },
  {
    id: 23,
    place: "Nalanda & Rajgir, India (Bihar State)",
    hotel: "The Royal Rezidency Rajgir",
    budget: "₹11,000",
    food: "Sattu Paratha & Kesaria Pedha",
    description: "Inspect the archaeological brick ruins of the historic Nalanda University, the golden cradle of ancient intellect, surrounded by sacred hot spas."
  },
  {
    id: 24,
    place: "Rishikesh, India (Uttarakhand State)",
    hotel: "Ananda in the Himalayas Spa",
    budget: "₹27,500",
    food: "Aloo Ke Gutke & Garhwali Kafuli",
    description: "Embark on holistic yoga retreats beside the emerald-green upstream Ganges. Hear temple bells echoing across suspended rope bridge spans."
  },
  {
    id: 25,
    place: "Majuli Island, India (Assam State)",
    hotel: "Mepo Okum Heritage Bamboo Cottages",
    budget: "₹12,000",
    food: "Masor Tenga & Traditional Rice Beer",
    description: "Ferry across the mighty Brahmaputra River to the world's largest freshwater river island, hosting vibrant Neo-Vaishnavite cultural monasteries."
  },
  {
    id: 26,
    place: "Kohima, India (Nagaland State)",
    hotel: "The Morung Lodge Naga Heritage",
    budget: "₹16,500",
    food: "Smoked Naga Pork with Bamboo Shoot",
    description: "Journey into traditional hillside tribal communities celebrating the spectacular annual Hornbill Festival among emerald valleys."
  },
  {
    id: 27,
    place: "Loktak Lake, India (Manipur State)",
    hotel: "Sendra Park Lake Resort",
    budget: "₹15,000",
    food: "Kangshoi Vegetable Stew & Fish Curry",
    description: "Admire the world's only floating national park on the pristine circular patches of biomass rafts known as Phumdis floating over Loktak lake."
  },
  {
    id: 28,
    place: "Aizawl, India (Mizoram State)",
    hotel: "Hotel Tourist Lodge Aizawl",
    budget: "₹11,500",
    food: "Mizo Bai & Smoked Bamboo Delights",
    description: "Wake up to endless sea of rolling white clouds enveloping spectacular vertical hill settlements and pristine pine forests."
  },
  {
    id: 29,
    place: "Neermahal, India (Tripura State)",
    hotel: "Sagarmahal Tourist Lodge",
    budget: "₹12,000",
    food: "Mui Borok & Traditional Tripura Pork",
    description: "Behold the majestic, white-washed Neermahal Water Palace shining symmetrically in the center of the peaceful Rudrasagar Lake."
  },
  {
    id: 30,
    place: "Sultanpur Lake, India (Haryana State)",
    hotel: "Rosy Pelican Sultanpur Retreat",
    budget: "₹10,500",
    food: "Haryanvi Bajra Khichri & Homemade Butter",
    description: "Observe thousands of migratory birds flocking from Siberia into peaceful freshwater marshes surrounded by lush agricultural land."
  },
  {
    id: 31,
    place: "Kyoto, Japan",
    hotel: "Hoshinoya Ryokan Hideaway",
    budget: "₹1,20,000",
    food: "Bespoke Multi-Course Kaiseki Dining",
    description: "Immerse yourself in Zen stone gardens and historical wooden tea houses. Savor seasonally balanced Kaiseki dinners under autumn maple trees."
  },
  {
    id: 32,
    place: "Santorini, Greece",
    hotel: "Canaves Oia Caldera Suites",
    budget: "₹1,45,000",
    food: "Fresh Grilled Octopus & Assyrtiko",
    description: "Gaze at iconic white-washed architectural cliffs overlooking the endless blue Aegean Sea. Experience legendary golden sunsets with fine local wines."
  },
  {
    id: 33,
    place: "Paris, France",
    hotel: "Le Bristol Paris",
    budget: "₹1,60,000",
    food: "Classic Confit de Canard & Pastries",
    description: "Wander through romantic stone-paved streets, historic art salons, and elegant boutiques. Savor the genius creations of Michelin-starred chefs."
  },
  {
    id: 34,
    place: "Bali, Indonesia",
    hotel: "Mandapa Ritz-Carlton Reserve",
    budget: "₹85,000",
    food: "Bebek Betutu & Coconut Gelato",
    description: "Unwind inside high-contrast bamboo structures hovering above misty green rice terraces. Experience sacred water cleanses and native heritage dishes."
  },
  {
    id: 35,
    place: "Amalfi Coast, Italy",
    hotel: "Le Sirenuse Positano",
    budget: "₹1,80,000",
    food: "Hand-rolled Lemon Pasta & Limoncello",
    description: "Cling to vertical pastel-colored seaside cliffs overlooking private yacht beaches. Savor fresh Mediterranean seafood dressed in native citrus oils."
  },
  {
    id: 36,
    place: "Reykjavík, Iceland",
    hotel: "The Retreat Hotel at Blue Lagoon",
    budget: "₹1,95,000",
    food: "Slow-roasted Lamb & Hot Rye Bread",
    description: "Soak within therapeutic milky silica hot springs beneath brilliant winter aurora arcs. Trace majestic cascading waterfalls and tectonic rifts."
  }
];

export default function App() {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [destFilter, setDestFilter] = useState<"all" | "domestic" | "international">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [totalBudgetLimit, setTotalBudgetLimit] = useState<number>(50000);
  const [currentTravelPlan, setCurrentTravelPlan] = useState<TravelPlan | null>(null);
  
  const [activeTab, setActiveTab] = useState<"explore" | "planner" | "bookings" | "ledger">("explore");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Clear toast notifications automatically
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Filter destinations based on search query & location filter
  const filteredDestinations = destinations.filter((item) => {
    const matchesSearch = item.place.toLowerCase().includes(search.toLowerCase());
    const isDomestic = item.place.toLowerCase().includes("india");
    
    if (destFilter === "domestic") {
      return matchesSearch && isDomestic;
    }
    if (destFilter === "international") {
      return matchesSearch && !isDomestic;
    }
    return matchesSearch;
  });

  // Triggered when client books a destination trip
  const handleBookDestination = (destination: Destination) => {
    // Check if copy is already booked
    const alreadyBooked = bookings.some((b) => b.id === `BOOK-${destination.id}`);
    if (alreadyBooked) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `NMD-${destination.place.slice(0, 3).toUpperCase()}-${randomSuffix}`;

    const newBooking: Booking = {
      id: `BOOK-${destination.id}-${randomSuffix}`,
      destination: destination.place,
      hotel: destination.hotel,
      bookingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // default 1 week away
      budget: destination.budget,
      status: "Confirmed",
      ticketNumber: code
    };

    setBookings((prev) => [newBooking, ...prev]);
    setNotification({
      message: `Successfully booked Escape to ${destination.place}! Boarding pass issued.`,
      type: "success"
    });
  };

  // Revoke virtual booking ticket
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    setNotification({
      message: "Virtual reservation successfully cancelled.",
      type: "info"
    });
  };

  // Log expense entry
  const handleAddExpense = (newExp: Omit<ExpenseItem, "id">) => {
    const id = `EXP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const created: ExpenseItem = {
      ...newExp,
      id
    };
    setExpenses((prev) => [created, ...prev]);
    setNotification({
      message: `Expense log "${newExp.title}" added to ledger.`,
      type: "success"
    });
  };

  // Delete expense record
  const handleDeleteExpense = (expenseId: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    setNotification({
      message: "Expense record removed.",
      type: "info"
    });
  };

  // Save customized destination locally
  const handleAddCustomDestination = (dest: {
    place: string;
    hotel: string;
    budget: number;
    food: string;
    description?: string;
  }) => {
    const newDest: Destination = {
      id: Date.now(),
      place: dest.place,
      hotel: dest.hotel,
      budget: `₹${dest.budget.toLocaleString()}`,
      food: dest.food,
      description: dest.description || "Independently registered adventure destination."
    };
    setDestinations((prev) => [newDest, ...prev]);
    setNotification({
      message: `New luxury escape "${dest.place}" registered in catalog.`,
      type: "success"
    });
  };

  // Core service call to backend server using Gemini models to generate premium customizable itinerates
  const handleGenerateAIPlan = async (params: {
    destination: string;
    date: string;
    budget: string;
    transport: string;
  }) => {
    setIsGenerating(true);
    setGenerationError("");
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Server failed to deliver travel itinerary.");
      }

      const parsedPlan: TravelPlan = await response.json();
      setCurrentTravelPlan(parsedPlan);
      setActiveTab("planner");
      setNotification({
        message: `Plan curated for ${parsedPlan.destination}!`,
        type: "success"
      });
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "Network exception contacting Gemini API services.");
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  // Quick action from any Card on the dashboard
  const handleInstantAIPlanner = (place: string, budget: string) => {
    setActiveTab("planner");
    setIsGenerating(true);
    setGenerationError("");
    
    handleGenerateAIPlan({
      destination: place,
      date: "",
      budget: budget.replace(/[^0-9]/g, ""),
      transport: "Any"
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] flex flex-col font-sans transition-colors duration-250">
      
      {/* 1. Global Beautiful Toasts Container */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FDFCF8] px-5 py-3 border border-white/10 shadow-lg text-xs tracking-wider uppercase font-bold flex items-center gap-3 animate-slide-up">
          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-ping" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* 2. Premium Editorial Header */}
      <header className="h-[80px] px-6 sm:px-12 border-b border-[#1A1A1A]/10 flex justify-between items-center bg-[#FDFCF8]">
        <div className="flex flex-col">
          <span className="font-serif text-lg tracking-[0.25em] uppercase font-bold leading-none select-none">
            Nomad & Co.
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#C5A059] uppercase font-bold mt-1.5">
            Travel Management
          </span>
        </div>

        {/* Integrated Sophisticated Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH DESTINATIONS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 sm:w-64 border-b border-[#1A1A1A] py-1 text-xs tracking-wider bg-transparent outline-none focus:border-[#C5A059] transition-all placeholder-[#717171] placeholder:text-[10px]"
          />
        </div>
      </header>

      {/* 3. Editorial Hero Header Section */}
      <section className="px-6 sm:px-12 py-10 md:py-14 select-none">
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[0.85] text-[#1A1A1A]">
          Curated <br />
          <span className="block italic text-[#C5A059] pl-16 sm:pl-24 md:pl-32 mt-2">
            Journeys
          </span>
        </h1>
        <p className="text-[#717171] text-xs sm:text-sm max-w-md mt-6 uppercase tracking-widest leading-loose pl-1 hover:text-[#1A1A1A] transition-colors font-medium">
          A bespoke virtual dashboard to explore exotic destinations, configure boarding templates, structure financial ledgers, and map automated plans.
        </p>
      </section>

      {/* 4. Elegant Magazine Section Tabs Index Navigation */}
      <nav className="px-6 sm:px-12 border-y border-[#1A1A1A]/10 py-4 bg-[#F9F7F0]/40 flex flex-wrap justify-start gap-x-8 gap-y-3">
        <button
          onClick={() => setActiveTab("explore")}
          className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-all border-b ${
            activeTab === "explore"
              ? "border-[#1A1A1A] text-[#1A1A1A] font-extrabold"
              : "border-transparent text-[#717171] hover:text-[#1A1A1A]"
          } cursor-pointer`}
        >
          01 / Expeditions
        </button>

        <button
          onClick={() => setActiveTab("planner")}
          className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-all border-b flex items-center gap-1.5 ${
            activeTab === "planner"
              ? "border-[#1A1A1A] text-[#1A1A1A] font-extrabold"
              : "border-transparent text-[#717171] hover:text-[#1A1A1A]"
          } cursor-pointer`}
        >
          02 / Blueprints {currentTravelPlan && <span className="inline-block w-1.5 h-1.5 bg-[#C5A059] rounded-full" />}
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-all border-b flex items-center gap-1.5 ${
            activeTab === "bookings"
              ? "border-[#1A1A1A] text-[#1A1A1A] font-extrabold"
              : "border-transparent text-[#717171] hover:text-[#1A1A1A]"
          } cursor-pointer`}
        >
          03 / Boarding Passes {bookings.length > 0 && <span className="inline-block px-1.5 py-0.2 bg-[#1A1A1A] text-[#FDFCF8] font-mono text-[9px] rounded-sm">{bookings.length}</span>}
        </button>

        <button
          onClick={() => setActiveTab("ledger")}
          className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-all border-b ${
            activeTab === "ledger"
              ? "border-[#1A1A1A] text-[#1A1A1A] font-extrabold"
              : "border-transparent text-[#717171] hover:text-[#1A1A1A]"
          } cursor-pointer`}
        >
          04 / Travel Ledger
        </button>
      </nav>

      {/* 5. Main Content Wrapper */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 sm:px-12 py-10 space-y-12">
        
        {/* Dynamic Display based on Selected Magazine Tab */}
        {activeTab === "explore" && (
          <div className="space-y-12 animate-fade-in">
            {/* Header Directory Stats */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#1A1A1A]/10 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-3xl font-light italic text-[#1A1A1A]">Exploration Directory</h2>
                  <span className="text-[10px] tracking-widest uppercase text-[#717171] font-mono self-center mt-1">Showing {filteredDestinations.length} premium stays</span>
                </div>
              </div>

              {/* In-Country vs Out-of-Country Filter Tabs */}
              <div className="flex gap-1.5 p-1 bg-[#1A1A1A]/5 rounded-none self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setDestFilter("all")}
                  className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-all rounded-none cursor-pointer ${
                    destFilter === "all"
                      ? "bg-[#1A1A1A] text-[#FDFCF8]"
                      : "text-[#717171] hover:text-[#1A1A1A]"
                  }`}
                >
                  All Escapes
                </button>
                <button
                  type="button"
                  onClick={() => setDestFilter("domestic")}
                  className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-all rounded-none cursor-pointer ${
                    destFilter === "domestic"
                      ? "bg-[#1A1A1A] text-[#FDFCF8]"
                      : "text-[#717171] hover:text-[#1A1A1A]"
                  }`}
                >
                  Domestic 🇮🇳
                </button>
                <button
                  type="button"
                  onClick={() => setDestFilter("international")}
                  className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-all rounded-none cursor-pointer ${
                    destFilter === "international"
                      ? "bg-[#1A1A1A] text-[#FDFCF8]"
                      : "text-[#717171] hover:text-[#1A1A1A]"
                  }`}
                >
                  International ✈️
                </button>
              </div>
            </div>

            {/* Catalog Grid Cards */}
            {filteredDestinations.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-[#1A1A1A]/20">
                <p className="font-serif text-lg italic text-[#717171]">No matching expeditions found.</p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-[10px] tracking-widest uppercase font-bold text-[#C5A059] hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onBook={handleBookDestination}
                    onInstantAIPlanner={handleInstantAIPlanner}
                    isBooked={bookings.some((b) => b.id.startsWith(`BOOK-${destination.id}`))}
                  />
                ))}
              </div>
            )}

            {/* Structured Editorial Promo Banner */}
            <div className="grid md:grid-cols-3 gap-1 border-t border-b border-[#1A1A1A]/10 bg-[#1A1A1A]/5 mt-16 text-center md:text-left">
              <div className="bg-[#FAF8F2] p-8">
                <span className="font-mono text-[9px] text-[#717171] tracking-widest block mb-1">SECTION I</span>
                <h4 className="font-serif text-xl font-normal mb-2 text-[#1A1A1A]">Horticulture & Escapes</h4>
                <p className="text-xs text-[#717171] leading-relaxed">Discover bespoke nature resorts paired with curated outdoor flora experiences and local expert botanical guidelines.</p>
              </div>

              <div className="bg-[#FAF8F2] p-8">
                <span className="font-mono text-[9px] text-[#717171] tracking-widest block mb-1">SECTION II</span>
                <h4 className="font-serif text-xl font-normal mb-2 text-[#1A1A1A]">Curated Indigenous Dining</h4>
                <p className="text-xs text-[#717171] leading-relaxed">We catalog native culinary masters, street stalls, and royal kitchens to offer the true flavor essence of each valley.</p>
              </div>

              <div className="bg-[#FAF8F2] p-8">
                <span className="font-mono text-[9px] text-[#717171] tracking-widest block mb-1">SECTION III</span>
                <h4 className="font-serif text-xl font-normal mb-2 text-[#1A1A1A]">Intellectual Ledger Tracking</h4>
                <p className="text-xs text-[#717171] leading-relaxed">Set precise expenditure thresholds. Track dynamic balances instantly to enjoy your retreats without financial distractions.</p>
              </div>
            </div>

            {/* Quick Trip Creation Panel */}
            <AddQuickTripForm
              onAddCustomDestination={handleAddCustomDestination}
              onGenerateAIPlan={handleGenerateAIPlan}
            />
          </div>
        )}

        {activeTab === "planner" && (
          <div className="space-y-10 animate-fade-in">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#717171]">Intelligent Blueprints</span>
                <h2 className="font-serif text-3xl font-light italic text-[#1A1A1A] mt-0.5">Custom Travel Blueprint</h2>
              </div>
              <span className="text-xs font-mono text-[#C5A059] uppercase font-bold tracking-wider">Powered by Gemini AI 🤖</span>
            </div>

            {generationError && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-xs text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">Generation Failed</h5>
                  <p className="mt-1">{generationError}</p>
                </div>
              </div>
            )}

            {isGenerating ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#C5A059] animate-spin mb-4" />
                <h4 className="font-serif text-2xl italic tracking-wide text-[#1A1A1A]">Generating Curated Blueprint...</h4>
                <p className="text-xs font-mono text-[#C5A059] tracking-widest uppercase">Laying out the travel maps and packing advice</p>
              </div>
            ) : currentTravelPlan ? (
              <ItineraryView plan={currentTravelPlan} onClose={() => setCurrentTravelPlan(null)} />
            ) : (
              <div className="bg-[#FAF8F2] border border-[#1A1A1A]/10 p-12 text-center rounded-sm max-w-2xl mx-auto space-y-6">
                <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto animate-pulse" />
                <p className="font-serif text-xl italic text-[#1A1A1A]">No active AI journey mapped.</p>
                <p className="text-xs text-[#717171] max-w-md mx-auto leading-relaxed">
                  Use the quick form below, or click any card&apos;s AI guide button to instantly draft a custom, gorgeous day-by-day travel catalog complete with packing advises and tips!
                </p>
                <div className="border-t border-[#1A1A1A]/10 pt-6">
                  <AddQuickTripForm
                    onAddCustomDestination={handleAddCustomDestination}
                    onGenerateAIPlan={handleGenerateAIPlan}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6 animate-fade-in">
            <BookedTripsView bookings={bookings} onCancelBooking={handleCancelBooking} userEmail="anushkabhunte@gmail.com" />
          </div>
        )}

        {activeTab === "ledger" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-[#1A1A1A]/10 pb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#717171]">Ledger Ledger</span>
              <h2 className="font-serif text-3xl font-light italic text-[#1A1A1A] mt-0.5">Intellectual Travel Tracker</h2>
            </div>
            
            <BudgetPlannerView
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
              totalBudgetLimit={totalBudgetLimit}
              onUpdateBudgetLimit={setTotalBudgetLimit}
            />
          </div>
        )}

      </main>

      {/* 6. Classic Footer Line */}
      <footer className="h-16 border-t border-[#1A1A1A]/10 flex items-center justify-between px-6 sm:px-12 text-[#717171] text-[10px] tracking-widest uppercase font-mono mt-auto bg-[#FDFCF8]">
        <span>© 2026 Nomad & Co.</span>
        <span className="hidden sm:inline">Exquisite Escapes Dashboard</span>
      </footer>

    </div>
  );
}
