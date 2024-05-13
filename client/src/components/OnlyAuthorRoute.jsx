import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAuthorRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // return currentUser && currentUser.isAdmin ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/sign-in" />
  // );
  return (currentUser && currentUser.isAdmin) ||
    (currentUser && currentUser.role === "author") ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
