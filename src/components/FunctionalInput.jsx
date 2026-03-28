import React, { useState } from 'react';

function DisplayCount({count}) {

  return(
    <div>Todos count: {count}</div>
  )
}

function ListItem(props) {
  const [edit, setEdit] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };
  
  return(
    <> 
    {edit ? (
      <>
        <input
          type="text"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button onClick={() => {
            setEdit(false);
            props.editFunc(props.index, inputVal);
            setInputVal('');
          }}>resubmit</button>
        <button onClick={() => {
            props.delFunc(props.index)
          }}>del</button>
      </>
    ) : (
      <>
        <li key={props.item}>{props.item}
          <button onClick={() => {
            setEdit(true);
          }}>edit</button>
          <button onClick={() => {
            props.delFunc(props.index);
          }}>del</button>
        </li>
      </>
    )}
    </>
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

  const handleEdit = (index, value) => {
    let newTodos = todos.slice(0);
    newTodos[index] = value;
    setTodos(newTodos);
  };

  const handleDel = (index) => {
    let newTodos = todos.slice(0);
    newTodos.splice(index, 1)
    setTodos(newTodos);
  };

  const todosCount = () => {
    let count = 0;

    todos.forEach(todo => {
      console.log(todo);
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
          <ListItem item={todo} index={index} editFunc={handleEdit} delFunc={handleDel}></ListItem>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
