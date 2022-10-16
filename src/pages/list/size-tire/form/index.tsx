import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Select,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import {
  addMasterMotor,
  getMasterSizeRaw,
  getMasterTireSize,
} from "@/services/master";
import _isEmpty from "lodash/isEmpty";

const BrandBan = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { dataMasterSizeRaw } = getMasterSizeRaw();
  const { dataTireSize } = getMasterTireSize();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      tire_ring: form?.tire_ring,
      tire_size: form?.tire_size,
    };
    setLoading(true);
    try {
      await addMasterMotor(JSON.stringify(payload)).then(() => {
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
        <h2 className="m-0 text-[#000] font-bold">Add Tire Size</h2>
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
              <Select
                style={{ width: 350 }}
                options={(dataTireSize || [])?.map((e: any) => ({
                  value: e.ring_ban,
                  label: e.ring_ban,
                }))}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, tire_ring: e }))
                }
                disabled={loading}
                placeholder="Pilih tire ring"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Tire Size
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={(dataMasterSizeRaw || [])?.map((e: any) => ({
                  value: e.value,
                  label: e.value,
                }))}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, tire_size: e }))
                }
                disabled={loading}
                placeholder="Masukkan tire size"
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
                  disabled={
                    _isEmpty(form?.tire_ring) && _isEmpty(form?.tire_size)
                  }
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
