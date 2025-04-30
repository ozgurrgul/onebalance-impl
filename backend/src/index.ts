import express from "express";
import { z } from "zod";
import { isValidAddress } from "./balanceService";

const app = express();
const port = 3000;

app.use(express.json());

const addressSchema = z.string().refine(isValidAddress, {
  message: "Invalid Ethereum address",
});

app.get("/api/balance", (req, res) => {
  try {
    const address = addressSchema.parse(req.query.address);
    res.json({ message: "Hello, world!", address });
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({
        message: e.errors.map((err) => err.message).join(", "),
      });
    } else {
      // In ideal production code, don't leak the errors and only throw known errors to client
      res.status(500).json({ message: (e as Error).message });
    }
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
