import './App.css';
import { Route, RouterProvider } from 'react-router-dom';
import Routes from "./Routes";


function App() {
  return (
    <div className="App">
      <div className="App">
        <RouterProvider router={Routes}></RouterProvider>        
      </div>
    </div>
  );
}

export default App;
