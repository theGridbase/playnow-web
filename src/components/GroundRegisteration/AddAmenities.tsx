import React, { useCallback, useEffect, useState } from "react";
import { getAllAmenities } from "./action";
import { Button, Flex } from "antd";
import Tile from "../Tile/Tile";
import styles from "@/styles/components/ground.registration.module.scss";

interface Props {
  handleNext: (d: Record<string, any>) => void;
}

function AddAmenities({ handleNext }: Props) {
  const [amenitiesStandout, setAmenitiesStandout] = useState<string[]>([]);
  const [amenitiesUserFav, setAmenitiesUserFav] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getAllAmenities();
      if (response.status === 200) {
        setAmenitiesStandout(response.data?.standOutAmenities);
        setAmenitiesUserFav(response.data?.userFavouritesAmenities);
      }
    })();
  }, []);

  const handleTileSelect = useCallback((_id: string) => {
    setSelectedAmenities((prev) => {
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
    <div className={styles.amenitiesStepSelection}>
      <Flex align="center" justify="flex-end">
        <Button
          type="default"
          shape="round"
          size="large"
          className={styles.button}
          disabled={selectedAmenities.length === 0}
          onClick={() => handleNext({ amenities: selectedAmenities })}
        >
          Next
        </Button>
      </Flex>

      <h1>Tell guests what your place has to offer</h1>
      <p>You can add more amenities after you publish your listing</p>
      <h2 className="mb-small">What about these guests favourites</h2>
      <Flex
        className="mb-large"
        align="center"
        justify="space-evenly"
        gap={20}
        wrap
      >
        {amenitiesUserFav.map((amenity: any) => {
          return (
            <Tile
              _id={amenity._id}
              icon={amenity.icon}
              name={amenity.name}
              onClick={handleTileSelect}
              isSelected={selectedAmenities.includes(amenity._id)}
            />
          );
        })}
      </Flex>

      <h2 className="mb-small">Do you have any standout amenities</h2>
      <Flex align="center" justify="space-evenly" gap={20} wrap>
        {amenitiesStandout.map((amenity: any) => {
          return (
            <Tile
              _id={amenity._id}
              icon={amenity.icon}
              name={amenity.name}
              onClick={handleTileSelect}
              isSelected={selectedAmenities.includes(amenity._id)}
            />
          );
        })}
      </Flex>
    </div>
  );
}

export default AddAmenities;
