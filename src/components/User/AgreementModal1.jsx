import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
	display: ${(props) => (props.show ? 'block' : 'none')};
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 1000;

	.modal-content {
		background-color: #fefefe;
		border-radius: 10px;
		margin: 5% auto;
		padding: 20px;
		border: 2px solid #FFF;
		width: 540px;
		max-height: 80vh; /* 변경: 모달 콘텐츠 최대 높이 */
		overflow-y: auto; /* 변경: 내부 스크롤 활성화 */
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
	}

	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
		cursor: pointer;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
	}

	h2 {
		color: #000;
		font-family: Pretendard;
		font-size: 22px;
		font-weight: 600;
	}

	p {
		color: #707070;
		font-family: Pretendard;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.5;
	}
`;


const AgreementModal = ({ show, handleModal }) => (
	<StyledModal show={show}>
		<div className="modal-content">
			<span className="close" onClick={handleModal}>
				&times;
			</span>
			<h2>이용약관</h2>
			<p>
				제 1 조 (목적)
				<br />본 약관은 팀 끼적(이하 "회사")이 운영하는 "서비스"를 이용함에 있어 "회사"와 회원간의 이용 조건 및 제반
				절차, 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 한다.
			</p>
			<p>
				제 2 조 (용어의 정의)
				<br />
				이 약관에서 사용하는 용어의 정의는 아래와 같다.
				<br />
				① "사이트"라 회사가 서비스를 제공하기 위해 운영하는 사이트로 'https://www.kkijuk.com/'를 말한다.
				<br />
				② "서비스"라 함은 회사가 운영하는 사이트에서 제공하는 모든 서비스를 말한다.
				<br />
				③ "회원"이라 함은 "회사"가 제공하는 서비스를 이용하거나 이용하려는 자로, 회원가입 절차를 거쳐 회원가입확인
				이메일 등을 통해 회사로부터 회원으로 인정받은 "개인회원"을 말한다.
				<br />
				④ "아이디"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 선정하고 회사가 승인한 이메일을 말한다.
				<br />⑤ "비밀번호"라 함은 위 제4항에 따라 회원이 회원가입시 아이디를 설정하면서 아이디를 부여받은 자와
				동일인임을 확인하고 "회원"의 권익을 보호하기 위하여 "회원"이 선정한 문자와 숫자의 조합을 말한다.
			</p>
			<p>
				제 3 조 (약관의 명시와 개정)
				<br />
				① "회사"는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 "회원"이 알 수
				있도록 초기 화면에 게시하거나 기타의 방법으로 "회원"에게 공지해야 한다.
				<br />
				② "회사"는 약관의 규제에 관한 법률, 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한
				법률 등 관련법을 위반하지 않는 범위에서 이 약관을 개정할 수 있다.
				<br />
				③ "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 그 개정약관의 적용일자 7일
				전부터 적용일자 전일까지 공지한다. 단 "회원"의 권리, 의무에 중대한 영향을 주는 변경의 경우에는 적용일자 30일
				전부터 공지하도록 한다.
				<br />④ "회원"은 변경된 약관에 대해 거부할 권리가 있다. "회원"은 변경된 약관이 공지된 지 15일 이내에 거부의사를
				표명할 수 있다. "회원"이 거부하는 경우 본 서비스 제공자인 "회사"는 15일의 기간을 정하여 "회원"에게 사전 통지 후
				당해 "회원"과의 계약을 해지할 수 있다. 만약, "회원"이 거부의사를 표시하지 않거나, 전항에 따라 시행일 이후에
				"서비스"를 이용하는 경우에는 동의한 것으로 간주한다.
			</p>
			<p>
				제 4 조 (약관의 해석)
				<br />
				① 이 약관에서 규정하지 않은 사항에 관해서는 약관의 규제에 관한 법률, 전기통신기본법, 전기통신사업법, 정보통신망
				이용촉진 및 정보보호 등에 관한 법률 등의 관계법령에 따른다.
				<br />
				② 각 사이트 및 서비스 이용약관이 있는 경우에는 서비스 이용약관이 우선한다.
				<br />③ "회원"이 "회사"와 개별 계약을 체결하여 서비스를 이용하는 경우에는 개별 계약이 우선한다.
			</p>
			<p>
				제 5 조 (이용계약의 성립)
				<br />
				① "회사"의 서비스 이용계약(이하 "이용계약")은 서비스를 이용하고자 하는 자가 본 약관과 개인정보처리방침을 읽고
				"동의" 또는 "확인" 버튼을 누른 경우 본 약관에 동의한 것으로 간주한다.
				<br />② "회원"이 이용신청(회원가입 신청) 작성 후에 "회사"가 웹상의 안내 및 전자메일로 "회원"에게 통지함으로써
				이용계약이 성립된다.
			</p>
			<p>
				제 6 조 (이용신청의 승낙과 제한)
				<br />
				① "회사"는 전조의 규정에 의한 이용신청 고객에 대하여 업무수행상 또는 기술상 지장이 없는 경우에는 원칙적으로
				접수순서에 따라 서비스 이용을 승낙한다.
				<br />
				② "회사"는 아래사항에 해당하는 경우에 대해서는 서비스 이용신청을 승낙하지 아니한다.
				<br />
				1. "회사"가 제시하는 내용을 기재하지 않은 경우
				<br />
				2. 신청 내용이 허위인 것으로 판명 되거나, 그러하다고 의심할 만한 합리적인 사유가 발생할 경우
				<br />
				3. 기술상 장애 사유가 있는 경우
				<br />
				4. 기타 회사가 필요하다고 판단하는 경우
				<br />
				③ "회사"는 아래사항에 해당하는 경우에는 그 신청에 대하여 승낙제한 사유가 해소될 때까지 승낙을 유보할 수 있다.
				<br />
				1. 이미 가입된 회원과 이메일 주소가 동일한 경우
				<br />
				2. 다른 사람의 명의를 사용하여 신청하였을 경우
				<br />
				3. 기타 "회사"의 귀책사유로 이용승낙이 곤란한 경우
			</p>
			<p>
				제 7 조 (서비스의 내용)
				<br />
				① "회사"는 제2조 2항의 서비스를 제공할 수 있으며 그 내용은 다음 각 호와 같다.
				<br />
				1. 경험 기록과 관련된 제발 서비스
				<br />
				2. 이력서 등록 및 추출 서비스
				<br />
				3. 구직과 관련된 제반 서비스
				<br />
				4. 기타"회사"가 추가 개발, 편집, 재구성하거나 제휴계약 등을 통해 “회원”에게 제공하는 일체의 서비스
				<br />② "회사"는 필요한 경우 서비스의 내용을 추가 또는 변경할 수 있다. 단, 이 경우 "회사"는 추가 또는 변경내용을
				"회원"에게 공지해야 한다.
			</p>
			<p>
				제 8 조 (회원, 이력서 및 게시물 등의 정보)
				<br />
				① "회원"의 이력서는 개인이 회원가입 또는 이력서 작성 및 수정시 희망한 형태로 등록 및 제공된다.
				<br />
				②"회사"는 안정적인 서비스를 제공하기 위해 테스트 및 모니터링 용도로 "사이트" 운영자가 이력서 및 게시물 등의
				정보를 열람하도록 할 수 있다.
				<br />③ "회사"는 "회원"의 선택에 의하여 등록 및 제공되는 이력서 및 게시물 등의 정보를 기준으로 구직활동에 보다
				유익한 서비스를 제공하기 위하여 이를 개발, 편집, 재구성한 통계 자료로 활용 할 수 있다.
			</p>
			<p>
				제 9 조 (서비스의 요금)
				<br />
				① "회원" 가입과 이력서 등록은 무료이다. 다만 회원 가입 목적 외 기타 서비스를 이용하기 위한 별도의 서비스는 추후
				유료로 제공될 수 있다.
				<br />
				② "회사"는 유료서비스를 제공할 경우 사이트에 요금에 대해서 공지를 하여야 한다.
				<br />③ "회사"는 유료서비스 이용금액을 서비스의 종류 및 기간에 따라 "회사"가 예고 없이 변경할 수 있다. 다만,
				변경 이전에 적용 또는 계약한 금액은 소급하여 적용하지 아니한다.
			</p>
			<p>
				제 10 조 (서비스 요금의 환불)
				<br />
				① "회사"는 다음 각 호에 해당하는 경우 이용요금을 환불한다. 단, 각 당사자의 귀책사유에 따라 환불 조건이 달라질 수
				있다.
				<br />
				1. 유료서비스 이용이 개시되지 않은 경우
				<br />
				2. 네트워크 또는 시스템 장애로 서비스 이용이 불가능한 경우
				<br />
				3. 유료서비스 신청 후 “회원”의 사정에 의해 서비스가 취소될 경우
				<br />
				② "회사"가 본 약관 제19조에 따라 가입해지/서비스중지/자료삭제를 취한 경우, “회사”는 “회원”에게 이용요금을
				환불하지 않으며, 별도로 “회원”에게 손해배상을 청구할 수 있다.
				<br />
				③ 이용료를 환불받고자 하는 회원은 고객센터로 환불을 요청해야 한다.
				<br />④ "회사"는 환불 요건에 부합하는 것으로 판단될 경우, 각 서비스 환불 안내에 따라 유료이용 계약 당시 상품의
				정가 기준으로 서비스 제공된 기간에 해당하는 요금을 차감한 잔액을 환불한다.
			</p>
			<p>
				제 11 조 (서비스 이용시간)
				<br />
				① "회사"는 특별한 사유가 없는 한 연중무휴, 1일 24시간 서비스를 제공한다. 다만, "회사"는 서비스의 종류나 성질에
				따라 제공하는 서비스 중 일부에 대해서는 별도로 이용시간을 정할 수 있으며, 이 경우 "회사"는 그 이용시간을 사전에
				"회원"에게 공지 또는 통지하여야 한다.
				<br />② "회사"는 자료의 가공과 갱신을 위한 시스템 작업시간, 장애해결을 위한 보수작업 시간, 정기 PM작업, 시스템
				교체작업, 회선 장애 등이 발생한 경우 일시적으로 서비스를 중단할 수 있으며 계획된 작업의 경우 공지란에 서비스
				중단 시간과 작업 내용을 알려야 한다. 다만, "회사"가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에
				통지할 수 있다.
			</p>
			<p>
				제 12 조 (서비스 제공의 중지)
				<br />
				① "회사"는 다음 각 호에 해당하는 경우 서비스의 제공을 중지할 수 있다.
				<br />
				1. 설비의 보수 등 "회사"의 필요에 의해 사전에 "회원"들에게 통지한 경우
				<br />
				2. 기간통신사업자가 전기통신서비스 제공을 중지하는 경우
				<br />
				3. 기타 불가항력적인 사유에 의해 서비스 제공이 객관적으로 불가능한 경우
				<br />② 전항의 경우, "회사"는 기간의 정함이 있는 유료서비스 이용자들에게는 그 이용기간을 연장하거나 환불 등의
				방법으로 손실을 보상하여야 한다.
			</p>
			<p>
				제 13 조 (정보의 제공 및 광고의 게재)
				<br />
				① "회사"는 "회원"에게 서비스 이용에 필요가 있다고 인정되거나 서비스 개선 및 회원대상의 서비스 소개 등의 목적으로
				하는 각종 정보에 대해서 전자우편이나 서신우편을 이용한 방법으로 제공할 수 있다.
				<br />
				② "회사"는 제공하는 서비스와 관련되는 정보 또는 광고를 서비스 화면, 홈페이지, 전자우편 등에 게재할 수 있으며,
				광고가 게재된 전자우편을 수신한 "회원"은 수신거절을 "회사"에게 할 수 있다.
				<br />
				③ "회사"는 서비스상에 게재되어 있거나 본 서비스를 통한 광고주의 판촉활동에 "회원"이 참여하거나 교신 또는 거래를
				함으로써 발생하는 모든 손실과 손해에 대해 책임을 지지 않는다.
				<br />④ 본 서비스의 "회원"은 서비스 이용 시 노출되는 광고게재에 대해 동의 하는 것으로 간주한다.
			</p>
			<p>
				제 14 조 (자료내용의 책임과 "회사"의 정보 수정 권한)
				<br />
				① 자료내용은 "회원"이 등록한 개인정보 및 이력서와 사이트에 게시한 게시물을 말한다.
				<br />
				② "회원"은 자료 내용 및 게시물을 사실에 근거하여 성실하게 작성해야 하며, 만일 자료의 내용이 사실이 아니거나
				부정확하게 작성되어 발생하는 모든 책임은 "회원"에게 있다. "회사"는 "회원"이 작성한 게시물 등의 정확성 및
				진실성을 보증하지 아니하며, 게시물에 대한 일체의 책임을 부담하지 아니한다.
				<br />
				③ 모든 자료내용의 관리와 작성은 "회원" 본인이 하는 것이 원칙이나 사정상 위탁 또는 대행관리를 하더라도 자료내용의
				책임은 "회원"에게 있으며 "회원"은 주기적으로 자신의 자료를 확인하여 항상 정확하게 관리가 되도록 노력해야 한다.
				<br />
				④ "회사"는 "회원"이 등록한 자료 내용에 오자, 탈자 또는 사회적 통념에 어긋나는 문구와 내용이 있을 경우 이를
				언제든지 수정할 수 있다.
				<br />⑤ "회원"이 등록한 자료으로 인해 타인(또는 타법인)으로부터 허위사실 및 명예훼손 등으로 삭제 요청이 접수된
				경우 "회사"는 "회원"에게 사전 통지 없이 본 자료를 삭제할 수 있으며 삭제 후 메일 등의 방법으로 통지할 수 있다.
			</p>
			<p>
				제 15 조 (자료 내용의 활용 및 취급)
				<br />
				① "회원"이 선택하거나 입력한 정보는 취업 및 관련 동향의 통계 자료로 구성, 활용될 수 있으며 그 자료는 매체를 통한
				언론 배포 또는 제휴사에게 제공될 수 있다. 단, 개인을 식별할 수 있는 형태가 아니어야 한다.
				<br />
				② 제8조 제3항에 따라 "사이트"에서 정당한 절차를 거쳐 기업회원, 서치펌회원이 열람한 "회원"의 이력서 정보는 해당
				기업의 인사자료이며 이에 대한 관리 권한은 해당 기업의 정책에 의한다.
				<br />
				③ "회사"는 채용정보에 입사지원한 구직자들의 각종 통계데이터를 "회원"에게 제공할 수 있다.
				<br />
				④ "회원"이 사이트에 게시한 게시물(게시물에 대한 댓글, 사진, 각종 파일을 포함하며, 이하 "자료내용")은 "회사"가
				서비스 홍보 목적을 위해 활용할 수 있다.
				<br />
				⑤ "자료내용"의 저작권은 해당 "자료내용"의 저작자에게 귀속된다. 다만 "회원"은 서비스를 통해 "자료내용"을
				게시함으로써 "회사"에 대하여 이에 대한 이용, 복사, 복제, 처리, 각색, 변경, 공개, 전송, 게재 또는 배포할 수 있는
				독점적이며 무상의 이용권한(2차적 저작물을 작성할 수 있는 권리 포함)을 부여한 것으로 간주된다.
				<br />⑥ "자료내용"은 검색결과 내지 서비스 및 관련 프로모션 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위
				내에서는 일부 수정, 복제, 편집되어 게시될 수 있다. 이 경우, "회사"는 저작권법 규정을 준수하며, "회원"은 언제든지
				해당 "자료내용"에 대해 삭제, 비공개 등을 요구할 수 있다.
			</p>
			<p>
				제 16 조 ("회사"의 의무)
				<br />
				① "회사"는 본 약관에서 정한 바에 따라 계속적, 안정적으로 서비스를 제공할 수 있도록 최선의 노력을 다해야 한다.
				<br />
				② "회사"는 서비스와 관련한 "회원"의 불만사항이 접수되는 경우 이를 즉시 처리하여야 하며, 즉시 처리가 곤란한
				경우에는 그 사유와 처리일정을 서비스 화면 또는 기타 방법을 통해 동 "회원"에게 통지하여야 한다.
				<br />
				③ "회사"는 유료 결제와 관련한 결제 사항 정보를 1년 이상 보존한다. 다만 회원 자격이 없는 회원은 예외로 한다.
				<br />
				④ 천재지변 등 예측하지 못한 일이 발생하거나 시스템의 장애가 발생하여 서비스가 중단될 경우 이에 대한 손해에
				대해서는 "회사"가 책임을 지지 않는다. 다만 자료의 복구나 정상적인 서비스 지원이 되도록 최선을 다할 의무를 진다.
				<br />⑤ "회원"의 자료를 본 서비스 이외의 목적으로 제3자에게 제공하거나 열람시킬 경우 반드시 "회원"의 동의를
				얻어야 한다.
			</p>
			<p>
				제 17 조 ("회원"의 의무)
				<br />
				① "회원"은 관계법령과 본 약관의 규정 및 기타 "회사"가 통지하는 사항을 준수하여야 하며, 기타 "회사"의 업무에
				방해되는 행위를 해서는 안 된다.
				<br />
				② "회원"이 신청한 유료서비스는 등록 또는 신청과 동시에 "회사"와 채권, 채무 관계가 발생하며, "회원"은 이에 대한
				요금을 지정한 기일 내에 납부하여야 한다.
				<br />
				③ "회원"이 결제 수단으로 신용카드를 사용할 경우 비밀번호 등 정보 유실 방지는 "회원" 스스로 관리해야 한다. 단,
				"사이트"의 결함에 따른 정보유실의 발생에 대한 책임은 "회원"의 의무에 해당하지 아니한다.
				<br />
				④ "회원"은 서비스를 이용하여 얻은 정보를 "회사"의 사전동의 없이 복사, 복제, 번역, 출판, 방송 기타의 방법으로
				사용하거나 이를 타인에게 제공할 수 없다.
				<br />
				⑤ "회원"은 본 서비스를 건전한 취업 및 경력관리 이외의 목적으로 사용해서는 안되며 이용 중 다음 각 호의 행위를
				해서는 안 된다.
				<br />
				1. 다른 회원의 아이디를 부정 사용하는 행위
				<br />
				2. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위
				<br />
				3. 타인의 명예를 훼손하거나 모욕하는 행위
				<br />
				4. 타인의 지적재산권 등의 권리를 침해하는 행위
				<br />
				5. 해킹행위 또는 바이러스의 유포 행위
				<br />
				6. 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 계속적으로 전송하는 행위
				<br />
				7. 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있다고 판단되는 행위
				<br />
				8. 사이트의 정보 및 서비스를 이용한 영리 행위
				<br />
				9. 그밖에 선량한 풍속, 기타 사회질서를 해하거나 관계법령에 위반하는 행위
			</p>
			<p>
				제 18 조 ("회원"의 가입해지/서비스중지/자료삭제)
				<br />
				① "회원"은 언제든지 회원탈퇴 또는 이력서 등록을 해지하기 위해 계정관리 메뉴 등을 통하여 이용계약 해지 신청을 할
				수 있으며, "회사"는 관련법 등이 정하는 바에 따라 이를 처리한다.
				<br />
				② 다음의 사항에 해당하는 경우 "회사"는 사전 동의없이 가입해지나 서비스 중지, 이력서 삭제 조치를 취할 수 있다.
				<br />
				1. 회원의 의무를 성실하게 이행하지 않았을 때<br />
				2. 규정한 유료서비스 이용 요금을 납부하지 않았을 때<br />
				3. 본 서비스 목적에 맞지 않는 분야에 정보를 활용하여 사회적 물의가 발생한 때<br />
				4. 회원이 등록한 정보의 내용이 사실과 다르거나 조작되었을 때<br />
				5. 본 서비스와 관련하여 회사 또는 제3자의 명예를 훼손하였을 때<br />
				6. 기타 위 각호에 준하는 사유가 발생하였을 때<br />
				7. 회원의 정보가 허위로 기재되었거나 타인의 명의를 이용한 것으로 확인되었을 때<br />
				8. 만 15세 미만의 아동의 정보로 확인되었을 때<br />
				③ "회원"이 유료서비스를 이용하는 중 "회사"의 책임에 의해 정상적인 서비스가 제공되지 않을 경우 "회원"은 본
				서비스의 해지를 요청할 수 있으며 "회사"는 기간의 정함이 있는 유료서비스의 경우에는 해지일까지 이용일수를 1일
				기준금액으로 계산하여 이용금액을 공제 후 환급하고, 이용건수의 정함이 있는 유료서비스의 경우에는 기 사용분을 1건
				기준금액으로 계산하여 이용금액을 공제후 환급한다.
				<br />
				④ "회사"는 회원 가입이 해지된 경우에는 개인정보처리방침 중, 04.개인정보의 보유 및 이용기간 규정에 따른다.
				<br />⑤ "회사"는 성희롱, 욕설, 위협, 사실과 다른 주장, 무리한 요구, 폭언, 협박, 공포심 또는 불안감 유발,
				허위사실의 유포, 기타 위계나 위력, 서비스의 고의적 악용 등의 방법으로 서비스의 운영을 방해하거나 고객 응대
				근로자의 정신적 충격을 유발하는 "회원"에게 고객센터 전화 안내 서비스를 제공하지 않을 수 있다. 해당 "회원"은
				헬프데스크 메일이나 1:1 문의 프로세스를 이용할 수 있으며, 해당 프로세스에 따라 전화 안내 제한에 대한 이의신청을
				할 수 있다.
			</p>
			<p>
				제 19 조 (손해배상)
				<br />
				① "회사"가 이 약관의 규정을 위반한 행위로 "회원"에게 손해를 입히거나 기타 "회사"가 제공하는 모든 서비스와
				관련하여 "회사"의 책임 있는 사유로 인해 이용자에게 손해가 발생한 경우 "회사"는 그 손해를 배상하여야 한다.
				<br />
				② "회사"는 책임 있는 사유로 제공한 정보가 사실과 달라 "회원"이 손해를 입었을 경우에 "회사"는 그 손해를
				배상하여야 한다.
				<br />
				③ "회원"이 이 약관의 규정을 위반한 행위로 "회사" 및 제3자에게 손해를 입히거나 "회원"의 책임 있는 사유에 의해
				"회사" 및 제3자에게 손해를 입힌 경우에는 "회원"은 그 손해를 배상하여야 한다.
				<br />④ 타 회원(개인회원, 기업회원, 서치펌회원 모두 포함)의 귀책사유로 "회원"의 손해가 발생한 경우 "회사"는 이에
				대한 배상 책임이 없다.
			</p>
			<p>
				제 20 조 (양도 금지)
				<br />
				“회원”의 서비스 받을 권리는 제3자에게 양도, 대여, 증여 등으로 사용할 수 없다.
			</p>
			<p>
				제 21 조 (이용요금 오류의 조정)
				<br />
				"회사"는 이용요금과 관련하여 오류가 있는 경우에 "회원"의 요청, 또는 "회사"의 사전 통지에 의하여 다음에 해당하는
				조치를 취한다.
				<br />
				1. 과다납입한 요금에 대하여는 그 금액을 반환한다. 다만, "회원"이 동의할 경우 다음 달에 청구할 요금에서 해당
				금액만큼을 감하여 청구한다.
				<br />
				2. 요금을 반환받아야 할 "회원"이 요금체납이 있는 경우에는 반환해야 할 요금에서 이를 우선 공제하고 반환한다.
				<br />
				3. "회사"는 과소청구액에 대해서는 익월에 합산청구한다.
			</p>
			<p>
				제 22 조 ("회원"의 개인정보보호)
				<br />
				"회사"는 "회원"의 개인정보보호를 위하여 노력해야 한다. "회원"의 개인정보보호에 관해서는 정보통신망이용촉진 및
				정보보호 등에 관한 법률, 개인정보보호법에 따르고, "사이트"에 "개인정보처리방침"을 고지한다.
			</p>
			<p>
				제 23 조 (신용정보의 제공 활용 동의)
				<br />
				① "회사"가 회원가입과 관련하여 취득한 "회원"의 개인신용정보를 타인에게 제공하거나 활용하고자 할 때에는
				신용정보의 이용 및 보호에 관한 법률 제23조의 규정에 따라 사전에 그 사유 및 해당기관 또는 업체명 등을 밝히고 해당
				"회원"의 동의를 얻어야 한다.
				<br />② 본 서비스와 관련하여 "회사"가 "회원"으로부터 신용정보의 이용 및 보호에 관한 법률에 따라 타인에게 제공
				활용에 동의를 얻은 경우 "회원"은 "회사"가 신용정보 사업자 또는 신용정보 집중기관에 정보를 제공하여 "회원"의
				신용을 판단하기 위한 자료로 활용하거나, 공공기관에서 정책자료로 활용되도록 정보를 제공하는 데 동의한 것으로
				간주한다.
			</p>
			<p>
				제 24 조 (분쟁의 해결)
				<br />
				① "회사"와 "회원"은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 한다.
				<br />② 전항의 노력에도 불구하고, 동 분쟁에 관한 소송은 "회사"의 주소지 관할법원으로 한다.
			</p>
			<p>
				부칙
				<br />- 이 약관은 2024년 8월 22일부터 시행한다
			</p>
		</div>
	</StyledModal>
);

export default AgreementModal;
