import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Form değil, useNavigate lazım
import type { AppDispatch, RootState } from "../store/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterSchema } from "../schemas/registerPageSchema";
import { registerUser } from "../features/User/userThunk";
import { useEffect } from "react";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.token) {
      navigate("/login");
    }
  }, [auth.token, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Register
        </h2>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...payload } = values;
            const result = await dispatch(registerUser(payload));

            if (registerUser.fulfilled.match(result)) {
              navigate("/login");
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem" }}>
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    borderRadius: "4px",
                  }}
                />
                <ErrorMessage name="username">
                  {(msg) => (
                    <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.25rem" }}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    borderRadius: "4px",
                  }}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.25rem" }}>
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    borderRadius: "4px",
                  }}
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.25rem" }}>
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    borderRadius: "4px",
                  }}
                />
                <ErrorMessage name="confirmPassword">
                  {(msg) => (
                    <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              {error && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || loading}
                style={{
                  width: "100%",
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  cursor: isSubmitting || loading ? "not-allowed" : "pointer",
                  opacity: isSubmitting || loading ? 0.7 : 1,
                  border: "none",
                }}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
