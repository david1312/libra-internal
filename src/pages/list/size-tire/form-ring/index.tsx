import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Input, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { addMasterRing } from "@/services/master";
import _isEmpty from "lodash/isEmpty";

const BrandBan = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      size_ring: Number(form?.size_ring),
    };
    setLoading(true);
    try {
      await addMasterRing(JSON.stringify(payload)).then(() => {
        navigate("/list/size-tire");
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      message.error(`${form?.data.name} file failed.`);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>List Barang</Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/size-tire">Daftar Ukuran Ban</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/motors/form">Form</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <h2 className="m-0 text-[#000] font-bold">Add Tire Ring</h2>
        <br />
        <table width={"100%"} cellPadding={8}>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Tire Ring
              </span>
            </td>
            <td>:</td>
            <td>
              <Input
                placeholder="Masukkan ring"
                disabled={loading}
                type="number"
                onChange={(e: any) => setForm({ size_ring: e.target.value })}
              />
            </td>
          </tr>

          <tr>
            <td>
              <div className="text-red-600 mt-2">*required</div>
            </td>
            <td colSpan={2}>
              <span style={{ float: "right" }}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  loading={loading}
                  disabled={_isEmpty(form?.size_ring)}
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
