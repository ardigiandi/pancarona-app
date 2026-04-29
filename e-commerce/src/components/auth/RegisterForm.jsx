import { useState } from "react";
import { useNavigate } from "react-router";
import AuthLayouts from "../layouts/AuthLayouts";
import InputField from "../molecule/InputField";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    clearError();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = register(form.name, form.email, form.password);
      setLoading(false);
      if (success) navigate("/auth/signin");
    }, 600);
  };

  return (
    <AuthLayouts
      title="Create Your Account"
      description="Join Pancarona and start your style journey today."
      check="I agree to the Terms and Privacy Policy"
      showForgotPassword={false}
      isLogin={false}
      onSubmit={handleSubmit}
      type="submit"
      loading={loading}
      error={error}
    >
      <InputField
        label="Full Name"
        id="name"
        name="name"
        image="/assets/user.svg"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        showPasswordIcon={false}
      />
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