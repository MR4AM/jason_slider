# jason_slider
幻灯片jquery插件。
html
 <div id="box"></div>
 css
     <link rel =“stylesheet”type =“text / css”href =“css / jquery.autoBanner.css”/>
js
jQuery(function($){
            $('#box').jasonCarousel({
                // 轮播图盒子宽高
                width:810,
                height:320,
                // 轮播间隔时间
                duration:3000,
                // 轮播图片路径
                imgs:['img/001.jpg','img/002.jpg','img/003.jpg','img/004.jpg'],
                // 轮播类型：vertical垂直horizontal水平滚动fade淡入淡出
                type:'fade',
                // 是否加入页码默认为true
                page:true,
                // 是否无缝滚动默认为true，当你需要淡入淡出效果时，请设置为false
                marquee:false,
                // 是否加入前后按钮默认为true
                 // pre_next:false
                btnImg:['img/tab_l.png','img/tab_r.png'],
            });
        })
