import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Select,
  Input,
  message,
} from "antd";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import {
  getListMotors,
  getMasterBrand,
  getMasterCategoryMotors,
  updateMasterMotor,
} from "@/services/master";
import _isEmpty from "lodash/isEmpty";

const BrandBan = () => {
  const params = useParams();
  const { dataMasterBrand } = getMasterBrand();
  const { dataMasterCategory } = getMasterCategoryMotors();
  const [form, setForm] = useState<any>({});
  const [listMotors, setListMotors] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...form,
    };
    try {
      await updateMasterMotor(JSON.stringify(payload)).then(() => {
        navigate("/list/motors");
        setLoading(false);
      });
    } catch (error) {
      message.error(`${form?.data.name} file failed.`);
      setLoading(false);
    }
  };

  const onFetch = async (limit?: any, page?: any) => {
    const payload = {
      page: page || 1,
      limit: limit || 1000,
    };
    try {
      const response = await getListMotors(JSON.stringify(payload));
      setListMotors(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    onFetch();
  }, []);

  useEffect(() => {
    if (listMotors) {
      const data = listMotors?.data?.find(
        (e: any) => e.id === Number(params?.id)
      );
      setForm({
        id: data?.id,
        name: data?.name,
        id_category_motor: data?.id_category_motor,
        id_brand_motor: data?.id_brand_motor,
      });
    }
  }, [listMotors]);

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
        <h2 className="m-0 text-[#000] font-bold">Update Varian Motor</h2>
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
                value={form?.name}
                placeholder="Masukkan nama "
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
                value={form?.id_brand_motor}
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
                value={form?.id_category_motor}
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
