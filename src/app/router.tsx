import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../shared/AppLayout";

import { HomePage } from "../features/dictionary/ui/pages/HomePage";
import { SearchPage } from "../features/dictionary/ui/pages/SearchPage";
import { SubmitPage } from "../features/dictionary/ui/pages/SubmitPage";
import { AdminPage } from "../features/dictionary/ui/pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "submit",
        element: <SubmitPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);