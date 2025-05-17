# SRxit

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sahil9079100/SRXit.git
cd SRxit
```

### 2. Install all dependencies (backend & frontend) with one command

```bash
npm run install-all
```

> This command will install all required packages for both the backend and frontend automatically.

### 3. Configure Environment Variables

You need to create a `.env` file in the `backend` directory with the following content:

```env
PORT = 3000 // I am using 3000, you can use other port also
MONGO_DB_URI = // add your mongodb DB link
SECRET_KEY = //add your secret key here
```

**Steps:**
1. Go to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a file named `.env` and paste the above content into it.
3. Save the file.

> **Note:** Never share your `.env` file publicly or commit it to version control, as it contains sensitive information.

### 4. Start the backend and frontend servers

- **Backend:**
  ```bash
  cd backend
  npm start
  ```

- **Frontend:**
  ```bash
  cd ../frontend
  npm run dev
  ```

## Notes

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Configure any required environment variables as described above before starting the servers.