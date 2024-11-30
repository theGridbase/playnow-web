import { BaseEntry } from "@/app/_lib/interfaces";
import { Empty } from "antd";
import dynamic from "next/dynamic";

export const COMPONENTS: Record<string, any> = {
  loginAs: dynamic(() => import("@/components/LoginAs/LoginAs")),
  loginStepForm: dynamic(
    () => import("@/components/LoginStepForm/LoginStepForm")
  ),
  forgetPasswordForm: dynamic(
    () => import("@/components/ForgetPasswordForm/ForgetPasswordForm")
  ),
  changePasswordForm: dynamic(
    () => import("@/components/ChangePasswordForm/ChangePasswordForm")
  ),
  registerForm: dynamic(() => import("@/components/RegisterForm/RegisterForm")),
  footer: dynamic(() => import("@/components/Footer/Footer")),
  groundRegistration: dynamic(
    () => import("@/components/GroundRegisteration/GroundRegisteration")
  ),
};

interface Props {
  components: BaseEntry[];
}

export const DynamicImport = ({ components }: Props) => {
  return components.map((entry: BaseEntry, index: number) => {
    const { type, ...rest } = entry;
    const Component = COMPONENTS[entry.type];

    if (Component) {
      return <Component key={index} {...rest} />;
    } else {
      return <Empty description={`No component found with type: ${type}`} />;
    }
  });
};
