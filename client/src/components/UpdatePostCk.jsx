import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import "react-quill/dist/quill.snow.css";
import CKEditorTextUpdate from "./CKEditorTextUpdate";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const UpdatePostCk = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const { postId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                    setIsloading(false);
                }
            };

            fetchPost();
        } catch (error) {
            setPublishError(toast.error(error.message));
        }
    }, [postId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        const newCategoryInput = document.getElementById("newCategoryInput");
        const newCategoryName = newCategoryInput.value.trim();
        // console.log("Sending data:", { name: newCategoryName });
        setIsAdding(true);
        if (!newCategoryName) {
            toast.error("Category name cannot be empty");
            return;
        }

        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryName: newCategoryName }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newCategory = await response.json();
            setCategories([...categories, newCategory]);
            newCategoryInput.value = "";
            setIsAdding(false);
        } catch (error) {
            console.error("Failed to add category", error);
            toast.error("Failed to add category: " + error.message);
            setIsAdding(false);
        }
    };

    const handleUpdloadImage = async () => {
        try {
            if (!file) {
                setImageUploadError(toast.error("Please select an image"));
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError(toast.error("Image upload failed"));
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageUploadProgress(null);
                            setImageUploadError(null);
                            setFormData({ ...formData, image: downloadURL });
                            // console.log({ ...formData, image: downloadURL });
                        }
                    );
                }
            );
        } catch (error) {
            setImageUploadError(toast.error("Image upload failed"));
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    useEffect(() => {
        let timeoutId;
        if (imageUploadError) {
            timeoutId = setTimeout(() => {
                setImageUploadError(null);
            }, 6000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [imageUploadError]);

    const handleSubmit = async (e) => {
        setIsloading(true);
        e.preventDefault();
        if (!formData._id) {
            // Handle case when _id is undefined
            console.error(toast.error("Error: _id is undefined"));
            return;
        }
        setFormData({ ...formData, author: currentUser.username });

        try {
            const res = await fetch(
                `/api/post/updatepost/${formData._id}/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            setIsloading(false);
            const data = await res.json();
            if (!res.ok) {
                setPublishError(toast.error(data.message));
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError(toast.error("Something went wrong"));
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center pt-80">
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
        );

    return (
        <>
            <Card className="max-w-sm md:min-w-full">
                <form key={currentUser._id} onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Create Post</CardTitle>
                        <CardDescription>
                            Let's creat your blog.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="title"
                                required
                                type="text"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                defaultValue={formData.title}
                            />
                        </div>
                        <div className="flex w-fit md:w-full flex-col space-y-1.5">
                            <select
                                className="flex h-10 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                value={formData.category}
                                id="category"
                            >
                                <optgroup className="dark:bg-[#1C1917]">
                                    <option value="uncategorized">
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category.categoryName}
                                        >
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                            <div className="flex space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Add new category"
                                    id="newCategoryInput"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddCategory}
                                    disabled={isAdding}
                                >
                                    {isAdding ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="picture">Picture</Label>
                                <Input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <Button
                                    onClick={handleUpdloadImage}
                                    disabled={imageUploadProgress}
                                >
                                    Upload Image
                                </Button>
                                {imageUploadProgress && (
                                    <Progress value={imageUploadProgress} />
                                )}
                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="upload"
                                        className="w-full h-72 object-cover"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                placeholder="description"
                                className="p-2 text-black rounded-sm"
                                type="text"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                defaultValue={formData.description}
                                required
                            />
                        </div>

                        <div className="">
                            <CKEditorTextUpdate
                                setFormData={setFormData}
                                formData={formData}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        {isLoading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit">Publish</Button>
                        )}
                    </CardFooter>
                    {/* {publishError && (
              <Alert className="mt-5" color="failure">
                {publishError}
              </Alert>
            )} */}
                </form>
            </Card>
        </>
    );
};

export default UpdatePostCk;
