export const productGetInitialState = state => {
    const obj = {
        productName: state.productName || '',
        category: state.category || '',
        manufacturer: state.manufacturer || '',
        modelNumber: state.modelNumber || '',
        manufactureDate: state.manufactureDate || '',
        promotion: state.promotion || '',
        power: state.power || '',
        description: state.description || '',
        productHasWarranty: state.productHasWarranty || false,
        warrantyType: state.warrantyType || '',
        warrantyYear: state.warrantyYear || '',
        warrantyExpiry: state.warrantyExpiry || '',
        status: state.status || 'Active',
        uploadImages: state.uploadImages || [],
        assemblyWatt: state.assemblyWatt ||  '',
  
        specifications: state.specifications || [],
  
        quantity: state.quantity || '',
        threshold: state.threshold || '',
        quantityType: state.quantityType || '',
        quantityInBox: state.quantityInBox || '',
        warehouse: state.warehouse || '',
        stockAvailability: state.stockAvailability || '',
        sku: state.sku || '',
  
        productCost: state.productCost || '',
        sellingPrice: state.sellingPrice || '$',
        residential: state.residential || '',
        commercial: state.commercial || '',
        nonProfit: state.nonProfit || '',
        industrial: state.industrial || '',
  
        otherPrices: state.otherPrices || [],
        otherPrice: state.otherPrice || 0,
  
        productEntries: state.productEntries || [{
          serialNumber: '',
          warehouse: '',
          shelf: '',
          bin: '',
          uom: '',
          qty: ''
        }],
  
      productParts: state.productParts || [ {
        partName: '',
        power: '',
        quantity: '',
        residential: '',
        commercial: '',
        nonProfit: '',
        industrial: ''
      }],
  
      productAssemblyModule: state.productAssemblyModule ||  {
        productName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
  
      productAssemblyOptimizer: state.productAssemblyOptimizer ||  {
        productName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
  
      productAssemblyInverter: state.productAssemblyInverter ||  {
        productName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
  
      grandTotalAssemblyResidential: state.grandTotalAssemblyResidential ||  0,
      grandTotalAssemblyCommercial: state.grandTotalAssemblyCommercial ||  0,
      grandTotalAssemblyNonProfit: state.grandTotalAssemblyNonProfit || 0,
      grandTotalAssemblyIndustrial: state.grandTotalAssemblyIndustrial || 0,
  
      grandTotalPartsResidential: state.grandTotalPartsResidential || 0,
      grandTotalPartsCommercial: state.grandTotalPartsCommercial || 0,
      grandTotalPartsNonProfit: state.grandTotalPartsNonProfit || 0,
      grandTotalPartsIndustrial: state.grandTotalPartsIndustrial || 0,
  
      totalAssemblyResidentialPrice: state.totalAssemblyResidentialPrice || 0,
      totalAssemblyCommercialPrice: state.totalAssemblyCommercialPrice || 0,
      totalAssemblyNonProfitPrice: state.totalAssemblyNonProfitPrice || 0,
      totalAssemblyIndustrialPrice: state.totalAssemblyIndustrialPrice || 0
    };
    return obj;
};

export const productSetInitialState = data => {
    const obj = {
        productName: data.productName || '',
        category: data.category || '',
        manufacturer: data.manufacturer || '',
        modelNumber: data.modelNumber || '',
        manufactureDate: data.manufactureDate || '',
        promotion: data.promotion || '',
        power: data.power || '',
        description: data.description || '',
        productHasWarranty: data.productHasWarranty || '',
        warrantyType: data.warrantyType || '',
        warrantyYear: data.warrantyYear || '',
        warrantyExpiry: data.warrantyExpiry || '',
        status: 'Active',
        uploadImages: data.uploadImages || [],
  
        assemblyWatt: data.assemblyWatt || [],
  
        otherPrices: data.otherPrices || [],
        otherPrice: data.otherPrice || 0,
  
        quantity: data.quantity || '',
        threshold: data.threshold || '',
        quantityType: data.quantityType || '',
        quantityInBox: data.quantityInBox || '',
        warehouse: data.warehouse || '',
        stockAvailability: data.stockAvailability || '',
        sku: data.sku || '',
  
        productCost: data.productCost || '',
        sellingPrice: data.sellingPrice || '$',
        residential: data.residential || '',
        commercial: data.commercial || '',
        nonProfit: data.nonProfit || '',
        industrial: data.industrial || '',
  
        productEntries: data.productEntries || [{
          serialNumber: '',
          warehouse: '',
          shelf: '',
          bin: '',
          uom: '',
          qty: ''
        }],
  
        specifications: data.specifications || [],
  
        productParts: data.productParts || [{
          partName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        }],
  
        productAssemblyModule: data.productAssemblyModule || {
          productName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        },
  
        productAssemblyOptimizer: data.productAssemblyOptimizer || {
          productName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        },
  
        productAssemblyInverter: data.productAssemblyInverter || {
          productName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        },
    
        grandTotalAssemblyResidential: data.grandTotalAssemblyResidential || 0,
        grandTotalAssemblyCommercial: data.grandTotalAssemblyCommercial || 0,
        grandTotalAssemblyNonProfit: data.grandTotalAssemblyNonProfit || 0,
        grandTotalAssemblyIndustrial: data.grandTotalAssemblyIndustrial || 0,
  
        grandTotalPartsResidential: data.grandTotalPartsResidential || 0,
        grandTotalPartsCommercial: data.grandTotalPartsCommercial || 0,
        grandTotalPartsNonProfit: data.grandTotalPartsNonProfit || 0,
        grandTotalPartsIndustrial: data.grandTotalPartsIndustrial || 0,
    
        totalAssemblyResidentialPrice: data.totalAssemblyResidentialPrice || 0,
        totalAssemblyCommercialPrice: data.totalAssemblyCommercialPrice || 0,
        totalAssemblyNonProfitPrice: data.totalAssemblyNonProfitPrice || 0,
        totalAssemblyIndustrialPrice: data.totalAssemblyIndustrialPrice || 0
      };
      return obj;
};


const caluclateAssembyData = (value, residential, commercial, nonProfit, industrial, assemblyType) => {
    if(value) {
      assemblyType.quantity = parseFloat(value);
      assemblyType.residential = parseFloat(value) * residential;
      assemblyType.commercial = parseFloat(value) * commercial;
      assemblyType.nonProfit = parseFloat(value) * nonProfit;
      assemblyType.industrial = parseFloat(value) * industrial;
    } else {
      assemblyType.quantity = 0;
      assemblyType.residential = 0;
      assemblyType.commercial = 0;
      assemblyType.nonProfit = 0;
      assemblyType.industrial = 0;
    }
    return {
      assemblyType
    };
};

export const productAssemblyQuantityFieldChange = (quantityType, value, data) => {
    if(quantityType === 'moduleQuantity') {
        const { fields, moduleResidential, moduleCommercial, moduleNonProfit, moduleIndustrial } = data;
        const { productAssemblyModule } = fields;
        caluclateAssembyData(value, moduleResidential, moduleCommercial, moduleNonProfit, moduleIndustrial, productAssemblyModule);
    } else if (quantityType === 'optimizerQuantity') {
        const { fields, optimizerResidential, optimizerCommercial, optimizerNonProfit, optimizerIndustrial } = data;
        const { productAssemblyOptimizer } = fields;
        caluclateAssembyData(value, optimizerResidential, optimizerCommercial, optimizerNonProfit, optimizerIndustrial, productAssemblyOptimizer);
    } else if (quantityType === 'inverterQuantity') {
        const { fields, inverterResidential, inverterCommercial, inverterNonProfit, inverterIndustrial } = data;
        const { productAssemblyInverter } = fields;
        caluclateAssembyData(value, inverterResidential, inverterCommercial, inverterNonProfit, inverterIndustrial, productAssemblyInverter);
    }
};

const clearOptimizer = () => {
  let productAssemblyOptimizer = {};
  productAssemblyOptimizer = {
        productName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
    };
    return productAssemblyOptimizer;
};

const clearInverter = () => {
    let productAssemblyInverter = {};
    productAssemblyInverter = {
        productName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      };
      return productAssemblyInverter;
  };

export const clearProductAssembly = id => {
    let productAssemblyModule = {}, productAssemblyOptimizer = {}, productAssemblyInverter = {};
    if(id === 'module') {
        productAssemblyModule = {
            productName: '',
            power: '',
            quantity: '',
            residential: 0,
            commercial: 0,
            nonProfit: 0,
            industrial: 0
        };
        productAssemblyOptimizer = clearOptimizer();
        productAssemblyInverter = clearInverter();
        return {
            productAssemblyModule,
            productAssemblyOptimizer,
            productAssemblyInverter
        };
    } else if (id === 'optimizer') {
        productAssemblyOptimizer = clearOptimizer();
        return  { productAssemblyOptimizer };
    } else if (id === 'inverter') {
        productAssemblyInverter = clearInverter();
        return { productAssemblyInverter };
    }
};



