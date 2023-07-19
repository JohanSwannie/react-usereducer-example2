import React, { useReducer, useRef } from "react";

const App = () => {
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
      default:
        return state;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "add",
      description: inputRef.current.value,
    });
    inputRef.current.value = "";
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Technology
          <input ref={inputRef} />
        </label>
      </form>
      <br />
      <ul>
        {tech.map((tec, index) => (
          <li key={tec.id}>
            {tec.technology}
            <button onClick={() => dispatch({ type: "remove", index })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
