import React, {useState, useEffect} from "react"
import SubNav from "../../components/Mypage/SubNav"
import styled from "styled-components"
import axios from "axios"
import { fetchMyinfo, changeMyinfo } from "../../api/Mypage/Myinformation"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    

`

const Top = styled.div`
    width: 464px;
    margin-top: 7px;
    margin-bottim: 31px;
`
const Container2 = styled.div`
    width: 400px;
    margin: 0 auto;
`


const Middle = styled.div`
    width: 400px;

`

const Bottom = styled.div`
    width: 464px;
    height: 196px;
    margin-top: 47px;

`

const Text1 = styled.div`
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const Text2 = styled.div`
    margin-bottom: ${(props) => props.marginBottom};
    color: var(--main-01, #3AAF85);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 32px;
`;

const Input = styled.input`
    height: 50px;
    border-radius: 10px;
    width: 400px;
    background-color: ${(props) => props.backgroundColor || '#F5F5F5'};
    color: ${(props) => props.color || 'black'};
    border: ${(props) => props.border || 'none'};
    border-color: ${(props) => props.borderColor || 'black'};


    padding-left: 20px; /* padding-left 속성 추가 */
    box-sizing: border-box;
`

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 129px;
    margin-left: 102px;
`

const CheckBoxContainer1 = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  margin-left: 52px;
`;

const CheckBoxContainer2 = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const CheckBoxContainer3 = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const CustomCheckBox = styled.input.attrs({ type: 'checkbox' })`
    width: 19px;
    height: 19px;
    border-radius: 4px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: #FFF;
`;

const Button = styled.button`
    width: 400px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    border: none;
    color: #FFF;

    margin-left: 32px;
    margin-top: 34px;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export default function MyInformation() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [allAgreed, setAllAgreed] = useState(false);
    const [agreements, setAgreements] = useState({
        snsAgreed: false,
        emailAgreed:false
    });

    const handleAgreementChange = (event) => {
        const { name, checked } = event.target;

        setAgreements((prevAgreements) => ({...prevAgreements,[name]: checked}));
        const allChecked = Object.values({...agreements, [name]: checked}).every(
            (value) => value === true
        );
        setAllAgreed(allChecked);
    };

    const handleAllAgreementChange = (event) => {
        const { checked } = event.target;
        setAgreements((prevAgreements) =>
          Object.keys(prevAgreements).reduce(
            (newAgreements, agreementKey) => ({
              ...newAgreements,
              [agreementKey]: checked,
            }),
            {}
          )
        );
        setAllAgreed(checked);
      };
    



      useEffect(() => {
        // API 호출을 통해 사용자 정보 가져오기
        const fetchUserInfo = async () => {
          try {
            const data = await fetchMyinfo();
            setEmail(data.email);
            setName(data.name);
            setPhoneNumber(data.phoneNumber);
            setBirthDate(data.birthDate);
            console.log("정보 가져오기 완료: ", data);
          } catch (error) {
            console.error("사용자 정보를 가져오는 중 오류 발생:", error);
          }
        };
    
        fetchUserInfo();
      }, []);

    const handleBirthDateChange = (e) => {
        const input = e.target.value.replace(/-/g, "");
        if (input.length > 8) return;
    
        let formattedInput = input;
        if (input.length > 4) {
          formattedInput = `${input.slice(0, 4)}-${input.slice(4, 6)}`;
        }
        if (input.length > 6) {
          formattedInput = `${formattedInput}-${input.slice(6, 8)}`;
        }
    
        setBirthDate(formattedInput);
      };

      const handleSave = async () => {
        // Determine the marketing agreement value based on the checkboxes
        let marketingAgree;
        if (agreements.snsAgreed && agreements.emailAgreed) {
            marketingAgree = "BOTH";
        } else if (agreements.snsAgreed) {
            marketingAgree = "SMS";
        } else if (agreements.emailAgreed) {
            marketingAgree = "EMAIL";
        } else {
            marketingAgree = "NONE";
        }

        try {
            const response = await changeMyinfo(name, phoneNumber, birthDate, marketingAgree);
            console.log("Response from server:", response);
            alert("수정이 완료되었습니다.");  // Alert message for success

        } catch (error) {
            console.error("Failed to save information:", error);
            alert("수정에 실패했습니다. 다시 시도해주세요.");  // Alert message for failure

        }
    };

    return (
        <Container>
            <SubNav></SubNav>
            <Top>
                <Text1>개인정보 수정</Text1>
                
                    
                    <Container2>
                    <Text2 marginBottom="20px">
                        이메일</Text2>
                    <div style={{ color: '#000', fontFamily: 'Pretendard', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', marginLeft: '20px'}}>
                        {email}
                    </div>
                    
                
                    
                    <Text2 marginBottom="20px">이름</Text2>
                    <div style={{ color: '#000', fontFamily: 'Pretendard', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', marginLeft: '20px'}}>
                        {name}
                    </div>
                    </Container2>
            </Top>
            <Middle>
                <Text2 marginBottom="6px">연락처</Text2>
                <Input width="280px" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                ></Input>
                <Text2 marginBottom="6px">생년월일</Text2>
                <Input width="280px" value={birthDate} onChange={handleBirthDateChange}></Input>

            </Middle>
            <Bottom>
                <Text1>선택약관 동의 변경</Text1>
                <CheckBoxContainer1>
          <CustomCheckBox
            id="agree_check_all"
            name="agree_check_all"
            checked={allAgreed}
            onChange={handleAllAgreementChange}
          />
          <label htmlFor="agree_check_all">광고성 정보 수신 동의</label>
        </CheckBoxContainer1>

        <CheckBoxContainer>
        <CheckBoxContainer2>
          <CustomCheckBox
            id="agree_check_sns"
            name="snsAgreed"
            checked={agreements.snsAgreed}
            onChange={handleAgreementChange}
          />
          <label htmlFor="agree_check_sns">SMS</label>
        </CheckBoxContainer2>
        <CheckBoxContainer3>
          <CustomCheckBox
            id="agree_check_email"
            name="emailAgreed"
            checked={agreements.emailAgreed}
            onChange={handleAgreementChange}
          />
          <label htmlFor="agree_check_email">EMAIL</label>
        </CheckBoxContainer3>
        </CheckBoxContainer>
        
        <Button onClick={handleSave}>저장</Button> {/* 저장 버튼 클릭 시 handleSave 호출 */}
        </Bottom>
        
        </Container>
        
    )
}