import { createGlobalStyle } from "styled-components";
import { Color } from "@/constants/color";

export const CoachmarkGlobalStyle = createGlobalStyle`
    // 기본 상자
    .driver-popover.coachmark-popover {
        background: ${Color.white};
        color: ${Color.gray01};
        border-radius: 10px;
        padding: 20px 24px;
    }

    // 제목 
    .driver-popover-title {
        font-size: 18px;
        font-family: 'Semibold';
        color: ${Color.gray01};
    }

    // 설명
    .driver-popover-description {
        font-size: 14px;
        font-family: 'Regular';
        color: ${Color.gray01};
    }

    // 하단 버튼 영역
     .driver-popover-footer  {
        display: flex;
        gap: 12px;
    }

    .driver-popover-prev-btn {
        border-radius: 10px;
        padding: 8px 18px;
        font-size: 14px;
        font-family: 'Regular';
        cursor: pointer;
    }

    .driver-popover-next-btn {
        border-radius: 10px;
        padding: 8px 18px;
        font-size: 14px;
        font-family: 'Regular';
        cursor: pointer;
    }
`;