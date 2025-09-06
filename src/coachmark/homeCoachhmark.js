import { driver } from "driver.js";
import defaultCoachmarkConfig, { COACHMARK_POPOVER_CLASS} from "./config";
import coachmarkGIF from '@/assets/coachmarkGIF.gif';

const $ = (sel) => () => document.querySelector(sel);

const homeCoachmark = (refs) => {
    const d = driver({
        ...defaultCoachmarkConfig,
        steps: [
            {
                element: $('[data-coach="add-activity"]'),
                popover : {
                    title: "지금 바로 활동을 추가해보세요!",
                    description: "이전에 했었거나, 지금 하고 있는 활동에 대한 정보를 손쉽게 기록해요.",
                    position: "bottom",
                    showButtons: ['next']
                }
            },
            {
                element: $('[data-coach="career-timeline"]'),
                popover: {
                    title: "타임라인으로 한눈에!",
                    description: "추가한 활동들은 타임라인 형태로 깔끔하게 볼 수 있어요.",
                }
            }, 
            {
                element: $('[data-coach="add-careerDetail"]'),
                popover: {
                    title: "활동기록 꾸준히 적기!",
                    description: "각 활동에서 무엇을 했고, 어떤 것을 느꼈는지 자세히 기록해보세요.",
                }
            },
            {
                element: $('[data-coach="noti-at-home"]'),
                popover: {
                    title: "공고 마감일 놓치지 않기!",
                    description: "등록한 공고의 마감일을 알려줘요. 아직 등록한 공고가 없다면 추가해보세요."
                }
            }, 
            {
                element: null,
                popover: {
                    description: `
                        <img src="${coachmarkGIF}" alt="coachmark guide" style="width:100%; border-radius: 10px; margin-bottom: 12px;" />
                        막막하기만 했던 취준은 이제 안녕~ 이제부터 끼적과 함께 내 경험&커리어를 차곡차곡 쌓아가요!
                    `,
                    showButtons: ['done']
                }
            }
        ]
    })

    return d;
}

export default homeCoachmark;