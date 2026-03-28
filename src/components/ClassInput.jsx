import React, { Component } from "react";

class DisplayCount extends Component {
  constructor(props) {
    super(props);
  };

  render() {
  return(
    <div>Todos count: {this.props.count}</div>
  )
  }
}

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.todosCount = this.todosCount.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleDel(index) {
    let newTodos = this.state.todos.slice(0);
    newTodos.splice(index, 1)
    this.setState((state) => ({
      ...state,
      todos: newTodos,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  todosCount() {
    let count = 0;

    this.state.todos.forEach(todo => {
      count +=1;
    });
    
    return count;
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>      <DisplayCount count={this.todosCount()}></DisplayCount>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
        {this.state.todos.map((todo, index) => (
          <>
            <li key={todo}>{todo}
              <button onClick={() => {
                this.handleDel(index)
              }}>del</button>
            </li>
          </>
        ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
