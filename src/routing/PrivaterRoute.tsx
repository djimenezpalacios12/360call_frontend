import { Navigate } from "react-router-dom";

import { useView } from "@/hooks/useViews.hooks";

export interface PrivateRouteProps {
  rol: string;
  children: React.ReactNode;
  path: string;
}

const PrivateRoute = ({ rol, children, path }: PrivateRouteProps) => {
  const views = useView();

  const route = views.filter((view) => view.URL.includes(path));
  const authorization = route[0].access.includes(rol);

  if (authorization) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
