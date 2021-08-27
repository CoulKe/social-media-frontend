import AuthWrapper from "./styles/authStyles";

function AuthLayout({ children }) {
  return (
    <>
      <AuthWrapper>
        <div className="container-wrapper">
          <div className="container">{children}</div>
        </div>
      </AuthWrapper>
    </>
  );
}

export default AuthLayout;
