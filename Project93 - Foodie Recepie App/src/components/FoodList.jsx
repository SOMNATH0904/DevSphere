import React from 'react';
import FoodItem from './FoodItem';

function FoodList({ foodData,setFoodId }) {
  return (
    <div>
      {foodData.map((food, index) => (
        <FoodItem setFoodId={setFoodId} key={index} food={food} />
      ))}
    </div>
  );
}

export default FoodList;
