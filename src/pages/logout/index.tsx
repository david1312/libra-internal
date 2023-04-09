import LoadingPage from "@/components/loading/LoadingPage";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("semesta.token");
    localStorage.clear();
    navigate("/login");
  }, []);

  return <LoadingPage />;
}

export default LogoutPage;
