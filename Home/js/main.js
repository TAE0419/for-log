const cloverWrap = document.querySelector(".cloverWarp");

if (cloverWrap) {
    for (let i = 1; i <= 8; i++) {
        const num = String(i).padStart(2, "0");
        const card = document.createElement("div");
        const cardInner = document.createElement("div");
        const front = document.createElement("div");
        const back = document.createElement("div");
        const object = document.createElement("object");
        const backImg = document.createElement("img");

        card.className = "cloverCard";
        cardInner.className = "cloverCardInner";
        front.className = "cloverCardFace cloverCardFront";
        back.className = "cloverCardFace cloverCardBack";
        object.type = "image/svg+xml";
        object.data = `./img/forlog-forlog_products/clover-products${num}.svg`;
        backImg.src = `./img/SVG files/clover_back/${i}-01.svg`;
        backImg.alt = `clover back ${i}`;

        front.appendChild(object);
        back.appendChild(backImg);
        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);
        cloverWrap.appendChild(card);
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
                if ($(this).attr('href') !== '#') {
                    return true
                }

                e.preventDefault() //a태그가 원래 가지고 있던 기능을 막기

                let myMenu = $(this).siblings('.hamSnb') //클릭한 li a태그의 형제(hamSnb)

                $('.hamSnb').not(myMenu).stop().slideUp(300) //내가 클릭한 메뉴 말고 다 닫기

                $(this).siblings('.hamSnb').stop().slideToggle(300) //내가 선택한 메뉴의 서브메뉴만 보이기
            })
        })

        const rule=document.querySelector(".BestGallery")
        const observer30=new IntersectionObserver(function(entries){
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

        if (rule) {
    observer30.observe(rule);
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
// 쇼트컷의 이미지가 올라오는 부분
 const slowUp=document.querySelector(".boxUp")
        const observer10=new IntersectionObserver(function(entries){
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

        if (slowUp) {
    observer10.observe(slowUp);
}

 const slowUp2=document.querySelector(".boxDown")
        const observer11=new IntersectionObserver(function(entries){
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

        if (slowUp2) {
    observer11.observe(slowUp2);
}

// 끝-----------------------------

// About For-log의 시작(옵저버)----------------------
 const pikabu=document.querySelector(".character span:nth-child(1)")
        const observer12=new IntersectionObserver(function(entries){
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

        if (pikabu) {
    observer12.observe(pikabu);
}

 const pikabu2=document.querySelector(".character span:nth-child(2)")
        const observer13=new IntersectionObserver(function(entries){
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

        if (pikabu2) {
    observer13.observe(pikabu2);
}

 const characterImg=document.querySelector(".character img")
        const observer14=new IntersectionObserver(function(entries){
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

        if (characterImg) {
    observer14.observe(characterImg);
}

//끝남-----------------------------

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
        let segmentStart = 0;
        let segmentWidth = 0;
        let cardStep = 0;
        let slideIndex = 0;

        function setupInfiniteTrack() {
            const track = viewport.querySelector(".productTrack");

            if (!track || track.dataset.infiniteReady === "true") return;

            const originalCards = Array.from(track.querySelectorAll(".productCard"));

            if (originalCards.length === 0) return;

            const beforeClones = originalCards.map(function (card) {
                const clone = card.cloneNode(true);
                clone.classList.add("productCardClone");
                return clone;
            });

            const afterClones = originalCards.map(function (card) {
                const clone = card.cloneNode(true);
                clone.classList.add("productCardClone");
                return clone;
            });

            beforeClones.reverse().forEach(function (clone) {
                track.insertBefore(clone, track.firstChild);
            });

            afterClones.forEach(function (clone) {
                track.appendChild(clone);
            });

            segmentStart = originalCards[0].offsetLeft;
            segmentWidth = afterClones[0].offsetLeft - originalCards[0].offsetLeft;
            cardStep = originalCards[1]
                ? originalCards[1].offsetLeft - originalCards[0].offsetLeft
                : originalCards[0].offsetWidth;

            syncCircleBackgroundSize();
            viewport.scrollLeft = segmentStart;
            slideIndex = 0;
            track.dataset.infiniteReady = "true";
        }

        function syncCircleBackgroundSize() {
            const band = viewport.closest(".productBand");

            if (!band || !cardStep) return;

            const circleGap = 360.2;
            const svgHeight = 1450.6;
            const backgroundSize = (cardStep * svgHeight / circleGap / band.offsetHeight) * 100;

            band.style.setProperty("--circle-bg-size", `${backgroundSize}%`);
        }

        function normalizeInfiniteScroll() {
            if (!segmentWidth) return;

            if (viewport.scrollLeft < segmentStart - 1) {
                viewport.scrollLeft += segmentWidth;
            }

            if (viewport.scrollLeft >= segmentStart + segmentWidth - 1) {
                viewport.scrollLeft -= segmentWidth;
            }

            slideIndex = Math.round((segmentStart - viewport.scrollLeft) / getCardStep());
        }

        function getCardStep() {
            if (!cardStep) {
                const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;

                return 30 * rootFontSize;
            }

            return cardStep;
        }

        function startAutoSlide() {
            stopAutoSlide();

            autoTimer = setInterval(function () {
                const cardStep = getCardStep();
                const totalSteps = Math.max(1, Math.round(segmentWidth / cardStep));

                normalizeInfiniteScroll();
                slideIndex = (slideIndex + 1) % totalSteps;

                viewport.scrollTo({
                    left: segmentStart - (slideIndex * cardStep),
                    behavior: "smooth"
                });
                setTimeout(normalizeInfiniteScroll, 700);
            }, 2000);
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
            normalizeInfiniteScroll();
            startAutoSlide();
        });

        viewport.addEventListener("pointercancel", function () {
            isDown = false;
            pressedCard = null;
            viewport.classList.remove("dragging");
            normalizeInfiniteScroll();
            startAutoSlide();
        });

        viewport.addEventListener("mouseenter", stopAutoSlide);
        viewport.addEventListener("mouseleave", function () {
            isDown = false;
            pressedCard = null;
            viewport.classList.remove("dragging");
            normalizeInfiniteScroll();
            startAutoSlide();
        });

        setupInfiniteTrack();
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

const mainPopup = document.querySelector("#mainPopup");

function setMainPopupCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getMainPopupCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(function (item) {
        return item.startsWith(name + "=");
    });

    return cookie ? cookie.split("=")[1] : null;
}

function updateMainPopupState() {
    if (!mainPopup) return;

    const visibleItems = mainPopup.querySelectorAll(".mainPopupItem:not(.hide)");

    mainPopup.classList.toggle("hide", visibleItems.length === 0);
}

if (mainPopup) {
    const popupItems = mainPopup.querySelectorAll(".mainPopupItem");

    popupItems.forEach(function (item) {
        const popupId = item.dataset.popupId;
        const cookieName = `mainPopupPreview_${popupId}`;

        if (getMainPopupCookie(cookieName) === "close") {
            item.classList.add("hide");
        }

        item.querySelector(".mainPopupClose").addEventListener("click", function () {
            const todayCheckbox = item.querySelector(".mainPopupToday input");

            if (todayCheckbox && todayCheckbox.checked) {
                setMainPopupCookie(cookieName, "close", 1);
            }

            item.classList.add("hide");
            updateMainPopupState();
        });
    });

    updateMainPopupState();
}

// 베스트 리뷰의 자리
        const View=document.querySelector(".sec5>div>span")
        const observerView=new IntersectionObserver(function(entries){
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

        if (View) {
    observerView.observe(View);
}
