class Carousel {
    /* 定义Carousel的私有属性 */
    constructor(imgSrc, wrapElement) {
        this.imgSrc = imgSrc || ["/img/1.jpg",
            "/img/2.jpg",
            "/img/3.jpg"];
        this.wrapElement = wrapElement;
        this.init(imgSrc, wrapElement);
    }
}
(function(){
Carousel.prototype.init = carousel;
/* 使用插件的用户的存放图片path的数组不一定名：src，所以通过一个函数来规定 */
function createLiDom(src,carouselWrap) {

    let ul = document.createElement("ul");
    let ulWidth = src.length * 100;/* 动态计算ul的宽度 */
    let liWidth = 100 / src.length;/* 动态计算ul>li的宽度 */
    let liFromUl = ul.getElementsByTagName('li');


    ul.classList.add('my-list');
    /* 动态创建DOM节点 */
    src.forEach((i) => {
        ul.innerHTML += `<li><a href="javascript:;"><img src="${i}" alt=""></a></li>`;
    });
    /* 动态计算滑动容器的宽度 */
    ul.style.width = ulWidth + '%';
    [...liFromUl].forEach((item) => {
        item.style.width = liWidth + '%';
    });
    /* 解决carouselWrap高度塌陷问题 */
    carouselWrap.appendChild(ul);
    /* let img = document.querySelector('.my-list > li > a > img');console.dir(img.clientHeight);高度为0的原因：调试可知：在执行到这个语句时DOM节点还未渲染出来，所以没有高度。问题解决：异步编程 */

    /* 获取ul>li中的img的高度赋值给carouselWrap */
    let imgTime = setTimeout(() => {
        let img = document.querySelector('.my-list > li > a > img');
        carouselWrap.style.height = img.clientHeight + 'px';
        clearInterval(imgTime);
    }, 500);
    return {ul,liFromUl};
}
function touchMove(carouselWrap,{ul,liFromUl}){
        /* 滑屏相关 */
        let touchStartX = 0, touchdis = 0;
        /* 滑动的元素的起始位置 */
        let ulX = 0;
        /* 添加移动端事件 */

        carouselWrap.addEventListener('touchstart', function (e) {
            let touch = e.changedTouches[0];/* TouchList 接口代表一个触摸平面上所有触点的列表。例如，如果一个用户用三根手指接触屏幕（或者触控板），与之对应的 TouchList 会包含每根手指的 Touch 对象，总共三个 */
            touchStartX = touch.clientX;
            ulX = ul.offsetLeft;
            ul.style.transition = "";
        });
        carouselWrap.addEventListener('touchmove', function (e) {
            let touch = e.changedTouches[0];
            touchdis = touch.clientX - touchStartX;
            ul.style.left = ulX + touchdis + 'px';
        });
        carouselWrap.addEventListener('touchend', function (e) {
            let index = ul.offsetLeft / document.documentElement.clientWidth;/* 用ul的实时位置抽象成下标，若index的下标为负：向左滑，为正：向右滑 */
            index = Math.round(index)

            /* 设置超出部分 */

            if (Math.abs(touchdis) >= document.documentElement.clientWidth / 2) { /* 移动距离大于视口的一半 */
                if (index > 0) {
                    index = 0;
                } if (Math.abs(index) >= liFromUl.length - 1) {
                    index = -(liFromUl.length - 1);
                }
                ul.style.transition = ".5s left";
                ul.style.left = index * (document.documentElement.clientWidth) + 'px'; console.log(index);/* 每次移动一个视口的宽度  Math.round(index):四舍五入返回整数*/
            }
            else {
                ul.style.left = ulX + 'px';
            }


        });
}
function carousel(src = ["/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg"], carouselWrap) {
    let ul;
    if (carouselWrap) {
        ul=createLiDom(src,carouselWrap);
        touchMove(carouselWrap,ul);
    }

}
})();