import express from "express";
import transactionRoutes from "./routes/transcationRoutes";

const app = express();
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
