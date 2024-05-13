import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

export function DropdownMenuHome() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative ">
                    <IoIosMenu className="text-2xl" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-fit cursor-pointer"
                align="center"
                forceMount
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to="/sign-in">Sign-in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to="/sign-up">Sign-up</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
