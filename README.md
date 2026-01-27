# AlgroFlix Website

This is the AlgroFlix website with admin dashboard, blog management, and cookie consent functionality.

## Production Deployment Steps

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PM2 (for production process management)

### 1. Environment Setup
Create production `.env` files in both root and backend directories:

**Root directory `.env`:**
```bash
# Frontend configuration
PORT=30002
REACT_APP_API_URL=http://localhost:4002
```

**Backend directory `.env`:**
```bash
# Backend configuration
PORT=4002
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=production
```

### 2. Build the React Application
```bash
npm run build
```

### 3. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 4. Start Production Servers

**Using PM2 (Recommended for production):**
```bash
# Install PM2 globally if not already installed
npm install -g pm2

# Start backend server with PM2
cd backend && pm2 start server.js --name algoflix-backend

# Start frontend server with PM2 (optional, can use nginx instead)
pm2 start ../server.js --name algoflix-frontend --node-args="-r dotenv/config" -- --port 30002
```

**Using Node directly:**
```bash
# Start backend server
cd backend && node server.js

# In a separate terminal, start frontend server
PORT=30002 npm start
```

### 5. Server Management with PM2
```bash
# View running processes
pm2 list

# Monitor logs
pm2 logs

# Restart application
pm2 restart algoflix-backend

# Stop application
pm2 stop algoflix-backend

# Delete application from PM2
pm2 delete algoflix-backend
```

## Development Setup

### Running in Development Mode
1. Start backend server:
   ```bash
   cd backend && npm start
   ```

2. In a separate terminal, start frontend development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4002

## SSH Deployment Commands

To access the production server via SSH:
```bash
ssh username@server_ip_address
```

After connecting to the server:

1. Navigate to the project directory:
   ```bash
   cd /path/to/algoflix
   ```

2. Pull the latest changes from the repository:
   ```bash
   git pull origin main
   ```

3. Install/update dependencies:
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

4. Build the React application:
   ```bash
   npm run build
   ```

5. Restart the application using PM2:
   ```bash
   # Restart backend
   pm2 restart algoflix-backend
   
   # If using frontend server with PM2
   pm2 restart algoflix-frontend
   ```

## Environment Variables

### Required Environment Variables

**Backend (.env in backend directory):**
- `PORT`: Backend server port (default: 4002)
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment mode (development/production)

**Frontend (.env in root directory):**
- `PORT`: Frontend server port (default: 30002)
- `REACT_APP_API_URL`: Backend API URL

### Security Recommendations
- Never commit `.env` files to version control
- Use strong, unique values for `JWT_SECRET`
- Consider using environment-specific configuration files
- Use HTTPS in production

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).