import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sendAuthNumber, sendPasswordResetEmail } from '../../api/Login/passwordreset';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
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



  .prev-button {
    position: absolute;
    left: 10px;
    margin-top: -480px;
    font-size: 24px;
    color: black;
    cursor: pointer;
  }
`;

const Instructions = styled.p`
  color: #333;
  margin: 9px 0;
  line-height: 1.2;
  font-family: 'Normal';
  font-size: 18px;
  text-align: center;
  white-space: nowrap; 
`;

const EmailDisplay = styled.p`
  color: #3AAF85;
  font-weight: bold;
  margin: 10px 0;
`;

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const CodeInput = styled.input`
  width: 60px;
  height: 88px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 9px;
  font-size: 18px;
  background-color: white;
`;

const TimerAndResendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 50px;
  margin: 10px 0;
`;

const Timer = styled.p`
  color: #3AAF85;
  font-size: 18px;
`;

const ResendButton = styled.button`
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 400px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  background-color: #3AAF85;
  color: white;
  cursor: pointer;
  height: 50px;
`;

const HelpText = styled.p`
  color: #999;
  margin: 20px 0 0;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const EmailVerificationForm = ({
  handleNextStep,
  handleResendCode, 
  handlePrevStep
}) => {
  // 여기서 verificationCode와 setVerificationCode를 관리
  const location = useLocation();
  const email = location.state?.email || '';
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); 
  const [timeExpired, setTimeExpired] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) return prev - 1;
        setTimeExpired(true); 
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = val;
      setVerificationCode(newVerificationCode);

      if (val !== '') {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = '';
      setVerificationCode(newVerificationCode);

      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleConfirmClick = async () => {
    if (timeExpired) {
      setErrorMessage("인증번호가 만료되었습니다. 다시 시도해 주세요.");
    } else if (verificationCode.includes('')) {
      setErrorMessage("인증 번호를 입력하세요.");
    } else {
      try {
        const authNumber = verificationCode.join(''); 
        console.log("전송되는 이메일:", email);
        console.log("전송되는 인증번호:", authNumber);
        // API 요청을 보낸 후 응답 데이터를 변수에 저장합니다.
        const responseData = await sendAuthNumber(authNumber, email); 
        console.log("응답 데이터:", responseData);

        if (responseData === true) {  // API 응답이 true인 경우
          navigate("/mypage/passwordreset", {state: {email}});  // /mypage/passwordreset 페이지로 이동
      } else {
          setErrorMessage("인증 번호가 올바르지 않습니다.");
      }
    } catch (error) {
      setErrorMessage("인증 번호가 올바르지 않습니다.");
    }
  }
};

  const handleResend = async () => {
    try {
      await sendPasswordResetEmail(email); // 이메일 인증 요청 다시 보내기
      setTimeLeft(300); // 타이머 리셋
      setTimeExpired(false); // 만료 상태 리셋
      setErrorMessage('');
    } catch (error) {
      setErrorMessage("이메일 인증 요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <FormContainer>
      <div className="prev-button" onClick={handlePrevStep}>{"<"}</div>
      <h2>비밀번호 재설정</h2>
      <Instructions>
        이메일로 비밀번호 재설정을 위한 인증번호를 발송했습니다.<br />
        받으신 인증번호를 정확하게 입력해주세요.
      </Instructions>
      <EmailDisplay>{email}</EmailDisplay>
      <CodeInputContainer>
        {[...Array(6)].map((_, i) => (
          <CodeInput
            key={i}
            id={`code-input-${i}`}  
            type="text"
            maxLength="1"
            value={verificationCode[i] || ''}
            onChange={(e) => handleInputChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}  
            onFocus={(e) => e.target.select()}  
          />
        ))}
      </CodeInputContainer>
      <TimerAndResendContainer>
        <Timer>인증 유효 시간 {formatTime(timeLeft)}</Timer>
        {timeExpired && (
          <ResendButton onClick={handleResend}>다시 보내기</ResendButton>
        )}
      </TimerAndResendContainer>
      <SubmitButton onClick={handleConfirmClick}>확인</SubmitButton>
      {errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      <HelpText>
        이메일이 확인되지 않는다면 스팸 메일함을 확인해주시고,<br />
        여전히 문제가 발생한다면 끼적에게 문의해주세요.<br />
        kkijuk30@gmail.com
      </HelpText>
    </FormContainer>
  );
};

export default EmailVerificationForm;