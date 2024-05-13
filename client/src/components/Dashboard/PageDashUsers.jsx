import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaCheck, FaTimes } from "react-icons/fa";
import dateFormat from "dateformat";
import { ScrollArea } from "@/components/ui/scroll-area";
import DialogUserDelete from "../DialogUserDelete";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PageDashUsers = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setLoading(false);
                    if (data.users.length < 5) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(toast.error(error.message));
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
            console.log(users);
        }
    }, [currentUser._id]);

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== userIdToDelete)
                );
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
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
                    <CardTitle>
                        <h1 className="text-2xl font-extrabold">Users</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden md:table-cell">
                                    Date created
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Username
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        {users.map((user) => (
                            <TableBody key={user._id}>
                                <TableRow>
                                    <TableCell className="font-medium text-sm hidden md:table-cell ">
                                        {dateFormat(
                                            user.createdAt,
                                            " dd-mm-yy"
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell ">
                                        {user.username}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.role == "author" ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <DialogUserDelete
                                            handleDeleteUser={handleDeleteUser}
                                        >
                                            <Badge
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setUserIdToDelete(user._id);
                                                }}
                                            >
                                                delete
                                            </Badge>
                                        </DialogUserDelete>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default PageDashUsers;
