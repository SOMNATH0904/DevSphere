import React, { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_API_KEY; // Secure API key using environment variable

function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data.results);
        setFoodData(data.results);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    }
    if (API_KEY) {
      fetchFood();
    } else {
      console.error("API key is missing. Make sure to set it in the .env file.");
    }
  }, [query]);

  return (
    <div className={styles.search_container}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for a recipe..."
      />
    </div>
  );
}

export default Search;
