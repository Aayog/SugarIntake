'use client';

import { useState, useEffect } from 'react';
import { FoodItem, UserSettings } from '@/lib/types';
import {
  getFoodsFromStorage,
  saveFoodsToStorage,
  getSettingsFromStorage,
  saveSettingsToStorage,
  getTodaysFoods,
  calculateTotalSugar,
  calculateSugarLimit,
  calculateFillPercentage,
} from '@/lib/sugarUtils';

export const useSugarTracker = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [settings, setSettings] = useState<UserSettings>(() => getSettingsFromStorage());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    const storedFoods = getFoodsFromStorage();
    setFoods(storedFoods);
    setIsLoaded(true);
  }, []);

  // Save foods to local storage when they change
  useEffect(() => {
    if (isLoaded) {
      saveFoodsToStorage(foods);
    }
  }, [foods, isLoaded]);

  // Save settings to local storage when they change
  useEffect(() => {
    if (isLoaded) {
      saveSettingsToStorage(settings);
    }
  }, [settings, isLoaded]);

  const addFood = (name: string, sugar: number) => {
    const newFood: FoodItem = {
      id: crypto.randomUUID(),
      name,
      sugar,
      timestamp: Date.now(),
    };
    setFoods((prev) => [...prev, newFood]);
  };

  const removeFood = (id: string) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
  };

  const todaysFoods = getTodaysFoods(foods);
  const totalSugar = calculateTotalSugar(todaysFoods);
  const sugarLimit = calculateSugarLimit(settings.dailyCalories);
  const fillPercentage = calculateFillPercentage(totalSugar, sugarLimit);

  return {
    foods: todaysFoods,
    settings,
    totalSugar,
    sugarLimit,
    fillPercentage,
    addFood,
    removeFood,
    updateSettings,
    isLoaded,
  };
};
