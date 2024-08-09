import { RouteObject } from "react-router-dom";
import { LendingContainer } from "../Pages/lending";
import { ProjectContainer } from "../Pages/project";
import { CommunityContainer } from "../Pages/community";
import { PublicContainer } from "../Pages/public";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LendingContainer />,
  },
  {
    path: "party",
    children: [
      {
        path: ":partyId",
        element: <ProjectContainer />,
      },
    ],
  },
  {
    path: "party",
    children: [
      {
        path: ":partyId",
        element: <CommunityContainer />,
      },
    ],
  },

  {
    path: "public",
    children: [
      {
        path: ":publicId",
        element: <PublicContainer />,
      },
    ],
  },
  {
    path: "*",
    element: <LendingContainer />,
  },
];
