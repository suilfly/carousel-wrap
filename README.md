# 无缝滑屏插件
无缝滑屏插件-即将进行更新

### 效果展示

* 自动轮播效果，无限无缝切换。滑动到第一张或者最后一张继续滑动则可以继续往前或往后翻页

<img src="/img/无缝滑屏-1.gif"/>

* 手指按住图片可随手指滑动，当移动距离超过图片的1/2时则翻页，不超过则恢复原样

<img src="/img/无缝滑屏-2.gif"/>

#### 使用方法

下载后

在需要的HTML页面中引入，以下结构
```HTML
    <div id="c1" class="carousel-wrap"></div>
    <div id="c2" class="carousel-wrap"></div>
```
在JS标签中使用

```javascript
let mysrc = [
      "/img/1.jpg",
      "/img/2.jpg",
      "/img/3.jpg",
      "/img/4.jpg",
      "/img/5.jpg",
    ];//图片路径
/*
@params:
      arg1:图片路径数组
      arg2:要被放入的DOM结点（块元素）
*/
let c1 = new Carousel(mysrc,document.getElementById("c1"));
```

