import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { loginUser } from "../features/User/userThunk";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchema } from "../schemas/loginPageSchema";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const initialValues = { username: "", password: "" };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(loginUser(values));
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: "10px" }}>
                <Field
                  name="username"
                  placeholder="Username"
                  style={{ width: "100%", padding: "8px" }}
                />
                <ErrorMessage
                  name="username"
                  render={(msg) => (
                    <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                  )}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  style={{ width: "100%", padding: "8px" }}
                />
                <ErrorMessage
                  name="username"
                  render={(msg) => (
                    <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                  )}
                />
              </div>

              <button
                type="submit"
                style={{ width: "100%", padding: "10px", cursor: "pointer" }}
                disabled={isSubmitting || auth.loading}
              >
                {auth.loading ? "Logging in..." : "Login"}
              </button>

              {auth.error && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {auth.error}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
