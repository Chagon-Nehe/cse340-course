import express from 'express';
import { fileURLToPath } from "url";
import path from "path";

//define the environment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
//define the port number
const PORT = process.env.PORT || 3000;

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


/**
  * Routes
  */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/organizations', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/projects.html'));
});

app.listen(PORT, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});