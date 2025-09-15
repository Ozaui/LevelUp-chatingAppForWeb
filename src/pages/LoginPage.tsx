import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { loginUser } from "../features/User/userThunk";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchema } from "../schemas/loginPageSchema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values: typeof initialValues) => {
    const resultAction = await dispatch(loginUser(values));

    // Login başarılı ise localStorage'da token saklama
    if (loginUser.fulfilled.match(resultAction)) {
      console.log("Login successful:", resultAction.payload);
    } else {
      console.log("Login failed:", resultAction.payload);
    }
  };

  // Login başarılı ise /chat sayfasına yönlendir
  useEffect(() => {
    if (auth.token) {
      navigate("/chat");
    }
  }, [auth.token, navigate]);

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
                  name="email"
                  placeholder="Email"
                  style={{ width: "100%", padding: "8px" }}
                />
                <ErrorMessage
                  name="email"
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
                  name="password"
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
