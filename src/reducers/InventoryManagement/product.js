import * as actionTypes from '../../actions/InventoryManagement';

// initial state
const INIT_STATE = {
    products: null,
    loading: false,
    productStaticData: null,
    productData: null,
    configList: null,
    moduleList: null,
    moduleMappingData: null,
    productMappingData: null,
    inverters: null,
    optimizers: null,
    otherParts: null,
    deleteProduct: null,
    saveMapping: null,
    saveProduct: null,
    saveProductImage: null
}

export default (state = INIT_STATE, action) => {
    const { type, result, error } = action;
    switch(type) {

        // GET METHODS

        case actionTypes.GET_PRODUCT_LIST: 
          return { ...state, products: null }

        case actionTypes.GET_PRODUCT_LIST_SUCCESS:
          return { ...state, products: result && result.data }

        case actionTypes.GET_PRODUCT_LIST_FAILURE:
          return { ...state, products: error }

        case actionTypes.GET_STATIC_DATA_PRODUCT:
          return { ...state, productStaticData: null }
   
        case actionTypes.GET_STATIC_DATA_PRODUCT_SUCCESS:
          return { ...state, productStaticData: result && result.data }
   
        case actionTypes.GET_STATIC_DATA_PRODUCT_FAILURE:
          return { ...state, productStaticData: error}

        case actionTypes.GET_CONFIG_FIELDS_LIST:
            return { ...state, configList: null }
     
       case actionTypes.GET_CONFIG_FIELDS_LIST_SUCCESS:
            return { ...state, configList: result && result.data }
     
       case actionTypes.GET_CONFIG_FIELDS_LIST_FAILURE:
            return { ...state, configList: error}

        case actionTypes.GET_PRODUCT_DATA:
            return { ...state, productData: null }
     
        case actionTypes.GET_PRODUCT_DATA_SUCCESS:
            return { ...state, productData: result && result.data }
     
        case actionTypes.GET_PRODUCT_DATA_FAILURE:
            return { ...state, productData: error}

        case actionTypes.GET_MODULE_LIST:
            return { ...state, moduleList: null }
       
        case actionTypes.GET_MODULE_LIST_SUCCESS:
            return { ...state, moduleList: result && result.data }
       
        case actionTypes.GET_MODULE_LIST_FAILURE:
            return { ...state, moduleList: error}

        case actionTypes.GET_MODULE_MAPPING_DATA:
            return { ...state, moduleMappingData: null }
         
        case actionTypes.GET_MODULE_MAPPING_DATA_SUCCESS:
            return { ...state, moduleMappingData: result && result.data }
         
        case actionTypes.GET_MODULE_MAPPING_DATA_FAILURE:
            return { ...state, moduleMappingData: error}

        case actionTypes.GET_PRODUCT_MODULE_MAPPING:
            return { ...state, productMappingData: null }
           
        case actionTypes.GET_PRODUCT_MODULE_MAPPING_SUCCESS:
            return { ...state, productMappingData: result && result.data }
           
        case actionTypes.GET_PRODUCT_MODULE_MAPPING_FAILURE:
            return { ...state, productMappingData: error }

        case actionTypes.GET_INVERTER_LIST:
            return { ...state, inverters: null }
             
        case actionTypes.GET_INVERTER_LIST_SUCCESS:
            return { ...state, inverters: result && result.data }
             
        case actionTypes.GET_INVERTER_LIST_FAILURE:
            return { ...state, inverters: error}

        case actionTypes.GET_OPTIMIZER_LIST:
            return { ...state, optimizers: null }
               
        case actionTypes.GET_OPTIMIZER_LIST_SUCCESS:
            return { ...state, optimizers: result && result.data }
               
        case actionTypes.GET_OPTIMIZER_LIST_FAILURE:
            return { ...state, optimizers: error}

        case actionTypes.GET_PRODUCT_PART_LIST:
            return { ...state, otherParts: null }
                 
        case actionTypes.GET_PRODUCT_PART_LIST_SUCCESS:
            return { ...state, otherParts: result && result.data }
                 
        case actionTypes.GET_PRODUCT_PART_LIST_FAILURE:
            return { ...state, otherParts: error}

        // POST METHODS

        case actionTypes.POST_SAVE_PRODUCT: 
            return { ...state, saveProduct: null }

        case actionTypes.POST_SAVE_PRODUCT_SUCCESS:
            return { ...state, saveProduct: result && result.data }

        case actionTypes.POST_SAVE_PRODUCT_FAILURE:
           return { ...state, saveProduct: error }

        case actionTypes.POST_PRODUCT_IMAGE_UPLOAD: 
           return { ...state, saveProductImage: null }

        case actionTypes.POST_PRODUCT_IMAGE_UPLOAD_SUCCESS:
           return { ...state, saveProductImage: result && result.data }

        case actionTypes.POST_PRODUCT_IMAGE_UPLOAD_FAILURE:
          return { ...state, saveProductImage: error }


        case actionTypes.POST_DELETE_PRODUCT: 
            return { ...state, deleteProduct: null }
   
        case actionTypes.POST_DELETE_PRODUCT_SUCCESS: 
            return { ...state, deleteProduct: result && result.data }
   
        case actionTypes.POST_DELETE_PRODUCT_FAILURE: 
            return { ...state, deleteProduct: error }
        
        default: return { ...state }

        case actionTypes.POST_SAVE_MAPPING: 
            return { ...state, saveMapping: null }

        case actionTypes.POST_SAVE_MAPPING_SUCCESS:
            return { ...state, saveMapping: result && result.data }

        case actionTypes.POST_SAVE_MAPPING_FAILURE:
           return { ...state, saveMapping: error }
    }
}