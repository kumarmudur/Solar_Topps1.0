export const signinFormValidation = data => {
  const { email, password } = data;
  let formIsValid = true;
  const errors = {};

  if(email !== undefined) {
    // eslint-disable-next-line no-useless-escape
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!pattern.test(email)) {
       formIsValid = false;
       errors.errorEmail = true;
     }
    }
  
    if(!email) {
      formIsValid = false;
      errors.errorEmail = true;
    }

    if (password !== undefined) {
      if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors.errorPassword = true;
      } 
    }

    if(!password){
      formIsValid = false;
      errors.errorPassword = true;
    }

    return {
      status: formIsValid,
      errors: errors
     }
};

export const signupFormValidation = data => {
  const { firstName, lastName, email, phone, password } = data;
  let formIsValid = true;
  const errors = {};

  if(!firstName){
    formIsValid = false;
    errors.errorFirstName = true;
  }

  if(!lastName){
    formIsValid = false;
    errors.errorLastName = true;
  }

  if(email !== undefined) {
    // eslint-disable-next-line no-useless-escape    
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!pattern.test(email)) {
       formIsValid = false;
       errors.errorEmail = true;
     }
    }
  
    if(!email) {
      formIsValid = false;
      errors.errorEmail = true;
    }

    if(!phone){
      formIsValid = false;
      errors.errorPhone = true;
    }

    if(phone && phone.includes('+1') && phone.length !== 17) {
      formIsValid = false;
      errors.errorPhone = true;
    }

    if (password !== undefined) {
      if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors.errorPassword = true;
      } 
    }

    if(!password){
      formIsValid = false;
      errors.errorPassword = true;
    }

    return {
      status: formIsValid,
      errors: errors
    }
};

export const forgotPasswordFormValidation = data => {
  const { email } = data;
  let formIsValid = true;
  const errors = {};

  if(email !== undefined) {
    // eslint-disable-next-line no-useless-escape    
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!pattern.test(email)) {
       formIsValid = false;
       errors.errorEmail = true;
     }
  }

  if(!email){
    formIsValid = false;
    errors.errorEmail = true;
  }

  return{
    status: formIsValid,
    errors: errors
  }

};

export const addUserValidation = data => {
  const { firstName, lastName, email, phone, alternativePhone, houseBuilding, zipCode, city, country, state, userType, role, office, department } = data;
  let formIsValid = true;
  const errors = {};

  if(!firstName) {
    formIsValid = false;
    errors.errorFirstName = true;
  }

  if(!lastName) {
    formIsValid = false;
    errors.errorLastName = true;
  }
 
  if(!phone) {
    formIsValid = false;
    errors.errorPhone = true;
  }

  if(phone && phone.includes('+1') && phone.length !== 17) {
    formIsValid = false;
    errors.errorPhone = true;
  }

  if(alternativePhone && alternativePhone.includes('+1') && alternativePhone.length !== 17) {
    formIsValid = false;
    errors.errorAlternative = true;
  }

  if(email !== undefined) {
  // eslint-disable-next-line no-useless-escape    
  let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!pattern.test(email)) {
     formIsValid = false;
     errors.errorEmail = true;
   }
  }

  if(!email) {
    formIsValid = false;
    errors.errorEmail = true;
  }

  if(!houseBuilding) {
    formIsValid = false;
    errors.errorHouseBuilding = true;
  }

  if(!zipCode) {
    formIsValid = false;
    errors.errorZipcode = true;
  }

  if(!city) {
    formIsValid = false;
    errors.errorCity = true;
  }

  if(!country) {
    formIsValid = false;
    errors.errorCountry = true;
  }

  if(!state) {
    formIsValid = false;
    errors.errorState = true;
  }

  if(!userType) {
    formIsValid = false;
    errors.errorUserType = true;
  }

  if(!role) {
    formIsValid = false;
    errors.errorRole = true;
  }

  if(!office) {
    formIsValid = false;
    errors.errorOffice = true;
  }

  if(!department) {
    formIsValid = false;
    errors.errorDepartment = true;
  }

 return {
  status: formIsValid,
  errors: errors
 }
};

// Add Customer validation
export const addCustomerValidation = data => {
  const { firstName, lastName, email, phone, alternativePhone, userType} = data;
  let formIsValid = true;
  const errors = {};

  if(!firstName) {
    formIsValid = false;
    errors.errorFirstName = true;
  }

  if(!lastName) {
    formIsValid = false;
    errors.errorLastName = true;
  }
 
  if(!phone) {
    formIsValid = false;
    errors.errorPhone = true;
  }

  if(phone && phone.includes('+1') && phone.length !== 17) {
    formIsValid = false;
    errors.errorPhone = true;
  }

  if(alternativePhone && alternativePhone.includes('+1') && alternativePhone.length !== 17) {
    formIsValid = false;
    errors.errorAlternative = true;
  }

  if(email !== undefined) {
  // eslint-disable-next-line no-useless-escape    
  let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!pattern.test(email)) {
     formIsValid = false;
     errors.errorEmail = true;
   }
  }

  if(!email) {
    formIsValid = false;
    errors.errorEmail = true;
  }
  
  if(!userType) {
    formIsValid = false;
    errors.errorUserType = true;
  }

 return {
  status: formIsValid,
  errors: errors
 }

};

//Purchase-plan validation
export const purchasePlanValidation = (data, dynamicFields) => {
  const { purchasePlanName, projectType, proposalType, country, state, description } = data;
  const { balloonPayment1, balloonPayment1DueMonth, termMonth } = dynamicFields;
  let formIsValid = true;
  const errors = {};

  if(!purchasePlanName) {
      formIsValid = false;
      errors.errorPurchasePlanName = true;
  }

  if(!projectType) {
      formIsValid = false;
      errors.errorProjectType = true;
  }

  if(!proposalType) {
      formIsValid = false;
      errors.errorProposalType = true;
  }

  if(!country) {
      formIsValid = false;
      errors.errorCountry = true;
  }

  if(!state) {
      formIsValid = false;
      errors.errorState = true;
  }

  if(!description) {
      formIsValid = false;
      errors.errorDescription = true;
  }

  if(balloonPayment1 === 'Yes') {
    if(!balloonPayment1DueMonth) {
        formIsValid = false;
        errors.errorBallonPayment1DueMonth = true;
        errors.errorBallonPayment1DueMonthMsg = 'Ballon Payment 1 Due Month is required';
    } else {
        if(!termMonth) {
            formIsValid = false;
            errors.errorBallonPayment1DueMonth = true;
            errors.errorBallonPayment1DueMonthMsg = 'Term Month is required';
        } else { 
           if(parseInt(balloonPayment1DueMonth) >= parseInt(termMonth))  {
            formIsValid = false;
            errors.errorBallonPayment1DueMonth = true;
            errors.errorBallonPayment1DueMonthMsg = 'Due Month value should be less than Term Month';
           }
        }
    }
}

  return {
      status: formIsValid,
      errors: errors
  };
};

export const validateZipCode = value => {
  let fldValue = value;
  if(fldValue) {
      const onlyNums = fldValue.replace(/[^0-9]/g, '');
      if (onlyNums.length < 5) {
          fldValue = onlyNums;
      } 
      return fldValue;
  }
};

// warehouse validation
export const warehouseValidation = data => {
const { warehouseName, managerName, managerEmail, managerPhone, address1, 
  zipCode, city, state, country} = data;
    
let formIsValid = true;
const errors = {};

if(!warehouseName) {
    formIsValid = false;
    errors.errorWarehouseName = true;
}

if(!managerName) {
    formIsValid = false;
    errors.errorManagerName = true;
}

if(managerEmail) {
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(managerEmail)) {
      formIsValid = false;
      errors.errorManagerEmail = true;
    }
}

if(!managerEmail) {
    formIsValid = false;
    errors.errorManagerEmail = true;
}

if(managerPhone) {
    if(managerPhone.length !== 17) {
        formIsValid = false;
        errors.errorManagerPhone = true;
    }
}

if(!managerPhone) {
    formIsValid = false;
    errors.errorManagerPhone = true;
}

if(!address1) {
    formIsValid = false;
    errors.errorHouseNumber = true;
}

if(!zipCode) {
    formIsValid = false;
    errors.errorZipCode = true;
}

if(!city) {
    formIsValid = false;
    errors.errorCity = true;
}

if(!state) {
    formIsValid = false;
    errors.errorState = true;
}

if(!country) {
    formIsValid = false;
    errors.errorCountry = true;
}
return {
    status: formIsValid,
    errors: errors
};
};

//add supplier validation
export const supplierValidation = data => {
const { organizationName, supplierNo, registrationNo} = data;
let formIsValid = true;
const errors = {};

if(!organizationName) {
    formIsValid = false;
    errors.errorOrganizationName = true;
}

if(!supplierNo) {
    formIsValid = false;
    errors.errorSupplierNo = true;
}

if(!registrationNo) {
    formIsValid = false;
    errors.errorRegistrationNo = true;
}
   
return {
    status: formIsValid,
    errors: errors
};
};

export const contactSupplierValidation = data => {
const { contactName, contactEmail, contactPhone } = data;
let formIsValid = true;
const errors = {};

if(!contactName) {
    formIsValid = false;
    errors.errorContactName = true;
}

if(contactEmail) {
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(contactEmail)) {
      formIsValid = false;
      errors.errorContactEmail = true;
    }
}

if(!contactEmail) {
    formIsValid = false;
    errors.errorContactEmail = true;
}

if(contactPhone) {
    if(contactPhone.length !== 17) {
        formIsValid = false;
        errors.errorContactPhone = true;
    }
}

if(!contactPhone) {
    formIsValid = false;
    errors.errorContactPhone = true;
}
   
return {
    status: formIsValid,
    errors: errors
};
};

  export const checkNumeric = value => {
    let fldValue = value;
    if(fldValue) {
        const onlyNums = fldValue.replace(/[^0-9]/g, '');
        if (onlyNums.length < 5) {
            fldValue = onlyNums;
        } 
        return fldValue;
    }
  };

  export const userProfileValidation = data => {
    const { firstName, lastName, email, phone, companyName, companyEin, ssn, companyRegistrationState, 
    houseBuilding, street, zipCode, city, county, country, state } = data;
    let formIsValid = true;
    const errors = {};

      if(!firstName) {
        formIsValid = false;
        errors.errorFirstName =true;
      }
  
      if(!lastName) {
        formIsValid = false;
        errors.errorLastName = true;
      }
    
      if(!email) {
        formIsValid = false;
        errors.errorEmail = true;
      }
  
      if(email !== undefined) {
        // eslint-disable-next-line no-useless-escape
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(email)) {
          formIsValid = false;
          errors.errorEmail = true;
        }
      }
      if(!phone) {
        formIsValid = false;
        errors.errorPhone = true;
      }
  
  
  if(!companyName) {
    formIsValid = false;
    errors.errorCompanyName =true;
  }
  
  if(!companyEin) {
    formIsValid = false;
    errors.errorCompanyEin =true;
  }
  
  if(!companyRegistrationState) {
    formIsValid = false;
    errors.errorRegistrationState =true;
  }
  
  if(!houseBuilding) {
    formIsValid = false;
    errors.errorHouseBuilding =true;
  }
  
  if(!zipCode) {
    formIsValid = false;
    errors.errorZipcode =true;
  }
  
  if(!city) {
    formIsValid = false;
    errors.errorCity =true;
  }
  
  if(!country) {
    formIsValid = false;
    errors.errorCountry =true;
  }
  
  if(!state) {
    formIsValid = false;
    errors.errorState =true;
  }
  
  return {
  status: formIsValid,
  errors: errors
  };
};
  
// Add Product validation
export const productValidation = data => {
  const { productName, category, manufacturer, modelNumber, productCost, residential,
      commercial, nonProfit, industrial, quantity, threshold, power, quantityType, quantityInBox } = data;
  let formIsValid = true;
  const errors = {};

  if(!productName) {
      formIsValid = false;
      errors.errorProductName = true;
  }

  if(!category) {
      formIsValid = false;
      errors.errorCategory = true;
  }

  if(!manufacturer) {
      formIsValid = false;
      errors.errorManufacturer = true;
  }

  if(!modelNumber) {
      formIsValid = false;
      errors.errorModelNumber = true;
  }

  if(!power) {
      formIsValid = false;
      errors.errorPower = true;
  }

  if(!productCost) {
      formIsValid = false;
      errors.errorProductCost = true;
  }

  if(!residential) {
      formIsValid = false;
      errors.errorResidential = true;
  }

  if(!commercial) {
      formIsValid = false;
      errors.errorCommercial = true;
  }

  if(!nonProfit) {
      formIsValid = false;
      errors.errorNonProfit = true;
  }

  if(!industrial) {
      formIsValid = false;
      errors.errorIndustrial = true;
  }

  if(!quantity) {
      formIsValid = false;
      errors.errorQuantity = true;
  }

  if(parseInt(quantity)) {
      if(parseInt(threshold) && parseInt(quantity) < parseInt(threshold)) {
          formIsValid = false;
          errors.errorThreshold = true;
          errors.errorThresholdMessage = 'X threshold value should be less than Quantity value'

      } else {
          errors.errorThreshold = false;
          errors.errorThresholdMessage = '';

      }
  }

  if(quantityType === 'Box') {
      if(parseInt(quantityInBox) && parseInt(quantityInBox) < 2) {
          formIsValid = false;
          errors.errorQunatityBox = true;
      } else if (parseInt(quantityInBox) === 0) {
          formIsValid = false;
          errors.errorQunatityBox = true;
      } else {
          errors.errorQunatityBox = false; 
      }
  }

  return {
      status: formIsValid,
      errors: errors
  };
};

export const assemblyValidation = data => {
  const { productName, category } = data;

  let formIsValid = true;
  const errors = {};

  if(!productName) {
      formIsValid = false;
      errors.errorProductName = true;
  }

  if(!category) {
      formIsValid = false;
      errors.errorCategory = true;
  }

  return {
      status: formIsValid,
      errors: errors
  };
};


export const associateValidation = data => {
  const { representativeFirstName, representativeLastName, companyName, companyEin, ssn, driverLicenseNumber, companyRegistrationState, houseBuilding,
    zipCode, city, state, country } = data;

  let formIsValid = true;
  const errors = {};

  if(!representativeFirstName) {
      formIsValid = false;
      errors.errorRepresentFirstName = true;
  }

  if(!representativeLastName) {
      formIsValid = false;
      errors.errorRepresentLastName = true;
  }

  if(!companyName) {
    formIsValid = false;
    errors.errorCompanyName = true;
  }

  if(!companyEin) {
    formIsValid = false;
    errors.errorCompanyEin = true;
  }

  if(!ssn) {
    formIsValid = false;
    errors.errorSSN = true;
  }

  if(!driverLicenseNumber) {
    formIsValid = false;
    errors.errorDriverLicenseNumber = true;
  }

  if(!companyRegistrationState) {
    formIsValid = false;
    errors.errorRegistrationState = true;
  }

  if(!houseBuilding) {
    formIsValid = false;
    errors.errorHouseBuilding = true;
  }

  if(!zipCode) {
    formIsValid = false;
    errors.errorZipcode = true;
  }

  if(!city) {
    formIsValid = false;
    errors.errorCity = true;
  }

  if(!state) {
    formIsValid = false;
    errors.errorState = true;
  }

  if(!country) {
    formIsValid = false;
    errors.errorCountry = true;
  }

  return {
      status: formIsValid,
      errors: errors
  };
};

export const resetPasswordValidation = data => {
  const { password, confirmPassword } = data;

  let formIsValid = true;
  const errors = {};

  if (password !== undefined) {
    if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.errorPassword = true;
    } 
  }

  if(!password) {
      formIsValid = false;
      errors.errorPassword = true;
  }

  if(!confirmPassword) {
      formIsValid = false;
      errors.errorConfirmPassword = true;
  }

  if (confirmPassword !== undefined && password !== undefined) {
    if (!confirmPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.errorConfirmPassword = true;
    }
    if (password !== confirmPassword) {
      formIsValid = false;
      errors.errorConfirmPassword = true;
      errors.notMactchingPassword = true;
    } 
  }

  return {
      status: formIsValid,
      errors: errors
  };
};

export const changePasswordValidation = data => {
  const { oldPassword, newPassword, confirmPassword } = data;
  let formIsValid = true;
  
  const errors = {};
  
  if(!oldPassword) {
    formIsValid = false;
    errors.errorOldPassword = true;
  }
  
  if (newPassword !== undefined) {
    if (!newPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.errorPassword = true;
    } 
  }
  
  if (!newPassword) {
    formIsValid = false;
    errors.errorPassword = true;
  }
  
  if (!confirmPassword) {
    formIsValid = false;
    errors.errorConfirmPassword = true;
  }

  if (confirmPassword !== undefined && newPassword !== undefined) {
    if (!confirmPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.errorConfirmPassword = true;
    }
    if (newPassword !== confirmPassword) {
      formIsValid = false;
      errors.errorConfirmPassword = true;
      errors.notMactchingPassword = true;
    } 
  }
  
  return {
    status: formIsValid,
    errors: errors
  }; 
};

export const contactPersonValidation = data => {
  const { contactEmail, contactPhone, contactPersons, type } = data;
  let formIsValid = true;
  const errors = {};
  if(type === 'main') {
    if(contactEmail) {
      // eslint-disable-next-line no-useless-escape
      let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(contactEmail)) {
        formIsValid = false;
        errors.errorContactEmail = true;
      }
    }

    if(contactPhone && contactPhone.includes('+1') && contactPhone.length !== 17) {
      formIsValid = false;
      errors.errorContactPhone = true;
    }
  }
  else {
    contactPersons && contactPersons.length > 0 && contactPersons.map((contactPerson, index) => {
      if(contactPerson.email) {
        // eslint-disable-next-line no-useless-escape
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(contactPerson.email)) {
          formIsValid = false;
          errors[`errorEmail-${ index }`] = true;
        }
      }
      if(contactPerson.phone && contactPerson.phone.includes('+1') && contactPerson.phone.length !== 17) {
        formIsValid = false;
        errors[`errorPhone-${ index }`] = true;
      }
    });
  }

  return {
    status: formIsValid,
    errors: errors
  };
};
