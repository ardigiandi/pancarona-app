import { useState } from "react";
import { Link } from "react-router";
import ErrorAlert from "../fragments/ErrorAlert";

export default function AuthLayouts({
  children,
  title,
  description,
  showForgotPassword,
  check,
  isLogin,
  onSubmit,
  type,
  loading,
  error,
  onCheckChange,
}) {
  const [isChecked, setIsClicked] = useState(false);

  const handleCheckbox = (e) => {
    setIsClicked(e.target.checked);
    if (onCheckChange) onCheckChange(e.target.checked);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full px-5 lg:px-0">
      <div className="w-full lg:w-[45%] flex flex-col lg:px-25 mt-16 lg:mt-37.5">
        <h1 className="text-2xl font-medium tracking-tightest">{title}</h1>
        <p className="text-sm text-abu mt-4">{description}</p>

        <div className="mt-8">{error && <ErrorAlert message={error} />}</div>

        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-8 mt-10">
            {children}
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input
                  onChange={handleCheckbox}
                  checked={isChecked}
                  name="check"
                  id="check"
                  type="checkbox"
                  className="w-5 h-5"
                />
                <h1 id="check" className="text-sm tracking-tightest">{check}</h1>
              </div>
              {showForgotPassword && (
                <p className="text-sm tracking-tightest">Forget Password?</p>
              )}
            </div>

            <div>
              <button
                type={type}
                disabled={loading}
                className="text-center p-3.5 bg-maroon w-full rounded-full text-white"
              >
                {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
              </button>
              <p className="text-center m-6">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  to={isLogin ? "/auth/signup" : "/auth/signin"}
                  className="text-maroon"
                >
                  {isLogin ? " Sign Up" : " Sign In"}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full hidden lg:flex lg:w-[55%] gap-2.5">
        <div className="flex flex-col gap-2.5">
          <img src="../assets/frame1.png" alt="" />
          <img src="../assets/frame2.png" alt="" />
        </div>
        <div className="flex flex-col gap-2.5">
          <img src="../assets/frame3.png" alt="" />
          <img src="../assets/frame4.png" alt="" />
        </div>
      </div>
    </div>
  );
}
