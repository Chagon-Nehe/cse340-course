import express from 'express';
import { fileURLToPath } from "url";
import path from "path";
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

//define the environment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
//define the port number
const PORT = process.env.PORT || 3000;

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// middleware to log all incoming request
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next(); // Pass control to the next middleware function
}); 

// Middleware to make the NODE_ENV variable available in all templates
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

/**
 * Routes
 */
// use the router for all routes
app.use(router);

//catch-all route for handling 404 errors
app.use((req, res) => {
  const err = new Error('Page Not Found');
  err.status = 404;

  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`Error ocurred: ${err.message}`);
  console.error(`Stack trace: ${err.stack}`);

  // Determine status and template
  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';

  //Prepare data for the template
  const context = {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: err.message,
    stack: err.stack
  };
  // Render the appropriate error template
  res.status(status).render(`errors/${template}`, context);
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }

});