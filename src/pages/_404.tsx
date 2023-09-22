import { Button, Result } from "antd";
import { NavLink, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const { state }: any = useLocation();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Result
        status={state?.status || "404"}
        title={state?.status || "404"}
        subTitle={state?.message || "Fitur ini masih dalam proses pengerjaan"}
        extra={
          <NavLink to="/">
            <Button type="primary" shape="round">
              Back Home
            </Button>
          </NavLink>
        }
      />
    </div>
  );
}
