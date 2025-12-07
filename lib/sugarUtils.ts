import { FoodItem, UserSettings } from './types';

const STORAGE_KEYS = {
  FOODS: 'sugar-intake-foods',
  SETTINGS: 'sugar-intake-settings',
} as const;

export const DEFAULT_DAILY_CALORIES = 2000;

// Calculate sugar limit (10% of daily calories, where 1g sugar = 4 calories)
export const calculateSugarLimit = (dailyCalories: number): number => {
  return (dailyCalories * 0.1) / 4;
};

// Get foods from local storage
export const getFoodsFromStorage = (): FoodItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FOODS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading foods from storage:', error);
    return [];
  }
};

// Save foods to local storage
export const saveFoodsToStorage = (foods: FoodItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
  } catch (error) {
    console.error('Error saving foods to storage:', error);
  }
};

// Get settings from local storage
export const getSettingsFromStorage = (): UserSettings => {
  if (typeof window === 'undefined') {
    return { dailyCalories: DEFAULT_DAILY_CALORIES };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : { dailyCalories: DEFAULT_DAILY_CALORIES };
  } catch (error) {
    console.error('Error reading settings from storage:', error);
    return { dailyCalories: DEFAULT_DAILY_CALORIES };
  }
};

// Save settings to local storage
export const saveSettingsToStorage = (settings: UserSettings): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to storage:', error);
  }
};

// Calculate total sugar from foods
export const calculateTotalSugar = (foods: FoodItem[]): number => {
  return foods.reduce((total, food) => total + food.sugar, 0);
};

// Calculate fill percentage
export const calculateFillPercentage = (totalSugar: number, sugarLimit: number): number => {
  return Math.min((totalSugar / sugarLimit) * 100, 100);
};

// Filter today's foods
export const getTodaysFoods = (foods: FoodItem[]): FoodItem[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  return foods.filter(food => {
    const foodDate = new Date(food.timestamp);
    foodDate.setHours(0, 0, 0, 0);
    return foodDate.getTime() === todayTimestamp;
  });
};
