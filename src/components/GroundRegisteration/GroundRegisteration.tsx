"use client";
import { useCallback, useEffect, useState } from "react";
import { message, Progress } from "antd";
import colorVariables from "@/styles/variables.module.scss";
import styles from "@/styles/components/ground.registration.module.scss";
import ChoosePlaceTypes from "./ChoosePlaceTypes";
import AddLocation from "./AddLocation";
import ConfirmLocation from "./ConfirmLocation";
import AddPhotos from "./AddPhotos";
import AddPlaceTitle from "./AddPlaceTitle";
import AddPlacePrice from "./AddPrice";
import AddAmenities from "./AddAmenities";
import AddSlots from "./AddSlots";
import AddBankDetails from "./AddBankDetails";
import { createGround } from "./action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "../context/NotificationContext/NotificationContextProvider";

export default function GroundRegisteration() {
  const { openNotification } = useNotification();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(8);
  const [groundData, setGroundData] = useState<Record<string, any>>({});

  useEffect(() => {
    console.log("GR" , groundData);
    
  }, [groundData])
  // Calculate progress percentage dynamically
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleNext = async (d: Record<string, any>) => {
    setGroundData((prev) => ({ ...prev, ...d }));
    if (currentStep === 8) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSaveGround = async (d: Record<string, any>) => {
    const response:any = await createGround({
      ...groundData,
      ...d,
    });
    if (response.status !== 201) {
      openNotification("error", "Error!", "something went wrong");
      return;
    }

    router.replace("/owner");
  };

  return (
    <div className={styles.groundRegistrationContainer}>
      <Progress
        percent={progressPercent}
        strokeColor={colorVariables.primaryColor}
        style={{ width: "100%" }}
        showInfo={false}
        className="mb-large"
      />
      {/* Amenities Step */}
      {currentStep === 1 && <ChoosePlaceTypes handleNext={handleNext} />}
      {currentStep === 2 && <AddLocation handleNext={handleNext} />}
      {currentStep === 3 && (
        <ConfirmLocation
          location={groundData?.location}
          handleNext={handleNext}
        />
      )}
      {currentStep === 4 && <AddPhotos handleNext={handleNext} />}
      {currentStep === 5 && <AddPlaceTitle handleNext={handleNext} />}
      {/* {currentStep === 6 && <AddPlacePrice handleNext={handleNext} />} */}
      {currentStep === 6 && <AddAmenities handleNext={handleNext} />}
      {currentStep === 7 && <AddSlots handleNext={handleNext} />}
      {currentStep === 8 && (
        <AddBankDetails handleNext={handleNext} save={handleSaveGround} />
      )}
    </div>
  );
  4;
}
