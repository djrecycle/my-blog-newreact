import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Home/Header";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import UpdatePost from "@/pages/admin/UpdatePost";
import PrivateRoute from "@/components/PrivateRoute";
import OnlyAdminPrivateRoute from "@/components/OnlyAdminPrivateRoute";
import Dash from "@/pages/admin/Dash";
import UserDash from "@/pages/user/UserDash";
import PostPage from "@/pages/PostPage";
import OnlyAuthorRoute from "@/components/OnlyAuthorRoute";
// import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header />
                <SignIn />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header />
                <SignUp />
              </>
            }
          />
          <Route
            path="/post/:postSlug"
            element={
              <>
                <Header />
                <PostPage />
              </>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/user/dashboard" element={<UserDash />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/admin/dashboard" element={<Dash />} />
            <Route
              path="/admin/dashboard/update-post/:postId"
              element={<UpdatePost />}
            />
          </Route>
          <Route element={<OnlyAuthorRoute />}>
            <Route
              path="/user/dashboard/update-post/:postId"
              element={<UpdatePost />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
