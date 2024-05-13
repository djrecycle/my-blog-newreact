import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Progress } from "./ui/progress";
import OAuth from "./OAuth";
import { ReloadIcon } from "@radix-ui/react-icons";

export function CardSignUp({
    handleChange,
    handleSubmit,
    loading,
    errorMessage,
}) {
    return (
        <Card className="w-[350px]">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Let's join with Us.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Username"
                                type="text"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 justify-center">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                            <>
                                <Button disabled className="w-full">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    {loading}
                                </Button>
                            </>
                        ) : (
                            "Sign-Up"
                        )}
                    </Button>
                    <OAuth />
                </CardFooter>
            </form>
            {errorMessage && (
                <p className="text-xl text-red-700 font-bold">{errorMessage}</p>
            )}
        </Card>
    );
}
