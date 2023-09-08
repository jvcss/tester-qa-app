import express from 'express';
import { configureRoutes } from './routes';
import session from 'express-session';
import path from 'path';

const app = express();
//app.use(express.json());
//app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 3000;

configureRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
