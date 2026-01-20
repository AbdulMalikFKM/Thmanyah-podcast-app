"use client";
import { Search } from "lucide-react";
import Image from "next/image";

interface SearchBarProps {
  onSearch: (term: string) => void;
  onReset: () => void;
}

export default function SearchBar({ onSearch, onReset }: SearchBarProps) {
  return (
    <header className="sticky top-0 z-60 w-full border-b border-white/5 bg-brand-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo Section */}
        <div onClick={onReset} className="shrink-0 cursor-pointer group">
          <div className="flex items-center gap-2 ">
            {/* <span className="text-2xl font-black text-white tracking-tighter transition-colors group-hover:text-orange-500">
              ثمانية<span className="text-orange-600">.</span>
            </span> */}
            <Image
              src="/thmanyah-logo-white.png"
              alt="Logo"
              width={100}
              height={100}
              className="tracking-tighter transition-colors group-hover:opacity-50"
            />
          </div>
        </div>

        {/* Modern Search Bar */}
        <div className="relative grow max-w-xl group">
          <input
            type="text"
            dir="rtl"
            placeholder="ابحث عن بودكاست، حلقة، أو موضوع..."
            className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-3 pr-12 pl-4 
                       placeholder:text-white/30 text-sm outline-none
                       focus:bg-white/10 focus:border-orange-600/50 focus:ring-4 focus:ring-orange-600/10 
                       transition-all duration-300"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(e.currentTarget.value);
            }}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-orange-500 transition-colors" />
        </div>

        {/* Right side Actions Favirote */}
        {/* <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            المفضلة
          </button>
        </div> */}
      </div>
    </header>
  );
}
