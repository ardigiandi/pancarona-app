import { useState } from "react";
import Icon from "../atom/Icon";
import IconPassword from "../atom/IconPassword";
import Input from "../atom/Input";
import Label from "../atom/Label";

export default function InputField({
  id,
  label,
  image,
  type,
  placeholder,
  showPasswordIcon,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Icon image={image} />

        <Input
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          {...props}
        />

        {showPasswordIcon && type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            <IconPassword
              img={showPassword ? "/assets/eye.svg" : "/assets/eye-slash.svg"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
