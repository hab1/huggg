import express, { Request, Response, NextFunction } from 'express';
import brandRoutes from './routes/brandRoutes';

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

// Middleware to parse JSON body
app.use(express.json());

// Enable CORS for all routes so we can load from frontend
app.use(cors());

// Routes
app.use('/api', brandRoutes);

// Catch-all for 404 errors (invalid routes)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;