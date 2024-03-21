import express from "express";
import { generateRecipe } from "../controllers/recipe.controller.js"; // Import your controller function for generating recipes
import { verifyToken } from "../utils/verifyUser.js"; // If authentication is required, import the verifyToken function

const router = express.Router();

// Define the route for generating a recipe
router.get("/recipe", verifyToken, generateRecipe); // You can use GET or POST based on your requirements

export default router;