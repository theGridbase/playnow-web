import React from 'react';
import { Col, Row } from 'antd';
import styles from '../../styles/components/mylisting.module.scss';
import CustomImage from '../ui/CustomImage/CustomImage';

const data = [
  {
    title: 'Title goes here',
    address: 'Address goes here',
    img: 'listing1.png', 
  },
  {
    title: 'Title goes here',
    address: 'Address goes here',
    img: 'listing2.png', 
  },
  {
    title: 'Title goes here',
    address: 'Address goes here',
    img: 'listing33.png', 
  },
  {
    title: 'Title goes here',
    address: 'Address goes here',
    img: 'listing33.png', 
  },
  {
    title: 'Title goes here',
    address: 'Address goes here',
    img: 'listing33.png', 
  },
  {
    title: 'Title goes here',
    address: 'Address goes here',
    img: 'listing33.png', 
  },
  
];

const Listings: React.FC = () => {
  return (
    <div className={styles.listingsContainer}>
      <h1>Your listing</h1>
      <p>You can see all your listing here</p>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col  key={index}>
            <div className={styles.listingCard}>
              <div className={styles.imgwrapper}>
                <CustomImage
                  name={item.img}
                  width={355}
                  height={333}
                  alt="lisitng"
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{item.title}</h3>
                <p>{item.address}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Listings;
