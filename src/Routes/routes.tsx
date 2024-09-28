import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
import { ProjectContainer } from "../Pages/project";
import { CommunityContainer } from "../Pages/community";
import { UserContainer } from "../Pages/user";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingContainer />,
  },
  {
    path: "project",
    element: <ProjectContainer />,
  },
  {
    path: "community",
    element: <CommunityContainer />,
  },
  {
    path: "user",
    children: [
      {
        path: ":userId",
        element: <UserContainer />,
      },
    ],
  },
  {
    path: "*",
    element: <LandingContainer />,
  },
];
