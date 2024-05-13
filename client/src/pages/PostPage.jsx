import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import dateFormat from "dateformat";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDocumentTitle from "@/components/useDocumentTitle";
import CommentSection from "@/components/CommentSection";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [showMore, setShowMore] = useState(true);
    const [recentPosts, setRecentPosts] = useState(null);
    // const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`);
                if (res.ok) {
                    const data = await res.json();
                    setRecentPosts(data.posts);
                } else {
                    throw new Error("Failed to fetch recent posts");
                }
            } catch (error) {
                setError(toast.error(error.message));
            }
        };
        fetchRecentPosts();
    }, []);

    useDocumentTitle(`My Blog | ${postSlug}`);

    if (loading)
        return (
            <div className="flex justify-center items-center pt-80">
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
        );

    return (
        <>
            <main className="p-3 flex flex-col max-w-6xl mx-auto dark:bg-gray-800 min-h-screen">
                <h1 className="text-3xl mt-10 p-3 capitalize text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                    {post && post.title}
                </h1>

                <i className="text-xl text-center">
                    Posted by: @{post && post.author}
                </i>

                <Link
                    to={`/search?category=${post && post.category}`}
                    className="self-center mt-5"
                >
                    <Badge>{post && post.category}</Badge>
                </Link>

                <img
                    src={post && post.image}
                    alt={post && post.title}
                    className="mt-10 p-3 max-h-[600px] w-full object-cover border rounded-lg"
                />

                <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                    <span>
                        {post && dateFormat(post.updatedAt, "mmmm dS, yyyy")}
                    </span>
                    <span className="italic">
                        {post && (post.content.length / 1000).toFixed(0)} mins
                        read
                    </span>
                </div>
                <article
                    className="p-3 max-w-2xl mx-auto w-full prose prose-img:rounded-xl prose-img:md:max-w-[600px] prose-figure:flex prose-figure:flex-col prose-figure:mx-auto prose-figure:md:ms-0 prose-headings:underline prose-headings:underline-offset-4 prose-headings:dark:text-white prose-p:dark:text-gray-400 prose-strong:text-2xl prose-strong:font-bold prose-strong:dark:text-white prose-figcaption:text-center prose-figcaption:italic"
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                ></article>
                <div className="p-3 max-w-2xl mx-auto w-full">
                    <CommentSection postId={post._id} />
                </div>
                <div className="p-3  max-w-2xl mx-auto w-full">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Recent Post:
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Your recent posts. Updated daily.
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                        <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                                {recentPosts &&
                                    recentPosts.map((post) => (
                                        <Link to={`/post/${post.slug}`}>
                                            <Card className="group relative w-full border border-teal-500 hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[230px] transition-all">
                                                <CardHeader>
                                                    <p className="capitalize text-sm font-bold">
                                                        {post.title}
                                                    </p>
                                                    <img
                                                        src={post.image}
                                                        alt="Photo by Drew Beamer"
                                                        className="rounded-md object-cover  w-[150px] h-[150px]"
                                                        aspectratio="square"
                                                    />
                                                </CardHeader>
                                                <CardContent className="flex flex-col">
                                                    <i> @{post.author}</i>
                                                    <i className="text-sm dark:text-gray-400">
                                                        {dateFormat(
                                                            post.updatedAt,
                                                            "mmmm dS, yyyy"
                                                        )}
                                                    </i>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PostPage;
