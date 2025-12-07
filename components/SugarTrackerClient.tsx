'use client';

import dynamic from 'next/dynamic';
import { useSugarTracker } from '@/hooks/useSugarTracker';
import FoodForm from './FoodForm';
import FoodList from './FoodList';
import SettingsForm from './SettingsForm';
import SugarStats from './SugarStats';

// Dynamically import the 3D component with no SSR
const BeakerVisualization = dynamic(
  () => import('./BeakerVisualization'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600 dark:text-gray-400">Loading 3D visualization...</div>
      </div>
    )
  }
);

export default function SugarTrackerClient() {
  const {
    foods,
    settings,
    totalSugar,
    sugarLimit,
    fillPercentage,
    addFood,
    removeFood,
    updateSettings,
    isLoaded,
  } = useSugarTracker();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Sugar Intake Tracker
        </h1>

        {/* Stats Section */}
        <div className="mb-8">
          <SugarStats
            totalSugar={totalSugar}
            sugarLimit={sugarLimit}
            fillPercentage={fillPercentage}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: 3D Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              3D Visualization
            </h2>
            <div className="aspect-square w-full">
              <BeakerVisualization fillPercentage={fillPercentage} />
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Rotate with mouse to view from different angles
            </div>
          </div>

          {/* Right Column: Controls and Log */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Settings
              </h2>
              <SettingsForm settings={settings} onUpdateSettings={updateSettings} />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sugar limit is 10% of daily calories (1g sugar = 4 cal)
              </p>
            </div>

            {/* Add Food */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Add Food
              </h2>
              <FoodForm onAddFood={addFood} />
            </div>

            {/* Food Log */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Today&apos;s Log
              </h2>
              <FoodList foods={foods} onRemoveFood={removeFood} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
