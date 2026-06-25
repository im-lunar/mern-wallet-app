const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware")

const signupSchema = zod.object({
    username: zod.string().min(4).max(30),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinSchema = zod.object({
    username: zod.string().min(4).max(30),
    password: zod.string().min(6)
});

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional()
});

router.post("/signup", async (req,res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(409).json({
            message: "Email already taken / Incorrect Inputs"
        });
    }

    const existingUser = await User.findOne({username:body.username});
    if (existingUser) {
        return res.status(409).json({
            message: "User already exists!"
        });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const dbUser = await User.create({
        username: body.username,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName
    });

    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId: dbUser._id,
    }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });

});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect Inputs"
        });
    }

    const user = await User.findOne({username});
    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET);

    res.json({
        message: "Logged in successfully",
        token: token
    });

});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs"
        });
    }

    await User.updateOne({
        _id: req.userId
    }, req.body);

    return res.json({
        message: "Updated successfully"
    });

});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                } 
            }
        ]
    },
        {
            firstName: 1,
            lastName: 1,
            username: 1
        }
    );

    res.json({users});

});

module.exports = router;