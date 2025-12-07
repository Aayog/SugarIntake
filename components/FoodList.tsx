'use client';

import { FoodItem } from '@/lib/types';

interface FoodListProps {
  foods: FoodItem[];
  onRemoveFood: (id: string) => void;
}

export default function FoodList({ foods, onRemoveFood }: FoodListProps) {
  if (foods.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No foods logged today. Add your first item!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {foods.map((food) => (
        <div
          key={food.id}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
        >
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">{food.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {food.sugar}g sugar
            </div>
          </div>
          <button
            onClick={() => onRemoveFood(food.id)}
            className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors duration-200"
            aria-label={`Remove ${food.name}`}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
