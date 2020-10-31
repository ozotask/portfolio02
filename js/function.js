$(function(){
    
    //  fixed header vertical scroll
    $(window).scroll(function() {
        $('header').css({left: 0 - $(this).scrollLeft()});
        $('.lnb-container').css({left: 0 - $(this).scrollLeft()});
    });

    //  [header] - nav hover event
    $('.gnb>li').on({
        mouseenter: function(){
            $(this).find('.lnb-container').stop().slideDown();
        },
        mouseleave: function(){
            $(this).find('.lnb-container').stop().slideUp();
        },
        click: function(){
            $(this).addClass('on').siblings().removeClass('on');
        }
    });


    
    //  [slide]
    const $slides = $('#slides>.slides-container');
    const $pagination = $('.pagination>li');
    let nowIdx = 0;

    const slideFn = function(){
        $slides.children('li').eq(nowIdx).show().siblings().hide()
    };
    
    //  [slide] - pagination
    $pagination.on('click',function(){
        nowIdx = $pagination.index(this);
        $(this).addClass('on').siblings().removeClass('on')
        slideFn();
    });

    //  [slide] - prev / next btn
    $('.prev-btn').on('click',function(){
        if(nowIdx > 0){
            nowIdx--;
        }else{
            nowIdx = 3;
        }
        slideFn();
        $pagination.eq(nowIdx).addClass('on').siblings().removeClass('on');
        clearInterval(intervalId);
    });
    $('.next-btn').on('click',function(){
        if(nowIdx < 3){
            nowIdx++
        }else{
            nowIdx = 0
        }
        slideFn();
        $pagination.eq(nowIdx).addClass('on').siblings().removeClass('on');
        clearInterval(intervalId);
    });

    //  [slide] - auto play
    let intervalId = setInterval(function(){
        if(nowIdx < 3){
            nowIdx++
        }else{
            nowIdx = 0
        }
        slideFn();
        $pagination.eq(nowIdx).addClass('on').siblings().removeClass('on')
    },8000);


    //  기본값 : .orderby-main
    $('.orderby-main').hide();

    //  기본값 : .orderby-sub
    $('.orderby-sub').eq(0).siblings().hide();

    //  rank
    let now = new Date();
    $('.now-time>span:nth-child(1)').text(now.getHours());
    $('.now-time>span:nth-child(2)').text(now.getMinutes());

    //  BEST PRODUCT - select box event
    $('.best__orderby form').on('click',function(){
        $('.orderby-main').fadeToggle();
        $('.orderby-arr').toggleClass('on');
    });

    $('.orderby-main>li>a').on('click',function(evt){
        evt.preventDefault();
        $('.best__orderby input').val($(this).text());
        $(this).parents('.orderby-main').hide();

        let nowIdx = 0;
        nowIdx = $('.orderby-main>li>a').index(this);

        $('.orderby-sub').eq(nowIdx).show().siblings().hide();
    });
    
    //  BEST PRODUCT - Product Discount Rate
    //  할인율 = (정가-할인가)/정가
    for(let i = 0 ; i < $('.product__frame').length ; i++){
        const $priceOrgn = Number($('.product__price-orgn').eq(i).text().replaceAll(",","").slice(0,-1));
        const $priceNow = Number($('.product__price').eq(i).text().replaceAll(",","").slice(0,-1));
        let discountRate = Math.round(($priceOrgn-$priceNow)/$priceOrgn * 100);    
        $('.product__discount>span').eq(i).text(discountRate);
    };
    
    //  BEST PRODUCT - more btn
    $('.product__more-btn').on('click',function(evt){
        evt.preventDefault();
        $('.best__product').css({height: "auto"});
        $(this).hide();
    })

    //  common-btn / common-bar
    $('.common-btn').on({
        mouseenter: function(){
            $(this).children('.common-bar').removeClass('off')
        },
        mouseleave: function(){
            $(this).children('.common-bar').addClass('off')
        }
    });

    //  section > new > product slides

    //  : pagination event
    const productSlideFn = function(){
        $('.product__slides').stop().animate({
            left: -1040 * nowIdx + "px"
        },800);
    };
    
    $('.product__pagination>li>a').on('click',function(evt){
        evt.preventDefault();
        let nowIdx = 0;
        nowIdx = $('.product__pagination>li>a').index(this);
        
        $('.product__slides').stop().animate({
            left: -1040 * nowIdx + "px"
        },800);

        $(this).parent().addClass('on').siblings().removeClass('on')
    });

    //  : prev, next btn event
    $('.product__prev').on('click',function(evt){
        evt.preventDefault();
        if(nowIdx > 0){
            nowIdx--;
        }else{
            nowIdx = 2;
        }
        productSlideFn();
        $('.product__pagination>li').eq(nowIdx).addClass('on').siblings().removeClass('on')
    });
    $('.product__next').on('click',function(evt){
        evt.preventDefault();
        if(nowIdx < 2){
            nowIdx++;
        }else{
            nowIdx = 0;
        }
        productSlideFn();
        $('.product__pagination>li').eq(nowIdx).addClass('on').siblings().removeClass('on')
    });
    
    //  video-container
    
    $('.ad__slides>li').eq(1).hide();
    $('.ad__slides>li').eq(2).hide();
    $('.ad__pagination>li').on('click',function(){
        nowIdx = $('.ad__pagination>li').index(this);
        console.log(nowIdx);
        $('.ad__slides>li').eq(nowIdx).show().siblings().hide();
        $(this).addClass('on').siblings().removeClass('on');
        $(this).css({
            display: "flex"
        });

        $(this).parents('.ad-container').css({
            backgroundImage: "url(./images/video-bg0"+(nowIdx+1)+".jpg)"
        });
    });


    //  instagram slide
    $('.sns-container .prev-btn').on('click',function(evt){
        evt.preventDefault();
        $('.sns__slides').stop().animate({
            left:260
        },function(){
            $('.sns__slides li:last').prependTo(".sns__slides");
            $('.sns__slides').css({left:0});
        });
    });
    $('.sns-container .next-btn').on('click',function(evt){
        evt.preventDefault();

        $('.sns__slides').stop().animate({
            left:-260
        },function(){
            $('.sns__slides li:first').appendTo(".sns__slides");
            $('.sns__slides').css({left:0});
        });
    });
});