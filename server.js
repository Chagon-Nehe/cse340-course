import express from 'express';

//define the environment variables
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
//define the port number
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!, from Express!');
});

app.listen(PORT, () => {
    console.log(`server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});