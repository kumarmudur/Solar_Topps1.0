import _ from 'lodash';

export const getLength = data => {
    return _.size(data);
};

export const compareObjects = (obj1, obj2) => {
    return _.isEqual(obj1, obj2);
};

export const camelCaseToSentenceCase = data => {
    if(data) {
      let result = data.replace( /([A-Z])/g, ' $1' );
      let formattedText = result.charAt(0).toUpperCase() + result.slice(1);
      return formattedText;
    }
};

export const tablePhoneFormat = data => {
    return data ? `+1 ${data}` : '';
};

export const extractDateTime = (data, dateTime) => {
    let response = '';
    if(data) {
        data = data && data.split('T');
        const date = data && data[0];
        const time = data && data[1] && data[1].split('.');
        const timeOnly = time && time[0];
        response= `${date} ${time}`;
        
        if(dateTime === 'date') { response =`${date}`;}
        else if(dateTime === 'time') { response = `${time}`; }
        else { response = `${date} ${timeOnly ? timeOnly : ''}`; }
    } 
    return response;
};

export const columnsTemplate = data => {
    const columns = [];
    let colObj = {};
    data && data.map(col => {
      colObj = {
          name: col,
          label: camelCaseToSentenceCase(col),
          options: {
            filter: true,
            sort: true,
         }
      }
      columns.push(colObj);
      colObj = {};
   });
   return columns;
};

export const allColumnTypes = data => {
    let allTypesOfColumns = data && data.length > 0 ? Object.keys(data[0]) : [];
    let allColumns = [];
    allTypesOfColumns && allTypesOfColumns.map( colName => {
        if (colName && typeof(data[0][colName]) && !Array.isArray(data[0][colName]) && typeof(data[0][colName]) !== 'object') {
            allColumns.push(colName);
        }
    });
    return allColumns;
};

export const dataTemplate = data => {
    if(data) {
        const formatData = data && data.map(data => {     
            if(data['createdDateTime']) {
               data['createdDateTime'] = extractDateTime(data['createdDateTime']);
           } 
           if(data['updatedDateTime']) {
               data['updatedDateTime'] = extractDateTime(data['updatedDateTime']);
           } 
           return data;
       });
       return formatData;
    }
   
}

export const getDateTime = (dateTime, dateTimeStamp) => {
    // const date = new Date(dateTimeStamp).toLocaleDateString('en-US', { month: 'long',  day: '2-digit', year: 'numeric' });
    const date = new Date(dateTimeStamp).toLocaleDateString('en-US', { month: '2-digit',  day: '2-digit', year: 'numeric' });
    const time = new Date(dateTimeStamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let response= '';
    if(dateTime === 'date') { response =`${date}`;}
    else if(dateTime === 'time') { response = `${time}`; }

    return response;
};

export const checkNumeric = data => {
    return /^[0-9-]+$/.test(data) || '';
};

export const validateNumeric = value => {
    let fldValue = value;
    if(fldValue) {
        const onlyNums = fldValue.replace(/[^0-9]/g, '');
        fldValue = onlyNums;
        return fldValue;
    }
};

export const checkAlphanumeric = data => {
    return /^[a-zA-Z0-9_ ]*$/.test(data) || '';
};

export const warehouseFilteredList = warehouseList => {
    let cKeys = Object.keys(warehouseList);
    let warehouses = cKeys.map(key => {
        if(warehouseList[key] && warehouseList[key].hasOwnProperty('warehouseName') && warehouseList[key].warehouseName !== undefined) {
            return warehouseList[key].warehouseName;
        }
    });
    warehouses = warehouses.filter(item => {
       return item !== undefined;
    });
    return warehouses;
};

const checkLeapYear = year => {
    if(year) {
        return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    }
};

export const setDateFormat = (mm, year) => {
    let dd = null;
    if(mm) {
        if(mm === 0 || mm == 1 || mm === 3 || mm === 7 || mm ===8 || mm === 10) {
            dd = 31;
        } else if (mm === 4 || mm === 5 || mm === 6 || mm === 9 || mm === 11) {
            dd = 30;
        } else {
           let isLeapYear = checkLeapYear(year);
           dd = isLeapYear ? 29 : 28;
        }
    }
    return dd;
};

