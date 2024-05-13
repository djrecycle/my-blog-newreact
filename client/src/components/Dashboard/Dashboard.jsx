import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderDash from "@/components/Dashboard/HeaderDash";
import SideBarDash from "@/components/Dashboard/SideBarDash";
import ContentDash from "@/components/Dashboard/ContentDash";
import { useSelector } from "react-redux";

export function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBarDash currentUser={currentUser} />

      <div className="flex flex-col">
        <HeaderDash />

        <ContentDash currentUser={currentUser} tab={tab} />
      </div>
    </div>
  );
}
