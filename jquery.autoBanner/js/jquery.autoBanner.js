;(function($){
    // $.prototype.lxCarousel = function(options){
    $.fn.jasonCarousel = function(options){
        // 如何安全使用$：匿名函数传参
        // 如何获取.box：this=>jquery对象

        // 默认参数
        var defualts = {
            width:320,
            height:320,
            index:0,
            autoPlay:true,
            // 轮播间隔
            duration:3000,

            // 轮播类型
            type:'vertical',//horizontal,fade

            // 无缝滚动
            marquee:true,
            // 是否加入页码
            page:true,
            // 是否加入前后按钮
            pre_next:true
        }

        return this.each(function(){
            // 这里的this为dom节点
            // var opt = Object.assign({},defualts,options);

            // 比assign强大
            // 能实现深复制
            var opt = $.extend({},defualts,options);
            opt.len = opt.imgs.length;

            var $this = $(this);
            var $page;
            // 添加特定类
            $this.addClass('jasoncarousel');

            // 设定样式
            $this.css({
                width:opt.width,
                height:opt.height
            });

            var $ul;

            init();

            var timer;
             var len;
             opt.index=0;
             var $span;
            // 鼠标移入移除
            $this.on('mouseenter',function(){
                clearInterval(timer);
            }).on('mouseleave',function(){
                timer = setInterval(function(){
                    opt.index++;
                    show();
                },opt.duration);
            }).trigger('mouseleave');

            // 初始化
            // 获取/生成节点
            // 绑定事件
            function init(){
                $ul = $('<ul/>')

                var html = $.map(opt.imgs,function(url){
                    return '<li><img src="'+ url +'"/></li>';
                }).join('\n');

                $ul.html(html);
                $this.append($ul);
                  // 是否无缝滚动：默认值为true
                if(opt.marquee){
                    // 把第一张图片复制到最后
                     $ul.get(0).appendChild($ul.get(0).children[0].cloneNode(true));
                     len= $ul.get(0).children.length;
                }
                // 是否加入页码：默认值为true
                if(opt.page){ 
                   $page=$('<div/>')
                   var html=$.map(opt.imgs,function(url){
                    return '<span></span>';
                    }).join('\n');
                   $page.html(html);
                   $page.addClass('page').appendTo($this);
                   opt.ele=$page; 
                    $span=opt.ele.find('span');
                     $($span[0]).addClass('active').siblings('span').removeClass('active');     
                }
            }
            function show(){
                function idxLeft(length){
                    if(opt.index >=length){
                        opt.index = 0;
                        if(opt.marquee){
                             opt.index=1;
                             $ul.css({left:0})   
                        }
                    }else if(opt.index<0){
                        opt.index = opt.len-1
                    }
                    if(opt.index>=length-1){
                        $($span[0]).addClass('active').siblings('span').removeClass('active');
                    }else{
                          $($span[opt.index]).addClass('active').siblings('span').removeClass('active');
                    }
                }
                 function idxTop(length){
                    if(opt.index >=length){
                        opt.index = 0;
                        if(opt.marquee){
                             opt.index=1;
                             $ul.css({top:0})   
                        }
                    }else if(opt.index<0){
                        opt.index = opt.len-1
                    }
                }
                switch(opt.type){
                    case 'vertical':
                        if(opt.marquee){
                            idxTop(len);
                            autoPage(len);
                        }else{
                            idxTop(opt.len);
                            autoPage(opt.len);
                        }
                         var target = -opt.index*opt.height;
                         $ul.animate({top:target});
                         break;
                    case'horizontal':
                        if(opt.marquee){
                            idxLeft(len);
                            autoPage(len);
                            $ul.width(opt.width*len);
                        }else{
                            idxLeft(opt.len);
                            autoPage(opt.len);
                            $ul.width(opt.width*opt.len);
                        }
                        $ul.find('li').css({
                            float:'left'
                        });
                         var target = -opt.index*opt.width;
                         $ul.animate({left:target});
                         break;
                    case'fade':
                        var $li=$ul.find('li').css({
                            position:'absolute',
                            zIndex:-1
                        })
                        $li.first().css({
                            zIndex:0
                        });
                            idxTop(opt.len);
                            autoPage(opt.len);
                        $($li[opt.index]).stop().animate({opacity:1}).siblings('li').stop().animate({opacity:0});
                      break;
                }
               
            }
            // 页码自动轮播
          function autoPage(length){
                if(opt.marquee){
                          if(opt.index>=length-1){
                            $(opt.ele.find('span')[0]).addClass('active').siblings('span').removeClass('active');
                        }else{
                              $(opt.ele.find('span')[opt.index]).addClass('active').siblings('span').removeClass('active');
                        }
                     }else{
                        if(opt.index>=length){
                            $(opt.ele.find('span')[0]).addClass('active').siblings('span').removeClass('active');
                        }else{
                              $(opt.ele.find('span')[opt.index]).addClass('active').siblings('span').removeClass('active');
                        }
                     }
            }
            // 页面图标控制轮播
            function pageFollow(){
               for(var i=0;i<$span.length;i++){
                    $span[i].index=i;
                    $span[i].onmouseenter=function(){
                        opt.index=this.index;
                        show();
                    }
               }
            }
            pageFollow();
            // 前后按钮函数
            function pre_next(){
                // 向前按钮
                var $pre=$('<img/>').attr('src',opt.btnImg[0]).addClass('prev').appendTo($this);
                // 向后按钮
                var $next=$('<img/>').attr('src',opt.btnImg[1]).addClass('next').appendTo($this);
                $this.on('click','.prev',function(){
                        if(opt.index<1){
                          if(opt.marquee){
                              opt.index=len-1;
                              if(opt.type=='vertical'){
                                    $ul.css({top:-opt.height*(len-1)})
                                }
                                if(opt.type=='horizontal'){
                                    $ul.css({left:-opt.width*(len-1)})
                                }
                          }else{
                            opt.index=opt.len;
                          }
                        }
                         opt.index--;
                      show();  
                })
                 $this.on('click','.next',function(e){
                     opt.index++;
                        if(opt.marquee){
                             if(opt.index>=len){
                                opt.index=1;
                                if(opt.type=='vertical'){
                                    $ul.css({top:0})
                                }
                                if(opt.type=='horizontal'){
                                    $ul.css({left:0})
                                }
                            }
                        }else{
                              if(opt.index>=opt.len){
                                opt.index=0;
                            }
                        }  
                      show();  
                })
            }
            if(opt.pre_next){
                pre_next();
            }
        });
        // return this便于链式调用
        // return this;
    }


    // 插件库建议写法
    // $.fn.extend({
    //  lxCarousel:function(){},
    //  lxDraggable:function(){},

    //  // 倒计时插件
    //  lxCountdown:function(){}
    // })

})(jQuery);