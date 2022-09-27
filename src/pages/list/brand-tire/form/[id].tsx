import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Form, Input, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { getMasterTireBrand, updateMasterTireBrand } from "@/services/master";
import _isEmpty from "lodash/isEmpty";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "NAME",
    dataIndex: "nama",
    key: "nama",
  },
  {
    title: "LOGO",
    dataIndex: "icon",
    key: "icon",
    align: "center",
    render: (_: any, record: any) => (
      <>
        <img width="81px" src={record?.icon}></img>
      </>
    ),
  },
];

const BrandBan = () => {
  const params = useParams();
  const { dataTireBrand, isError } = getMasterTireBrand();
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...form,
    };
    try {
      await updateMasterTireBrand(JSON.stringify(payload)).then(() => {
        navigate("/list/brand-tire");
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataTireBrand) {
      const data = dataTireBrand.find((e: any) => e.id_merk === params?.id);
      setForm({ id: data?.id_merk, name: data?.merk });
    }
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor">Daftar Brand Motor</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/brand-motor/form">Form</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <h2 className="m-0 text-[#000] font-bold">Update Merk Ban</h2>
        <br />
        <table width={"100%"} cellPadding={8}>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                ID Brand
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                disabled={true}
                value={form?.id}
                placeholder="Masukkan id brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Brand Name
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, name: e.target.value }))
                }
                disabled={loading}
                value={form?.name}
                placeholder="Masukkan nama brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Ranking
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                style={{ width: 350 }}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    ranking: Number(e.target.value),
                  }))
                }
                disabled={loading}
                placeholder="Masukkan ranking brand"
                type="number"
              />
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <span style={{ float: "right" }}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={loading}
                  disabled={_isEmpty(form?.name) && _isEmpty(form?.data)}
                >
                  Submit
                </Button>
              </span>
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
};

export default withProtectedPage(BrandBan);
