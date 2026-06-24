const express = require("express");
const router = express.Router();

const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { amount, to } = req.body;

        if (typeof amount !== "number" || amount <= 0) {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                message: "Amount must be a positive number"
            });
        }

        if (to === req.userId) {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                message: "Cannot transfer money to yourself"
            })
        }

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // perform transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        session.endSession();
        return res.json({
            message: "Transaction successful"
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            message: "Transaction failed"
        });
    }   
});

module.exports = router;