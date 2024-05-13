import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const SideBarDash = ({ currentUser }) => {
    const location = useLocation();

    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        to="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="">My-Blog</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {currentUser.isAdmin ? (
                            <>
                                <Link
                                    to="/admin/dashboard?tab=dash"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                        tab === "dash"
                                            ? "bg-muted  text-primary"
                                            : "text-muted-foreground"
                                    }  transition-all hover:text-primary`}
                                >
                                    <RxDashboard />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=users"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                        tab === "users"
                                            ? "bg-muted  text-primary"
                                            : "text-muted-foreground"
                                    }  transition-all hover:text-primary`}
                                >
                                    <FiUsers />
                                    Users
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=profile"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                        tab === "profile"
                                            ? "bg-muted  text-primary"
                                            : "text-muted-foreground"
                                    }  transition-all hover:text-primary`}
                                >
                                    <ImProfile />
                                    Profile
                                </Link>
                                <Link
                                    to="/admin/dashboard?tab=posts"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                        tab === "posts"
                                            ? "bg-muted  text-primary"
                                            : "text-muted-foreground"
                                    }  transition-all hover:text-primary`}
                                >
                                    <MdOutlineLocalPostOffice />
                                    Posts
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/user/dashboard?tab=dash"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                        tab === "dash"
                                            ? "bg-muted  text-primary"
                                            : "text-muted-foreground"
                                    }  transition-all hover:text-primary`}
                                >
                                    <RxDashboard />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/user/dashboard?tab=profile"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                        tab === "profile"
                                            ? "bg-muted  text-primary"
                                            : "text-muted-foreground"
                                    }  transition-all hover:text-primary`}
                                >
                                    <ImProfile />
                                    Profile
                                </Link>
                                {currentUser.role === "author" && (
                                    <Link
                                        to="/user/dashboard?tab=posts"
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                            tab === "posts"
                                                ? "bg-muted  text-primary"
                                                : "text-muted-foreground"
                                        }  transition-all hover:text-primary`}
                                    >
                                        <MdOutlineLocalPostOffice />
                                        Posts
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Card x-chunk="dashboard-02-chunk-0"></Card>
                </div>
            </div>
        </div>
    );
};

export default SideBarDash;
