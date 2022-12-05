import React from 'react';

export default function CardSkeleton() {
  return (
    <div className="p-6 overflow-hidden transition duration-200 bg-white rounded-lg shadow-md ">
      <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-6">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="w-32 h-4 col-span-2 rounded bg-slate-200"></div>
              <div className="h-4 col-span-2 rounded w-96 bg-slate-200"></div>
            </div>
          </div>
        </div>
        <div className="w-20 h-8 rounded bg-slate-200"></div>
      </div>
    </div>
  );
}
