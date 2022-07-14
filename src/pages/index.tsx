import withProtectedPage from "@/components/hocs/withProtectedPage";
import LoginPage from "./login";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Result } from "antd";
import { getProfile } from "@/services/user";
import { useEffect } from "react";
import useStorage from "@/hooks/useStorage";

function HomePage() {
  const { set } = useStorage();
  const { dataProfile, isLoading } = getProfile();

  useEffect(() => {
    if (!isLoading) set("profile", dataProfile);
  }, [dataProfile]);
  return (
    <div className="site-statistic-demo-card">
      <Result
        status="warning"
        title="Semesta Ban Dashboard Under Maintenance"
        subTitle="Please contact Administrator for further information!"
      />
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withProtectedPage(HomePage, LoginPage);
