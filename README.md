# React Formik

**Features**

- Easily composable set of helpers
- Connects your React input to Formik with no boilerplate

The point is to make your forms easy to write and provide features your users will expect with code as small as:

```javascript
  <TextField label="Name" name="username" type="text" />
  <TextField label="Email" name="email" type="email" />
  <TextField label="Password" name="password" type="password" />
  <TextField label="Confirm Password" name="confirmPassword" type="password"/>
```

# Yup

Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both.

## Usage

```js
import * as Yup from "yup";

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
```
