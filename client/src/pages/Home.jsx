import React from "react";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import PaginationHome from "@/components/PaginationHome";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                `/api/post/getposts?limit=6&startIndex=${(currentPage - 1) * 6}`
            );
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            setTotalPages(Math.ceil(data.totalPosts / 6));
        };
        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading)
        return (
            <div className="flex justify-center items-center pt-80">
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
        );

    return (
        <div className="dark:bg-[#0C0A09] md:w-screen md:h-screen ">
            <div className="pt-24 flex justify-center flex-col  md:items-stretch md:gap-3 p-4">
                <div className="pb-6 flex justify-center">
                    <h1 className="text-2xl font-bold">Recent Post</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {posts.map((post, _id) => (
                        <Card
                            key={_id}
                            className="shadow-xl p-4 rounded-xl w-96 my-2"
                        >
                            <CardHeader className="p-4">
                                <Badge className="w-fit ms-auto">
                                    {post.category}
                                </Badge>
                                <Link to={`/post/${post.slug}`}>
                                    <img
                                        src={post.image}
                                        alt="Photo by Drew Beamer"
                                        className="rounded-md object-cover  h-48"
                                    />
                                </Link>
                            </CardHeader>
                            <CardContent className="capitalize flex flex-col ">
                                <Link to={`/post/${post.slug}`}>
                                    <h1 className="text-xl font-bold">
                                        {post.title}
                                    </h1>
                                </Link>

                                <p className="mt-3">{post.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <i className="text-sm dark:text-gray-400">
                                    {dateFormat(
                                        post.updatedAt,
                                        "mmmm dS, yyyy"
                                    )}
                                </i>
                                <i className="text-sm">@{post.author}</i>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <PaginationHome
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Home;
