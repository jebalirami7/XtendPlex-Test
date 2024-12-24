# XtendPlex-Test

Build a grocery categorization app where users can drag and drop products (fruits, vegetables, meats) into designated categories, adhering to a provided Figma design. Integrate a React front-end with a FastAPI back-end for data management and dynamic UI updates.

<!--
## Live Demo

<a href="https://webproject-pied.vercel.app/" target="_blank">Mesa Verde Bank</a>

## Demo Video

Check out the demo video below:

[![Demo Video](https://github.com/jebalirami7/mesa-verde-bank/assets/138411253/2f54ca44-1ca2-4f7d-9dad-181176935ab0)](https://github.com/jebalirami7/mesa-verde-bank/assets/138411253/a5f08b26-c3e7-4254-b9a1-5207f44d318d)
-->
![image](https://github.com/user-attachments/assets/e8c60391-5cbc-4577-85f6-2cf17fb762b0)


## Key Features

- UI/UX Design Integration
- Drag-and-Drop Interaction
- Categorization Logic
- Back-End Integration (FastAPI)

## Tech Stack

**Frontend:**

- React
- Axios (for HTTP requests)

**Backend:**

- FastAPI
  
**Database:**

- Postgres (SQL)

**Tools:**

- Git & GitHub for version control
- Postman for API testing

## Installation

1. **Clone the Repository**
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

```bash
# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
```

3. **Set Up Environment**: Configure the environment variables required for database connections, API integrations, etc.

```bash
# Enviroment variables template :
DATABASE_URL=postgresql+psycopg2://<username>:<password>@localhost/XtendPlex-Test
```

4. **Run the Application**

```bash
# Run the server
cd backend
fastapi dev main.py

# Run the client
cd frontend
npm run dev
```

## Authors

- [Mohamed Rami Jebali](https://github.com/jebalirami7)
