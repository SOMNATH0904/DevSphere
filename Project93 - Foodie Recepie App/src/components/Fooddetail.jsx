import React, { useEffect, useState } from "react";
import styles from "./fooddetail.module.css";
import Itemlist from "./Itemlist";

function Fooddetail({ foodId }) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "3da790224a7e41dba8f3b152862e5a53";

  useEffect(() => {
    async function fetchFood() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch food data");
        }
        const data = await res.json();
        setFood(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchFood();
  }, [foodId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.recipecard}>
        <h2 className={styles.recipename}>Food Detail: {food.title}</h2>
        {food.image && (
          <img
            className={styles.recipeimage}
            src={food.image}
            alt={food.title}
          />
        )}
        <div className={styles.recipedetails}>
          <span> ⏰ {food.readyInMinutes} Minutes</span>
          <span>
            <strong>🍽️ {food.servings} Servings</strong>
          </span>
          <span>
            <strong>{food.vegan ? " 🐮Vegan" : ""}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? " 🟢 Vegetarian" : " 🔴 Not Vegetarian"}
            </strong>
          </span>
        </div>
        <div>
          <span> 💲 {food.pricePerServing / 100}</span>
        </div>
        <h3>Ingredients</h3>
{food.extendedIngredients.map((item, index) => (
  <div className={styles.item_container} key={index}>
  <div className={styles.image_container}><img className={styles.imagess}
      src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
      alt={item.name}
    /> </div>
    <div className={styles.name_container}>
    <div className={styles.name}>{item.name}</div>
    <div className={styles.amount}>
      {item.amount} {item.unit}
    </div>
    </div>
    
  </div>
))}
        <h3>Instructions</h3>
        <div className={styles.recipeinstructions}>
          {food.analyzedInstructions[0] &&
            food.analyzedInstructions[0].steps.map((step, index) => (
              <p key={index}>
                {index + 1}. {step.step}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Fooddetail;
