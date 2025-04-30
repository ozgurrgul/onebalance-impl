import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/balance", (req, res) => {
  const { address } = req.query;
  console.log({ address });
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
