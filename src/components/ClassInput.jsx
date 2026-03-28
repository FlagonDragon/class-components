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

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      inputVal: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);

  };

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value
    }));
  }

  render() {
  return(
    <> 
    {this.state.edit ? (
      <>
        <input
          type="text"
          value={this.state.inputVal}
          onChange={this.handleInputChange}
        />

        <button onClick={() => {

            this.setState((state) => ({
              ...state,
              edit: false
            }));

            this.props.editFunc(this.props.index, this.state.inputVal);

            this.setState((state) => ({
              ...state,
              inputVal: ''
            }));

          }}>resubmit</button>

        <button onClick={() => {
            this.props.delFunc(this.props.index)
          }}>del</button>
      </>
    ) : (
      <>
        <li key={this.props.item}>{this.props.item}

          <button onClick={() => {
            
            this.setState((state) => ({
              ...state,
              edit: true
            }));

          }}>edit</button>

          <button onClick={() => {

            this.props.delFunc(this.props.index);

          }}>del</button>

        </li>
      </>
    )}
    </>
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
    this.handleEdit = this.handleEdit.bind(this);
    this.todosCount = this.todosCount.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleEdit(index, value) {
    let newTodos = this.state.todos.slice(0);

    newTodos[index] = value;

    this.setState((state) => ({
      ...state,
      todos: newTodos,
    }));
  }

  handleDel(index) {
    let newTodos = this.state.todos.slice(0);

    newTodos.splice(index, 1);

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
      console.log(todo);
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
          <ListItem item={todo} index={index} editFunc={this.handleEdit} delFunc={this.handleDel}></ListItem>
        ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
