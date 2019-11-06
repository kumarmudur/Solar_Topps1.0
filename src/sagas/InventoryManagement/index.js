import { all, fork, takeLatest } from 'redux-saga/effects';

import * as action from '../../actions/InventoryManagement';

import { postSaveProductSaga, getProductListSaga, getStaticDataProductSaga, getProductDataSaga, getConfigListSaga, getModuleListSaga, getModuleMappingDataSaga,
getProductModuleMappingSaga, getInverterListSaga, getOptimizerListSaga, getProductPartListSaga, postDeleteProductSaga, postSaveMappingSaga, postImageUploadSaga } from './product';
import { getWarehouseListSaga, getWarehouseDataSaga, postSaveWarehouseSaga, postDeleteWarehouseSaga } from './warehouse';
import { getSupplierListSaga, getSupplierDataSaga, postSaveSupplierSaga, postDeleteSupplierSaga } from './supplier';
import { postSaveConfigFieldsSaga } from './configurations';


function* watcherSaga() {

    // GET METHODS
    yield takeLatest(action.GET_PRODUCT_LIST, getProductListSaga); 
    yield takeLatest(action.GET_STATIC_DATA_PRODUCT, getStaticDataProductSaga);
    yield takeLatest(action.GET_PRODUCT_DATA, getProductDataSaga);
    yield takeLatest(action.GET_MODULE_LIST, getModuleListSaga);
    yield takeLatest(action.GET_MODULE_MAPPING_DATA, getModuleMappingDataSaga);
    yield takeLatest(action.GET_PRODUCT_MODULE_MAPPING, getProductModuleMappingSaga);
    yield takeLatest(action.GET_INVERTER_LIST, getInverterListSaga);
    yield takeLatest(action.GET_OPTIMIZER_LIST, getOptimizerListSaga);
    yield takeLatest(action.GET_PRODUCT_PART_LIST, getProductPartListSaga);

    yield takeLatest(action.GET_WAREHOUSE_LIST, getWarehouseListSaga);
    yield takeLatest(action.GET_WAREHOUSE_DATA, getWarehouseDataSaga);

    yield takeLatest(action.GET_SUPPLIER_LIST, getSupplierListSaga);
    yield takeLatest(action.GET_SUPPLIER_DATA, getSupplierDataSaga);

    yield takeLatest(action.GET_CONFIG_FIELDS_LIST, getConfigListSaga);

    // // POST METHODS
    yield takeLatest(action.POST_PRODUCT_IMAGE_UPLOAD, postImageUploadSaga);

    yield takeLatest(action.POST_SAVE_PRODUCT, postSaveProductSaga);
    yield takeLatest(action.POST_DELETE_PRODUCT, postDeleteProductSaga);
    yield takeLatest(action.POST_SAVE_MAPPING, postSaveMappingSaga);
    
    yield takeLatest(action.POST_SAVE_WAREHOUSE, postSaveWarehouseSaga);
    yield takeLatest(action.POST_DELETE_WAREHOUSE, postDeleteWarehouseSaga);

    yield takeLatest(action.POST_SAVE_SUPPLIER, postSaveSupplierSaga);
    yield takeLatest(action.POST_DELETE_SUPPLIER, postDeleteSupplierSaga);

    yield takeLatest(action.POST_SAVE_CONFIG_FIELDS, postSaveConfigFieldsSaga);

}

export default function* rootSaga() {
    yield all([
        fork(watcherSaga)
    ]);
}