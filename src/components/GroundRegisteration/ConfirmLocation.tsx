import React from "react";
import { ConfirmLocationDetails, LocationDetails } from "@/app/_lib/interfaces";

import styles from "@/styles/components/ground.registration.module.scss";
import { Button, Flex, Form, Input } from "antd";

interface Props {
  location: LocationDetails;
  handleNext: (d: Record<string, any>) => void;
  handlePrev: () => void;
}

const labels = {
  // countryCode: "Country Code",
  country: "Country",
  city: "City",
  postalCode: "Postal Code",
  address: "Address",
};

export default function ConfirmLocation({ location, handleNext,handlePrev }: Props) {
  const {countryCode , ...rest} = location
  const onFinish = async (formData: LocationDetails) => {
    handleNext({ location: location });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation Failed:", errorInfo);
  };

  return (
    <div className={styles.confirmAddressStep}>
      <Form
        layout="vertical"
        name="confirm-address"
        initialValues={location} // Default values from props
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.confirmAddressForm}
      >
        <Flex align="center" justify="space-between" className="mb-small">
        <Button
          type="default"
          shape="round"
          size="large"
          className={styles.button}
          onClick={() => handlePrev()}
        >
          Back
        </Button>
          <Button
            type="default"
            shape="round"
            size="large"
            className={styles.button}
            htmlType="submit"
          >
            Next
          </Button>
        </Flex>
        <h1 className={styles.screenName}>Confirm your address</h1>
        <div className={styles.formBody}>
          {Object.keys(rest).map((key) => (
            <Form.Item
              key={key}
              label={labels[key as keyof ConfirmLocationDetails] || key}
              name={key}
              rules={[
                {
                  required: true,
                  message: `${
                    labels[key as keyof ConfirmLocationDetails] || key
                  } is required.`,
                },
                ...(key === "countryCode" ? [] : []),// No specific validation for country code
                ...(key === "postalCode"
                  ? [
                      {
                        pattern: /^[0-9]{4,6}$/, // Optional but validate if provided
                        message: "Postal code must be 4-6 digits.",
                      },
                    ]
                  : []),
              ]}
            >
              <Input
                placeholder={`Enter ${
                  labels[key as keyof ConfirmLocationDetails] || key
                }`}
                size="large"
                maxLength={100} // Character limit of 100
              />
            </Form.Item>
          ))}
        </div>
      </Form>
    </div>
  );
}
