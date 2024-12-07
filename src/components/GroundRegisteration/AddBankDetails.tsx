import React, { useState } from "react";
import { Button, Flex, Form, Input, Radio, Collapse } from "antd";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "@/styles/components/ground.registration.module.scss";
import CustomImage from "../ui/CustomImage/CustomImage";
import cardValidator from "card-validator";

const { Panel } = Collapse;

interface Props {
  handleNext: (d: Record<string, any>) => void;
  handlePrev: () => void;
  save: (d: Record<string, any>) => void;
}

type FieldType = {
  bankName?: string;
  accountNumber?: string;
  phoneNumber?: string;
};

function AddBankDetails({ handleNext, save, handlePrev }: Props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("bankcard");
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");

  const onFinish = async (d: FieldType) => {
    handleNext({ bankDetails: { ...d, phoneNumber: phoneValue } });
    save({ bankDetails: { ...d, phoneNumber: phoneValue } });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation Failed:", errorInfo);
  };

  const handlePaymentChange = (e: any) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const validateCardNumber = (_: any, value: string) => {
    const numberValidation = cardValidator.number(value);
    if (numberValidation.isValid) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter a valid bank card number!"));
  };

  return (
    <div className={styles.bankDetails}>
      <Form
        layout="vertical"
        name="bank-detail"
        id="bank-detail-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.placeTitleForm}
      >
        <Flex align="center" justify="space-between">
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
            form="bank-detail-form"
          >
            Save & Next
          </Button>
        </Flex>

        <h1 className={styles.screenName}>Setup Bank Details</h1>
        <p className={styles.screenDescription}>You can change it any time</p>

        <Flex align="stretch" justify="center" gap={30} wrap>
          <div className={styles.globeImage}>
            <CustomImage
              name="globe.png"
              alt="globe"
              width={622}
              height={456}
            />
          </div>
          <div className={styles.bankInfo}>
            <h2>Payment details</h2>

            {/* Payment Method Selection */}
            <Form.Item label="Select Payment Method" name="paymentMethod">
              <Radio.Group
                onChange={handlePaymentChange}
                value={selectedPaymentMethod}
              >
                <Radio value="easypaisa">Easypaisa</Radio>
                <Radio value="nayapay">Nayapay</Radio>
                <Radio value="jazzcash">JazzCash</Radio>
                <Radio value="bankcard">BankCard</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Conditional Rendering of Form Fields */}
            {selectedPaymentMethod === "bankcard" && (
              <>
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

                <Form.Item<FieldType>
                  label="Account Number (Bank Card)"
                  name="accountNumber"
                  rules={[
                    { required: true, message: "Please enter the account number!" },
                    { validator: validateCardNumber }, // Use custom card validation
                  ]}
                >
                  <Input placeholder="Enter account number" size="large" />
                </Form.Item>
              </>
            )}

            {["easypaisa", "nayapay", "jazzcash"].includes(
              selectedPaymentMethod
            ) && (
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Enter Phone Number" key="1">
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please enter your phone number!" }]}
                  >
                    <PhoneInput
                      international
                      defaultCountry="PK"
                      value={phoneValue}
                      onChange={setPhoneValue}
                      placeholder="Enter phone number"
                    />
                  </Form.Item>
                </Panel>
              </Collapse>
            )}
          </div>
        </Flex>
      </Form>
    </div>
  );
}

export default AddBankDetails;
