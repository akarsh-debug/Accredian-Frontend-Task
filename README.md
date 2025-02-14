# Frontend for Referral System

## Description
This project provides the frontend interface for the referral system. Built with React and Vite, it offers a fast and responsive user experience. The UI is styled using Tailwind CSS, with animations powered by Framer Motion. Axios is used for API communication with the backend.

## Technologies Used

- **React + Vite** - Modern frontend framework for fast development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Library for smooth animations and transitions
- **Axios** - HTTP client for making API requests

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/akarsh-debug/Accredian-Frontend-Task.git
   cd Accredian-Frontend-Task
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Integration

The frontend interacts with the backend via Axios. Ensure the backend is running before making requests.

### Example API Call
```js
import axios from 'axios';

axios.post('/api/referral', {
  formData
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```


