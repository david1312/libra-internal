export enum ENDPOINT {
  LOGIN = "/merchant/auth/login",
  BRAND_MOTOR = "/master-data/motor-brand",
  LIST_PRODUCT = "/products",
  DETAIL_PRODUCT = "/products/detail",
  PROFILE = "/merchant/me ",
  LIST_TRANSACTIONS = "/merchant/transactions/history",
  SUBMIT_TRANSACTIONS = "/transactions/submit",
  UPLOAD_BRAND = "/merchant/master-data/brand-motor/add",
  TIRE_TYPE = "/master-data/tire-type",
  UPLOAD_PRODUCT = "/merchant/products/add",
  TIRE_SIZE = "/master-data/tire-size",
  DELETE_PRODUCT = "/merchant/products/delete",
  UPDATE_STATUS_TRANSACTIONS = "/merchant/transactions/update-status",
  DETAIL_TRANSACTION = "/merchant/transactions/detail",
  TIRE_BRAND = "/master-data/tire-brand",
  ADD_TIRE_BRAND = "/merchant/master-data/tire-brand/add",
  REMOVE_TIRE_BRAND = "/merchant/master-data/tire-brand/delete",
  REMOVE_MOTOR_BRAND = "/merchant/master-data/brand-motor/delete",
  UPDATE_TIRE_BRAND = "/merchant/master-data/tire-brand/update",
  UPDATE_MOTOR_BRAND = "/merchant/master-data/brand-motor/update",
  UPDATE_IMAGE_TIRE_BRAND = "/merchant/master-data/tire-brand/update-image",
  UPDATE_IMAGE_MOTOR_BRAND = "/merchant/master-data/brand-motor/update-image",
  UPDATE_PRODUCT = "/merchant/products/update",
  LIST_MOTORS = "/merchant/master-data/motor",
  ADD_MOTOR = "/merchant/master-data/motor/add",
  UPDATE_MOTOR = "/merchant/master-data/motor/update",
  UPDATE_IMAGE_MOTOR = "/merchant/master-data/motor/update-image",
  REMOVE_MOTOR = "/merchant/master-data/motor/delete",
  LIST_CATEGORY_MOTOR = "/merchant/master-data/category-motor",
  ADD_IMAGE_PRODUCT = "/merchant/products/images-add",
  UPDATE_IMAGE_PRODUCT = "/merchant/products/images-update",
  DELETE_IMAGE_PRODUCT = "/merchant/products/images-delete",
}
