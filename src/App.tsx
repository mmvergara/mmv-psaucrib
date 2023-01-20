import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import MultiTaskCalcPage from "./components/dashboard/dashpages/MultiCacl";
import PsauWeatherPage from "./components/dashboard/dashpages/PsauWeatherPage";
import TodoListPage from "./components/dashboard/dashpages/TodoList";
import PostDetails from "./components/psaufeed/Posts/PostDetails";
import NavBar from "./layout/Navbar/NavBar";
import AdminPanelPage from "./pages/AdminPanelPage";
import CreatePostPage from "./pages/CreatePostPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LogoutPage from "./pages/LogoutPage";
import PsauChatPage from "./pages/PsauChatPage";
import PsauFeedPage from "./pages/PsauFeedPage";
import RegisterPage from "./pages/RegisterPage";
import GlobalStyles from "./style/GlobalStyledComponents";
const App = () => {
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const { mainBg } = useSelector((state: any) => state.uiSlice.theme);

  return (
    <>
      <ThemeProvider theme={{mainBg}}>
        <GlobalStyles />
      </ThemeProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={!!userCredential ? <PsauFeedPage /> : <HomePage />} />
        {userCredential === "" && <Route path='/register' element={<RegisterPage />} />}
        {!!userCredential && <Route path='/psaufeed' element={<PsauFeedPage />} />}
        <Route path='/logout' element={<LogoutPage />} />
        {userCredential === "admin" && <Route path='/adminpanel' element={<AdminPanelPage />} />}
        {(userCredential === "admin" || userCredential === "psauStudent") && (
          <>
            <Route path='/createpost' element={<CreatePostPage />} />
            <Route path='/psauchat' element={<PsauChatPage />} />
            <Route path='/adminpanel' element={<AdminPanelPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/postdetails/:postID' element={<PostDetails/>}/>
            <Route path='/multitaskcalc' element={<MultiTaskCalcPage/>}/>
            <Route path='/todolist' element={<TodoListPage/>}/>
            <Route path='/psauweather' element={<PsauWeatherPage/>}/>

          </>
        )}
      </Routes>
    </>
  );
};

export default App;
