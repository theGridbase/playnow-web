import React from "react";
import { Button, Flex, Form, Input } from "antd";
import styles from "@/styles/components/ground.registration.module.scss";
import CustomImage from "../ui/CustomImage/CustomImage";

interface Props {
  handleNext: (d: Record<string, any>) => void;
}

type FieldType = {
  bankName: string;
  accountNumber: string;
};

function AddBankDetails({ handleNext }: Props) {
  const onFinish = async (d: FieldType) => {
    handleNext({ bankDetails: d });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation Failed:", errorInfo);
  };

  return (
    <div className={styles.bankDetails}>
      <Form
        layout="vertical"
        name="bank-detail"
        id="bank-detail-form" // Unique form ID
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.placeTitleForm}
      >
        <Flex align="center" justify="flex-end" >
          <Button
            type="default"
            shape="round"
            size="large"
            className={styles.button}
            htmlType="submit"
            form="bank-detail-form" // Link the button to the form
          >
            Save & Next
          </Button>
        </Flex>

        <h1 className={styles.screenName}>Setup Bank Details</h1>
        <p className={styles.screenDescription}>You can change it any time</p>

        <Flex align="stretch" justify="center" gap={30} wrap>
          <div className={styles.globeImage}>
            <CustomImage name="globe.png" alt="globe" width={622} height={456} />
          </div>
          <div className={styles.bankInfo}>
            <h2>Payment details</h2>
            {/* Bank Name Field */}
            <Form.Item<FieldType>
              label="Bank Name"
              name="bankName"
              rules={[
                { required: true, message: "Please enter the bank name!" },
                {
                  min: 3,
                  message: "Bank name must be at least 3 characters long.",
                },
              ]}
            >
              <Input placeholder="Enter bank name" size="large" />
            </Form.Item>

            {/* Account Number Field */}
            <Form.Item<FieldType>
              label="Account Number"
              name="accountNumber"
              rules={[
                { required: true, message: "Please enter the account number!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Account number must contain only numbers.",
                },
                {
                  min: 8,
                  max: 16,
                  message:
                    "Account number must be between 8 and 16 digits long.",
                },
              ]}
            >
              <Input placeholder="Enter account number" size="large" />
            </Form.Item>
          </div>
        </Flex>
      </Form>
    </div>
  );
}

export default AddBankDetails;
