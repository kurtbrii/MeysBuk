import './app.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Feed from "./pages/feed/Feed";
import SignUp from "./pages/signup/SignUp";
import SearchUser from './pages/searchUser/SearchUser';

function App() {
  return (
    <div className="App">
      <div className='appInner'>
        <BrowserRouter>
          <Routes>
            <Route exact={true} path="/" element={<Feed />} />
            <Route exact={true} path="/login" element={<Login />} />
            <Route exact={true} path="/sign-up" element={<SignUp />} />
            <Route exact={true} path="/feed" element={<Feed />} />
            <Route exact={true} path="/search-user" element={<SearchUser />} />
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
