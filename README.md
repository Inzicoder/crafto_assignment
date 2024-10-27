Quote Management App

This is a simple Quote Management App that allows users to create and list quotes. The app includes two main pages:

Quote List Page: Displays the list of quotes with infinite scrolling.
Quote Creation Page: Allows users to create new quotes with text and an image.
Features
Fetch quotes from the backend API.
Create new quotes with text and an image upload.
Responsive design with a mobile-friendly interface.
Includes ESLint for code style enforcement and error detection.
Prerequisites
Before running the project, ensure you have the following installed:

Node.js (version 12+)
npm or yarn
A valid API token for authentication (You’ll need this for API requests).

Getting Started
Clone the repository:
git clone https://github.com/your-username/quote-management-app.git
cd quote-management-app

Install dependencies:
npm install

Run the project:
npm start

Folder Structure

├── public
│   └── index.html        # Main HTML file
├── src
│   ├── components        # React components
│   ├── styles            # CSS/SCSS files
│   ├── App.js            # Main App component
│   └── index.js          # Entry point
├── .eslintrc.json        # ESLint configuration
├── package.json          # Project configuration and scripts
├── README.md             # Project documentation
└── .env                  # Environment variables (not committed)

API Endpoints
The app interacts with the following API endpoints:

Fetch Quotes: GET https://assignment.stage.crafto.app/getQuotes
Create Quote: POST https://assignment.stage.crafto.app/postQuote
Image Upload: POST https://crafto.app/crafto/v1.0/media/assignment/upload