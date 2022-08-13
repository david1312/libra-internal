import withProtectedPage from "@/components/hocs/withProtectedPage";
import LoginPage from "./login";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Result, Divider } from "antd";
import { getProfile } from "@/services/user";
import { useEffect } from "react";
import useStorage from "@/hooks/useStorage";
import VerticalChart from "@/components/charts/VerticalChart";
import TotalHiredDoughnut from "@/components/charts/Doughnut";
import Chart from "@/components/charts/Chart";
import Meta from "antd/lib/card/Meta";

function HomePage() {
  const { set } = useStorage();
  const { dataProfile, isLoading } = getProfile();

  useEffect(() => {
    if (!isLoading) set("profile", dataProfile);
  }, [dataProfile]);
  return (
    <div className="site-statistic-demo-card">
      {/* <Result
        status="warning"
        title="Semesta Ban Dashboard Under Maintenance"
        subTitle="Please contact Administrator for further information!"
      /> */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Success"
              value={112}
              valueStyle={{ color: "#3f8600" }}
              suffix="Transactions"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Failed"
              value={93}
              valueStyle={{ color: "#cf1322" }}
              suffix="Transactions"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="On Going"
              value={903}
              valueStyle={{ color: "#FAA21B" }}
              suffix="Transactions"
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div>
            <Card
              title="TOTAL ITEMS"
              className="text-start h-full"
              style={{ borderRadius: 7 }}
            >
              <TotalHiredDoughnut
                data={[
                  { name: "Honda", count: 2 },
                  { name: "Suzuki ", count: 200 },
                  { name: "Yamaha ", count: 2240 },
                  { name: "Kawasaki ", count: 620 },
                  { name: "Hyundai", count: 220 },
                ]}
              />
            </Card>
          </div>
          <div className="col-span-2">
            <Card
              title="TOTAL TRANSACTIONS PER - MONTH"
              className="text-start"
              style={{ borderRadius: 7 }}
            >
              <div className="mb-4">
                <Meta description="Include Success, On Going, and Pending" />
              </div>
              <VerticalChart
                type="total-per-mount"
                data={[
                  { name: "Jul ", count: 2 },
                  { name: "August ", count: 200 },
                  { name: "Sept ", count: 2240 },
                  { name: "Oct ", count: 620 },
                  { name: "Nov ", count: 220 },
                ]}
                isLong={true}
              />
            </Card>
          </div>
        </div>
        <Card
          title="Total Transactions Per Event"
          style={{ width: "100%", borderRadius: 7 }}
        >
          <Chart
            width="100%"
            options={{
              date: ["Jul", "August", "Sept", "Oct", "Nov"],
              success: [12, 18, 200, 39, 10],
              onGoing: [32, 8, 20, 90, 200],
              failed: [142, 448, 270, 29, 1000],
            }}
            height="auto"
          />
        </Card>
      </div>
    </div>
  );
}

export default withProtectedPage(HomePage, LoginPage);
