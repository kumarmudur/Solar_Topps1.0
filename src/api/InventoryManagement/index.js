import { API_HOST_BASE } from '../../constants/constants';

const API_HOST = `${API_HOST_BASE}/api/inventory/v1`;

const API = {
    // GET METHODS
    GET_PRODUCT_LIST: `${API_HOST}/products`,
    GET_STATIC_DATA_PRODUCT: `${API_HOST}/staticData/product`,
    GET_MODULE_LIST: `${API_HOST}/products/modulesList`,
    GET_MODULE_MAPPING_DATA: `${API_HOST}/products/mapping/module`,
    PRODUCT_PARTS: `${API_HOST}/products/parts`,
    GET_INVERTER_LIST: `${API_HOST}/products/inverters`,
    GET_OPTIMIZER_LIST: `${API_HOST}/products/optimizers`,
    GET_PRODUCT_PART_LIST: `${API_HOST}/products/others`,
    GET_MODULE_MAPPING: `${API_HOST}/products/mapping`,

    GET_WAREHOUSE_LIST: `${API_HOST}/warehouses`,

    GET_SUPPLIER_LIST: `${API_HOST}/suppliers`,

    CONFIG_FIELD_LIST: `${API_HOST}/configurations`,


    // POST METHODS
    POST_SAVE_PRODUCT: `${API_HOST}/products`,
    POST_PRODUCT_IMAGE_UPLOAD: `${API_HOST}/upload`,
    POST_DELETE_PRODUCT: `${API_HOST}/products/all`,
    POST_SAVE_MAPPING: `${API_HOST}/products/mapping`,

    POST_SAVE_WAREHOUSE: `${API_HOST}/warehouses`,
    POST_DELETE_WAREHOUSE: `${API_HOST}/warehouses/all`,

    POST_SAVE_SUPPLIER: `${API_HOST}/suppliers`,
    POST_DELETE_SUPPLIER: `${API_HOST}/suppliers/all`,

    POST_SAVE_CONFIG_FIELDS: `${API_HOST}/configurations`,

}

export default API;
