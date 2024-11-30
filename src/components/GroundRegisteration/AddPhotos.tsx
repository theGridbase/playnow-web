import { Button, Flex } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import styles from "@/styles/components/ground.registration.module.scss";

const { Dragger } = Upload;

interface Props {
  handleNext: (d: Record<string, any>) => void;
}

export default function AddPhotos({ handleNext }: Props) {
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageBase64, setImageBase64] = useState<string[]>([]); // Store base64 images
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled state

  // Upload configuration
  const props: UploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      // Restrict file size (if required) or type (e.g., image only)
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage;
    },
    onChange(info) {
      const { file, fileList: newFileList } = info;
      if (newFileList.length > 3) {
        // Limit the number of files to 3
        newFileList.shift();
      }
      setFileList(newFileList);

      if (file.status === "done") {
        message.success(`${file.name} file uploaded successfully.`);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }

      // Convert to base64 when an image is uploaded
      if (file.status === "done" && file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          setImageBase64((prevBase64) => [...prevBase64, base64String]);
        };
        reader.readAsDataURL(file.originFileObj);
      }

      // Enable the button if at least one image is uploaded
      setIsButtonDisabled(imageBase64.length === 0 && newFileList.length === 0);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={styles.photosStep}>
      <Flex align="center" justify="flex-end">
        <Button
          type="default"
          shape="round"
          size="large"
          className={styles.button}
          disabled={isButtonDisabled}
          onClick={() => handleNext({ images: imageBase64 })}
        >
          Next
        </Button>
      </Flex>
      <h1 className={styles.screenName}>Add some photos of your place</h1>

      <div className={styles.uploader}>
        <Dragger {...props} fileList={fileList} >
          <p className="ant-upload-drag-icon" style={{margin : '150px 50px'}}>
            <InboxOutlined />
          </p>
        </Dragger>
      </div>
    </div>
  );
}