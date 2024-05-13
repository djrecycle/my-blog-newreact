import React from "react";
import PageDashContent from "./PageDashContent";
import PageDashProfile from "./PageDashProfile";
import PageDashUsers from "./PageDashUsers";
import PageDashPosts from "./PageDashPosts";
import CreatePostCk from "../CreatePostCk";

import useDocumentTitle from "../useDocumentTitle";

const ContentDash = ({ tab, currentUser }) => {
  let pageTitle = "My-Blog";
  if (tab === "users") {
    pageTitle = "Dashboard | Users";
  } else if (tab === "profile") {
    pageTitle = "Dashboard | Profile";
  } else if (tab === "posts") {
    pageTitle = "Dashboard | Posts";
  } else if (tab === "create-post") {
    pageTitle = "Dashboard | Create Post";
  } else if (tab === "dash") {
    pageTitle = "Dashboarad";
  }
  useDocumentTitle(pageTitle);
  return (
    <main className="flex flex-1 w-full flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {currentUser.isAdmin || currentUser.role == "author" ? (
        <>
          {tab === "dash" && <PageDashContent />}
          {tab === "users" && <PageDashUsers />}
          {tab === "profile" && <PageDashProfile />}
          {tab === "posts" && <PageDashPosts />}
          {tab === "create-post" && <CreatePostCk />}
        </>
      ) : (
        <>
          {tab === "dash" && <PageDashContent />}
          {tab === "profile" && <PageDashProfile />}
        </>
      )}
    </main>
  );
};

export default ContentDash;
