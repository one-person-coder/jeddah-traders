import { toast } from "react-toastify";

const toastSetting = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const ErrorToast = (msg) => {
  toast.error(msg, toastSetting);
};

const SuccessToast = (msg) => {
  toast.success(msg, toastSetting);
};

const InfoToast = (msg) => {
  toast.info(msg, toastSetting);
};

const WarningToast = (msg) => {
  toast.warning(msg, toastSetting);
};

export { SuccessToast, InfoToast, WarningToast, ErrorToast };
