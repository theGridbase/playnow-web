import React from "react";
import { Button, Flex, Form, Input,Select, } from "antd";
import styles from "@/styles/components/ground.registration.module.scss";
import Icon from "../ui/Icon/Icon";

interface Props {
  handleNext: (d: Record<string, any>) => void;
}

type FieldType = {
  price: string;
};
const selectBefore = (
  <Select defaultValue="PKR" options={[{value : 'PKR', label : 'Rs.'}]} suffixIcon={<Icon name="downarrow.svg" size="12" />}/>
);

export default function AddPlacePrice({ handleNext }: Props) {
  const onFinish = async (d: FieldType) => {
    handleNext({ price: d.price });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation Failed:", errorInfo);
  };
  

  return (
    <div className={styles.placePrice}>
      <Form
        layout="vertical"
        name="place-price"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.placePriceForm}
      >
        <Flex align="center" justify="flex-end">
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
        <h1 className={styles.screenName}>Now, set your price</h1>
        <p className={styles.screenDescription}>You can change it any time</p>
        <div className={styles.formBody}>
          <Form.Item<FieldType>
            label={null}
            name="price"
            rules={[
              { required: true, message: "Please input your place price!" },
              {
                pattern: /^\d+$/,
                message: "Price must be a valid number.",
              },
              { max: 6, message: "Price must not exceed 6 digits." },
            ]}
          >
            {/* <Input prefix="$" placeholder="Price" size="large" type="number" /> */}
            <Input className={styles.priceInput} addonBefore={selectBefore} addonAfter={"/Hr"} defaultValue="0" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
