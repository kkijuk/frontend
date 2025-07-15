import React from "react";
import styled from "styled-components";
import SearchAndSelect from './SearchAndSelect';
import SvgIcon from "@/components/shared/SvgIcon";
import { Button } from "@/components/Home/Profile.styles";
import { ButtonWrapper } from "@/components/Record/readOnlyItems/styles/Career.styles";

const AddQuckCareerDetailModal = ({onClose}) => {
    return (
        <ModalBackground onClick={onClose}>
            <ModalContainer>
                <Header>
                    <CloseButton onClick={onClose}>
                        <SvgIcon name="close" size={20} color="#999" />
                    </CloseButton>
                    <ModalTitle>새로운 활동 기록</ModalTitle>
                </Header>
                <ContentWrapper>
                    <FormItem>
                        <FormTitle>활동</FormTitle>
                        <SearchAndSelect />
                    </FormItem>

                    <FormsWrapper>
                        <FormItem>
                            <FormTitle>제목</FormTitle>
                            <InputForm/>
                        </FormItem>

                        <FormItem>
                            <FormTitle>기간</FormTitle>
                            <InputForm type="date" />
                            <InputForm type="date" />
                        </FormItem>
                    </FormsWrapper>

                    <FormItem>
                        <FormTitle>활동 세부 내용</FormTitle>
                        <InputForm type="text" placeholder="활동에 대한 세부 내용을 입력하세요." />
                    </FormItem>
                </ContentWrapper>
                <ButtonWrapper>
                    <SubmitButton>확인</SubmitButton>
                </ButtonWrapper>
            </ModalContainer>
        </ModalBackground>
    );
}

export default AddQuckCareerDetailModal;