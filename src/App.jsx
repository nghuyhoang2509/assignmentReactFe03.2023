import "./App.css";
import Countdown from "./assignments/Countdown";
import Todo from "./assignments/Todo";
import Form from "./assignments/Form";
import Callapi from "./assignments/Callapi";

function App() {
  return (
    <div className="container">
      <Countdown />
      <Form />
      <Todo />
      <Callapi />
    </div>
  );
}

export default App;
