import { TYPE_DATA } from "@/constants/common";

export const INVOICE_DATA = [
  {
    title: "No Invoice",
    value: "no_pesanan",
    type: TYPE_DATA.TEXT,
  },
  {
    title: "No Ref",
    value: "ref",
    type: TYPE_DATA.TEXT,
  },
  {
    title: "Tanggal",
    value: "tanggal",
    type: TYPE_DATA.DATE,
  },
  {
    title: "Nama Toko",
    value: "nama_toko",
    type: TYPE_DATA.TEXT,
  },
  {
    title: "Channel",
    value: "channel",
    type: TYPE_DATA.TEXT,
  },
  {
    title: "Pelanggan",
    value: "pelanggan",
    type: TYPE_DATA.TEXT,
  },
  {
    title: "Status",
    value: "status",
    type: TYPE_DATA.TEXT,
  },
  {
    title: "Sub Total",
    value: "sub_total",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Diskon",
    value: "diskon",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Diskon Lainnya",
    value: "diskon_lainnya",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Biaya Lain",
    value: "biaya_lain",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Harga Jual / Net Sales",
    value: "nett_sales",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "HPP ",
    value: "hpp",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Gross Profit",
    value: "gross_profit",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Fee Marketplace",
    value: "potongan_marketplace",
    type: TYPE_DATA.MONEY,
  },
  {
    title: "Laba Bersih",
    value: "net_profit",
    type: TYPE_DATA.MONEY,
  },
];

export interface DataTypeInvoice {
  key: string;
  no: number;
  sku: string;
  nama_barang: string;
  hpp_satuan: number;
  harga_satuan: number;
  qty: number;
  total_harga: number;
  diskon_percent: number;
  diskon: number;
  harga_final: number;
  total_hpp: number;
  gross_profit: number;
}
