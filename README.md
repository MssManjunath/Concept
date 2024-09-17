# Concept

This project consists of a **React** frontend (built with Vite) and a **FastApi** backend, along with some additional commands to set up and run the project.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (for React and npm-related commands).
- **Python**: Ensure you have Python installed (for FastApi).
- **npm**: Make sure you have npm available (should come with Node.js).
- **Python Virtual Environment**: `venv` for managing Python dependencies.

---

## Project Structure

```bash
.
├── react-app/                # React application (Vite-based)
├── FastApi-app/                # FastApi application       
└── README.md                 # This file
```

---

## Getting Started

### React App Setup

1. Navigate to the React app folder:
   ```bash
   cd react-app
   ```

2. Install all npm dependencies:
   ```bash
   npm install
   ```

3. Start the React app with Vite:
   ```bash
   npm run dev
   ```

   The React app will now be running, and you can access it at:
   ```
   http://localhost:5173/
   ```

4. Run `npm convex dev` to  setup convex:
   ```bash
   npm convex dev
   ```

---

### FastApi App Setup

1. Navigate to the FastApi app folder:
   ```bash
   cd FastApi-app
   ```

2. Create a virtual environment (you can name it `venv` or any name you prefer):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

   - On **Windows**:
     ```bash
     venv\Scripts\activate
     ```

4. Install the dependencies listed in `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastApi app:
   ```bash
   FastApi run
   ```

   The FastApi app will now be running, and you can access it at:
   ```
   http://localhost:5000/
   ```

---

### Additional Information

- **React App**: Built using [Vite](https://vitejs.dev/), a fast frontend build tool.
- **FastApi App**: Python backend using the FastApi framework.
- **npm convex dev**: A command required for additional setup in the React app folder.

---

## Running Both Apps

To run both the FastApi backend and the React frontend together, follow these steps:

1. Start the FastApi app by following the instructions above (`FastApi run`).
2. In a separate terminal, start the React app (`npm run dev`).

Once both servers are running, the React app can communicate with the FastApi backend, enabling full functionality.

---

## Notes

- Ensure that your FastApi and React apps are running on different ports (by default: React on `5173` and FastApi on `5000`).
- Make sure to activate the Python virtual environment before running any Python commands.
```

### Instructions Summary:
- The **React app** is built with Vite, so you'll run `npm install` followed by `npm run dev`.
- The **FastApi app** is set up using a Python virtual environment, and you'll install the dependencies from `requirements.txt`.
- If there’s a specific command (`npm convex dev`) required in the React app, it’s included in the steps as well.

Let me know if you need further customization for this `README.md`!