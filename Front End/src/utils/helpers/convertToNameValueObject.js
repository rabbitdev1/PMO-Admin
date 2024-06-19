import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const convertToNameValueObject = (obj) => {
  const result = {};
  let newObject = [];
  obj.fields.forEach((field) => {
    if (field.type === "selection") {
      const selectedOption = field.options.find(
        (option) => option.value === field.value.value
      );
      result[field.name] = selectedOption ? selectedOption.value : "";
      const filterByTypeSelect = (dataArray, typeSelect) => {
        return dataArray.filter((item) => item.type_select === typeSelect);
      };
      if (field?.field) {
        const filteredArray = filterByTypeSelect(
          field?.field,
          field?.value?.value
        );
        const transformedArray = filteredArray.map((item) => ({
          name: item.name,
          value: item.value,
          type: item.type,
        }));

        transformedArray.forEach((item) => {
          if (item.type === "selection") {
            const modifiedArray = transformedArray.map((item) => {
              return { name: item.name, value: item.value.value };
            });
            newObject = modifiedArray;
          } else {
            newObject = transformedArray;
          }
        });
      }
    } else if (field.type === "multi_selection") {
      const resultArray = field.value.map((item) => {
        return item.quantity
          ? { name: item.value, value: item.quantity }
          : { name: item.value };
      });
      result[field.name] = resultArray;
    } else if (field.type === "input_array") {
      const transformedValues = field.value.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});
      result[field.name] = transformedValues;
    } else if (field.type === "editor") {
      let value = "";
      if (field.value && field.value.getCurrentContent) {
        const contentState = convertToRaw(field.value.getCurrentContent());
        value = draftToHtml(contentState);
      }
      result[field.name] = value;
    } else if (field.type === "multi_date") {
      const dateArray = Object.values(field.value);
      result[field.name] = dateArray;
    } else {
      result[field.name] = field.value;
    }
  });
  return { result, newObject };
};
