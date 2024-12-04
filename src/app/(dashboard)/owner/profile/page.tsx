
"use client"
import React, { useState } from 'react';
import { Button, Input, Row, Col } from 'antd';
import styles from '../../../../styles/components/personalinfo.module.scss';
import Header from "@/components/Header/Header";

interface AccountDetail {
    title: string;
    description: string;
    status: 'edit' | 'add' | 'not-provided';
}

const AccountDetails: React.FC = () => {
    const [details, setDetails] = useState<AccountDetail[]>([
        { title: 'Legal name', description: 'Legal name', status: 'edit' },
        { title: 'Preferred name', description: 'Not provided', status: 'add' },
        { title: 'Phone numbers', description: 'Add a number so confirmed guests can stay in touch.', status: 'add' },
        { title: 'Address', description: 'Legal name', status: 'edit' },
    ]);

    const handleEdit = (index: number) => {
        const newDetails = [...details];
        newDetails[index].status = 'edit';
        setDetails(newDetails);
    };

    const handleAdd = (index: number) => {
        const newDetails = [...details];
        newDetails[index].status = 'edit';
        setDetails(newDetails);
    };

    return (
        <>
        <Header/>
        <div className={styles.container}>
            <h1>Personal Info</h1>
            <div className={styles.detailsList}>
                {details.map((detail, index) => (
                    <Row key={index} className={styles.detailRow}>
                        <Col span={18}>
                            <div className={styles.detailText}>
                                <p className={styles.title}>{detail.title}</p>
                                <p className={styles.description}>{detail.description}</p>
                            </div>
                        </Col>
                        <Col span={6} className={styles.actions}>
                            {detail.status === 'edit' ? (
                                <Button className={styles.addbtn} onClick={() => handleEdit(index)}>Edit</Button>
                            ) : (
                                <Button className={styles.addbtn} onClick={() => handleAdd(index)}>Add</Button>
                            )}
                        </Col>
                    </Row>
                ))}
            </div>
        </div>
        </>
    );
};

export default AccountDetails;
