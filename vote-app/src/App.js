import {  useRoutes } from "react-router-dom";
import './App.css';
import routes from "./Router"


function App() {
  const content = useRoutes(routes);
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
