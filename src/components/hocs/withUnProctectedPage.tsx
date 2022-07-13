import { ComponentType } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@/atoms/authState";
import { Navigate } from "react-router-dom";

function withUnProtectedPage(
  Component: ComponentType,
  FallbackComponent?: ComponentType
) {
  return function WithUnProtectedPage() {
    const auth = useRecoilValue(authState);
    if (auth.isAuth) {
      return <Navigate to="/" />;
    }
    return FallbackComponent ? <FallbackComponent /> : <Component />;
  };
}

export default withUnProtectedPage;
