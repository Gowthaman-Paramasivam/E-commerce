import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/Signup";
import { MainPage } from "./components/MainPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main/*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
