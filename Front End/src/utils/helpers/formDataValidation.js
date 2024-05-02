export const validateFormData = (data) => {
    let hasEmptyValue = false;
    const checkEmptyValue = (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return true;
        } else if (typeof value === 'object' && Object.keys(value).length === 0) {
            return true;
        }
        return false;
    };

    const traverseData = (obj) => {
        for (const key in obj) {
            if (checkEmptyValue(obj[key])) {
                console.log(`Value for ${key} is empty or null`);
                hasEmptyValue = true;
            } else if (typeof obj[key] === 'object') {
                traverseData(obj[key]);
            }
        }
    };
    traverseData(data);
    return hasEmptyValue;
};
