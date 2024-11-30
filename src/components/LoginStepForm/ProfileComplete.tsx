import React, { useEffect, useState } from "react";
import styles from "@/styles/components/loginstepform.module.scss";
import { Button, Flex, Form, Input, message, Select, Upload } from "antd";
import { createInitialProfile, getProfileExtras } from "./action";
import { IUser, ProfileExtras } from "@/app/_lib/interfaces";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Icon from "../ui/Icon/Icon";
type FieldType = {
  profileImage: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  gender: string;
  interests: string[];
};

interface Props {
  userData: IUser;
}

const getBase64 = (file: File, callback: (result: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result as string);
  reader.onerror = (error) =>
    message.error("Failed to convert image to Base64!");
};

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG files!");
    return Upload.LIST_IGNORE; // Prevent upload
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
    return Upload.LIST_IGNORE; // Prevent upload
  }
  return false; // Stop default upload behavior
};

export default function ProfileComplete({ userData }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profleExtras, setProfileExtras] = useState<ProfileExtras>({
    countries: [],
    cities: [],
    genders: [],
    interests: [],
  });

  useEffect(() => {
    // get country cities gender and interests
    (async () => {
      const response = await getProfileExtras();
      if (response.status === 200 && response.data) {
        setProfileExtras(response.data);
      }
    })();
  }, []);

  const handleChange = (info: any) => {
    const file = info.file;
    getBase64(file, (url) => {
      setImageUrl(url); // Set the Base64 URL for preview
    });
  };

  const onFinish = async (d: FieldType) => {
    setLoading(true);
    const { profileImage, ...rest } = d;
    const payload = {
      email : userData.email,
      profileImage: "N/A",
      ...rest,
    };
    console.log("pa", payload);

    const response = await createInitialProfile(payload);
    if (response.status !== 200) {
      setLoading(false);
      message.error(response.message);
      return;
    }
    const response2 = await signIn("credentials", {
      user: JSON.stringify(userData),
      access_token: response.data.access.token,
      refresh_token: response.data.refresh.token,
      redirect: false,
    });
    setLoading(false);
    if (response2?.status === 200) {
      message.success("successfull login");
      window.location.reload();
      return
    }
    message.error("Inavlid credentials");
  };

  return (
    <div className={styles.stepContainer}>
      <h1 className={styles.stepHeading}>Complete your profile</h1>
      <p className={styles.stepDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        condimentum, lacus
      </p>
      <Form
        layout="vertical"
        name="verify-login"
        className={styles.verifyForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* <Form.Item
          name="profileImage"
          rules={[
            { required: true, message: "Please upload your profile image!" },
          ]}
        >
          <Flex align="center" justify="center">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <div>
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Flex>
        </Form.Item> */}
        <Flex align="center" justify="space-between" gap={10} wrap>
          <Form.Item<FieldType>
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="First Name" size="large" className={styles.signupinput} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Last Name" size="large"  className={styles.signupinput} />
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between" gap={10} wrap>
          <Form.Item<FieldType>
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
            style={{ flex: 1 }}
          >
            <Select
              size="large"
              placeholder="Country"
              suffixIcon={<Icon size="12" name="downarrow.svg"/>}

              options={profleExtras?.countries.map((e) => ({
                value: e,
                label: e.toLowerCase(),
              }))}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
            style={{ flex: 1 }}
          >
            <Select
              size="large"
              placeholder="City"
              suffixIcon={<Icon size="12" name="downarrow.svg"/>}

              options={profleExtras?.cities.map((e) => ({
                value: e,
                label: e.toLowerCase(),
              }))}
            />
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between" gap={10} wrap>
          <Form.Item<FieldType>
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input your gender!" }]}
            style={{ flex: 1 }}
          >
            <Select
              size="large"
              placeholder="Gender"
              suffixIcon={<Icon size="12" name="downarrow.svg"/>}

              options={profleExtras?.genders.map((e) => ({
                value: e,
                label: e.toLowerCase(),
              }))}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Interests"
            name="interests"
            rules={[
              { required: true, message: "Please input your interests!" },
            ]}
            style={{ flex: 1 }}
          >
            <Select
              size="large"
              mode="multiple"
              suffixIcon={<Icon size="12" name="downarrow.svg"/>}

              placeholder="Interests"
              options={profleExtras?.interests.map((e) => ({
                value: e,
                label: e.toLowerCase(),
              }))}
            />
          </Form.Item>
        </Flex>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            shape="round"
            loading={loading}
            disabled={loading}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
