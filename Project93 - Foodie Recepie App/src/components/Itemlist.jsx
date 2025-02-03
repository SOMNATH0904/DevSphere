import React from 'react';

function Itemlist({ food }) {
  return (
    <div>
      {food.extendedIngredients.map((item, index) => (
        <div key={index}>
          <img
            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
            alt={item.name}
          />
          <h4>{item.name}</h4>
          <h4>
            {item.amount} {item.unit}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default Itemlist;
