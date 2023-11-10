import './App.css';
import { useState,useEffect } from "react";
function App() {
  const [inputVal, setInputVal] = useState("");
  const [todo, setTodo] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [debounceSearchTerm, setDebouncedSearchTerm] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() !== "") {
      setTodo([...todo, inputVal])
      setInputVal("")
    }
  }
  const handleDelete = (index) => {
    const updatedTodo = [...todo]
    updatedTodo.splice(index, 1)
    setTodo(updatedTodo);
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const filteredTodos = todo.filter((todo) =>
    todo.toLowerCase().includes(debounceSearchTerm.toLowerCase())
  );

  

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input value={inputVal} placeholder="Enter a task" onChange={(e) => setInputVal(e.target.value)} />
        <button type='submit'>Click to add</button>
        <div>
          {
            filteredTodos.map((data, index) =>
            (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} key={index}>
                <p>{data}</p><button onClick={() => handleDelete(index)}>Del</button>
              </div>
            ))
          }
        </div>
      </form>
    </div>
  );
}

export default App;
