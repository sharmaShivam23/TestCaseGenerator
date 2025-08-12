AI-Powered Test Case Generator
A modern web application that integrates with GitHub to analyze your codebase and generate automated test cases using AI. Supports multiple testing frameworks and enables seamless creation of pull requests with generated test code on GitHub.

Features
1. GitHub Integration:
Authenticate via GitHub OAuth and browse your repositories and code files directly in the UI.

2. Multi-File Test Case Generation:
Select multiple files and send them to the AI backend to generate grouped test case summaries.

3. Test Case Summaries & Code Generation:
View a list of AI-generated test case summaries. Select any summary to generate the detailed test case code snippet.

4. Support for Multiple Testing Frameworks:
AI generates test cases in various frameworks (e.g., JUnit for JavaScript/React, Selenium for Python automation).

5. Pull Request Automation (Bonus):
Easily create a pull request on GitHub with the generated test case code pushed to a new branch.

6 .Clean & Responsive UI:
Built with React and Tailwind CSS, providing a modern, intuitive user experience.

Technologies Used
Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

GitHub API: For repository browsing and PR creation

AI: Integration with an AI model to generate test cases (e.g., Gemini API)

Authentication: GitHub OAuth for user login

Getting Started
Prerequisites
Node.js (v16)

MongoDB instance (cloud)

GitHub OAuth app credentials

Gemini API key

Installation
Clone the repository:


git clone https://github.com/yourusername/ai-testcase-generator.git
cd ai-testcase-generator
Setup backend environment:

Create .env file in the backend folder with the following variables:

env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
Install backend dependencies and start server:

bash
Copy
Edit
cd backend
npm install
npm run dev
Setup frontend environment:

bash
Copy
Edit
cd ../frontend
npm install
npm start
Open your browser at http://localhost:3000

Usage
Login with GitHub to authorize and access your repositories.

Browse your repo files and select one or more files for test case generation.

AI will provide a list of test case summaries based on selected files.

Click on any summary to generate full test case code.

Optionally, click "Create Pull Request" to push generated test code back to GitHub.

Screenshots
Soon........

Repo file listing UI

Test case summaries list

Generated test case code

PR creation success

Folder Structure
TestCaseGenerator/
├── backend/               # Node.js Express server
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   └── index.js
├── frontend/              # React + Tailwind app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── reducer/
│   │   └── App.jsx
│   └── tailwind.config.js
├── README.md
└── package.json
Future Improvements
Add support for more test frameworks and languages

Enable code editing before PR creation

Add better AI prompt customization for test generation

Improve UI/UX with animations and better feedback

