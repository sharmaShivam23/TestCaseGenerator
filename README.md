
[README (1).md](https://github.com/user-attachments/files/21747365/README.1.md)

##  Project Title and description
GitTestPulse :  A modern web application that integrates with GitHub to analyze your codebase and generate automated test cases using AI. Supports multiple testing frameworks and enables seamless creation of pull requests with generated test code on GitHub.
## Features
1. GitHub Integration:
Authenticate via GitHub OAuth and browse your repositories and code files directly in the UI.

2. Multi-File Test Case Generation:
Select multiple files and send them to the AI backend to generate grouped test case summaries.

3. Test Case Summaries & Code Generation:
View a list of AI-generated test case summaries. Select any summary to generate the detailed test case code snippet.

4. Support for Multiple Testing Frameworks:
AI generates test cases in various frameworks (e.g., JUnit for JavaScript/React, Selenium for Python automation).

5. Pull Request Automation:
Easily create a pull request on GitHub with the generated test case code pushed to a new branch.

6. Clean & Responsive UI:
Built with React and Tailwind CSS, providing a modern, intuitive user experience.


## Technologies Used
Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

GitHub API: For repository browsing and PR creation

AI: Integration with an AI model to generate test cases 

Authentication: GitHub OAuth for user login
## Prerequisites
Node.js (v16 or later recommended)

MongoDB instance (local or cloud)

GitHub OAuth app credentials

## Project Structure

TestCaseGenerator/
├── Backend/ # Node.js Express server 
│ ├── controllers/
│ ├── model/
│ ├── routes/
│ ├── config/ 
│ ├── utils/
│ └── index.js 
├── Frontend/ # React + Tailwind app 
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── reducer/ 
│ │ ├── api.js/ 
│ │ └── App.jsx
│ └── tailwind.config.js
├── README.md
└── package.json



## Installation

Install my-project with npm
 
 Clone the repository:

```bash
 git clone https://github.com/sharmaShivam23/TestCaseGenerator.git
 cd TestCaseGenerator
```
    
  Setup backend environment:
  ```bash
PORT = 5000
MONGO_URI =  your mongo url
NODE_ENV=production
COOKIE_SECRET= your SECRET_KEY
SESSION_SECRET= your SESSION_SECRET
GITHUB_CLIENT_ID = your GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET = your GITHUB_CLIENT_SECRET
JWT_SECRET = yoyr JWT_SECRET
ENCRYPTION_PASSPHRASE= your ENCRYPTION_PASSPHRASE
APP_NAME= your APP_NAME
BASE_URL= http://localhost:5000
FRONTEND_URL=http://localhost:5173 or your FRONTEND_URL
GEMINI_API_KEY = your GEMINI_API_KEY
CAPTCHA_KEY = your invisible v2 CAPTCHA_KEY
GITHUB_TOKEN = your GITHUB_TOKEN
  ```


  Setup backend environment:
  ```bash
VITE_API_BASE_URL = "API url"
VITE_API_CAPTCHA_KEY = "your recaptcha key"


  ```

Install backend dependencies and start server:
```bash
cd backend
npm install
npm run dev
```

Setup frontend environment:
```bash
cd ../frontend
npm install
npm run dev

```

## Usage
Login with GitHub to authorize and access your repositories.

It Will automatically shows your all repos in UI.

Select a repository, pick the files you want, and let the app generate detailed test summaries and test cases for them.

AI will provide a list of test case summaries based on selected files.

Click on any summary to generate full test case code.

click "Create Pull Request" to push generated test code back to GitHub.
## Screenshots
Home Page : -
<img width="1905" height="863" alt="Screenshot 2025-08-13 103706" src="https://github.com/user-attachments/assets/f30bb4c9-7dd8-49de-aa41-f804c7a4ce21" />

Fetching Github Repose : -
<img width="1919" height="861" alt="Screenshot 2025-08-13 103838" src="https://github.com/user-attachments/assets/c2bc80a2-e20d-4abf-b1fa-ccdd0a44179f" />

Generate Test Case Summary And Code of Selected Files : -
<img width="1877" height="879" alt="Screenshot 2025-08-13 104105" src="https://github.com/user-attachments/assets/bd20a1a3-e517-4845-9989-141c0bdb39c8" />


## Support

For support, email sgivamsharma06@gmail.com , 
Shivam Sharma

