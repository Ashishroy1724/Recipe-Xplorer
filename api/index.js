import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from 'path';
import axios from 'axios';
import cors from 'cors'; // Import cors module

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

// Enable CORS for all origins
app.use(cors());

app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.use((err, req, res, next) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ----------------------- GEN --------------------- //


const API_KEY = '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'; 

app.get('/recipe', async (req, res) => {
  try {
    const userInput = req.query.ingredients;
    const cuisine = req.query.cuisine;
    const substitution = req.query.substitution;
    const allergies = req.query.allergies;
    const name = req.query.name;
   

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients mentioned.' },
        { role: 'system', content: 'The output should highlight the title in a little bit bigger text from the rest of the text and the tilte for everything should be in bold.' },
        { role: 'system', content: `Also give the recipe a suitable name in its local language based on cuisine preference and in English too at the top (${cuisine}).` },
        { role: 'system', content: `Choose the recipe by substituting things mentioned in substitution section (${substitution}).` },
        { role: 'system', content: `Choose the recipe by substituting things mentioned in remove section (${allergies}).` },
        { role: 'system', content: `Give an Alternative name for the recipe(${name}).` },
        { role: 'system', content: `Provide a formatted output for each recommended recipe consisting of:
                                    Title of the recipe
                                    Title of the recipe in the local language (if available)
                                    List of ingredients
                                    Cooking steps
                                    Garnishing tip (optional)` },
        { role: 'system', content: `Give the best garnishing tip suitable for the recipe at the end of output.` },
        { role: 'user', content: `Ingredients: ${userInput}` },
        { role: 'user', content: `Cuisine: ${cuisine}` },
        { role: 'user', content: `Substitution: ${substitution}` },
        { role: 'user', content: `Allergies: ${allergies}` },
        { role: 'user', content: `Name: ${name}` },
       
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const recipe = response.data.choices[0].message.content.trim();
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

