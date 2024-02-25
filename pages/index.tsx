import Head from "next/head";
import { useState } from "react";
import Footer from './components/Footer';
import Header from './components/Header';


export default function Home() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [cookTime, setCookTime] = useState<number | null>(null);
  const [foodLevel, setFoodLevel] = useState<string>("beginner"); // Default to beginner
  const [recipes, setRecipes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const ingredients = ingredientInput.split(",").map((ingredient) => ingredient.trim());
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        ingredients,
        cookTime: cookTime as number,
        level: foodLevel, // Pass the selected food level to the backend
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setRecipes([...data.recipes, ...recipes]);
    setLoading(false);
  };

  const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const imageInput = document.getElementById("imageUpload") as HTMLInputElement;
    const imageFile = imageInput.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const base64_image = reader.result?.toString();

      const content = [
        {
          "type": "text",
          "text": "Based on Image tell the list of ingredients with commas, like chocolate,milk.. etc",
        },
        {
          "type": "image_url",
          "image_url": {
            "url": base64_image,
          },
        },
      ];

      const res = await fetch("/api/extractIngredients", {
        method: "POST",
        body: JSON.stringify({ content }), // Send the content array
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log(data.ingredients);
      setIngredientInput(data.ingredients.choices[0].message.content); // Assuming the response contains ingredients

      setLoading(false);
    };
  };

  return (
    <>
      <Head>
        <title>SmartCookAi</title>
        <meta name="description" content="Create recipes with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        
      </Head>
      
      <main className="min-h-screen  p-10 bg-gradient-to-t bg-black   ">
      <Header />
        <div className="flex flex-col items-center mt-10">
          
          <div className="flex flex-col w-[500px]">
            <div className="flex flex-col items-center mb-24">
              <p className="font-bold text-6xl text-white">SmartCook <span className=" bg-gradient-to-r from-pink-400  to-pink-600 inline-block text-transparent bg-clip-text">Ai</span> </p>
              
              <h2 className="text-l  font-normal text-white">Generate recipes with AI based on ingredients and cook time</h2>
            </div>
            {/* Separate form or input field for image upload */}
            <div className="mb-10">
              <label htmlFor="imageUpload" className="text-white gap-2 text-sm font-bold block">
                Upload Image
              </label>
              <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageSubmit}
                  disabled={loading}
                  className="w-full py-2 pl-3 rounded-md bg-white text-base text-zinc-500 transition hover:ring-zinc-900/20"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className=" mb-10">


                <label htmlFor="ingredientInput" className="text-white gap-2 text-sm  font-bold block">
                  <span
                      className="inline-flex items-center justify-center mr-2 font-bold text-white bg-black rounded-full sm:mb-0 aspect-square h-7 dark:bg-white dark:text-black">1</span>
                  Ingredients
                </label>

                <input
                    type="text"
                  id="ingredientInput"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="chocolate, milk"
                  className="w-full py-2 pl-3 rounded-md bg-white text-base text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 mt-2 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none"
                />
              </div>
              <div className="mb-10">
                <label htmlFor="cookTime" className="text-white gap-2 text-sm  font-bold block">
                <span className="inline-flex items-center justify-center mr-2 font-bold text-white bg-black rounded-full sm:mb-0 aspect-square h-7 dark:bg-white dark:text-black">2</span>
                  Time
                </label>
                <select
                  id="cookTime"
                  value={cookTime || ""}
                  onChange={(e) => setCookTime(Number(e.target.value))}
                  className="block pr-10 mt-1 w-full py-2 pl-3 rounded-md bg-white text-base text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none"
                >
                  <option value="">Select Cook Time</option>
                  <option value="15">15 mins</option>
                  <option value="20">20 mins</option>
                  <option value="25">25 mins</option>
                  <option value="30">30 mins</option>
                  <option value="45">45 mins</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              <div className="mb-10">
              <label htmlFor="cookTime" className="text-white gap-2 text-sm  font-bold block">
                <span className="inline-flex items-center justify-center mr-2 font-bold text-white bg-black rounded-full sm:mb-0 aspect-square h-7 dark:bg-white dark:text-black">3</span>
                  Food level:
                </label>
                <select
                  id="foodLevel"
                  value={foodLevel}
                  onChange={(e) => setFoodLevel(e.target.value)}
                  className="block pr-10 mt-1 w-full py-2 pl-3 rounded-md bg-white text-base text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="">
                <button
                  type="submit"
                  className={`mb-8 w-full inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-1 dark:ring-inset dark:ring-pink-400/20 dark:hover:bg-pink-400/10 dark:hover:text-pink-300 dark:hover:ring-pink-300 ${
                    (ingredientInput.length === 0 || cookTime === null || loading) && ""
                  }`}
                  disabled={ingredientInput.length === 0 || cookTime === null || loading}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </form>
          /</div>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
          {recipes &&
            recipes.map((recipe, index) => (
              <div key={index} className="p-4 rounded-md bg-white text-base text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:[&:not(:focus-visible)]:outline-none">
                <h3 className="text-2xl p-2 font-bold">Recipe {index + 1}</h3>
                <p className="p-2 m-2 text-white">{recipe}</p>
              </div>
            ))}
        </div>
        <Footer />
      </main>
    </>
  );
}
