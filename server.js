const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const fuelRoutes = require('./src/routes/fuelRoutes');



dotenv.config();
// Connect to the database
connectDb();



const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/fuel', fuelRoutes);

app.get('/',(req, res)=>{
    res.send('oil project backend is running');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});