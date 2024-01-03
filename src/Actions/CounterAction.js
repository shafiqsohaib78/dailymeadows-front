import axios from "axios";
import Swal from "sweetalert2";

export const loadUser = () => (dispatch, getState) => {
  // USER LOADING
  dispatch({ type: "USER_LOADING" });

  //GET token from state
  console.log("load user called");

  const timeoutId = setTimeout(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("_token_auth_user");
      const body = {
        token: `${token}`,
      };
      axios
        .post("http://127.0.0.1:8000/account/refresh/", body)
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: "USER_LOADED",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: "AUTH_ERROR",
          });
        });
    }
  }, 1000);
  return () => clearTimeout(timeoutId);

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
};
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT_USER" });
  window.location.reload();
};

export const login = (data) => (dispatch) => {
  console.log("login called");
  console.log(data);

  // const lastLocation = useLastLocation();
  // console.log(lastLocation);

  axios
    .post("http://127.0.0.1:8000/account/login/", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    .then((res) => {
      localStorage.setItem("latestAction", "Success");
      localStorage.setItem("loginStatus", "200");
      console.log(res.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      window.location.reload();
    })

    .catch((err) => {
      console.log(err.response.data.error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: err.response.data.error,
      });
      dispatch({
        type: "LOGIN_FAIL",
      });
    });

  // window.location.reload();
};
