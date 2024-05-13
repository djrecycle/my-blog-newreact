// import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderDash from "@/components/Dashboard/HeaderDash";
import SideBarDash from "@/components/Dashboard/SideBarDash";
import UpdatePostCk from "@/components/UpdatePostCk";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  return (
    <div className="grid min-h-screen w-screen ">
      <div className="flex flex-col w-full ">
        <HeaderDash />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <UpdatePostCk />
        </main>
      </div>
    </div>
  );
}
