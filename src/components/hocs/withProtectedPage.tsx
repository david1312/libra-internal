import { ComponentType } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@/atoms/authState";
import PageNotFound from "@/pages/_404";
import Cookies from "js-cookie";

function withProtectedPage(
  Component: ComponentType,
  FallbackComponent?: ComponentType
) {
  return function WithProtectedPage() {
    const auth = Cookies.get("semesta.token");
    if (!auth) {
      return FallbackComponent ? <FallbackComponent /> : <PageNotFound />;
    }
    return <Component />;
  };
}

export default withProtectedPage;
