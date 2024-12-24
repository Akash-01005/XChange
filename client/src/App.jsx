import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { HomePage, LoginPage, ProfilePage, SettingsPage, SignUpPage } from "./pages"
import { useAuthStore }  from "./store/useAuthStore.js"
import { useEffect } from "react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser?<HomePage />: <LoginPage />}></Route>
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to="/" />}></Route>
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/" />}></Route>
        <Route path="/profile-page" element={authUser?<ProfilePage />:<Navigate to="/login" />}></Route>
        <Route path="/settings-page" element={<SettingsPage />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App