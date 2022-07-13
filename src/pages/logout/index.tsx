import LoadingPage from "@/components/loading/LoadingPage";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LogoutPage() {
  const auth = Cookies.get("semesta.token");
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("semesta.token");
    navigate("/login");
  }, []);

  return <LoadingPage />;
}

export default LogoutPage;
