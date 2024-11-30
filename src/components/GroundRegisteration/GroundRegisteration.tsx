"use client";
import { useEffect, useState } from "react";
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

export default function GroundRegisteration() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(8);
  const [groundData, setGroundData] = useState<Record<string, any>>({});

  useEffect(() => {
    console.log(groundData);
  }, [groundData]);

  // Calculate progress percentage dynamically
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleNext = async (d: Record<string, any>) => {
    setGroundData((prev) => ({ ...prev, ...d }));
    if (currentStep === 9) {
      const response = await createGround({
        user: session?.user?.profile?.user,
        name: groundData.title,
      });
      message.success("Ground created successfully");
      return;
    }
    setCurrentStep((prev) => prev + 1);
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
      {currentStep === 6 && <AddPlacePrice handleNext={handleNext} />}
      {currentStep === 7 && <AddAmenities handleNext={handleNext} />}
      {currentStep === 8 && <AddSlots handleNext={handleNext} />}
      {currentStep === 9 && <AddBankDetails handleNext={handleNext} />}
    </div>
  );
  4;
}
