"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L, { Control } from "leaflet"; // Import Leaflet Control for typecasting
import { Button, Flex } from "antd";
import { LocationDetails } from "@/app/_lib/interfaces";
import styles from "@/styles/components/ground.registration.module.scss";

interface Props {
  handleNext: (d: Record<string, any>) => void;
  handlePrev: () => void;
}

// Type declaration for GeoSearchControl if TypeScript doesn't recognize it
declare module "leaflet-geosearch" {
  export class GeoSearchControl {
    constructor(options: GeoSearchControlOptions);
  }

  export interface GeoSearchControlOptions {
    provider: any;
    style?: string;
    showMarker?: boolean;
    showPopup?: boolean;
    retainZoomLevel?: boolean;
    autoClose?: boolean;
    searchLabel?: string;
    keepResult?: boolean;
  }
}

const GeoSearch = ({
  setLocationDetails,
}: {
  setLocationDetails: (details: LocationDetails) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        addressdetails: 1,
      },
    });

    // Initialize the GeoSearchControl
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: true,
      retainZoomLevel: false,
      autoClose: true,
      searchLabel: "Enter address",
      keepResult: true,
    });

    // Typecasting to Leaflet.Control
    const control = searchControl as Control;

    map.addControl(control); // Adding the control to the map
    let customMarker: L.Marker | null = null;
    // Listen to the location selection event and update the location details
    map.on("geosearch/showlocation", (event: any) => {
      const address = event?.location?.raw?.address;
      const location = event?.location;
      if (address) {
        setLocationDetails({
          countryCode: address.country_code || "N/A",
          country: address.country || "N/A",
          city: address.city || address.town || address.village || "N/A",
          postalCode: address.postcode || "N/A",
          address: `${address.road || ""} ${
            address.neighbourhood || ""
          }`.trim(),
        });
      }

      // Remove previous marker if it exists
      if (customMarker) {
        map.removeLayer(customMarker);
      }

      // Add a new custom marker
      customMarker = L.marker([location?.y, location?.x], {
        icon: MyCustomIcon,
      }).addTo(map);
    });

    // Cleanup when the component is unmounted
    return () => {
      map.removeControl(control);
      map.off("geosearch/showlocation");
      if (customMarker) {
        map.removeLayer(customMarker);
      }
    };
  }, [map, setLocationDetails]);

  return null;
};

// Custom Icon Component
const MyCustomIcon = L.divIcon({
  html: `<img src="/assets/icons/marker.svg" alt="Marker" width="85" height="85"/>`,

  className: "", // Prevent additional Leaflet styling
  iconSize: [40, 40], // Adjust size
});

const AddLocation = ({ handleNext,handlePrev }: Props) => {
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({});

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.addressStep}>
      
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
          disabled={Object.keys(locationDetails).length === 0 ? true : false}
          onClick={() => handleNext({ location: locationDetails })}
          // onClick={() => setShowDetails(true)}
        >
          Next
        </Button>
      </Flex>
      <h1 className={styles.screenName}>Where is your place located?</h1>
      <div className={styles.mapContainer}>
        <MapContainer
          center={[30.3753, 69.3451]}
          zoom={5}
          style={{ height: "50%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoSearch setLocationDetails={setLocationDetails} />
        </MapContainer>
      </div>
    </div>
  );
};

export default AddLocation;
