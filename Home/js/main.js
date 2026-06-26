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
// 여기는 Shot어쩌고의 자리
    const txt1=document.querySelector(".heroContent2")
        const observer2=new IntersectionObserver(function(entries){
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

if (txt1) {
    observer2.observe(txt1);
}

const fadeSlider = document.querySelector(".slider");
const fadeDots = document.querySelectorAll(".dots > div");

if (fadeSlider) {
    const fadeImages = fadeSlider.querySelectorAll("img");
    let fadeIndex = 0;
    let fadeTimer = null;

    function showFadeSlide(index) {
        fadeIndex = index;

        fadeImages.forEach(function (img, imgIndex) {
            img.classList.toggle("on", imgIndex === index);
        });

        fadeDots.forEach(function (dot, dotIndex) {
            dot.classList.toggle("on", dotIndex === index);
        });
    }

    function startFadeAuto() {
        clearInterval(fadeTimer);

        fadeTimer = setInterval(function () {
            showFadeSlide((fadeIndex + 1) % fadeImages.length);
        }, 3000);
    }

    if (fadeImages.length > 0) {
        showFadeSlide(fadeIndex);
        startFadeAuto();

        fadeDots.forEach(function (dot, dotIndex) {
            dot.addEventListener("click", function () {
                showFadeSlide(dotIndex);
                startFadeAuto();
            });
        });
    }
}

const reviewStart = document.querySelector(".reviewStart");

if (reviewStart) {
    fetch("./products.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (categories) {
            reviewStart.innerHTML = "";

            categories.slice(0, 4).forEach(function (category) {
                const band = document.createElement("div");
                band.className = "productBand";

                band.innerHTML = `
                    <img class="productBandBg" src="./img/SVG files/pattern/circliewhite.svg" alt="product background">
                    <section class="productSection">
                        <div class="productList">
                            <div class="categoryRow">
                                <h3 class="categoryTitle">${category.category}</h3>
                                <div class="productViewport">
                                    <div class="productTrack"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                `;

                const track = band.querySelector(".productTrack");

                category.items.forEach(function (item) {
                    const card = document.createElement("article");
                    card.className = "productCard";
                    card.dataset.title = item.title;
                    card.dataset.creator = item.creator;
                    card.dataset.desc = item.desc;
                    card.dataset.image = item.image;

                    card.innerHTML = `
                        <div class="productInner">
                            <img class="productImg" src="${item.image}" alt="${item.title}" draggable="false">
                            <div class="productInfo">
                                <h4>${item.title}</h4>
                                <p class="productCreator">${item.creator}</p>
                                <p>${item.desc}</p>
                            </div>
                        </div>
                    `;

                    track.appendChild(card);
                });

                reviewStart.appendChild(band);
            });

            makeProductModal();
            makeProductDrag();
        });
}

function makeProductDrag() {
    const viewports = document.querySelectorAll(".productViewport");

    viewports.forEach(function (viewport) {
        let isDown = false;
        let isMoved = false;
        let startX = 0;
        let scrollLeft = 0;
        let autoTimer = null;
        let pressedCard = null;

        function getCardStep() {
            const firstCard = viewport.querySelector(".productCard");
            const track = viewport.querySelector(".productTrack");

            if (!firstCard || !track) {
                return viewport.clientWidth * 0.75;
            }

            const trackStyle = window.getComputedStyle(track);
            const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;

            return firstCard.offsetWidth + gap;
        }

        function startAutoSlide() {
            stopAutoSlide();

            autoTimer = setInterval(function () {
                const maxScroll = viewport.scrollWidth - viewport.clientWidth;
                const cardStep = getCardStep();
                const nextScroll = viewport.scrollLeft + cardStep;

                if (nextScroll >= maxScroll - 5) {
                    viewport.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });
                    return;
                }

                viewport.scrollBy({
                    left: cardStep,
                    behavior: "smooth"
                });
            }, 3000);
        }

        function stopAutoSlide() {
            if (!autoTimer) return;

            clearInterval(autoTimer);
            autoTimer = null;
        }

        viewport.addEventListener("pointerdown", function (e) {
            e.preventDefault();
            stopAutoSlide();
            isDown = true;
            isMoved = false;
            pressedCard = e.target.closest(".productCard");
            viewport.classList.add("dragging");
            viewport.setPointerCapture(e.pointerId);
            startX = e.pageX;
            scrollLeft = viewport.scrollLeft;
        });

        viewport.addEventListener("pointermove", function (e) {
            if (!isDown) return;

            e.preventDefault();

            const moveX = e.pageX - startX;
            const walk = moveX * 1.8;

            if (Math.abs(moveX) > 8) {
                isMoved = true;
            }

            viewport.scrollLeft = scrollLeft - walk;
        });

        viewport.addEventListener("pointerup", function () {
            isDown = false;
            viewport.classList.remove("dragging");

            if (pressedCard && !isMoved) {
                openProductModal(pressedCard.dataset);
            }

            pressedCard = null;
            startAutoSlide();
        });

        viewport.addEventListener("pointercancel", function () {
            isDown = false;
            pressedCard = null;
            viewport.classList.remove("dragging");
            startAutoSlide();
        });

        viewport.addEventListener("mouseenter", stopAutoSlide);
        viewport.addEventListener("mouseleave", function () {
            isDown = false;
            pressedCard = null;
            viewport.classList.remove("dragging");
            startAutoSlide();
        });

        startAutoSlide();
    });
}

function makeProductModal() {
    if (document.querySelector(".productModal")) return;

    const modal = document.createElement("div");
    modal.className = "productModal";
    modal.innerHTML = `
        <div class="productModalBox">
            <button class="productModalClose" type="button" aria-label="Close">×</button>
            <img class="productModalImg" src="" alt="">
            <div class="productModalText">
                <h3></h3>
                <p class="productModalCreator"></p>
                <p class="productModalDesc"></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.closest(".productModalClose")) {
            closeProductModal();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeProductModal();
        }
    });
}

function openProductModal(item) {
    const modal = document.querySelector(".productModal");

    if (!modal) return;

    const img = modal.querySelector(".productModalImg");

    img.src = item.image;
    img.alt = item.title;
    modal.querySelector(".productModalText h3").textContent = item.title;
    modal.querySelector(".productModalCreator").textContent = item.creator;
    modal.querySelector(".productModalDesc").textContent = item.desc;
    modal.classList.add("on");
    document.body.classList.add("modalOpen");
}

function closeProductModal() {
    const modal = document.querySelector(".productModal");

    if (!modal) return;

    modal.classList.remove("on");
    document.body.classList.remove("modalOpen");
}
