import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import store from "../../components/store";
import {
  isMaintenanceAction,
  isToManyRequestAction,
} from "../../components/store/actions/todoActions";
import { clearLocalStorageAndRedirect } from "../helpers/clearLocalStorageAndRedirect";

const isWebSetting = localStorage.getItem("isWebSetting");
const parseWebSetting = JSON.parse(isWebSetting);

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate =
  parseWebSetting?.date === `${year}-${month}-${day}`
    ? parseWebSetting?.date
    : `${year}-${month}-${day}`;

const apiClient = async ({
  baseurl = "",
  parameter = "",
  apiKey = "",
  token = "",
  method = "GET",
  customHeaders,
  XGORDON,
  body,
}) => {
  const Api = process.env.REACT_APP_API;
  const TokenXGORDON = process.env.REACT_APP_TOKEN_GORDON;

  const originalString = XGORDON + TokenXGORDON + formattedDate;
  const sha256Hash = CryptoJS.SHA256(originalString).toString();

  // const isUser = apiKey !== "" && token !== "";
  const headers = {
    method: apiKey ? "POST" : method,
    headers: {
      'Access-Control-Allow-Origin':'*',
      "Content-Type": "application/x-www-form-urlencoded",
      "Client-Timezone": `${year}-${month}-${day}`,
      ...(token && { Authorization: `Bearer ${token}` }),
      XGORGON: sha256Hash,
      ...customHeaders,
    },
    ...(body && { body: body.toString() }),
  };
  try {
    const response = await fetch(
      `${Api}` + baseurl + (parameter === "" ? "" : "?" + parameter),
      headers,
    );

    const result = await response.json();
    if (response.status === 200 || response.status === 400) {
      if (result.statusCode === 429) {
        store.dispatch(isToManyRequestAction(true));
      } else {
        return { result, statusCode: response.status };
      }
    } else if (response.status === 503) {
      store.dispatch(isMaintenanceAction(true));
    } else if (response.status === 401) {
      if (
        result.msg === "unauthorized access" ||
        result.msg === "Token Expired"
      ) {
        clearLocalStorageAndRedirect();
      } else if (result.msg === "Authentication failed.") {
        toast.error(result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      // Handle other status codes or throw an error
      // throw { result, statusCode: response.status };
    }
  } catch (error) {
    throw error;
  }
};

export { apiClient };
