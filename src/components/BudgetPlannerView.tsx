import { useState, ReactNode, FormEvent } from "react";
import { ExpenseItem } from "../types";
import { DollarSign, Plus, Trash2, ShieldAlert, BadgeCent, TrendingUp, Bus, Hotel, Utensils, Compass, Layers } from "lucide-react";

interface BudgetPlannerViewProps {
  expenses: ExpenseItem[];
  onAddExpense: (exp: Omit<ExpenseItem, "id">) => void;
  onDeleteExpense: (id: string) => void;
  totalBudgetLimit: number;
  onUpdateBudgetLimit: (lim: number) => void;
}

export default function BudgetPlannerView({
  expenses,
  onAddExpense,
  onDeleteExpense,
  totalBudgetLimit,
  onUpdateBudgetLimit,
}: BudgetPlannerViewProps) {
  const [budgetInput, setBudgetInput] = useState<string>(totalBudgetLimit.toString());
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  // New Expense form controls
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseItem["category"]>("Transportation");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalBudgetLimit - totalSpent;
  const spendPercentage = totalBudgetLimit > 0 ? (totalSpent / totalBudgetLimit) * 100 : 0;

  const handleUpdateBudget = () => {
    const parsed = parseFloat(budgetInput);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateBudgetLimit(parsed);
      setIsEditingBudget(false);
    }
  };

  const handleCreateExpense = (e: FormEvent) => {
    e.preventDefault();
    const parsedAmt = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmt) || parsedAmt <= 0) return;

    onAddExpense({
      title: title.trim(),
      amount: parsedAmt,
      category,
      date,
    });

    setTitle("");
    setAmount("");
  };

  // Icon mapped to categories
  const categoryIcons: Record<ExpenseItem["category"], ReactNode> = {
    Transportation: <Bus className="w-4 h-4 text-[#C5A059]" />,
    Accommodation: <Hotel className="w-4 h-4 text-[#C5A059]" />,
    Food: <Utensils className="w-4 h-4 text-[#C5A509]" />,
    Sightseeing: <Compass className="w-4 h-4 text-[#C5A039]" />,
    Other: <Layers className="w-4 h-4 text-[#717171]" />,
  };

  const categoryBg: Record<ExpenseItem["category"], string> = {
    Transportation: "bg-[#F9F7F0] text-[#1A1A1A] border-[#1A1A1A]/10",
    Accommodation: "bg-[#F9F7F0] text-[#1A1A1A] border-[#1A1A1A]/10",
    Food: "bg-[#F9F7F0] text-[#1A1A1A] border-[#1A1A1A]/10",
    Sightseeing: "bg-[#F9F7F0] text-[#1A1A1A] border-[#1A1A1A]/10",
    Other: "bg-[#F9F7F0] text-[#717171] border-[#1A1A1A]/10",
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10 animate-fade-in">
      
      {/* 1. Statistics Cards & Category Progressions */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Dynamic Tracker Ledger Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Total Budget Setting Card */}
          <div className="bg-[#FAF8F2] p-6 border border-[#1A1A1A]/10 flex flex-col justify-between rounded-none">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#717171] font-mono">STAGED ALLOCATION</span>
                {isEditingBudget ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="number"
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value)}
                      className="border border-[#1A1A1A] bg-transparent text-sm font-bold text-gray-850 px-2 py-1.5 w-24 focus:outline-none font-mono rounded-none"
                    />
                    <button
                      onClick={handleUpdateBudget}
                      className="bg-[#1A1A1A] text-[#FDFCF8] font-bold text-[9px] tracking-wider px-3.5 py-1.5 transition uppercase rounded-none cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <h4 className="text-2xl font-light text-[#1A1A1A] font-serif">₹{totalBudgetLimit.toLocaleString()}</h4>
                )}
              </div>
              <div className="p-2 border border-[#1A1A1A]/10 text-[#C5A059] bg-[#FDFCF8]">
                <BadgeCent className="w-4 h-4" />
              </div>
            </div>
            {!isEditingBudget && (
              <button
                onClick={() => setIsEditingBudget(true)}
                className="text-[9px] font-bold tracking-widest uppercase text-[#1A1A1A] hover:text-[#C5A059] mt-6 text-left transition cursor-pointer"
              >
                Modify Limit →
              </button>
            )}
          </div>

          {/* Amount Spent Card */}
          <div className="bg-[#FAF8F2] p-6 border border-[#1A1A1A]/10 flex flex-col justify-between rounded-none">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#717171] font-mono">TOTAL ACCRUED</span>
                <h4 className="text-2xl font-light text-[#1A1A1A] font-serif">₹{totalSpent.toLocaleString()}</h4>
              </div>
              <div className="p-2 border border-[#1A1A1A]/10 text-rose-600 bg-[#FDFCF8]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] tracking-widest text-[#717171] uppercase mt-6 font-mono">
              Burn rate {spendPercentage.toFixed(0)}%
            </p>
          </div>

          {/* Remaining Budget Card */}
          <div className={`p-6 border flex flex-col justify-between transition-colors rounded-none ${
            remaining < 0 
              ? "bg-[#FAF8F2] border-rose-300 text-rose-900" 
              : "bg-[#FAF8F2] border-[#1A1A1A]/10"
          }`}>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-[#717171] font-mono font-bold">REMAINING ESCAPE</span>
                <h4 className={`text-2xl font-light font-serif mt-1 ${remaining < 0 ? "text-rose-600 font-bold" : "text-[#1A1A1A]"}`}>
                  ₹{remaining.toLocaleString()}
                </h4>
              </div>
              <div className={`p-2 border ${remaining < 0 ? "border-rose-300 bg-rose-50 text-rose-700" : "border-[#1A1A1A]/10 bg-[#FDFCF8] text-[#C5A059]"}`}>
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            {remaining < 0 ? (
              <p className="text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 text-rose-700 mt-6 leading-none">
                <ShieldAlert className="w-3.5 h-3.5" /> DEVIATION IN CURRY
              </p>
            ) : (
              <p className="text-[10px] tracking-widest text-[#717171] uppercase mt-6 font-mono">REST RESIDUE</p>
            )}
          </div>
        </div>

        {/* Dynamic Progress indicator */}
        <div className="bg-[#FAF8F2] p-6 border border-[#1A1A1A]/10 rounded-none space-y-4">
          <div className="flex justify-between text-xs tracking-wider uppercase font-mono text-[#717171]">
            <span>Ledger Expenditure Safety Gauge</span>
            <span className="font-bold text-[#1A1A1A]">{spendPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#1A1A1A]/5 h-2 rounded-none overflow-hidden relative border border-[#1A1A1A]/15">
            <div
              className={`h-full transition-all duration-500 ${
                remaining < 0 ? "bg-rose-500" : "bg-[#C5A059]"
              }`}
              style={{ width: `${Math.min(spendPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* 2. Registered Ledger Expenses List */}
        <div className="bg-[#FDFCF8] border border-[#1A1A1A]/10 rounded-none overflow-hidden">
          <div className="p-5 border-b border-[#1A1A1A]/10 bg-[#FAF8F2] flex justify-between items-center">
            <h5 className="font-serif text-lg italic text-[#1A1A1A]">Ledger History Records</h5>
            <span className="text-[10px] text-[#717171] tracking-widest font-mono uppercase">
              {expenses.length} postings
            </span>
          </div>

          <div className="divide-y divide-[#1A1A1A]/10 max-h-96 overflow-y-auto bg-transparent">
            {expenses.length === 0 ? (
              <div className="p-12 text-center bg-transparent">
                <p className="text-[#717171] text-xs font-serif italic">No transactions logged in this ledger block.</p>
              </div>
            ) : (
              expenses.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center hover:bg-[#FAF8F2] transition group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 border border-[#1A1A1A]/10 bg-white">
                      {categoryIcons[item.category] || <DollarSign className="w-4 h-4" />}
                    </div>

                    <div>
                      <p className="font-serif text-base text-[#1A1A1A] capitalize">{item.title}</p>
                      <div className="flex items-center gap-2.5 mt-1">
                        <span className={`inline-block px-2 py-0.5 border text-[8px] font-bold tracking-widest uppercase ${categoryBg[item.category]}`}>
                          {item.category}
                        </span>
                        <span className="text-[9px] text-[#717171] font-mono">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#1A1A1A] font-mono">
                      ₹{item.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(item.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 border border-transparent hover:border-rose-100 hover:bg-rose-50/50 transition opacity-60 group-hover:opacity-100 cursor-pointer rounded-none"
                      title="Delete posting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3. Right Side: Record Expense Form */}
      <div className="bg-[#FAF8F2] p-8 border border-[#1A1A1A]/10 rounded-none h-fit">
        <h4 className="font-serif text-xl italic text-[#1A1A1A] mb-5 pb-3 border-b border-[#1A1A1A]/10 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#C5A059]" /> Log Posting
        </h4>

        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-[#717171] uppercase tracking-widest">Posting Title</label>
            <input
              type="text"
              placeholder="e.g., Dinner at Calangute beach"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 p-2.5 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059] placeholder-[#717171] font-medium rounded-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-[#717171] uppercase tracking-widest">Cost (₹)</label>
              <input
                type="number"
                placeholder="Amount"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 p-2.5 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059] font-mono rounded-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-[#717171] uppercase tracking-widest">Date</label>
              <input
                type="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 p-2.5 text-xs text-[#1A1A1A] outline-none focus:border-[#C5A059] font-mono rounded-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-[#717171] uppercase tracking-widest">Classification</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseItem["category"])}
              className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/10 p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A059] outline-none cursor-pointer rounded-none"
            >
              <option value="Transportation">📌 TRANSPORTATION</option>
              <option value="Accommodation">🏨 ACCOMMODATION</option>
              <option value="Food">🍽️ FINE CULINARY</option>
              <option value="Sightseeing">🎟️ GUIDES & SIGHTSEEING</option>
              <option value="Other">💼 MISCELLANEOUS</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-bold py-3 px-4 rounded-none text-[10px] tracking-widest uppercase transition mt-4 flex justify-center items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Save Ledger Posting
          </button>
        </form>
      </div>

    </div>
  );
}
