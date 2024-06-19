export default function resetFormData(fieldName,formData,setFormData) {
    const datafilter = formData.find((item) => item.name === fieldName);
    if (datafilter) {
      const resetFields = datafilter.fields.map((field) => {
        if (field.type === "input_array") {
          const resetFields1 = field.value.map((field1) => {
            return { ...field1, value: "" };
          });
          return { ...field, value: resetFields1 };
        } else if (field.type === "selection") {
          return { ...field, value: [] };
        } else if (field.type === "multi_selection") {
          return { ...field, value: [] };
        } else if (field.type === "multi_date") {
          return {
            ...field,
            value: {
              startDate: null,
              endDate: null,
            },
          };
        } else {
          return { ...field, value: "", };
        }
      });

      const combinedData = {
        ...datafilter,
        fields: resetFields,
      };
      const updatedFormDataArray = formData.map((item) => {
        if (item.name === combinedData.name) {
          return combinedData;
        } else {
          return item;
        }
      });
      setFormData(updatedFormDataArray);

    } else {
      console.log("Field not found in formData.");
    }
  }