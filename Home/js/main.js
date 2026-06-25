const cloverWrap = document.querySelector(".cloverWarp");

if (cloverWrap) {
    for (let i = 1; i <= 10; i++) {
        const num = String(i).padStart(2, "0");
        const object = document.createElement("object");

        object.type = "image/svg+xml";
        object.data = `./img/forlog-forlog_products/clover-products${num}.svg`;

        cloverWrap.appendChild(object);
    }
}
 $(function(){
            $('.gnb > li').mouseenter(function(){
                $('.snb').stop().slideUp(300)
                $(this).children('.snb').stop().slideDown(300)
            })
            $('.gnb > li').mouseleave(function(){
                $('.snb').stop().slideUp(300)
            })

            $('.ham').click(function(){
                $('.dim').addClass('on')
                $('.hamSideMenu').addClass('on')
            })
            $('.dim').click(function(){
                $('.dim').removeClass('on')
                $('.hamSideMenu').removeClass('on')
            })
            $('.close').click(function(){
                $('.dim').removeClass('on')
                $('.hamSideMenu').removeClass('on')
            })
            //사이드(슬라이드 메뉴) :: 아코디언 구현
            $('.hamGnb>li>a').click(function(e){
                e.preventDefault() //a태그가 원래 가지고 있던 기능을 막기

                let myMenu = $(this).siblings('.hamSnb') //클릭한 li a태그의 형제(hamSnb)

                $('.hamSnb').not(myMenu).stop().slideUp(300) //내가 클릭한 메뉴 말고 다 닫기

                $(this).siblings('.hamSnb').stop().slideToggle(300) //내가 선택한 메뉴의 서브메뉴만 보이기
            })
        })

        const best=document.querySelector(".BestGallery")
        const observer=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (best) {
    observer.observe(best);
}
