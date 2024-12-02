import React from "react";
import { Col, Row } from "antd";
import CustomImage from "../../../../components/ui/CustomImage/CustomImage";
import Header from "@/components/Header/Header";
import { PlayNowApi } from "@/utils/playnow/api";
import { IGround } from "@/app/_lib/interfaces";

import styles from "../../../../styles/components/mylisting.module.scss";

const getData = async () => {
  const api = new PlayNowApi();
  const response = await api.getUserGrounds();
  return response?.data;
};

const Listings: React.FC = async () => {
  const grounds: IGround[] = await getData();

  return (
    <>
      <Header />
      <div className={styles.listingsContainer}>
        <h1>Your listing</h1>
        <p>You can see all your listing here</p>
        {grounds.length > 0 && <Row gutter={[16, 16]}>
          {grounds.map((item, index) => (
            <Col key={index}>
              <div className={styles.listingCard}>
                <div className={styles.imgwrapper}>
                  <CustomImage
                    name={item.images[0]}
                    width={355}
                    height={333}
                    alt="lisitng"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </div>
            </Col>
          ))}
        </Row>}
      </div>
    </>
  );
};

export default Listings;
