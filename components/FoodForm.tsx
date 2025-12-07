'use client';

import { useState } from 'react';

interface FoodFormProps {
  onAddFood: (name: string, sugar: number) => void;
}

export default function FoodForm({ onAddFood }: FoodFormProps) {
  const [foodName, setFoodName] = useState('');
  const [sugarAmount, setSugarAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodName.trim() || !sugarAmount) {
      return;
    }

    const sugar = parseFloat(sugarAmount);
    if (isNaN(sugar) || sugar < 0) {
      return;
    }

    onAddFood(foodName.trim(), sugar);
    setFoodName('');
    setSugarAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Food Name
        </label>
        <input
          type="text"
          id="foodName"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="e.g., Apple, Chocolate Bar"
          required
        />
      </div>
      
      <div>
        <label htmlFor="sugarAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Sugar (grams)
        </label>
        <input
          type="number"
          id="sugarAmount"
          value={sugarAmount}
          onChange={(e) => setSugarAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="e.g., 10"
          step="0.1"
          min="0"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      >
        Add Food
      </button>
    </form>
  );
}
