import { isPending } from "../../components/store/actions/todoActions";
import { toast } from "react-toastify";

const fetchUploadFiles = async (api_key, token, file, location, dispatch) => {
  const Api = process.env.REACT_APP_API;
  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", api_key);
  myHeaders.append("Authorization", "Bearer " + token);
  // Ensure file is a Blob or File
  if (!(file instanceof Blob)) {
    toast.error("Invalid file type. Please upload a valid file file.", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return null;
  }
  const formdata = new FormData();
  formdata.append("file", file, file?.name);
  formdata.append("location", location);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  dispatch(isPending(true));
  try {
    const response = await fetch(Api + "upload_files", requestOptions);
    const result = await response.text();
    const jsonResponse = JSON.parse(result);

    if (jsonResponse?.statusCode === 200) {
      return jsonResponse.data;
    } else {
      toast.error(jsonResponse.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default fetchUploadFiles;
