import React from "react";
import { Button, Flex, Form, Input } from "antd";
import styles from "@/styles/components/ground.registration.module.scss";

interface Props {
  handleNext: (d: Record<string, any>) => void;
  handlePrev: () => void;
}

type FieldType = {
  title: string;
  description: string;
};

export default function AddPlaceTitle({ handleNext, handlePrev}: Props) {
  const onFinish = async (d: FieldType) => {
    handleNext({ ...d });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation Failed:", errorInfo);
  };

  return (
    <div className={styles.placeTitle}>
      <Form
        layout="vertical"
        name="place-title"
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
            htmlType="submit" // Ensure the button submits the form
          >
            Next
          </Button>
        </Flex>
        <h1 className={styles.screenName}>
          Now, let’s give your place a title
        </h1>
        <p className={styles.screenDescription}>Short titles works best</p>
        <div className={styles.formBody}>
          <Form.Item<FieldType>
            label={null}
            name="title"
            rules={[
              { required: true, message: "Please input your place title!" },
              { max: 100, message: "Title must not exceed 100 characters." }, // Added max character limit validation
            ]}
          >
            <Input placeholder="Place title" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label={null}
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your place description!",
              },
              {
                min: 10,
                message: "Description must not be less than 10 characters.",
              }, // Added max character limit validation
              {
                max: 100,
                message: "Description must not exceed 100 characters.",
              }, // Added max character limit validation
            ]}
          >
            <Input
              placeholder="Place Description"
              size="large"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
