import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import { FunctionComponent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserData } from "../App";
import User from "../interfaces/User";
import { sucessMsg } from "../services/feedbacks";
import { createUser } from "../services/UserService";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  let navigate = useNavigate();
  let [showPass, setShowPass] = useState<boolean>(false);
  let { setIsLoggedIn, setUserId } = useContext(UserData);
  let formik = useFormik({
    initialValues: { name: "", email: "", password: "", biz: false },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit(values: User) {
      createUser(values)
        .then((res) => {
          let payload: { _id: string; biz: boolean } = jwtDecode(res.data);
          payload.biz ? navigate("/mycards") : navigate("/allcards");
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              isLoggedIn: true,
              token: res.data,
            })
          );
          sucessMsg("Welcome! you successfully registred.");
          setIsLoggedIn(true);
          setUserId(payload._id);
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <h1 className="text-center my-4">SIGN UP</h1>
      <div className="container col-10 col-lg-8 col-xl-4">
        <form onSubmit={formik.handleSubmit}>
          {/* name input */}
          <div className="form-floating mb-3">
            <input
              name="name"
              type="text"
              className={
                formik.touched.name
                  ? formik.errors.name
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Name</label>

            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          {/* email input */}
          <div className="form-floating mb-3">
            <input
              name="email"
              type="text"
              className={
                formik.touched.email
                  ? formik.errors.email
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>

            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          {/* password input */}
          <div className="form-floating mb-3">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className={
                formik.touched.password
                  ? formik.errors.password
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              className="fa-solid fa-eye"
              onClick={() => setShowPass(!showPass)}
            ></i>
            <label htmlFor="floatingInput">Password</label>

            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
            {/* isAdmin check Box */}
            <div className="form-check mt-2">
              <input
                name="isAdmin"
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onClick={() => (formik.values.biz = !formik.values.biz)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I Want a businness account
              </label>
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="w-100 btn mt-3 btn-biz text-start d-flex align-items-center"
              // add more padding specific to this button because of the length of the word "Register" when it slidees
              style={{ paddingRight: "9.5rem" }}
              disabled={!formik.dirty || !formik.isValid}
            >
              <div className="login-arrow d-flex">
                <i className="fa-solid fa-circle-chevron-right me-1"></i>
                <p className="login-text">Register</p>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
