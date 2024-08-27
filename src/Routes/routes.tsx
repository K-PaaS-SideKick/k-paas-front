import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
import { ProjectContainer } from "../Pages/project";
import { CommunityContainer } from "../Pages/community";
import { PublicContainer } from "../Pages/public";
import { MypageContainer } from "../Pages/mypage";
import { SettingsContainer } from "../Pages/settings";

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
    path: "public",
    children: [
      {
        path: ":publicId",
        element: <PublicContainer />,
      },
    ],
  },
  {
    path: "mypage",
    element: <MypageContainer />,
  },
  {
    path: "settings",
    element: <SettingsContainer />,
  },
  {
    path: "*",
    element: <LandingContainer />,
  },
];