import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Select } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import TableComponent from "@/components/TableComponent";

import useTalent from "@/hooks/useStorage";
import LoadingPage from "@/components/loading/LoadingPage";
import moment from "moment";

const searchByNameColumns = [
  {
    title: "DATE INTAKE",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
  {
    title: "PROGRAM NAME",
    dataIndex: "program",
    key: "program",
    align: "center",
  },
  {
    title: "LOCATION",
    dataIndex: "location",
    key: "location",
    align: "center",
  },
  {
    title: "POSITION",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "BUSINESS GROUP",
    dataIndex: "business",
    key: "business",
    align: "center",
  },
  {
    title: "DIVISION",
    dataIndex: "division",
    key: "division",
    align: "center",
  },
  {
    title: "GRADE",
    dataIndex: "grade",
    key: "grade",
    align: "center",
  },
];

const searchByProgramColumns = [
  {
    title: "DATE INTAKE",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
  {
    title: "NIK",
    dataIndex: "nik",
    key: "nik",
    align: "center",
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "PROGRAM NAME",
    dataIndex: "program",
    key: "program",
    align: "center",
  },
  {
    title: "LOCATION",
    dataIndex: "location",
    key: "location",
    align: "center",
  },
  {
    title: "POSITION",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "BUSINESS GROUP",
    dataIndex: "business",
    key: "business",
    align: "center",
  },
  {
    title: "DIVISION",
    dataIndex: "division",
    key: "division",
    align: "center",
  },
  {
    title: "GRADE",
    dataIndex: "grade",
    key: "grade",
    align: "center",
  },
  {
    title: "EMPLOYMENT STATUS",
    dataIndex: "employment",
    key: "employment",
    align: "center",
  },
  {
    title: "TALENT STATUS",
    dataIndex: "talent",
    key: "talent",
    align: "center",
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
          columns={searchByProgramColumns}
          //   data={tableData}
          currentPage={parseInt(currentPage)}
          pagination={true}
        />
      </Card>
    </>
  );
};

export default withProtectedPage(EDPPage);
