import logo from './logo.svg';
import './App.scss';
import Mycomponent from './Example/Mycomponent.js';
import ListTodo from './Todo/Todolist.js';
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation /Navigation.js';
import Redirect from './Navigation /Redirect.js';
// import ParentComponent from './Example/Nesting_Components.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <p>Todo -APP </p>
        {/* <ParentComponent/> */}
        {/* <Mycomponent/> */}
        {/* <ListTodo/> */}
       {/* <Redirect/> */}

      </header>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
      />
    </div>
  );
}

export default App;
