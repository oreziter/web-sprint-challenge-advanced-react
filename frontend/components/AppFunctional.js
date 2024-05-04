import axios from "axios";
import React, { useState } from "react";


// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4 ;// the index the "B" is at

// Mapping of index to coordinates

const coordinates = {
  '0': '(1,1)',
  '1': '(2,1)',
  '2': '(3,1)',
  '3': '(1,2)',
  '4': '(2,2)',
  '5': '(3,2)',
  '6': '(1,3)',
  '7': '(2,3)',
  '8': '(3,3)',
}

export default function AppFunctional(props) {
const [index, setIndex] = useState(initialIndex);
const [email, setEmail] = useState(initialEmail);
const [message, setMessage] = useState(initialMessage);
const [steps, setSteps] = useState(initialSteps);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

    function reset() {
      setIndex(initialIndex);
      setEmail(initialEmail);
      setMessage(initialMessage);
      setSteps(initialSteps);
    }
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  

  
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
 
  
    // Use this helper to reset all states to their initial values.
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    function move(evt) {
    const { id } = evt.target;
    switch (id) {
     case "up":
      if (index >= 3) {
        setIndex(index - 3);
        setSteps(steps + 1);
      } else setMessage("You can't go up");
      break;
      case "down":
      if (index <= 5) {
        setIndex(index + 3);
        setSteps(steps + 1);
      } else setMessage("You can't go down");
      break;
      case "left":
        if (!(index === 0 || index === 3 || index === 6)) {
          setIndex(index - 1);
          setSteps(steps + 1);
        } else setMessage("You can't go left")
        break;
        case "right":
          if (!(index === 2 || index === 5 || index === 8 )) {
            setIndex(index + 1);
            setSteps(steps + 1);
          } else setMessage("You can't go right");
          break;
          default:   
          console.log(index)
       }
     }
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // You will need this to update the value of the input.
    function onChange(evt) {
      setEmail(evt.target.value);
    }
 async function onSubmit(evt) {
  evt.preventDefault();
   const coordinate = coordinates[index];
   const x = parseInt(coordinate[1]);
   const y = parseInt(coordinate[3]);
   const data = {
    x,
    y,
    steps,
    email,
   };
   try {
    const response = await axios.post("http://localhost:9000/api/result", data);
    setMessage(response.data.message);
    setEmail(initialEmail);
   } catch (e) {
    setMessage(e.response.data.message);
   }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {coordinates[index]}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? " active" : ""}`}>
              {idx === index ? "B" : null}
            </div>
          ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">
          LEFT
          </button>
        <button onClick={move} id="up">
          UP
          </button>
        <button onClick={move} id="right">
          RIGHT
          </button>
        <button onClick={move} id="down">
          DOWN
          </button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input value={email} onChange={onChange} id="email" type="email" placeholder="type email" ></input>
        <input onClick={onSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  );
}


