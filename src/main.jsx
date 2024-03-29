// Importing React and ReactDOM for creating and rendering React components.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Importing the main component of the application, App.jsx.

// Using ReactDOM.createRoot to render the root component of the application.
// This is the preferred method since React 18.
ReactDOM.createRoot(document.getElementById("root")).render(
	// Wrapping the App component with React.StrictMode for additional development mode checks.
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
