# Sugar Intake Tracker

A beautiful 3D visualization tool to track your daily sugar consumption using Next.js, React Three Fiber, and Tailwind CSS.

![Sugar Intake Tracker](https://github.com/user-attachments/assets/ebcbd388-082e-4f01-a44c-11d4a9743aa2)

## Features

### 🥤 3D Interactive Beaker Visualization
- Real-time 3D glass beaker that fills based on your sugar intake
- Interactive rotation with mouse controls
- Visual feedback with color changes (amber for normal, red when exceeding limit)
- Transparent glass with measurement marks
- Built with React Three Fiber and Three.js

### 📊 Dynamic Sugar Limit
- Automatically calculates your daily sugar limit as 10% of your daily calorie intake
- Formula: `(Daily Calories × 0.1) ÷ 4` (since 1g sugar = 4 calories)
- Default: 2000 calories → 50g sugar limit
- Fully customizable through settings

### 💾 Local Storage Persistence
- All food items and settings are saved locally
- Data persists across browser sessions
- Automatic daily reset (only shows today's foods)
- No server or database required

### 🍎 Food Logging System
- Add custom food items with name and sugar content
- Real-time updates to the 3D visualization
- Remove individual items
- View all logged items for the day
- Form validation and automatic clearing

### ⚙️ Settings Management
- Edit daily calorie target
- Inline editing with Save/Cancel options
- Automatic recalculation of sugar limits
- Settings persist across sessions

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Dark mode support
- Color-coded statistics (blue, green, yellow/red)
- Clean, professional interface
- Smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber + Three.js
- **3D Controls**: @react-three/drei
- **State Management**: React Hooks + localStorage

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aayog/SugarIntake.git
cd SugarIntake
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Set Your Daily Calorie Goal**: Click "Edit" in the Settings section to customize your daily calorie intake (default: 2000 cal)

2. **Add Food Items**: Enter the food name and sugar content in grams, then click "Add Food"

3. **Monitor Your Intake**: Watch the 3D beaker fill up as you add items. The color changes from amber to red when you exceed your limit

4. **Manage Your Log**: Remove items by clicking the "Remove" button next to any food item

5. **Track Your Progress**: View your total sugar intake, daily limit, and percentage in the stats cards

## Project Structure

```
SugarIntake/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout (server component)
│   └── page.tsx             # Home page (server component)
├── components/
│   ├── BeakerVisualization.tsx      # 3D beaker component
│   ├── FoodForm.tsx                 # Add food form
│   ├── FoodList.tsx                 # Food log display
│   ├── SettingsForm.tsx             # Settings editor
│   ├── SugarStats.tsx               # Statistics display
│   └── SugarTrackerClient.tsx       # Main client component
├── hooks/
│   └── useSugarTracker.ts          # Custom hook for state management
├── lib/
│   ├── types.ts                    # TypeScript type definitions
│   └── sugarUtils.ts               # Utility functions
└── public/                         # Static assets
```

## How It Works

### Sugar Limit Calculation

The app calculates your recommended daily sugar intake based on the guideline that sugar should not exceed 10% of your total daily calories:

```typescript
Sugar Limit (g) = (Daily Calories × 0.1) ÷ 4
```

For example, with 2000 calories:
- 10% of 2000 = 200 calories from sugar
- 200 calories ÷ 4 cal/g = 50g of sugar

### Data Persistence

All data is stored in the browser's localStorage:
- Food items are stored with timestamps
- Only items from the current day are displayed
- Settings persist across browser sessions
- No personal data is sent to any server

## Screenshots

### Empty State
![Initial State](https://github.com/user-attachments/assets/2b857bcc-02b8-4754-b4b3-c8a7446da6a5)

### 48% Filled
![With Food](https://github.com/user-attachments/assets/2c00dd1c-8b13-4ba7-b24d-47fe5fd10813)

### 68% Filled (Multiple Items)
![Multiple Items](https://github.com/user-attachments/assets/12d9ac57-5f9c-4c02-9c3d-16fbb9ff12f3)

### 90.7% Filled (Custom Settings)
![Near Limit](https://github.com/user-attachments/assets/4511c650-3130-4a52-b334-ed1f674a6a80)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- 3D graphics powered by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
