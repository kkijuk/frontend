import homeCoachmark from "./homeCoachhmark";

const getCoachmark = (page, refs) => {
    switch (page) {
        case "home" :
            return homeCoachmark(refs);
        default :
            return null;
    }
}

export default getCoachmark;