import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  align-items: center;
  justify-content: center; 
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  position: relative;

  h2 {
    color: #3AAF85;
    text-align: center;
    font-size: 24px;
    font-family: 'Light';
    margin-top: -25px;
  }

  .step-indicator {
    background: #D9D9D9;
    border-radius: 10px;
    color: white;
     margin: 10px auto; 
    font-size: 14px;
    display: inline-block;
    width: 52px;
    height: 22px;
  }

  .prev-button {
    position: absolute;
    left: 10px;
    top: 15px;
    font-size: 24px;
    color: black;
    cursor: pointer;
  }

  .input-group {
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
  }

  input[type="text"], input[type="date"], button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #F5F5F5;
    font-size: 14px;
    height: 50px;
    box-sizing: border-box;
  }

  label {
    color: #3AAF85;
  }

  button {
    background-color: #3AAF85;
    color: white;
    cursor: pointer;
    margin: 10px 0;
    height: 50px;
    width: 100%;
    border: none;
    border-radius: 10px;
  }
`;

const Instructions = styled.p`
  color: #333;
  margin: 9px 0;
  line-height: 1.2;
  font-family: 'Normal';
  font-size: 16px;
  text-align: center;
  white-space: nowrap; 
`;

const PersonalInfoForm = ({ name, setName, contact, setContact, birthdate, setBirthdate, handleSignup, handlePrevStep }) => (
  <FormContainer>
    <div className="prev-button" onClick={handlePrevStep}>{"<"}</div>
    <h2>회원가입</h2>
    <div className="step-indicator">3/3</div>
    <Instructions>
      기본 인적사항을 정확히 입력해주세요.<br />
      이 정보는 끼적의 이력서 등에 자동으로 기입됩니다.
    </Instructions>
    <div className="input-group">
      <label htmlFor="name">이름</label>
      <input
        id="name"
        type="text"
        placeholder="실명을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="input-group">
      <label htmlFor="contact">연락처</label>
      <input
        id="contact"
        type="text"
        placeholder="000-0000-0000"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
    </div>
    <div className="input-group">
      <label htmlFor="birthdate">생년월일</label>
      <input
        id="birthdate"
        type="date"
        placeholder="0000-00-00"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
    </div>
    <button onClick={handleSignup}>완료</button>
  </FormContainer>
);

export default PersonalInfoForm;



