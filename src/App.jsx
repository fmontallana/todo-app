import "./App.css";
import Todo from "./components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="lg:h-screen">
      <ToastContainer />
      <Todo />
    </div>
  );
}

export default App;
