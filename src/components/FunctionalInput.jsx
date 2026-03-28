import React, { useState } from 'react';

function DisplayCount({count}) {

  return(
    <div>Todos count: {count}</div>
  )
}

const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal('');
  };

  const handleDel = (index) => {
    let newTodos = todos.slice(0);
    newTodos.splice(index, 1)
    setTodos(newTodos);
  };

  const todosCount = () => {
    let count = 0;

    todos.forEach(todo => {
      count +=1;
    });
    
    return count;
  };

  return (
    <section>
      <h3>{name}</h3>
      <DisplayCount count={todosCount()}></DisplayCount>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo, index) => (
          <>
            <li key={todo}>{todo}
              <button onClick={() => {
                handleDel(index)
              }}>del</button>
            </li>
          </>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
