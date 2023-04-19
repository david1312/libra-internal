import { Spin, Typography } from "antd";

export default function LoadingData() {
  return (
    <div className="relative center">
      <Spin /> <br />
      <Typography.Text>Mohon Tunggu Sedang Memuat Data ...</Typography.Text>
    </div>
  );
}
