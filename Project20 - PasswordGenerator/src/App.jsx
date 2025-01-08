import { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  const [length, setLength] = useState(8); // for length since length gets updated and we need to track it.
  const [numberAllowed, setNumberAllowed] = useState(false); // for numbers and it may be there or not there (false, true)
  const [charAllowed, setCharAllowed] = useState(false); // for characters and it may be there or not there (false, true).
  const [password, setPassword] = useState(""); // for password field and it is random.

  // useRef hook
  const passwordRef = useRef(null); // to select the item or want a reference of it and do the manipulation.

  // for password generator function which is used to generate the password at random
  // useCallback() function is used because the password changes when multiple buttons are clicked and also for Optimization/Memoization.
  const passwordGenerator = useCallback( () => {
    let pass = ""; // Set the password in the function of password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Random values of characters

    if(numberAllowed) str += "0123456789"; // If number is allowed then add it to the answer
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"; // If character is allowed then add it to the answer
    
    // password of required length
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // Randomly generating a number
      pass += str.charAt(char); // getting from the password from the string
    }

    setPassword(pass); // Setting in the password function

  }, [length, numberAllowed, charAllowed, setPassword]); // dependencies - On which the variables the function is dependent

  const copyPasswordToClipboard = useCallback( () => {
    // to select the password text to know that password has been selected (optional)
    passwordRef.current?.select();
    // to select the password text in range of some numbers (optional)
    passwordRef.current?.setSelectionRange(0, 99);

    // copy to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]) // dependent on password

  // whenever page is reloaded it is called first and if any value is got changed then it will rerun the function.
  useEffect( () => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='className="flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" // text field
          value={password} // value will be the password
          className='outline-none w-full py-1 px-3'
          placeholder="Password"
          readOnly // No one will be able to write in it.
          ref={passwordRef} // whichever reference you want write the ref in input.
          // here we want reference of the password
          />
          <button
          onClick={copyPasswordToClipboard} // when copy button will be clicked then it must get copy
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" // range 
            min={6} // minimum length of password
            max={100} // maximum length of password
            value={length} // value will be the length
            className='cursor-pointer' // change the range using cursor
            onChange={(e) => {setLength(e.target.value)}} // change the length of the password when cursor is changed
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox" // checkbox input
                defaultChecked={numberAllowed} // default value
                id="numberInput" // for number
                onChange={() => { // change the value everytime when it is changed
                    setNumberAllowed((prev) => !prev);
                }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
            <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharAllowed((prev) => !prev )
                  }}
              />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
