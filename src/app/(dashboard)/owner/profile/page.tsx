"use client"
import React, { useState } from 'react';
import { Button, Input, Row, Col } from 'antd';
import styles from '../../../../styles/components/personalinfo.module.scss';
import Header from "@/components/Header/Header";

interface AccountDetail {
    title: string;
    description: string;
    status: 'edit' | 'add' | 'not-provided';
    isEditing: boolean;
    fields?: { label: string; value: string }[]; // Add fields for each section
}

const AccountDetails: React.FC = () => {
    const [details, setDetails] = useState<AccountDetail[]>([
        {
            title: 'Legal name',
            description: 'Legal name',
            status: 'edit',
            isEditing: false,
            fields: [
                { label: 'First name on ID', value: '' },
                { label: 'Last name on ID', value: '' },
            ],
        },
        {
            title: 'Preferred name',
            description: 'Not provided',
            status: 'add',
            isEditing: false,
        },
        {
            title: 'Phone numbers',
            description: 'Add a number so confirmed guests can stay in touch.',
            status: 'add',
            isEditing: false,
            fields: [
                { label: 'Country code', value: '+92' },
                { label: 'Phone number', value: '' },
            ],
        },
        {
            title: 'Address',
            description: 'Legal name',
            status: 'edit',
            isEditing: false,
        },
    ]);

    const handleEdit = (index: number) => {
        const newDetails = [...details];
        newDetails[index].isEditing = !newDetails[index].isEditing; // Toggle edit mode
        setDetails(newDetails);
    };

    const handleInputChange = (detailIndex: number, fieldIndex: number, value: string) => {
        const newDetails = [...details];
        if (newDetails[detailIndex].fields) {
            newDetails[detailIndex].fields![fieldIndex].value = value; // Update the value of the field
        }
        setDetails(newDetails);
    };

    const handleSave = (index: number) => {
        const newDetails = [...details];
        newDetails[index].isEditing = false; // Exit edit mode after saving
        setDetails(newDetails);
    };

    return (
        <>
            <Header />
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
                                {detail.isEditing && detail.fields && (
                                    <div className={styles.editSection}>
                                        <div className={styles.flexContainer}>
                                            {detail.fields.map((field, fieldIndex) => (
                                                <div key={fieldIndex} className={styles.fieldGroup}>
                                                    <label>{field.label}</label>
                                                    <Input
                                                        value={field.value}
                                                        onChange={(e) =>
                                                            handleInputChange(index, fieldIndex, e.target.value)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            type="primary"
                                            className={styles.savebtn}
                                            onClick={() => handleSave(index)}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                )}
                            </Col>
                            <Col span={6} className={styles.actions}>
                                {detail.status === 'edit' ? (
                                    <Button className={styles.addbtn} onClick={() => handleEdit(index)}>
                                        {detail.isEditing ? 'Cancel' : 'Edit'}
                                    </Button>
                                ) : (
                                    <Button className={styles.addbtn} onClick={() => handleEdit(index)}>Add</Button>
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
