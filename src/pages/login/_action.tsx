import { postLogin } from "@/services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function useAction() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const onFinish = async (data: any) => {
    setLoading(true);
    localStorage.clear();

    const payload = {
      username: data?.username,
      password: data?.password,
    };
    try {
      const response = await postLogin(JSON.stringify(payload));
      Cookies.set("semesta.token", response.data.data.token);
      navigate("/");
    } catch (error) {}
    setLoading(false);
  };

  return {
    onFinish,
    loading,
  };
}
