import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import DialogPostDelete from "@/components/DialogPostDelete";

const PageDashPosts = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [postIdToDelete, setPostIdToDelete] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(
                    `/api/post/getposts?userId=${currentUser._id}`
                );
                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);

                    if (data.posts.lenght < 5) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                setError(toast.error(error.message));
            } finally {
                setLoading(false);
            }
        };
        if (currentUser.role == "author") {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;

        try {
            const res = await fetch(
                `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 5) {
                    setShowMore(false);
                    // setLoading(false);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeletePost = async () => {
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(toast.error(error.message));
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center pt-80">
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
        );

    return (
        <>
            <Card className="max-w-[360px] sm:min-w-full">
                <CardHeader>
                    <h1 className="text-2xl font-extrabold">Posts</h1>
                    <div className="flex ms-auto">
                        <Button asChild className="gap-2 h-fit w-fit">
                            <Link
                                to={
                                    currentUser.isAdmin
                                        ? "/admin/dashboard?tab=create-post"
                                        : "/user/dashboard?tab=create-post"
                                }
                            >
                                <FaPlus /> Create Post
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data updated</TableHead>
                                <TableHead>Post title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        {userPosts.map((post, _id) => (
                            <TableBody key={post._id}>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {dateFormat(
                                            post.updatedAt,
                                            "mmmm dS, yyyy"
                                        )}
                                    </TableCell>
                                    <TableCell className="capitalize font-bold text-sm md:text-lg">
                                        <Link to={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="italic text-sm md:text-sm">
                                        @{post.author}
                                    </TableCell>
                                    <TableCell className=" capitalize">
                                        {post.category}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex  gap-3">
                                            {/* Dialog */}
                                            <DialogPostDelete
                                                handleDeletePost={
                                                    handleDeletePost
                                                }
                                            >
                                                <Badge
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setPostIdToDelete(
                                                            post._id
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </Badge>
                                            </DialogPostDelete>
                                            {currentUser.isAdmin ? (
                                                <Link
                                                    className="hover:underline"
                                                    to={`/admin/dashboard/update-post/${post._id}`}
                                                >
                                                    <Badge>Edit</Badge>
                                                </Link>
                                            ) : (
                                                <Link
                                                    className="hover:underline"
                                                    to={`/user/dashboard/update-post/${post._id}`}
                                                >
                                                    <Badge>Edit</Badge>
                                                </Link>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                        <TableFooter></TableFooter>
                    </Table>

                    <div className="flex justify-end items-end p-3">
                        {showMore && (
                            <>
                                <Button
                                    onClick={handleShowMore}
                                    className="w-fit text-white"
                                >
                                    Show more
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default PageDashPosts;
