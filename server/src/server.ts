import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transcationRoutes";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Test adding a transaction by sending a POST to http://localhost:${PORT}/api/transactions`);

});
