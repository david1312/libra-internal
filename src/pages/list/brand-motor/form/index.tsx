import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Card, Divider, Input, message } from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { addMasterBrand } from "@/services/master";
import FileUploader from "@/components/FileUploader";
import _isEmpty from "lodash/isEmpty";

const BrandBan = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("name", form?.name);
      form?.data?.map((e: any) => {
        data.append("icon", e.originFileObj);
      });
      await addMasterBrand(data).then(() => {
        navigate("/list/brand-motor");
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
    }
  };

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
        <h2 className="m-0 text-[#000] font-bold">Add Brand Motor</h2>
        <br />
        <table width={"100%"} cellPadding={8}>
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
                onChange={(e) => setForm({ name: e.target.value })}
                disabled={loading}
                placeholder="Masukkan nama brand"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Icon
              </span>
            </td>
            <td>:</td>
            <td>
              <FileUploader
                onData={(data: any) =>
                  setForm((prev: any) => ({ ...prev, data: data }))
                }
                disabled={loading}
                multiple={false}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-red-600 mt-2">*required</div>
              <div className="text-red-600 mt-2">**max. 1 MB</div>
            </td>
            <td colSpan={2}>
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
