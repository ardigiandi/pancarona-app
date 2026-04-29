import { useNavigate } from "react-router";
import AuthLayouts from "../layouts/AuthLayouts";
import InputField from "../molecule/InputField";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function LoginForm() {

  const navigate = useNavigate();
  const {login, error, clearError} = useAuth();

  const [form, setForm] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    clearError();
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(form.email, form.password);
      setLoading(false);
      if(success) navigate("/");
    }, 600);
  }

  return (
    <AuthLayouts
      title="Welcome Back 👋"
      description="Sign in to continue shopping and track your orders."
      check="Keep me signed in"
      showForgotPassword={true}
      isLogin={true}
      path='/auth/signin'
      onSubmit={handleSubmit}
      type="submit"
      error={error}
      loading={loading}
    >
      <InputField
        label="Email Address"
        id="email"
        name="email"
        image="/assets/sms.svg"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="example@email.com"
        showPasswordIcon={false}
      />

      <InputField
        label="Password"
        id="password"
        name="password"
        image="/assets/lock.svg"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••••••"
        showPasswordIcon={true}
      />
    </AuthLayouts>
  );
}
