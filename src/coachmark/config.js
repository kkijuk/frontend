import "driver.js/dist/driver.css";

export const COACHMARK_POPOVER_CLASS = "coachmark-popover";

const LEFT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="#FFFFFF">
  <path d="M3.99935 7.33301L0.666016 3.99967L3.99935 0.666342" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const RIGHT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#000000">
  <path d="M6.66667 4.66699L10 8.00033L6.66667 11.3337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const defaultCoachmarkConfig = {
    showProgress: false,
    overlayOpacity: 0.5,
    nextBtnText: "다음",
    prevBtnText: "이전",
    doneBtnText: "완료",
    popoverClass: COACHMARK_POPOVER_CLASS,

    onPopoverRender(popover) {
        // prev
        if(popover.previousBtn) {
            popover.previousBtn.innerHTML = 
            `${LEFT_SVG} <span class="coachmark-btn-label">이전</span>`;
            popover.previousBtn.classList.add('with-icon', 'is-prev');
        } 
        if(popover.nextBtn) {
            popover.nextBtn.innerHTML = 
            `<span class="coachmark-btn-label">다음</span> ${RIGHT_SVG}`;
            popover.nextBtn.classList.add('with-icon', 'is-next');
        }
    }
};

export default defaultCoachmarkConfig;
