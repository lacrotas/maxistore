import { BrowserRouter } from "react-router-dom";
import AppRouter from "./pages/appRouter/AppRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
