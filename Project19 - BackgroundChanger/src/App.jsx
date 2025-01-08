import { useState } from "react" // Hooks

function App() {
  const [color, setColor] = useState("olive"); // To change the background UI

  return (
    <div className="w-full h-screen duration-200"
      style={{backgroundColor: color}}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="fixed flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button 
          onClick={() => setColor("red")} // change the background UI when button is clicked
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "red"}}>Red</button>
          <button 
          onClick={() => setColor("green")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "green"}}>Green</button>
          <button 
          onClick={() => setColor("blue")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "blue"}}>Blue</button>
          <button 
          onClick={() => setColor("orange")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "orange"}}>Orange</button>
          <button 
          onClick={() => setColor("Yellow")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-3xl" style={{backgroundColor: "yellow"}}>Yellow</button>
          <button 
          onClick={() => setColor("Pink")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-3xl" style={{backgroundColor: "pink"}}>Pink</button>
          <button 
          onClick={() => setColor("Purple")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "purple"}}>Purple</button>
          <button 
          onClick={() => setColor("lavender")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-3xl" style={{backgroundColor: "lavender"}}>Lavender</button>
          <button 
          onClick={() => setColor("white")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-3xl" style={{backgroundColor: "white"}}>White</button>
          <button 
          onClick={() => setColor("grey")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "grey"}}>Grey</button>
          <button 
          onClick={() => setColor("black")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-3xl" style={{backgroundColor: "black"}}>Black</button>
        </div>
      </div>
    </div>
  )
}

export default App
