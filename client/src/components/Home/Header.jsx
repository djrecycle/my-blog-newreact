import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { UserNav } from "./UserNav";
import { DropdownMenuHome } from "./DropdownMenuHome";

function Header() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/user/signout", {
                method: "POST",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <header className="z-[9999999]">
            <nav className="flex fixed w-screen bg-red-500 dark:bg-rose-950 flex-row items-center justify-between py-2 sm:px-24 px-9 rounded-b-2xl shadow-md dark:shadow-sm dark:shadow-gray-800">
                <Link to="/" className="hover:text-gray-600">
                    <h1 className="text-white">My Blog</h1>
                </Link>
                <div className="md:flex gap-2">
                    {!currentUser ? (
                        <>
                            <Link to="/sign-in">
                                <Button className="hidden md:block">
                                    Sign-In
                                </Button>
                            </Link>
                            <Link to="/sign-up">
                                <Button
                                    className="hidden md:block"
                                    variant="secondary"
                                >
                                    Sign-Up
                                </Button>
                            </Link>
                            <div className="md:hidden flex gap-2">
                                <DropdownMenuHome />
                                <ModeToggle />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-2">
                                <UserNav
                                    handleSignout={handleSignout}
                                    currentUser={currentUser}
                                />
                                <ModeToggle />
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
