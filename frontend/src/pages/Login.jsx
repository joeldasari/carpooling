import { SignIn } from "@clerk/clerk-react";
const Login = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <SignIn redirectUrl={"/"} />
    </div>
  );
};

export default Login;
