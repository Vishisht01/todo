import './App.css';
import { useState } from "react";
function App() {
  const [inputVal, setInputVal] = useState("");
  const [todo, setTodo] = useState([])
  console.log(inputVal);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() !== "") {
      setTodo([...todo, inputVal])
      setInputVal("")
    }
  }
  const handleDelete=(index)=>
  {
   const updatedTodo=[...todo]
   updatedTodo.splice(index,1)
   setTodo(updatedTodo);
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={inputVal} placeholder="Enter a task" onChange={(e) => setInputVal(e.target.value)} />
        <button type='submit'>Click to add</button>
        <div>
          {
            todo.map((data, index) =>
            (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p>{data}</p> <button onClick={()=>handleDelete(index)}>Del</button>
              </div>
            ))
          }
        </div>
      </form>
    </div>
  );
}

export default App;
