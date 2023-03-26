import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ModalId } from "./MyCards";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { getCardById, updateCard } from "../services/CardService";
import { sucessMsg } from "../services/feedbacks";

interface EditCardProps {}

const EditCard: FunctionComponent<EditCardProps> = () => {
  let { modalId, setEditModalShow, handleRefresh } = useContext(ModalId);
  let [card, setCard] = useState<Card>({
    name: "",
    description: "",
    address: "",
    phone: "",
    image: "",
  });
  useEffect(() => {
    getCardById(modalId)
      .then((res) => setCard(res.data))
      .catch((err) => console.log(err));
  });
  let formik = useFormik({
    initialValues: {
      name: card.name,
      description: card.description,
      address: card.address,
      phone: card.phone,
      image: card.image,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required().min(2).max(12),
      description: yup.string().required().min(1),
      address: yup.string().required().min(2),
      phone: yup.string().required().min(9).max(10),
      image: yup
        .string()
        .required("image is a required field")
        .url("image must be a valid URL"),
    }),
    onSubmit(values: Card) {
      updateCard(values, modalId)
        .then(() => {
          setEditModalShow(false);
          handleRefresh();
          sucessMsg("Changes saved successfully!");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container">
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
            <label htmlFor="floatingInput">Business Name</label>

            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          {/* description input */}
          <div className="form-floating mb-3">
            <input
              name="description"
              type="text"
              className={
                formik.touched.description
                  ? formik.errors.description
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business description</label>

            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>
          {/* address input */}
          <div className="form-floating mb-3">
            <input
              name="address"
              type="text"
              className={
                formik.touched.address
                  ? formik.errors.address
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Address</label>

            {formik.touched.address && formik.errors.address && (
              <p className="text-danger">{formik.errors.address}</p>
            )}
          </div>
          {/* phone input */}
          <div className="form-floating mb-3">
            <input
              name="phone"
              type="text"
              className={
                formik.touched.phone
                  ? formik.errors.phone
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Phone</label>

            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>
          {/* img input */}
          <div className="form-floating mb-3">
            <input
              name="image"
              type="text"
              className={
                formik.touched.image
                  ? formik.errors.image
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Image</label>

            {formik.touched.image && formik.errors.image && (
              <p className="text-danger">{formik.errors.image}</p>
            )}
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="w-100 btn mt-3 btn-biz text-start d-flex align-items-center"
            style={{ paddingRight: "13rem" }}
            disabled={!formik.dirty || !formik.isValid}
          >
            <div className="login-arrow d-flex">
              <i className="fa-solid fa-circle-chevron-right me-1"></i>
              <p className="login-text">Save Changes</p>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCard;
