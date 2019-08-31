//由于webpack模块化加载rem并不会响应式，所以需要使用立即执行函数
(function () {
    let docEle = document.documentElement;

    function setRem() {
        let rem = docEle.clientWidth / 10;
        docEle.style.fontSize = rem + 'px';
    }
    setRem()

    window.addEventListener('resize', setRem)
})();