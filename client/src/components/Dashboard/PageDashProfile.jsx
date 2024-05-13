import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { app } from "@/firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { Progress } from "@/components/ui/progress";
import {
    updateStart,
    updateSuccess,
    updateFailure,
} from "../../redux/user/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const PageDashProfile = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [_, setUpdateUserSuccess] = useState(null);
    const [__, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    toast.error("File must be less than 2MB")
                );
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                    setImageFileUploadProgress(null);
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError(toast.error("No changes made"));
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError(toast.error("Please wait for image to upload"));
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess(
                    toast.success("User's profile updated successfully")
                );
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    };

    useEffect(() => {
        let timeoutId;
        if (imageFileUploadError) {
            timeoutId = setTimeout(() => {
                setImageFileUploadError(null);
            }, 6000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [imageFileUploadError]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className=" flex flex-col items-center gap-4 max-w-lg mx-auto w-full">
                    <h1 className="text-2xl font-extrabold">My Profile</h1>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={filePickerRef}
                        className="hidden"
                    />
                    <Avatar
                        className="md:w-36 md:h-36 w-24 h-24 mb-3 cursor-pointer hover:opacity-60 "
                        onClick={() => filePickerRef.current.click()}
                    >
                        <AvatarImage
                            src={imageUrl || currentUser.profilePicture}
                            className={`${
                                imageFileUploadProgress &&
                                imageFileUploadProgress < 100 &&
                                "opacity-60"
                            }`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {imageFileUploadProgress && (
                        <Progress value={imageFileUploadProgress} />
                    )}

                    <Card className="w-72 sm:w-[350px] pt-6">
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        placeholder="Username"
                                        type="text"
                                        defaultValue={currentUser.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Email"
                                        type="email"
                                        onChange={handleChange}
                                        defaultValue={currentUser.email}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <select
                                        className="flex h-10 capitalize items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                        id="role"
                                        onChange={handleChange}
                                    >
                                        <optgroup className="dark:bg-[#1C1917]">
                                            <option
                                                defaultValue={currentUser.role}
                                            >
                                                {currentUser.role}
                                            </option>
                                            <option value="user">User</option>
                                            <option value="author">
                                                Author
                                            </option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={loading || imageFileUploading}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <Button disabled className="w-full">
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </Button>
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default PageDashProfile;
