import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import UserProfile from "./pages/UserProfile";
import { useAppSelector } from "./redux-hooks/hooks";

function App() {
  const userToken = Boolean(useAppSelector((state) => state.user.token));
  console.log(userToken)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />}/>
        <Route path="/home" element={userToken ? <UserProfile/> : <Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
