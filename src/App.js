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
    <header className='header'><h4>TODO LIST</h4></header>
    <body className='container'>
      <div className='formContainer'>
      <input
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <form onSubmit={handleSubmit}>
        <input value={inputVal} placeholder="Enter a task" onChange={(e) => setInputVal(e.target.value)} className='todoInput' />
        <button type='submit'className='todoButton'>Click to add</button>
      </form>
      <div>
          {
            filteredTodos.map((data, index) =>
            (
              <div className='todoList' key={index}>
                <p>{data}</p><button onClick={() => handleDelete(index)} className="delButton" >Del</button>
              </div>
            ))
          }
        </div>
      </div>
      </body>
    </div>
  );
}

export default App;
