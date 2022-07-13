import { LoadingOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";

export default function LoadingPage() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Space direction="vertical" size="large">
        <LoadingOutlined spin style={{ fontSize: 49, color: "red" }} />
        <Typography.Text>Loading...</Typography.Text>
      </Space>
    </div>
  );
}
