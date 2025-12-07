'use client';

interface SugarStatsProps {
  totalSugar: number;
  sugarLimit: number;
  fillPercentage: number;
}

export default function SugarStats({ totalSugar, sugarLimit, fillPercentage }: SugarStatsProps) {
  const isOverLimit = fillPercentage > 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Total Sugar Today
        </div>
        <div className="mt-1 text-3xl font-bold text-blue-900 dark:text-blue-100">
          {totalSugar.toFixed(1)}g
        </div>
      </div>
      
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div className="text-sm font-medium text-green-700 dark:text-green-300">
          Daily Limit
        </div>
        <div className="mt-1 text-3xl font-bold text-green-900 dark:text-green-100">
          {sugarLimit.toFixed(1)}g
        </div>
      </div>
      
      <div className={`p-4 rounded-lg ${
        isOverLimit 
          ? 'bg-red-50 dark:bg-red-900/20' 
          : 'bg-yellow-50 dark:bg-yellow-900/20'
      }`}>
        <div className={`text-sm font-medium ${
          isOverLimit 
            ? 'text-red-700 dark:text-red-300' 
            : 'text-yellow-700 dark:text-yellow-300'
        }`}>
          Percentage
        </div>
        <div className={`mt-1 text-3xl font-bold ${
          isOverLimit 
            ? 'text-red-900 dark:text-red-100' 
            : 'text-yellow-900 dark:text-yellow-100'
        }`}>
          {fillPercentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
