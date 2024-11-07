# Spexy Front End

## Project Overview
This project is a React-based frontend for our data product, created as part of Week 8's activity. The main objective of this project is to build and prototype the major components of our application using React, with a focus on basic implementation and layout. This project includes the necessary components, mock data integration, and basic styling, preparing us for complete integration with FastAPI in the upcoming weeks.

## Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Component Overview](#component-overview)
- [Mock Data](#mock-data)
- [Development Process](#development-process)
- [Design Decisions](#design-decisions)
- [Technical Choices](#technical-choices)
- [Future Work](#future-work)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/bipana06/Final_Project_PPDS.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Final_Project_PPDS/spexy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Component Overview
### 1. `App.js`
The main component that sets up the `Router` and defines routes for various pages:
- **`/`** - `SearchPage`
- **`/login`** - `LoginForm`
- **`/store`** - `MainPage`
- **`/admin`** - `AdminPage`
- **`/signup`** - `SignupPage`
- **`/reset`** - `ForgotPasswordPage`

### 2. `components/Login/LoginForm.js`
- **Props/State**: Uses `useState` for `username` and `password` inputs.
- **Functionality**: Basic input fields and buttons for login interactions with links to `ForgotPassword` and `SignUp` pages.

### 3. `components/Main/MainPage.js`
- **Props/State**: Manages `apiResponse` using `useState`.
- **Includes**:
  - `Header` component
  - `CameraDisplay` component (for image capture)
  - `RecommendationsList` component (to display mock data)
- **Layout**: Split layout with `CameraDisplay` on the left and `RecommendationsList` on the right.

### 4. `components/Admin/AdminPage.js`
**Note**: The current design of the Admin page is simple, focusing primarily on the scraping feature. Future enhancements will include more complex functionality and user interactions.
- **Props/State**: Displays a static list of mock glasses (`mockGlasses`).
- **Functionality**: Contains buttons for actions like `Scrape`, `Add`, `Update`, and `Remove`.
- **Styling**: Inline styling using the `styles` object.

### 5. `components/Signup/SignupForm.js`
- **Props/State**: Manages input fields for `name`, `username`, `password`, and `recovery code`.
- **Functionality**: Handles form submission for user sign-up.

### 6. `components/Main/CameraDisplay.js`
- **Props/State**: Uses `useState` for handling camera and image capture state.
- **Functionality**: Starts/stops the camera and captures an image with a mock submission process.

### 7. `components/Main/RecommendationsList.js`
- **Props/State**: Uses `useState` for handling `recommendations` fetched from `sample_data.json`.
- **Functionality**: Simulates an API call to display recommended glasses based on `apiResponse`.

## Mock Data

**Note**: The "I'm Feeling Lucky" button currently redirects to the same store due to using mock data that belongs to just one store. With full implementation, this button will randomly redirect users to different stores.
The project currently uses the following mock data:
- **`mockGlasses`** in `AdminPage.js`
- **`sample_data.json`** fetched in `RecommendationsList.js`
- These mock data structures are placeholders and are designed to mimic the expected structure of real API data to facilitate future integration.

## Development Process
1. **Initial Planning**:
   - Created a low-fidelity wireframe in Figma to map out the structure of the major components and user interaction flows.
2. **Component Creation**:
   - Broke down the wireframe into distinct React components.
3. **Mock Data Implementation**:
   - Added mock data and integrated it within `AdminPage` and `RecommendationsList`.
4. **Basic Styling**:
   - Applied simple inline CSS to achieve a clear and logical layout.
5. **Testing**:
   - Ensured each component renders correctly and interacts as intended using mock interactions.

## Design Decisions
- **Component Separation**: Decided to keep components like `LoginForm`, `AdminPage`, and `RecommendationsList` modular to promote reusability and separation of concerns.
- **Mock Data**: Chose to use mock data to simulate API responses, which helps with frontend testing before full backend integration.
- **Inline Styling**: Used inline styles for initial prototyping, allowing rapid adjustments during development.

## Technical Choices
- **React Hooks**: Utilized `useState` and `useEffect` for state management and side effects.
- **Mock API Data**: Fetched `sample_data.json` locally to simulate external data calls.
- **Routing**: Used `react-router-dom` for navigation, ensuring different components render based on URL paths.

## Future Work
- **API Integration**: Replace mock data with real API calls to our FastAPI backend.
- **Enhanced Styling**: Transition from inline styles to CSS modules or styled-components for improved maintainability.
- **Form Validation**: Add client-side validation for forms in `LoginForm` and `SignupForm`.
- **User Authentication**: Implement a proper login flow with token-based authentication.

## Figma Wireframe File Link 
- Link : https://www.figma.com/design/d2KIPF2vVsHt0SeHk3C0JH/Spexy-wireframe?node-id=1669-162202&t=WABvY4mqyI6lqKnG-1


