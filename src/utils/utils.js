import toastr from "toastr";

// base options for toastr
const options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

// toastr for error, warning, info, success
export function handleErrorToastr(error) {
  toastr.options = options;
  toastr.error(error, "Error");
}

export function handleWarningToastr(message) {
  toastr.options = options;
  toastr.warning(message, "Warning");
}

export function handleInfoToastr(message) {
  toastr.options = options;
  toastr.info(message, "Info");
}

export function handleSuccessToastr(message) {
  toastr.options = options;
  toastr.success(message, "Success");
}

export function clearToastr() {
  toastr.clear();
}

// sort function
export const compareSort = key => {
  return function (a, b) {
    if (a[key] < b[key])
      return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };
};
