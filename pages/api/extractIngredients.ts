import fetch from 'node-fetch'; // Import the fetch library

export default async function handler(req, res) {
    try {

        if (req.method !== 'POST') {
            // Only allow POST requests
            res.status(405).json({ error: 'Method Not Allowed' });
            return;
        }

        const {content} = req.body; // Extract content from request body

        const prompt = "Based on the image get ingredients list of cooking ingredients.";

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4-vision-preview",
                messages: [{ content, role: "user" }],
                max_tokens: 3000
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch response: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        res.status(200).json({
            ingredients: data
        });
    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
