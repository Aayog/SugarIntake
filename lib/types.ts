export interface FoodItem {
  id: string;
  name: string;
  sugar: number; // in grams
  timestamp: number;
}

export interface UserSettings {
  dailyCalories: number;
}

export interface SugarData {
  foods: FoodItem[];
  settings: UserSettings;
}
