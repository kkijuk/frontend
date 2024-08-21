import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../../pages/History/history.css';
import Edu from './Edu';
import Date from './Date';

const EditItem = ({ data, onCancel, isLastItem, onEdit }) => {
    const [formData, setFormData] = useState({
        category: data.category || '',
        schoolName: data.schoolName || '',
        major: data.major || '',
        admissionDate: data.admissionDate || '',
        graduationDate: data.graduationDate || '',
        state: data.state || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (category) => {
        setFormData((prev) => ({ ...prev, category }));
    };

    const handleStateChange = (state) => {
        setFormData((prev) => ({ ...prev, state }));
    };

    const handleAdmissionDateChange = (admissionDate) => {
        setFormData((prev) => ({ ...prev, admissionDate }));
        console.log("Admission Date:", admissionDate);
    };

    const handleGraduationDateChange = (graduationDate) => {
        setFormData((prev) => ({ ...prev, graduationDate }));
        console.log("Graduation Date:", graduationDate);
    };

    const handleSave = () => {
        if (onEdit) {
            onEdit(formData);  // 최신 formData를 전달
        }
    };

    useEffect(() => {
        console.log("FormData: ", formData);
    }, [formData]);

    return (
        <div style={{ display: 'flex' }}>
            <TimeLine>
                <Oval category={data.category}></Oval>
                <Line category={data.category} isLastItem={isLastItem}></Line>
            </TimeLine>
            <Container>
                <form style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '45px', width: '610px' }}>
                        <Edu name = "category" isLevel="학력구분" onChange={handleCategoryChange} value={formData.category || ''} />
                        <Input
                            name="schoolName"
                            placeholder="학교명(ex.00대학교)"
                            style={{ width: '455px' }}
                            value={formData.schoolName || ''}
                            onChange={handleChange}
                        ></Input>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '45px', width: '610px' }}>
                        <Input
                            name="major"
                            placeholder="전공 및 계열(ex. 00학과 또는 인문계열)"
                            style={{ width: '610px' }}
                            value={formData.major || ''}
                            onChange={handleChange}
                        ></Input>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '45px', width: '610px' }}>
                        <Edu name="state" isLevel="학력상태" onChange={handleStateChange} value={formData.state || ''} />
                        <div style={{ width: '150px' }}>
                            <Date
                                place_holder={"입학연월"}
                                value={formData.admissionDate || ''}
                                onChange={handleAdmissionDateChange}
                            ></Date>
                        </div>

                        <div style={{ width: '10px', height: '45px', top: '-25px', right: '50px' }}>~</div>
                        <div style={{ width: '150px' }}>
                            <Date
                                place_holder={"졸업연월"}
                                value={formData.graduationDate || ''}
                                onChange={handleGraduationDateChange}
                            ></Date>
                        </div>

                        <Button
                            style={{ color: '#FA7C79', border: '1px solid #FA7C79', backgroundColor: '#FFF', marginRight: '5px' }}
                            onClick={onCancel}
                        >
                            삭제
                        </Button>
                        <Button
                            style={{ color: '#FFF', borderColor: '#3AAF85', backgroundColor: '#3AAF85' }}
                            onClick={handleSave}
                        >
                            저장
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default EditItem;

const Container = styled.div`
    width: 610px;
    padding: 30px 0px;
    margin: 15px 0px 50px 0px;
    display: flex;
    justify-content: space-between;
    background-color: #F5F5F5;
    border-radius: 10px;
    padding: 20px;
    font-family: Regular;
`;

const Input = styled.input`
    height: 45px;
    border-radius: 10px;
    background: var(--white, #FFF);
    border: none;
`;

const Button = styled.div`
    width: 65px;
    height: 25px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const TimeLine = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px 70px 0px 30px;
`;

const Oval = styled.div`
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #3AAF85;
`;

const Line = styled.div`
    width: 2px;
    height: 270px;
    border-top: none;
    border-right: none;
    border-bottom: none;
    border-left: ${props => props.isLastItem ? "none" : "2px solid black"};
    margin-left: 10px;
    border-color: #3AAF85;
`;
