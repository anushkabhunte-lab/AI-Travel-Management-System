import React from "react";
import { Destination } from "../types";
import { Hotel, Utensils, Wallet, Sparkles, Compass } from "lucide-react";

interface DestinationCardProps {
  key?: any;
  destination: Destination;
  onBook: (destination: Destination) => void;
  onInstantAIPlanner: (place: string, budget: string) => any;
  isBooked: boolean;
}

export default function DestinationCard({ destination, onBook, onInstantAIPlanner, isBooked }: DestinationCardProps) {
  // Format the ID nicely for a curated index feel (e.g., "01 / DIRECTORY")
  const paddedId = String(destination.id).slice(-2);

  return (
    <div className="bg-[#FDFCF8] border border-[#1A1A1A]/10 p-8 flex flex-col justify-between hover:bg-[#FAF8F2] transition-colors duration-300 relative rounded-none group">
      
      {/* Editorial Header Index Line */}
      <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-4 mb-5">
        <span className="font-mono text-[9px] text-[#717171] uppercase tracking-[0.25em]">
          {paddedId} / CATALOG
        </span>
        <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.15em] flex items-center gap-1">
          <Compass className="w-3 h-3" /> LUXURY EXPEDITION
        </span>
      </div>

      {/* Title & Curated Description */}
      <div className="space-y-3 mb-6">
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] leading-tight tracking-tight">
          {destination.place}
        </h3>
        <p className="text-xs text-[#717171] leading-relaxed font-sans line-clamp-3">
          {destination.description || `Retreat into the spectacular sights and experiences that ${destination.place} has to offer.`}
        </p>
      </div>

      {/* Structured Minimal Metadata Matrix */}
      <div className="border-t border-b border-[#1A1A1A]/10 py-4 mb-6 space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] text-[#717171] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Hotel className="w-3.5 h-3.5 text-[#C5A059]" /> RESORT
          </span>
          <span className="text-xs font-semibold text-[#1A1A1A] max-w-[180px] text-right truncate">
            {destination.hotel}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="text-[10px] text-[#717171] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#C5A059]" /> CULINARY
          </span>
          <span className="text-xs font-semibold text-[#1A1A1A] max-w-[180px] text-right truncate">
            {destination.food}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="text-[10px] text-[#717171] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#C5A059]" /> EST. PACKAGE
          </span>
          <span className="text-sm font-bold font-mono text-[#1A1A1A]">
            {destination.budget}
          </span>
        </div>
      </div>

      {/* Action Suite (Strictly non-pill editorial outline styling) */}
      <div className="flex gap-2.5 mt-auto">
        <button
          onClick={() => onBook(destination)}
          disabled={isBooked}
          className={`flex-1 py-2.5 px-4 font-bold uppercase text-[10px] tracking-[0.2em] transition-all border text-center rounded-none cursor-pointer select-none ${
            isBooked
              ? "bg-[#FAF8F2] text-[#717171] border-[#1A1A1A]/10 cursor-default"
              : "border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF8]"
          }`}
        >
          {isBooked ? "RESERVED ✓" : "BOOK ESCAPE"}
        </button>

        <button
          onClick={() => onInstantAIPlanner(destination.place, destination.budget)}
          className="border border-[#1A1A1A] hover:border-[#C5A059] p-3 text-[#1A1A1A] hover:text-[#C5A059] transition-all duration-300 rounded-none cursor-pointer"
          title="Curate custom plan blueprint with Gemini"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
