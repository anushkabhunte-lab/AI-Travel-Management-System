import { useState, useEffect, FormEvent } from "react";
import { Compass, CalendarDays, Wallet, Bus, Sparkles, Plus, AlertCircle } from "lucide-react";

interface AddQuickTripFormProps {
  onAddCustomDestination: (dest: { place: string; hotel: string; budget: number; food: string; description?: string }) => void;
  onGenerateAIPlan: (params: { destination: string; date: string; budget: string; transport: string }) => Promise<void>;
}

const LOADING_STEPS = [
  "Consulting bespoke local guides & directories...",
  "Analyzing region climates for perfect stays...",
  "Structuring day-by-day roadmap matrices...",
  "Formatting tailored packing lists...",
  "Allocating recommended dining & commute budgets...",
  "Compiling critical etiquette & safety wisdom...",
];

export default function AddQuickTripForm({ onAddCustomDestination, onGenerateAIPlan }: AddQuickTripFormProps) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [transport, setTransport] = useState("Select Transport");

  const [loading, setLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Cycle through loading steps to keep users engaged and reassured 
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 3000);
    } else {
      setLoadingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const validateFields = () => {
    if (!destination.trim()) {
      setErrorMessage("Please enter an destination place or country.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleLocalAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    // Seed realistic hotel, food details if left empty or use defaults
    const budgetNum = parseFloat(budget) || 12000;
    const cleanPlace = destination.trim();
    
    onAddCustomDestination({
      place: cleanPlace,
      hotel: `The Grand ${cleanPlace} Inn & Spa`,
      budget: budgetNum,
      food: `Authentic ${cleanPlace} Delicacies & Native Street Dining`,
      description: "Custom tracked travel card designed by you.",
    });

    // Reset Form
    setDestination("");
    setBudget("");
    setDate("");
    setTransport("Select Transport");
  };

  const handleAIPlanSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    setErrorMessage("");
    try {
      await onGenerateAIPlan({
        destination: destination.trim(),
        date,
        budget,
        transport: transport === "Select Transport" ? "Any" : transport,
      });

      // Reset on success
      setDestination("");
      setBudget("");
      setDate("");
      setTransport("Select Transport");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to contact travel services. Please check server settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F2] border border-[#1A1A1A]/10 p-8 sm:p-12 rounded-none relative">
      <div className="border-b border-[#1A1A1A]/10 pb-5 mb-8">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#717171]">SECTION IV / SCHEDULER</span>
        <h3 className="font-serif text-3xl font-light italic text-[#1A1A1A] mt-1">
          Trip Creation Suite
        </h3>
        <p className="text-[#717171] text-xs font-sans mt-1.5 leading-relaxed">
          Log an expedition into the catalog, or let Gemini extract deep local intelligence to deliver a personalized travels matrix.
        </p>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#C5A059] animate-spin mb-4" />
          <h4 className="font-serif text-2xl italic text-[#1A1A1A]">Curating bespoke travels blueprint...</h4>
          <p className="text-xs text-[#C5A059] font-mono tracking-widest uppercase bg-[#FDFCF8] border border-[#1A1A1A]/10 px-4 py-2 text-center">
            {LOADING_STEPS[loadingStepIdx]}
          </p>
        </div>
      ) : (
        <form className="space-y-6">
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-none flex items-start gap-2.5 text-xs text-rose-800 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Destination */}
            <div className="space-y-1">
              <label className="block font-mono text-[9px] text-[#717171] uppercase tracking-widest">
                Destination
              </label>
              <div className="relative">
                <Compass className="absolute left-3.5 top-3.5 w-4 h-4 text-[#717171]" />
                <input
                  type="text"
                  placeholder="e.g., Goa, India"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 pl-11 pr-4 py-3 text-xs outline-none focus:border-[#C5A059] focus:bg-white transition-all placeholder-[#717171] font-medium rounded-none"
                />
              </div>
            </div>

            {/* 2. Start Date */}
            <div className="space-y-1">
              <label className="block font-mono text-[9px] text-[#717171] uppercase tracking-widest">
                Start Date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3.5 top-3.5 w-4 h-4 text-[#717171]" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 pl-11 pr-4 py-2.5 text-xs outline-none focus:border-[#C5A059] focus:bg-white transition-all font-mono rounded-none"
                />
              </div>
            </div>

            {/* 3. Budget */}
            <div className="space-y-1">
              <label className="block font-mono text-[9px] text-[#717171] uppercase tracking-widest">
                Est. Budget (₹)
              </label>
              <div className="relative">
                <Wallet className="absolute left-3.5 top-3.5 w-4 h-4 text-[#717171]" />
                <input
                  type="number"
                  placeholder="e.g. 20000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 pl-11 pr-4 py-3 text-xs outline-none focus:border-[#C5A059] focus:bg-white transition-all font-mono rounded-none placeholder-[#717171]"
                />
              </div>
            </div>

            {/* 4. Transport */}
            <div className="space-y-1">
              <label className="block font-mono text-[9px] text-[#717171] uppercase tracking-widest">
                Carriage Mode
              </label>
              <div className="relative">
                <Bus className="absolute left-3.5 top-3.5 w-4 h-4 text-[#717171] pointer-events-none" />
                <select
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 pl-11 pr-4 py-3 text-xs outline-none focus:border-[#C5A059] focus:bg-white transition-all cursor-pointer appearance-none rounded-none font-medium text-[#1A1A1A]"
                >
                  <option value="Select Transport">SELECT TRANSPORT</option>
                  <option value="Flight">FLIGHT (FASTEST)</option>
                  <option value="Train">TRAIN (SCENIC)</option>
                  <option value="Cab / Taxi">CAB / TAXI (COMFORT)</option>
                </select>
              </div>
            </div>

          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            {/* Generate with AI */}
            <button
              type="button"
              onClick={handleAIPlanSubmit}
              className="flex-1 bg-[#C5A059] hover:bg-[#B38F48] text-[#FDFCF8] font-bold py-3.5 px-6 rounded-none text-[10px] tracking-widest uppercase transition flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <Sparkles className="w-4 h-4 text-white" /> Generate AI Trip Plan ✨
            </button>

            {/* Local Catalogue add */}
            <button
              type="button"
              onClick={handleLocalAdd}
              className="sm:w-auto bg-transparent hover:bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A] font-bold py-3.5 px-8 rounded-none text-[10px] tracking-widest uppercase transition flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <Plus className="w-4 h-4" /> Add Destination Card
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
