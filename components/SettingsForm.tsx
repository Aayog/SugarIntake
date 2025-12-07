'use client';

import { useState } from 'react';
import { UserSettings } from '@/lib/types';

interface SettingsFormProps {
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
}

export default function SettingsForm({ settings, onUpdateSettings }: SettingsFormProps) {
  const [dailyCalories, setDailyCalories] = useState(settings.dailyCalories.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const calories = parseInt(dailyCalories);
    if (isNaN(calories) || calories <= 0) {
      return;
    }

    onUpdateSettings({ dailyCalories: calories });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDailyCalories(settings.dailyCalories.toString());
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Daily Calories
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {settings.dailyCalories} cal
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md space-y-3">
      <div>
        <label htmlFor="dailyCalories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Daily Calories
        </label>
        <input
          type="number"
          id="dailyCalories"
          value={dailyCalories}
          onChange={(e) => setDailyCalories(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          min="1"
          step="1"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
