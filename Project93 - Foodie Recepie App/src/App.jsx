// import FoodItem from "./components/FoodItem";
// import FoodList from "./components/FoodList";
// import Nav from "./components/Nav";
// import Search from "./components/Search";
// import { useState } from "react";
// import "./App.css";
// import Container from "./components/Container";
// import Innerconatiner from "./components/Innerconatiner";
// import Fooddetail from "./components/Fooddetail";

// function App() {
//   const [foodData, setFoodData] = useState([]);
// const [foodId, setFoodId] = useState("656329");
//   return (
//     <div className="App">
//       <Nav/>
//       <Search foodData={foodData} setFoodData={setFoodData} />
//   <Container>
//   <Innerconatiner>  <FoodList setFoodId={setFoodId} foodData={foodData} setFoodData={setFoodData} /></Innerconatiner>
//  <Innerconatiner>
//   <Fooddetail foodId={foodId}/>
//  </Innerconatiner>
//   </Container>
      
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import FoodItem from "./components/FoodItem";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import "./App.css";
import Container from "./components/Container";
import Innerconatiner from "./components/Innerconatiner";
import Fooddetail from "./components/Fooddetail";

function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState("656329");

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
        <Innerconatiner>
          <FoodList setFoodId={setFoodId} foodData={foodData} setFoodData={setFoodData} />
        </Innerconatiner>
        <Innerconatiner>
          <Fooddetail foodId={foodId} />
        </Innerconatiner>
      </Container>
    </div>
  );
}

export default App;
