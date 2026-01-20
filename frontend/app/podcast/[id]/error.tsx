"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-white p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        عذراً، حدث خطأ ما أثناء تحميل البودكاست
      </h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-orange-600 rounded-full font-bold hover:bg-orange-500 transition-all cursor-pointer"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
