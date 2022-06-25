import express from "express";
import { request } from "http";

const router = express.Router();

router.use("/players", (req, res, next) => {
    res.json({ p1: { name: "player1", avatarPath: "images/avatars/av1.png" }, p2: { name: "player2", avatarPath: "images/avatars/av1.png" } });
});

export default router;