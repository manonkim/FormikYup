import * as React from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegisterPage.scss";
import axios from "axios";

function RegisterPage() {
  const validate = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(5, "Must be 5 characters or more")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and policy"),
  });

  const handleOnSubmit = async (values, actions) => {
    await axios
      .post("http://localhost:3000/users", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        actions.setSubmitting(false);
        alert("Thanks for signing up");

        axios
          .post("localhost:3000/auth", {
            email: values.email,
          })
          .then((res) => {
            if (!res.status === 201) throw new Error("error message");
            console.log("email sending");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          actions.resetForm();
          alert(`User elready exist`);
        } else {
          actions.resetForm();
          alert(`Failed to sign up please try again`);
        }
      });
  };

  const TextField = ({ label, ...props }) => {
    const [Field, meta] = useField(props);
    return (
      <div className="mb-4">
        <label htmlFor={Field.name} className="textInput">
          {label}
        </label>
        <input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...Field}
          {...props}
          autoComplete="off"
          placeholder={`Enter ${label}`}
          style={{ fontSize: 13 }}
        />
        <ErrorMessage component="div" name={Field.name} className="err" />
      </div>
    );
  };

  const Checkbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <label className="checkboxInput">
        <input type="checkbox" className="abc" {...field} {...props} />
        {children}
        {meta.touched && meta.error ? (
          <div className="err">{meta.error}</div>
        ) : null}
      </label>
    );
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
      }}
      validationSchema={validate}
      onSubmit={handleOnSubmit}
    >
      {(formik) => (
        <div className="wrap">
          <div className="box">
            <h4 className="title">Create New Account</h4>
            <Form>
              <TextField label="Name" name="username" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Checkbox name="acceptedTerms">
                &ensp;I accept the terms and policy
              </Checkbox>

              <button className="btn btn-blue mt-3" type="submit">
                Create Account
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default RegisterPage;
