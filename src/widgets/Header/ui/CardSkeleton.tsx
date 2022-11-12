import React from 'react';

export default function CardSkeleton() {
  return (
    <div className="p-6 shadow-md rounded-lg bg-white overflow-hidden transition duration-200 ">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-6 bg-slate-200 rounded col-span-2"></div>
            </div>
          </div>
        </div>
        <div className="rounded bg-slate-200 h-8 w-20"></div>
      </div>
    </div>
  );
}
