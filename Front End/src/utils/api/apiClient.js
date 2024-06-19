import Cookies from "js-cookie";
import { toast } from "react-toastify";
import store from "../../components/store";
import {
    isMaintenanceAction,
    isToManyRequestAction,
} from "../../components/store/actions/todoActions";

const apiClient = async ({
    baseurl = "",
    parameter = "",
    apiKey = "",
    token = "",
    method = "GET",
    customHeaders,
    body,
}) => {
    const Api = process.env.REACT_APP_API;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const headers = {
        method: apiKey ? "POST" : method,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Client-Timezone": timezone,
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(apiKey && { "X-API-Key": `${apiKey}` }),
            ...customHeaders,
        },
        ...(body && { body: body.toString() }),
    };
    try {
        const response = await fetch(
            `${Api}` + baseurl + (parameter === "" ? "" : "?" + parameter),
            headers
        );

        const result = await response.json();
        if (
            response.status === 200 ||
            response.status === 400 ||
            response.status === 404
        ) {
            if (result.statusCode === 429) {
                store.dispatch(isToManyRequestAction(true));
            } else {
                return { result, statusCode: response.status };
            }
        } else if (response.status === 503) {
            store.dispatch(isMaintenanceAction(true));
        } else if (response.status === 401) {
            toast.error(result.msg, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
                Cookies.remove("authApiKey");
                Cookies.remove("authToken");
                Cookies.remove("authData");
                window.location.reload("/");
            }, 500);

        } else {
            // Handle other status codes or throw an error
            // throw { result, statusCode: response.status };
        }
    } catch (error) {
        throw error;
    }
};

export { apiClient };