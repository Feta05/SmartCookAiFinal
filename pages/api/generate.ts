import fetch from 'node-fetch'; // Import the fetch library

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      // Only allow POST requests
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const { ingredients, cookTime, level } = req.body; // Extract level from request body

    const prompt = `I am a ${level} cook and I have these ingredients: ${ingredients.join(
      ", "
    )}. Suggest 3 different recipes I can cook in under ${cookTime} minutes. The response should be 1 to 2 paragraphs with a step by step guide on how to start with the cooking . Don't include ingredient lists and start by naming the dish and then go on how to cook  it etc. in the response, and no decorative text like "Here's a recipe for you" or "Another recipe you'd enjoy...".`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ content: prompt, role: "user" }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch response: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error("Invalid response data: missing or empty 'choices' array");
    }

    const content = data.choices[0]?.message?.content;

    if (typeof content !== 'string') {
      throw new Error("Invalid response data: 'content' is not a string");
    }

    const recipes = content.split("\n").filter(line => line.trim().length > 0);

    res.status(200).json({
      recipes: recipes.slice(0, 3), // Take top 3 recipes
    });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
