import React, { useState } from 'react';
import styled from 'styled-components';
import Agreement from './Agreement';
import AgreementModal1 from './AgreementModal1';
import AgreementModal2 from './AgreementModal2';
import AgreementModal3 from './AgreementModal3';

const StyledButton = styled.button`
  width: 400px;
  height: 50px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  background-color: #3aaf85;
  color: white;
  cursor: pointer;
  font-family: Regular;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  &:hover {
    background: #2a9f72;
  }
`;

const FormContainer = styled.div`
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;

  .agreement {
    display: flex;
    align-items: center;
    margin: 10px 0;
    justify-content: flex-start;
    width: 100%;
    flex-direction: row;
  }

  .agreement input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #e0e0e0;
    border: 1px solid #e0e0e0;
    padding: 9px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  .agreement input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>') no-repeat center center / contain;
    transform: translate(-50%, -50%);
  }

  .agreement input[type='checkbox']:checked {
    background-color: #000;
    border: 1px solid #000;
  }

  .agreement label {
    flex-grow: 1;
    text-align: left;
    white-space: nowrap;
    color: black;
  }

  .agreement .arrow {
    cursor: pointer;
    margin-left: 5px;
  }
`;

const Divider = styled.div`
  width: 395px;
  height: 0px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--gray-03, #D9D9D9);
  margin: 5px auto;
  margin-top: -7px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #333;
text-align: center;
font-family: normal;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-bottom: 30px;
`;

const AllAgreementContainer = styled.div`
  width: 392px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  stroke-width: 1px;
  stroke: var(--gray-03, #D9D9D9);
  margin: 10px 0;

  input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #e0e0e0;
    border: 1px solid #e0e0e0;
    padding: 9px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    margin-right: 10px;
	margin-left: -5px;
    width: 20px;
    height: 20px;
  }

  input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>') no-repeat center center / contain;
    transform: translate(-50%, -50%);
  }

  input[type='checkbox']:checked {
    background-color: #000;
    border: 1px solid #000;
  }

  label {
    flex-grow: 1;
    text-align: left;
    white-space: nowrap;
    color: black;
    font-size: 14px;
  }
`;

const SignupStepOne = ({ agreements1, setAgreements1, agreements2, setAgreements2, agreements3, setAgreements3, handleNextStep }) => {
  const [modalType, setModalType] = useState(null);

  return (
    <FormContainer>
       <Title>
        끼적에 합류할 준비가 거의 완료되었어요! <br />
        원활한 서비스 이용을 위한 약관에 동의해주세요.
      </Title>


      {/* 모두 동의 */}
	    <AllAgreementContainer>
        <input
          type="checkbox"
          checked={agreements1 && agreements2 && agreements3}
          onChange={(e) => {
            const checked = e.target.checked;
            setAgreements1(checked);
            setAgreements2(checked);
            setAgreements3(checked);
          }}
        />
        <label>모두 동의</label>
      </AllAgreementContainer>
      <Agreement
        checked={agreements1}
        setChecked={setAgreements1}
        label="이용약관 동의 (필수)"
        handleModal={() => setModalType(1)}
      />
      <Agreement
        checked={agreements2}
        setChecked={setAgreements2}
        label="개인정보 동의 (필수)"
        handleModal={() => setModalType(2)}
      />
      <Agreement
        checked={agreements3}
        setChecked={setAgreements3}
        label="마케팅 활용 동의 (선택)"
        handleModal={() => setModalType(3)}
      />
      <StyledButton onClick={handleNextStep}>다음</StyledButton>
      {modalType === 1 && <AgreementModal1 />}
      {modalType === 2 && <AgreementModal2 />}
      {modalType === 3 && <AgreementModal3 />}
    </FormContainer>
  );
};

export default SignupStepOne;
