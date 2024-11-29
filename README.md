🚗 Car Dealer App
A Next.js application that allows users to filter and view car models by make and year. This project demonstrates the use of modern React features, server-side rendering (SSR), static generation (SSG), and API integration with Tailwind CSS for responsive UI styling.

🌟 Features
Filter Page: Select car make and year to view vehicle models.
Result Page: Displays models for the selected make and year.
Dynamic Routing: Static generation for improved performance.
Error Handling: Graceful error handling with fallbacks.
Responsive Design: Built using Tailwind CSS.
Loader Animation: For a smooth user experience.
React Suspense: Efficient handling of asynchronous data fetching.
🚀 Installation

1. Clone the Repository
   bash
   Copy code
   git clone https://github.com/your-username/car-dealer-app.git
   cd car-dealer-app
2. Install Dependencies
   bash
   Copy code
   npm install
3. Set Up Environment Variables
   Create a .env.local file in the root directory with the following:

plaintext
Copy code
NEXT_PUBLIC_API_BASE_URL=https://vpic.nhtsa.dot.gov/api
START_YEAR=2015
MAX_MAKES=10
MAX_YEARS=5
Replace the values if necessary.

🔧 Usage
Start Development Server
bash
Copy code
npm run dev
Open http://localhost:3000 in your browser.

Build for Production
bash
Copy code
npm run build
npm start
The app will run on http://localhost:3000.

📂 Project Structure
bash
Copy code
car-dealer-app/
├── app/
│ ├── page.tsx # Filter page (home page)
│ ├── result/[makeId]/[year]/page.tsx # Result page
├── components/
│ ├── loader/loader.component.tsx # Loader animation
│ ├── error-boundary/error-boundary.component.tsx # Error boundary
├── constants/
│ └── vehicle.constants.ts # App constants (start year)
├── services/
│ └── vehicle.service.ts # API service for car data
├── types/
│ └── vehicle.types.ts # TypeScript types
└── styles/
└── globals.css # Global CSS
💡 Key Commands
Development
bash
Copy code
npm run dev
Production
bash
Copy code
npm run build && npm start
Linting
bash
Copy code
npm run lint
🌐 API Integration
This app integrates with the VPIC API to fetch vehicle makes and models.

Endpoints Used:
Fetch Vehicle Makes:
/vehicles/GetMakesForVehicleType/car?format=json

Fetch Vehicle Models by Make and Year:
/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json

📖 Resources
Next.js Documentation
Tailwind CSS Documentation
VPIC API Documentation
🛠 Technologies
Framework: Next.js
Styling: Tailwind CSS
TypeScript: For type safety.
Axios: For API requests.
📝 License
This project is licensed under the MIT License.

✨ Author
Created by Me. Feel free to reach out! 😊
