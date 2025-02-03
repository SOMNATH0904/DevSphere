import React from "react";
import styles from "./fooditem.module.css";

function FoodItem({ food,setFoodId }) {
  return (
    <div className={styles.itemcontainer}>
      <img className={styles.itemimage} src={food.image} alt={food.title} />
      <div className={styles.itemtitle}>
        <p className={styles.itemname}>{food.title}</p>
      </div>
      <div className={styles.buttoncontainer}>
        <button onClick={()=>{console.log(food.id),setFoodId(food.id)}} className={styles.itembutton}>View recipes</button>
      </div>
    </div>
  );
}

export default FoodItem;
