import { SelectDataType } from "@/interfaces";

export const PAGINATION = {
  LIMIT: 6,
  INTERVAL: 5,
};

export const TYPE_DATA = {
  DATE: "DATE",
  MONEY: "MONEY",
  TEXT: "TEXT",
};

export const CHANNELS = {
  LAZADA: "LAZADA",
  JUBELIO_POS: "JUBELIO-POS",
  INTERNAL: "INTERNAL",
  SHOPEE: "SHOPEE",
  AKULAKU: "AKULAKU",
  TIKTOK: "TIKTOK",
  TOKOPEDIA: "TOKOPEDIA",
};

export const LOV_CHANNELS: Array<SelectDataType> = [
  {
    value: CHANNELS.LAZADA,
    label: CHANNELS.LAZADA,
  },
  {
    value: CHANNELS.SHOPEE,
    label: CHANNELS.SHOPEE,
  },
  {
    value: CHANNELS.TOKOPEDIA,
    label: CHANNELS.TOKOPEDIA,
  },
  {
    value: CHANNELS.AKULAKU,
    label: CHANNELS.AKULAKU,
  },
  {
    value: CHANNELS.JUBELIO_POS,
    label: CHANNELS.JUBELIO_POS,
  },
  {
    value: CHANNELS.INTERNAL,
    label: CHANNELS.INTERNAL,
  },
  {
    value: CHANNELS.TIKTOK,
    label: CHANNELS.TIKTOK,
  },
  {
    value: "",
    label: "SEMUA CHANNEL",
  },
];
