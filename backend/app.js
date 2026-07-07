const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// =======================
// Middleware
// =======================

app.use(cors());
app.use(express.json());

// =======================
// MongoDB Connection
// =======================

mongoose.connect("mongodb://host.docker.internal:27017/foodieshub")
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// =======================
// Menu Schema
// =======================

const menuSchema = new mongoose.Schema({

    name: String,
    category: String,
    price: Number

});

const Menu = mongoose.model("Menu", menuSchema);

// =======================
// User Schema
// =======================

const userSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String

});

const User = mongoose.model("User", userSchema);

// =======================
// Order Schema
// =======================

const orderSchema = new mongoose.Schema({

    customerName: String,
    items: Array,
    total: Number,

    createdAt:{

        type:Date,
        default:Date.now

    }

});

const Order = mongoose.model("Order", orderSchema);

// =======================
// Home
// =======================

app.get("/",(req,res)=>{

    res.send("🍔 Foodie's Hub Backend Running");

});

// =======================
// Register
// =======================

app.post("/register",async(req,res)=>{

    const {username,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists){

        return res.json({

            message:"Email already registered"

        });

    }

    const newUser=new User({

        username,
        email,
        password

    });

    await newUser.save();

    res.json({

        message:"Registration Successful"

    });

});

// =======================
// Login
// =======================

app.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    const user=await User.findOne({

        email,
        password

    });

    if(user){

        res.json({

            success:true,
            message:"Login Successful"

        });

    }else{

        res.json({

            success:false,
            message:"Invalid Email or Password"

        });

    }

});

// =======================
// Seed Menu
// =======================

app.get("/seed",async(req,res)=>{

    await Menu.deleteMany({});

    await Menu.insertMany([

        {

            name:"Chicken Biryani",
            category:"Main Course",
            price:220

        },

        {

            name:"Veg Fried Rice",
            category:"Main Course",
            price:180

        },

        {

            name:"Paneer Butter Masala",
            category:"Curry",
            price:200

        },

        {

            name:"Pizza",
            category:"Fast Food",
            price:250

        },

        {

            name:"Burger",
            category:"Fast Food",
            price:120

        },

        {

            name:"French Fries",
            category:"Snacks",
            price:90

        }

    ]);

    res.send("✅ Menu Added Successfully");

});

// =======================
// Get Menu
// =======================

app.get("/menu",async(req,res)=>{

    const menu=await Menu.find();

    res.json(menu);

});

// =======================
// Place Order
// =======================

app.post("/order",async(req,res)=>{

    const newOrder=new Order(req.body);

    await newOrder.save();

    res.json({

        message:"✅ Order Placed Successfully"

    });

});

// =======================
// Get Orders
// =======================

app.get("/orders",async(req,res)=>{

    const orders=await Order.find();

    res.json(orders);

});

// =======================
// Server
// =======================

const PORT=5000;

app.listen(PORT,()=>{

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});