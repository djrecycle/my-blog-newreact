import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { MdOutlineLocalPostOffice } from "react-icons/md";

const PageDashContent = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalPostscurrent, setTotalPostscurrent] = useState([]);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [roles, setRoles] = useState([]);
    const [totalRoles, setTotalRoles] = useState(0);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user/getusers?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchRoles = async () => {
            try {
                const res = await fetch("/api/user/getusers?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setRoles(data.roles);
                    setTotalRoles(data.roles);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/post/getposts?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchPostcurrent = async () => {
            try {
                const res = await fetch(
                    `/api/post/getposts?userId=${currentUser._id}`
                );
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    setLastMonthPosts(data.lastMonthPosts);
                    const currentUserPostCount = data.totalPostscurrent.find(
                        (p) => p._id === currentUser._id
                    );
                    setTotalPostscurrent(
                        currentUserPostCount ? currentUserPostCount.count : 0
                    );
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchRoles();
        }
        if (currentUser.role === "author") {
            fetchPostcurrent();
        }
    }, [currentUser]);

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {currentUser.isAdmin && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{totalUsers}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +{lastMonthUsers} from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Author</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{totalRoles}
                                </div>
                            </CardContent>
                        </Card>
                        {currentUser.isAdmin ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Posts</CardTitle>
                                    <MdOutlineLocalPostOffice className="text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        +{totalPosts}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +{lastMonthPosts} from last month
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            ""
                        )}
                    </>
                )}

                {currentUser.role === "author" && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total MyPosts</CardTitle>
                                <MdOutlineLocalPostOffice className="text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{totalPostscurrent}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +{lastMonthPosts} from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Comments</CardTitle>
                                <MdOutlineLocalPostOffice className="text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{totalPostscurrent}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +{lastMonthPosts} from last month
                                </p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </>
    );
};

export default PageDashContent;
