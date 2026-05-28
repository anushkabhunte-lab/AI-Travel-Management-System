import { Booking } from "../types";
import { Plane, Calendar, Ticket, User, XCircle, Building } from "lucide-react";

interface BookedTripsViewProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  userEmail?: string;
}

export default function BookedTripsView({ bookings, onCancelBooking, userEmail = "explorer@aistudio.com" }: BookedTripsViewProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-[#1A1A1A]/10 pb-4 flex justify-between items-center bg-transparent">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#717171]">Issued Documents</span>
          <h4 className="font-serif text-3xl font-light italic text-[#1A1A1A] mt-0.5">Active Vouchers</h4>
        </div>
        <span className="px-4 py-1.5 border border-[#1A1A1A] text-[#1A1A1A] font-bold text-[10px] uppercase font-mono tracking-wider bg-transparent">
          {bookings.length} RESERVED BLUEPRINTS
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-dashed border-[#1A1A1A]/20 bg-[#FAF8F2] p-16 text-center text-[#717171]">
          <Ticket className="w-10 h-10 mx-auto text-[#C5A059] mb-4" />
          <p className="font-serif text-lg italic text-[#1A1A1A] mb-1">No Active Boarding Passes</p>
          <p className="text-xs max-w-sm mx-auto leading-relaxed">
            Choose a luxury escape directory card and click &quot;Book Escape&quot; to issue your high-contrast boarding voucher and stay blueprint!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#FDFCF8] border border-[#1A1A1A] flex flex-col justify-between overflow-hidden relative shadow-none rounded-none"
            >
              {/* Card Ribbon / Boarding Pass Header */}
              <div className="bg-[#1A1A1A] text-[#FDFCF8] p-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#C5A059] rotate-45" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono">NOMAD BOARDING VOUCHER</span>
                </div>
                <span className="px-2 py-0.5 border border-[#C5A059]/40 bg-[#FAF8F2]/10 text-[#C5A059] rounded-none text-[8px] tracking-widest uppercase font-mono">
                  {booking.status}
                </span>
              </div>

              {/* Pass Main Body */}
              <div className="p-6 space-y-5 bg-[#FDFCF8]">
                <div className="flex justify-between items-baseline gap-2">
                  <div>
                    <span className="text-[#717171] text-[9px] font-bold uppercase block tracking-widest font-mono">DESTINATION STATION</span>
                    <h5 className="text-2xl font-serif font-light text-[#1A1A1A] tracking-tight">{booking.destination}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[#717171] text-[9px] font-bold uppercase block tracking-widest font-mono">GATE CODE</span>
                    <span className="font-mono text-sm font-bold text-[#C5A059] tracking-widest">{booking.ticketNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1A1A1A]/10">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <div>
                      <span className="text-[#717171] text-[9px] font-bold uppercase block tracking-widest font-mono">JOURNEY DATE</span>
                      <span className="text-xs font-semibold text-[#1A1A1A] font-mono">{booking.bookingDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <div>
                      <span className="text-[#717171] text-[9px] font-bold uppercase block tracking-widest font-mono">PASSENGER EMAIL</span>
                      <span className="text-xs font-semibold text-[#1A1A1A] truncate block max-w-[140px]">{userEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-4 border-t border-[#1A1A1A]/10 bg-[#FAF8F2] p-3 border border-[#1A1A1A]/5">
                  <Building className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <div className="truncate">
                    <span className="text-[#717171] text-[9px] font-bold uppercase block tracking-widest font-mono">CURATED LODGING</span>
                    <span className="text-xs font-bold text-[#1A1A1A] block truncate">{booking.hotel}</span>
                  </div>
                </div>
              </div>

              {/* Classic Pierced Tear off Divider */}
              <div className="flex items-center px-4 bg-[#FDFCF8]">
                <div className="w-4 h-4 rounded-full bg-[#1A1A1A] -ml-6 shrink-0" />
                <div className="w-full border-t border-dashed border-[#1A1A1A]/20" />
                <div className="w-4 h-4 rounded-full bg-[#1A1A1A] -mr-6 shrink-0" />
              </div>

              {/* Ticket Footer (Cancellation action) */}
              <div className="p-4 px-6 bg-[#FAF8F2] flex justify-between items-center border-t border-[#1A1A1A]/10">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-[#717171] font-bold uppercase font-mono tracking-wider">RESERVED EST:</span>
                  <span className="text-xs font-bold font-mono text-[#1A1A1A]">{booking.budget}</span>
                </div>
                <button
                  onClick={() => onCancelBooking(booking.id)}
                  className="text-[9px] tracking-widest uppercase inline-flex items-center gap-1 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF8] border border-[#1A1A1A] px-2.5 py-1.5 transition-all rounded-none font-bold cursor-pointer"
                  title="Revoke Booking ticket"
                >
                  <XCircle className="w-3.5 h-3.5" /> CANCEL ISSUE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
