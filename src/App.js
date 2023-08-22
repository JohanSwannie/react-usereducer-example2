import React, { useState, useReducer, useRef } from "react";

const App = () => {
  const [inputValues, setInputValues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef();
  const [tech, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            technology: action.description,
          },
        ];
      case "remove":
        return state.filter((_, index) => index !== action.index);
      case "clear":
        return [];
      default:
        return state;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValues.includes(inputRef.current.value)) {
      setErrorMessage(
        "You have already chosen that technology - Please choose another technology"
      );
    } else {
      setInputValues([...inputValues, inputRef.current.value]);
      setErrorMessage("");
      dispatch({
        type: "add",
        description: inputRef.current.value,
      });
    }
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Technology
          <input ref={inputRef} autoFocus required />
        </label>
        <input type="submit" />
      </form>
      <br />
      <button id="clear" onClick={() => dispatch({ type: "clear" })}>
        Clear all input
      </button>
      <br />
      <br />
      <ul>
        {tech.map((tec, index) => (
          <div className="tech_elements">
            <li key={tec.id}>{tec.technology}</li>
            <button
              id="remove"
              onClick={() => dispatch({ type: "remove", index })}
            >
              X
            </button>
          </div>
        ))}
      </ul>
      {errorMessage.length > 0 && <p>{errorMessage}</p>}
    </div>
  );
};

export default App;
