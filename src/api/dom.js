import BScroll from "better-scroll";
export const initScroll = (el) => {
    return new BScroll(el, {
        scrollY: true,
        click: true
    })
};

export const setResize = (cb) => {
    let clientHeight;
    window.removeEventListener('resize', () => {
        clientHeight = document.documentElement.clientHeight;
        cb(clientHeight)
    });
};

export const removeResize = (cb) => {
    let clientHeight;
    window.removeEventListener('resize', () => {
        clientHeight = document.documentElement.clientHeight;
        cb(clientHeight)
    });
};

export const scrollStyle = clientHeight => ({width: '100%', height: clientHeight});

export const findNodeByIndex = (parentNode, index) => {
    let childNodes = Array.from(parentNode.childNodes);
    for (let i = 0; i < childNodes.length; i++) {
        if (index === +childNodes[i].dataset['index']) {
            return childNodes[i]
        }
    }
};