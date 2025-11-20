const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("<insert your MongoDB connection string here>").then
(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error connecting to the database", err);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

// Endpoint to get all users
app.get("/getUsers", (req, res) => {
    UserModel.find().then(function(response){
        res.json(response);
    }).catch(function(err){
        res.json(err);
    });
});

// Endpoint to get a single user by ID
app.get("/getUser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Error al obtener el usuario", error: err.message });
    }
});

// Endpoint to create a new user
app.post("/createUser", async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        console.error("Error creating user:", err);

        if (err.code === 11000) {
            return res.status(400).json({ 
                message: "El username ya está en uso." 
            });
        }

        res.status(500).json({ 
            message: "Error al crear el usuario", 
            error: err.message 
        });
    }
});

// Endpoint to update a user
app.put("/updateUser/:id", async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Endpoint to delete a user
app.delete("/deleteUser/:id", async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
