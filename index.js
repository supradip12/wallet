import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());

// CREATE User
app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE User
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { username },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE User
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE Wallet for User
app.post("/wallets", async (req, res) => {
  const { userId, balance } = req.body;
  try {
    const wallet = await prisma.wallet.create({
      data: { userId, balance },
    });
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE Transaction for Wallet
app.post("/transactions", async (req, res) => {
  const { walletId, type, amount, category } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: { walletId, type, amount, category },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
