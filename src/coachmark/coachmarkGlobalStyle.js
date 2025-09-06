// src/coachmarks/CoachmarkGlobalStyle.js
import { createGlobalStyle } from "styled-components";
import { Color } from "@/constants/color";

export const CoachmarkGlobalStyle = createGlobalStyle`
  /* 팝오버 박스 */
  .driver-popover.coachmark-popover {
    display: flex;
    flex-direction: column;
    background: ${Color.white};
    color: ${Color.gray01};
    border-radius: 10px;
    padding: 20px 24px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.16);
  }

  /* 화살표 */
  .driver-popover.coachmark-popover .driver-popover-arrow {
    background: ${Color.gray02};
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  /* 제목 / 설명 */
  .driver-popover.coachmark-popover .driver-popover-title {
    font-size: 18px;
    font-family: 'Semibold';
    color: ${Color.gray01};
    margin: 0 0 8px 0;
  }
  .driver-popover.coachmark-popover .driver-popover-description {
    font-size: 14px;
    font-family: 'Regular';
    color: ${Color.gray01};
    line-height: 1.5;
    margin: 0 0 12px 0;
  }

  /* 하단 버튼 영역 */
  .driver-popover.coachmark-popover .driver-popover-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .driver-popover.coachmark-popover .driver-popover-progress-text {
        display: none;
    }
    .driver-popover.coachmark-popover .driver-popover-navigation-btns {
        display: flex;
        justify-content: center;
        gap: 12px;
    }

  .driver-popover.coachmark-popover .driver-popover-prev-btn, 
  .driver-popover.coachmark-popover .driver-popover-next-btn {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    padding: 8px 18px;
    font-size: 14px;
    font-family: 'Medium';
    cursor: pointer;
    border: 1px solid ${Color.gray02};
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
    text-shadow: none;
    text-align: center;
  }

  /* prev 전용 */
  .driver-popover.coachmark-popover .driver-popover-prev-btn {
    background: ${Color.gray03};
    color: ${Color.white};
    border: none;
  }

  /* next 전용 */
  .driver-popover.coachmark-popover .driver-popover-next-btn {
    background: ${Color.white};
    color: ${Color.black};
    border: 1px solid ${Color.gray03};
  }

  /* 아이콘 + 텍스트 정렬 */
.driver-popover.coachmark-popover .with-icon {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    line-height: 1;
    }

  /* 필요 시: driver 활성화/오버레이/하이라이트 스타일 */
  /* body.driver-active { } */
  /* .driver-overlay { background: rgba(0,0,0,.6) !important; } */
  /* .driver-active-element { outline: 2px solid ${Color.main01}; } */

  /* onPopoverRender에서 붙일 때 사용 가능한 유틸 */
  .hidden { display: none !important; }
`;
