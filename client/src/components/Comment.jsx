import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import moment from "moment";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Card className=" bg-transparent mb-4 snap-y">
            <CardContent className="flex flex-col gap-6 p-2 scroll-ms-6 snap-start">
                <Card>
                    <CardHeader className="flex flex-row gap-3">
                        <img
                            className="w-10 h-10 mt-2 sm:mt-0 rounded-full bg-gray-200"
                            src={user.profilePicture}
                            alt={user.username}
                        />
                        <div className="sm:flex gap-2">
                            <p className="text-gray-500">
                                {user ? `@${user.username}` : "anonymous user"}
                            </p>
                            <i className="text-gray-400">
                                {moment(comment.createdAt).fromNow()}
                            </i>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className=" pb-2">{comment.content}</p>
                    </CardContent>
                    <CardFooter>
                        <button
                            type="button"
                            onClick={() => onLike(comment._id)}
                            className={` hover:text-blue-500 ${
                                currentUser &&
                                comment.likes.includes(currentUser._id) &&
                                "!text-blue-500"
                            }`}
                        >
                            <AiFillLike />
                        </button>
                        <p className="text-gray-400">
                            {comment.numberOfLikes > 0 &&
                                comment.numberOfLikes +
                                    " " +
                                    (comment.numberOfLikes === 1
                                        ? "like"
                                        : "likes")}
                        </p>
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
    );
};

export default Comment;
