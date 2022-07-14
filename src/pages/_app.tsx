import { authState } from "@/atoms/authState";
import LayoutComponent from "@/components/LayoutComponent";
import React, { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { getAnomToken } from "@/services/api";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode | any;
}

async function initial(setLoading: any) {
  if (Cookies.get("ocbc.open.api.token") && Cookies.get("wob.anom.token"))
    return;
  try {
    await getAnomToken();
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
}

export default function App({ children }: Props) {
  const auth = Cookies.get("semesta.token");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(
    !Cookies.get("semesta.anom.token")
  );
  useEffect(() => {
    initial(setLoading);
    if (!auth) navigate("/login");
  }, []);

  if (loading) return <div>Loading...</div>;
  const path = [];
  path.push(children.props.children[0].map((data: any) => data.key));

  return (
    <div>
      {["/login", "/logout"].includes(location.pathname) ? (
        children
      ) : (
        <LayoutComponent content={children} />
      )}
    </div>
  );
}
