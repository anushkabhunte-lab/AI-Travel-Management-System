import { useState } from "react";
import { TravelPlan } from "../types";
import { Calendar, MapPin, Compass, Briefcase, ListTodo, AlertTriangle, ShieldCheck, CheckSquare, Square, DollarSign } from "lucide-react";

interface ItineraryViewProps {
  plan: TravelPlan;
  onClose: () => void;
}

export default function ItineraryView({ plan, onClose }: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const activeDayPlan = plan.itinerary.find((day) => day.day === activeDay) || plan.itinerary[0];

  return (
    <div className="bg-[#FDFCF8] border border-[#1A1A1A]/10 shadow-none overflow-hidden animate-fade-in rounded-none">
      
      {/* Plan Hero Banner in Editorial style */}
      <div className="p-8 sm:p-10 bg-[#1A1A1A] text-[#FDFCF8] relative rounded-none">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 px-4 py-1.5 border border-white/20 hover:border-[#C5A059] hover:text-[#C5A059] bg-transparent text-[#FDFCF8] text-[9px] font-bold uppercase tracking-widest rounded-none transition cursor-pointer"
        >
          ← CLOSE BLUEPRINT
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#C5A059]/35 text-[#C5A059] text-[8px] font-bold uppercase tracking-widest bg-transparent mb-4">
          <Compass className="w-3 h-3" /> EXQUISITE INTELLIGENCE
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FDFCF8] pr-20 leading-tight">
          {plan.title || "The Tailored Blueprint"}
        </h3>
        
        {/* Quick Meta Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-[#FDFCF8]/10">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-white/10 text-[#C5A059]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[8px] font-bold tracking-widest uppercase font-mono">STATION</p>
              <p className="font-bold text-xs sm:text-sm">{plan.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 border border-white/10 text-[#C5A059]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[8px] font-bold tracking-widest uppercase font-mono">LAUNCH DATE</p>
              <p className="font-bold text-xs sm:text-sm font-mono">{plan.startDate || "Flexible"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 border border-white/10 text-[#C5A059]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[8px] font-bold tracking-widest uppercase font-mono">TRANSIT CARRIER</p>
              <p className="font-semibold text-xs sm:text-sm uppercase font-mono">{plan.transport || "Any"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 border border-white/10 text-[#C5A059]">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[8px] font-bold tracking-widest uppercase font-mono">ESTIMATED COST</p>
              <p className="font-bold text-xs sm:text-sm font-mono text-[#C5A059]">{plan.budget || "Flexible"}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="p-6 md:p-10 grid lg:grid-cols-3 gap-10">
        {/* Left Itinerary Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-[#1A1A1A]/10 gap-3">
            <h4 className="text-xl font-serif text-[#1A1A1A] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5A059]" /> Day-by-Day Roadmap
            </h4>
            
            {/* Day Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#1A1A1A]/5">
              {plan.itinerary.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer ${
                    activeDay === day.day
                      ? "bg-[#1A1A1A] text-[#FDFCF8]"
                      : "text-[#717171] hover:text-[#1A1A1A]"
                  }`}
                >
                  Day {day.day}
                </button>
              ))}
            </div>
          </div>

          {/* Day Vibe Card */}
          <div className="bg-[#FAF8F2] p-5 border border-[#1A1A1A]/10 rounded-none">
            <p className="text-[#C5A059] text-[9px] font-bold uppercase tracking-widest font-mono">Day {activeDayPlan.day} Focus Vibe</p>
            <h5 className="text-lg font-serif text-[#1A1A1A] mt-1">{activeDayPlan.theme}</h5>
          </div>

          {/* Fine Timetable Timeline */}
          <div className="relative border-l border-[#1A1A1A]/10 pl-6 ml-3 space-y-8 py-2">
            {activeDayPlan.activities.map((act, index) => (
              <div key={index} className="relative">
                {/* Vintage Solid Line Pin */}
                <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 bg-[#C5A059] border border-[#1A1A1A]/20" />

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="inline-block border border-[#1A1A1A]/20 px-2 py-0.5 text-[#1A1A1A] text-[9px] font-mono font-bold">
                      {act.time}
                    </span>
                    <h6 className="text-base font-serif font-bold text-[#1A1A1A]">{act.activity}</h6>
                    {act.cost && act.cost !== "Free" && (
                      <span className="text-[9px] font-mono font-bold text-[#C5A059] bg-[#FAF8F2] border border-[#C5A059]/20 px-2 py-0.5">
                        {act.cost}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#717171] leading-relaxed font-sans">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Estimates, Packing & Advice */}
        <div className="space-y-6">
          
          {/* Estimated Budget Allocation Progress Indicators */}
          <div className="bg-[#FAF8F2] p-6 border border-[#1A1A1A]/10 rounded-none">
            <h5 className="text-[10px] tracking-widest uppercase font-mono text-[#717171] mb-5 flex items-center gap-1.5 border-b border-[#1A1A1A]/10 pb-2">
              <DollarSign className="w-4 h-4 text-[#C5A059]" /> ALLOCATION BREAKDOWN
            </h5>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[10px] uppercase font-mono text-[#717171] mb-1.5">
                  <span>STAYS / LODGING</span>
                  <span className="font-bold text-[#1A1A1A]">{plan.budgetBreakdown.accommodation}</span>
                </div>
                <div className="w-full bg-[#1A1A1A]/5 h-1 border border-[#1A1A1A]/5 rounded-none overflow-hidden">
                  <div className="bg-[#C5A059] h-full" style={{ width: "40%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-mono text-[#717171] mb-1.5">
                  <span>CARRIAGE / COMMUTE</span>
                  <span className="font-bold text-[#1A1A1A]">{plan.budgetBreakdown.transportation}</span>
                </div>
                <div className="w-full bg-[#1A1A1A]/5 h-1 border border-[#1A1A1A]/5 rounded-none overflow-hidden">
                  <div className="bg-[#1A1A1A] h-full" style={{ width: "30%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-mono text-[#717171] mb-1.5">
                  <span>CULINARY SELECTIONS</span>
                  <span className="font-bold text-[#1A1A1A]">{plan.budgetBreakdown.food}</span>
                </div>
                <div className="w-full bg-[#1A1A1A]/5 h-1 border border-[#1A1A1A]/5 rounded-none overflow-hidden">
                  <div className="bg-[#C5A059] h-full" style={{ width: "20%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-mono text-[#717171] mb-1.5">
                  <span>SIGHTS & EXPEDITIONS</span>
                  <span className="font-bold text-[#1A1A1A]">{plan.budgetBreakdown.sightseeing}</span>
                </div>
                <div className="w-full bg-[#1A1A1A]/5 h-1 border border-[#1A1A1A]/5 rounded-none overflow-hidden">
                  <div className="bg-[#1A1A1A] h-full" style={{ width: "10%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Checkable Packing Assistant */}
          <div className="bg-[#FAF8F2] p-6 border border-[#1A1A1A]/10 rounded-none">
            <h5 className="text-[10px] tracking-widest uppercase font-mono text-[#717171] mb-2 flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-2">
              <ListTodo className="w-4 h-4 text-[#C5A059]" /> PACKING ASSISTANT
            </h5>
            <p className="text-[10px] text-[#717171] font-sans leading-relaxed mb-4">Gear recommended for regional climates</p>
            <div className="space-y-1 bg-transparent">
              {plan.packingChecklist.map((item, id) => {
                const isChecked = !!checkedItems[item];
                return (
                  <button
                    key={id}
                    onClick={() => toggleCheck(item)}
                    className="w-full text-left flex items-start gap-2.5 py-1.5 focus:outline-none transition-colors hover:bg-[#1A1A1A]/5 min-h-[32px] px-1 rounded-none cursor-pointer"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-[#1A1A1A]/30 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs text-[#1A1A1A] font-sans transition ${isChecked ? "line-through text-[#717171]/60" : ""}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expert Travel Wisdom */}
          <div className="bg-[#FAF8F2] p-6 border border-amber-250/50 rounded-none bg-amber-50/20">
            <h5 className="text-[10px] tracking-widest uppercase font-mono text-amber-900 mb-3 flex items-center gap-2 border-b border-amber-250/30 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> REGION CUSTOM ETIQUETTES
            </h5>
            <div className="space-y-3">
              {plan.localTips.map((tip, id) => (
                <div key={id} className="flex gap-2 text-xs text-amber-950 font-serif font-light leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
