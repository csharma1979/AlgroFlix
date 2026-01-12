# Algoflix Website

This is the Algoflix website with admin dashboard, blog management, and cookie consent functionality.

## Production Deployment Steps

1. Build the React application:
   ```
   npm run build
   ```

2. Navigate to the backend directory:
   ```
   cd backend
   ```

3. Install backend dependencies:
   ```
   npm install
   ```

4. Start the backend server:
   ```
   node server.js
   ```

The application will run on port 30003.

## SSH Command for Server Access

To access the production server via SSH:
```
ssh username@server_ip_address
```

After connecting to the server:

1. Navigate to the project directory:
   ```
   cd /path/to/algoflix
   ```

2. Pull the latest changes from the repository:
   ```
   git pull origin main
   ```

3. Install/update dependencies:
   ```
   npm install
   cd backend && npm install && cd ..
   ```

4. Build the React application:
   ```
   npm run build
   ```

5. Start the application using PM2 (recommended) or node:
   ```
   # Using PM2 (recommended for production)
   cd backend && pm2 start server.js --name algoflix-app
   
   # Or using node directly
   cd backend && node server.js
   ```

6. To stop the application:
   ```
   # Using PM2
   pm2 stop algoflix-app
   
   # Or find and kill the process manually
   pkill -f server.js
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
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