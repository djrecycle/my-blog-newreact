import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Comment from "@/components/Comment";
import { ScrollArea } from "./ui/scroll-area";

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();
    console.log(comments);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 50) {
            return;
        }
        try {
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment("");
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(
                    `/api/comment/getPostComments/${postId}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(toast.error(error.message));
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: "PUT",
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                  ...comment,
                                  likes: data.likes,
                                  numberOfLikes: data.likes.length,
                              }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(toast.error(error.message));
        }
    };

    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate("/sign-in");
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.filter((comment) => comment._id !== commentId)
                );
            }
        } catch (error) {
            console.log(toast.error(error.message));
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as:</p>
                    <img
                        className="h-5 w-5 object-cover rounded-full"
                        src={currentUser.profilePicture}
                        alt=""
                    />
                    <Link
                        to={"/dashboard?tab=profile"}
                        className="text-xs text-cyan-600 hover:underline"
                    >
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be signed in to comment.
                    <Link
                        className="text-blue-500 hover:underline"
                        to={"/sign-in"}
                    >
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <>
                    <form
                        onSubmit={handleSubmit}
                        className="border border-teal-500 rounded-md p-3"
                    >
                        <Label htmlFor="comment" className="sr-only">
                            Comment
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder="Type your comment here..."
                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                            rows="3"
                            maxLength="200"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <div className="flex items-center p-3 pt-0">
                            <p className="text-gray-500">
                                {200 - comment.length} characters remaining
                            </p>
                            <Button
                                type="submit"
                                size="sm"
                                className="ml-auto gap-1.5"
                            >
                                Submit
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>

                    {/* test */}
                    {comments.length === 0 ? (
                        <p className="text-sm my-5">No comments yet!</p>
                    ) : (
                        <>
                            <div className="text-sm my-5 flex items-center gap-1">
                                <p>Comments</p>
                                <div className="border border-gray-400 py-1 px-2 rounded-sm">
                                    <p>{comments.length}</p>
                                </div>
                            </div>
                            <ScrollArea className="scrollbar-none pt-6 h-[460px]">
                                {comments.map((comment) => (
                                    <Comment
                                        key={comment._id}
                                        comment={comment}
                                        onLike={handleLike}
                                        onEdit={handleEdit}
                                        onDelete={(commentId) => {
                                            setShowModal(true);
                                            setCommentToDelete(commentId);
                                        }}
                                    />
                                ))}
                            </ScrollArea>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
