const axios = require('axios');
require('dotenv').config();

exports.generateRecipe = async (req, res) => {
  try {
    const userInput = req.query.ingredients;
    const cuisine = req.query.cuisine;
    const allergies = req.query.allergies;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients mentioned.' },
        { role: 'system', content: 'The recipe should highlight the fresh and vibrant flavors of the ingredients .' },
        { role: 'system', content: `Also give the recipe a suitable name in its local language based on cuisine preference and in English too at the top (${cuisine}).` },
        { role: 'system', content: `Choose the recipe by removing things mentioned in allergies section (${allergies}).` },
        { role: 'system', content: `Give the best garnishing tip suitable for the recipe at the end of output.` },
        { role: 'system', content: `Provide a formatted output for each recommended recipe consisting of:
                                    Title of the recipe
                                    Title of the recipe in the local language (if available)
                                    List of ingredients
                                    Cooking steps
                                    Garnishing tip (optional)` },
                                    
        { role: 'user', content: `Ingredients: ${userInput}` },
        { role: 'user', content: `Cuisine: ${cuisine}` },
        { role: 'user', content: `Allergies: ${allergies}` },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
    });

    const recipe = response.data.choices[0].message.content.trim();
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
};
