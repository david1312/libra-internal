import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Select, Tooltip } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";

import useTalent from "@/hooks/useStorage";
import LoadingPage from "@/components/loading/LoadingPage";
import moment from "moment";
import {
  FieldTimeOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const color = (type: any) => {
  let color = "";
  let icon = undefined;
  let next = "";
  let nextColor = "";
  let nextIcon = undefined;

  switch (type) {
    case "Menunggu":
      color = "#ff5b00";
      icon = <FieldTimeOutlined />;
      next = "Proses";
      nextColor = "#5bc0de";
      nextIcon = <LoadingOutlined />;
      break;
    case "Proses":
      color = "#5bc0de";
      icon = <LoadingOutlined />;
      next = "Selesai";
      nextColor = "#22bb33";
      nextIcon = <CheckCircleOutlined />;

      break;
    default:
      color = "#22bb33";
      icon = <CheckCircleOutlined />;
      next = "Selesai";
      nextColor = "#22bb33";
      nextIcon = <CheckCircleOutlined />;

      break;
  }

  return {
    color,
    icon,
    next,
    nextColor,
    nextIcon,
  };
};

const columns = [
  {
    title: "KODE PEMESANAN",
    dataIndex: "code",
    key: "code",
    align: "center",
  },
  {
    title: "HARI",
    dataIndex: "day",
    key: "day",
    align: "center",
  },
  {
    title: "TANGGAL",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
  {
    title: "LOKASI",
    dataIndex: "location",
    key: "location",
    align: "center",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (_: any, record: any) => (
      <>
        <Button
          style={{
            background: color(record?.status)?.color,
            color: "#fff",
            width: "100%",
          }}
          icon={color(record?.status)?.icon}
        >
          {record?.status}
        </Button>
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (_: any, record: any) => (
      <>
        {["Menunggu", "Proses"].includes(record?.status) && (
          <>
            <Tooltip
              title={color(record?.status)?.next}
              color={color(record?.status)?.nextColor}
            >
              <Button
                onClick={() => {}}
                icon={color(record?.status)?.nextIcon}
                shape="circle"
                style={{
                  background: color(record?.status)?.nextColor,
                  color: "#fff",
                }}
              />
            </Tooltip>
          </>
        )}
      </>
    ),
  },
];

const data = [
  {
    code: "SMT-001",
    day: "Minggu",
    date: "20-08-2022",
    location: "Jl. Sukamulja, Cibeunying, Bandung",
    status: "Menunggu",
  },
  {
    code: "SMT-003",
    day: "Senin",
    date: "21-08-2022",
    location: "Jl. Susu Murni Indah, Cihampeulas, Bandung",
    status: "Selesai",
  },
  {
    code: "SMT-002",
    day: "Rabu",
    date: "23-08-2022",
    location: "Jl. Bojongsoang, Dayeuhkolot, Bandung",
    status: "Proses",
  },
];
const EDPPage = () => {
  const { Option } = Select;

  const currentPath = useLocation().pathname;
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("1");

  const { get } = useTalent();
  const programs = get("master.executive_dev_enum", []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Pemesanan</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/pemesanan/pemasangan">Pemasangan</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <TableComponent
          columns={columns}
          data={data}
          currentPage={parseInt(currentPage)}
          pagination={true}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(EDPPage);
