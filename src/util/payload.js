import { PROPOSALTYPE } from '../constants/constants';

export const purchasePlanFields = data => {
    let obj = {};
    obj = {
        purchasePlanName: data && data.purchasePlanName ? data.purchasePlanName : '',
        projectType: data && data.projectType ? data.projectType : '',
        proposalType: data && data.proposalType ? data.proposalType : '',
        country:  data && data.country ? data.country : '',
        state: data && data.state ? data.state : '',
        description: data && data.description ? data.description : '',
    };
    return obj;
};

export const purchasePlanDynamicFields = (data, proposalType) => {
    let obj = {};
    if(proposalType === PROPOSALTYPE.FINANCE) {
        obj = {
            termMonth:  data && data.termMonth ? data.termMonth : null,
            minimumCost: data && data.minimumCost ? data.minimumCost : null,
            escalationRate: data && data.escalationRate ? data.escalationRate : null,
            planDownPayment: data && data.planDownPayment ? data.planDownPayment : null,
            discountAsPerPlan: data && data.discountAsPerPlan ? data.discountAsPerPlan : null,
            interestRate: data && data.interestRate ? data.interestRate : null,
            depreciation: data && data.depreciation ? data.depreciation : null,
            balloonPayment1: data && data.balloonPayment1 ? data.balloonPayment1 : null,
            balloonPayment1DueMonth: data && data.balloonPayment1DueMonth ? data.balloonPayment1DueMonth : null,
            finInterestRate: data && data.finInterestRate ? data.finInterestRate : null,
            balloonPayment2: data && data.balloonPayment2 ? data.balloonPayment2 : null,
            includeInProposal: data && data.includeInProposal ? data.includeInProposal : false,
            includeInCustomerPortal: data && data.includeInCustomerPortal ? data.includeInCustomerPortal : false,
            optionToBuy: data && data.optionToBuy ? data.optionToBuy : false,
        };   
    } else if (proposalType === PROPOSALTYPE.PURCHASE) {
        obj = {
            discountAsPerPlan: data && data.discountAsPerPlan ? data.discountAsPerPlan : null,
            includeInProposal: data && data.includeInProposal ? data.includeInProposal : false,
            includeInCustomerPortal: data && data.includeInCustomerPortal ? data.includeInCustomerPortal : false
        };
    } else {
        obj = {
            termMonth: data && data.termMonth ? data.termMonth : null,
            minimumCost: data && data.minimumCost ? data.minimumCost : null,
            escalationRate: data && data.escalationRate ? data.escalationRate : null,
            planDownPayment: data && data.planDownPayment ? data.planDownPayment : null,
            discountAsPerPlan: data && data.discountAsPerPlan ? data.discountAsPerPlan : null,
            interestRate: data && data.interestRate ? data.interestRate : null,
            depreciation: data && data.depreciation ? data.depreciation : null,
            balloonPayment1: data && data.balloonPayment1 ? data.balloonPayment1 : null,
            balloonPayment1DueMonth: data && data.balloonPayment1DueMonth ? data.balloonPayment1DueMonth : null,
            finInterestRate: data && data.finInterestRate ? data.finInterestRate : null,
            balloonPayment2: data && data.balloonPayment2 ? data.balloonPayment2 : null,
            buyoutYear: data && data.buyoutYear ? data.buyoutYear : null,
            residualValue: data && data.residualValue ? data.residualValue : null,
            includeInProposal: data && data.includeInProposal ? data.includeInProposal : false,
            includeInCustomerPortal: data && data.includeInCustomerPortal ? data.includeInCustomerPortal : false,
            optionToBuy: data && data.optionToBuy ? data.optionToBuy : false
        };
    }
    return obj;
};

export const setProductPayload = data => {
    let obj = {};
     if (data.category === 'Assembly') {
      obj = {
        productName: data.productName || '',
        productId: data.productId || '',
        category: data.category || '',
        assemblyWatt: data.assemblyWatt || '',
        description: data.description || '',
        uploadImages: data.uploadImages || [],
  
        productAssemblyModule: data.productAssemblyModule || {
          productName: '',
          power: '',
          quantity: 1,
          residential: 0,
          commercial: 0,
          nonProfit: 0,
          industrial: 0
        },
        productAssemblyOptimizer: data.productAssemblyOptimizer || {
          productName: '',
          power: '',
          quantity: 1,
          residential: 0,
          commercial: 0,
          nonProfit: 0,
          industrial: 0
        },
        productAssemblyInverter: data.productAssemblyInverter || {
          productName: '',
          power: '',
          quantity: 1,
          residential: 0,
          commercial: 0,
          nonProfit: 0,
          industrial: 0
        },
  
        productParts: data.productParts || [{
          partName: '',
          power: '',
          quantity: '',
          residential: 0,
          commercial: 0,
          nonProfit: 0,
          industrial: 0
        }],
  
        otherPrices: data.otherPrices || [],
        otherPrice: data.otherPrice || 0,
  
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
     } else {
       obj = {
        productName: data.productName || '',
        productId: data.productId || '',
        category: data.category || '',
        manufacturer: data.manufacturer || '',
        modelNumber: data.modelNumber || '',
        manufactureDate: data.manufactureDate || '',
        promotion: data.promotion || '',
        power: data.power || '',
        description: data.description || '',
        productHasWarranty: data.productHasWarranty || 'No',
        warrantyType: data.warrantyType || '',
        warrantyYear: data.warrantyYear || '',
        warrantyExpiry: data.warrantyExpiry || '',
        status: data.status || 'Active',
        uploadImages: data.uploadImages || [],
  
        specifications: data.specifications || [],
  
        productCost: data.productCost || '',
        sellingPrice: data.sellingPrice || '$',
        residential: data.residential || '',
        commercial: data.commercial || '',
        nonProfit: data.nonProfit || '',
        industrial: data.industrial || '',
  
        otherPrices: data.otherPrices || [],
        otherPrice: data.otherPrice || 0,
  
        quantity: data.quantity || '',
        threshold: data.threshold || '',
        quantityType: data.quantityType || '',
        quantityInBox: data.quantityInBox || '',
        warehouse: data.warehouse || '',
        stockAvailability: data.stockAvailability || '',
        sku: data.sku || '',
  
        productEntries: data.productEntries || [{
          serialNumber: '',
          warehouse: '',
          shelf: '',
          bin: '',
          uom: '',
          qty: ''
        }],
  
       };
     }
  
     return obj;
  };