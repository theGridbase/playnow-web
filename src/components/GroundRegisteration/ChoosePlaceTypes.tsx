import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex } from "antd";
import { getAllPlacesTypes } from "./action";
import { IPlaceType } from "@/app/_lib/interfaces";
import Tile from "../Tile/Tile";
import styles from "@/styles/components/ground.registration.module.scss";

interface Props {
  handleNext: (d: Record<string, any>) => void;
}

export default function ChoosePlaceTypes({ handleNext }: Props) {
  const [placeTypes, setPlaceTypes] = useState<IPlaceType[]>([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getAllPlacesTypes();
      if (response.status === 200) setPlaceTypes(response.data.placeTypes);
    })();
  }, []);

  const handleTileSelect = useCallback((_id: string) => {
    setSelectedPlaceTypes((prev) => {
      if (prev.includes(_id)) {
        // If _id is already in the array, remove it
        return prev.filter((item) => item !== _id);
      } else {
        // If _id is not in the array, add it
        return [...prev, _id];
      }
    });
  }, []);

  return (
    <div className={styles.amenitiesStep}>
      <Flex align="center" justify="flex-end">
        <Button
          type="default"
          shape="round"
          size="large"
          className={styles.button}
          disabled={selectedPlaceTypes.length === 0}
          onClick={() => handleNext({ placeTypes: selectedPlaceTypes })}
        >
          Next
        </Button>
      </Flex>
      <h1 className={styles.screenName}>
        Which of these best describes your place?
      </h1>

      <Flex align="center" justify="flex-start" gap={20} wrap>
        {placeTypes.map((place) => (
          <Tile
            {...place}
            onClick={handleTileSelect}
            isSelected={selectedPlaceTypes.includes(place._id)}
          />
        ))}
      </Flex>
    </div>
  );
}
