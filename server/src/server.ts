import express from "express";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
