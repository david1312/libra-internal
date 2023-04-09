import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Input,
  message,
  Select,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import {
  addMasterMotor,
  getMasterBrand,
  getMasterCategoryMotors,
} from "@/services/master";
import FileUploader from "@/components/FileUploader";
import _isEmpty from "lodash/isEmpty";

const BrandBan = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { dataMasterBrand } = getMasterBrand();
  const { dataMasterCategory } = getMasterCategoryMotors();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("name", form?.name);
      data.append("id_brand_motor", form?.id_brand_motor);
      data.append("id_category_motor", form?.id_category_motor);

      form?.data?.map((e: any) => {
        data.append("icon", e.originFileObj);
      });
      await addMasterMotor(data).then(() => {
        navigate("/list/motors");
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
          <NavLink to="/list/motors">Daftar Varian Motor</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/list/motors/form">Form</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider
        style={{ backgroundColor: "gray", marginTop: 15, marginBottom: 10 }}
      />

      <Card style={{ width: "100%", borderRadius: 10, marginTop: 16 }}>
        <h2 className="m-0 text-[#000] font-bold">Add Motor</h2>
        <br />
        <table width={"100%"} cellPadding={8}>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Name
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
                placeholder="Masukkan nama"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Brand Motor
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={(dataMasterBrand || [])?.map((e: any) => ({
                  value: e.id,
                  label: e.nama,
                }))}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, id_brand_motor: e }))
                }
                disabled={loading}
                placeholder="Masukkan brand motor"
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <span className="text-red-500">* </span>
                Categoty Motor
              </span>
            </td>
            <td>:</td>
            <td>
              <Select
                style={{ width: 350 }}
                options={(dataMasterCategory || [])?.map((e: any) => ({
                  value: e.id,
                  label: e.name,
                }))}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, id_category_motor: e }))
                }
                disabled={loading}
                placeholder="Masukkan category motor"
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
