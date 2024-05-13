import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { ModeToggle } from "@/components/ModeToggle";
import { signoutSuccess } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const HeaderDash = () => {
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        {currentUser.isAdmin ? (
                            <>
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=dash"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <RxDashboard />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=users"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <FiUsers />
                                    Users
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=profile"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <ImProfile />
                                    Profile
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=posts"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <MdOutlineLocalPostOffice />
                                    Posts
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/user/dashboard?tab=dash"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <RxDashboard />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/user/dashboard?tab=profile"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <ImProfile />
                                    Profile
                                </Link>
                                {currentUser.role === "author" && (
                                    <Link
                                        to="/user/dashboard?tab=posts"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <MdOutlineLocalPostOffice />
                                        Posts
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                    <div className="mt-auto">
                        <Card></Card>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>

            <ModeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                    >
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={currentUser.profilePicture}
                                alt="@shadcn"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        {" "}
                        @{currentUser.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link
                            to={
                                currentUser.isAdmin
                                    ? "/admin/dashboard?tab=dash"
                                    : "/user/dashboard?tab=dash"
                            }
                        >
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            to={
                                currentUser.isAdmin
                                    ? "/admin/dashboard?tab=profile"
                                    : "/user/dashboard?tab=profile"
                            }
                        >
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default HeaderDash;
