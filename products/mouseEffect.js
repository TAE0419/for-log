// ==========================================
// 1. 공통 스타일 주입 (탑버튼 + 완벽한 원형 스타일 + 플로팅 로그인 상태 버튼)
// ==========================================
const style = document.createElement('style');
style.textContent = `
    /* 우측 하단 탑버튼 */
    .btn-top {
        position: fixed;
        bottom: 40px; right: 40px;
        width: 50px; height: 50px;
        background-color: var(--dark-color, #24331C); color: #fff;
        border: none; border-radius: 50%;
        z-index: 10001; 
        font-size: 14px; font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        opacity: 0; visibility: hidden;
        transition: all 0.3s ease;
        cursor: pointer; 
    }
    .btn-top:hover { background-color: var(--point-color, #DB824A); }
    .btn-top.is-show { opacity: 1; visibility: visible; }

    /* 모든 입자를 찌그러짐 없는 완벽한 원형으로 고정 */
    .tinker-bubble {
        border-radius: 50% !important;
    }

    /* 💡 [추가] 우측 하단 플로팅 로그인/로그아웃 버튼 */
    .btn-auth-floating {
        position: fixed;
        bottom: 105px; right: 40px; /* 탑버튼(40px)의 65px 위에 넉넉하게 배치 */
        width: 50px; height: 50px;
        background-color: var(--point-color, #DB824A); /* 비로그인 시 오렌지 포인트 컬러 */
        color: #fff;
        border: none; border-radius: 50%;
        z-index: 10001;
        font-size: 18px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    /* 로그인 완료 시 올리브 그린색으로 자동 변환 */
    .btn-auth-floating.is-logged-in {
        background-color: var(--main-color, #AAB664);
    }
    
    .btn-auth-floating:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 15px rgba(0,0,0,0.25);
    }

    /* 마우스 호버 시 뜨는 친절한 말풍선 툴팁 */
    .btn-auth-floating .tooltip-text {
        visibility: hidden;
        width: max-content;
        background-color: var(--dark-color, #24331C);
        color: #fff;
        text-align: center;
        border-radius: 8px;
        padding: 6px 12px;
        position: absolute;
        z-index: 1;
        right: 125%; /* 버튼 왼쪽에 정렬 */
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: opacity 0.3s;
        font-size: 12px;
        font-weight: 700;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .btn-auth-floating:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ==========================================
// 2. 변수 선언 및 세팅 
// ==========================================
var sparkles = 25; // 가루 총량 줄임 유지

var x = 400, ox = 400;
var y = 300, oy = 300;
var swide = window.innerWidth, shigh = window.innerHeight;
var sleft = 0, sdown = 0;
var tiny = new Array();
var star = new Array();
var starv = new Array();
var starx = new Array();
var stary = new Array();
var tinyx = new Array();
var tinyy = new Array();
var tinyv = new Array();

// ==========================================
// 3. 메인 초기화 및 실행
// ==========================================
document.addEventListener("DOMContentLoaded", function() {

    // --- [A] 탑버튼 동적 생성 ---
    const topBtn = document.createElement('button');
    topBtn.className = 'btn-top';
    topBtn.innerHTML = 'TOP';
    document.body.appendChild(topBtn);

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { topBtn.classList.add('is-show'); } 
        else { topBtn.classList.remove('is-show'); }
    });

    // --- [B] 💡 로그인/로그아웃 플로팅 버튼 동적 생성 ---
    // 로그인이나 회원가입 화면 자체에서는 중복 노출을 피하기 위해 렌더링하지 않음
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
    
    if (!isAuthPage) {
        const loggedInUser = localStorage.getItem('forlog_current_user');
        const authBtn = document.createElement('button');
        authBtn.type = 'button';
        
        // 폴더 위치에 구애받지 않는 영리한 상대 경로 자동 산출
        let loginPath = 'login.html';
        let indexPath = 'products_index.html';
        if (!window.location.pathname.includes('/products/')) {
            loginPath = '../products/login.html';
            indexPath = '../products/products_index.html';
        }

        if (loggedInUser) {
            // 로그인 상태일 때: 유저명 표기 + 클릭 시 로그아웃 처리
            authBtn.className = 'btn-auth-floating is-logged-in';
            authBtn.innerHTML = `
                <i class="fa-solid fa-user-check"></i>
                <span class="tooltip-text">${loggedInUser}님 로그인 중<br/>(클릭 시 로그아웃 🍀)</span>
            `;
            authBtn.addEventListener('click', () => {
                if (confirm(`${loggedInUser}님, 로그아웃 하시겠습니까?`)) {
                    localStorage.removeItem('forlog_current_user');
                    alert("성공적으로 로그아웃되었습니다. 💚");
                    window.location.href = indexPath;
                }
            });
        } else {
            // 비로그인 상태일 때: 자물쇠 아이콘 + 클릭 시 로그인 창 이동
            authBtn.className = 'btn-auth-floating';
            authBtn.innerHTML = `
                <i class="fa-solid fa-lock"></i>
                <span class="tooltip-text">로그인하기 🌱</span>
            `;
            authBtn.addEventListener('click', () => {
                window.location.href = loginPath;
            });
        }
        document.body.appendChild(authBtn);
    }

    // --- [C] 완벽한 원형 레이어 생성 ---
    for (var i = 0; i < sparkles; i++) {
        // 작은 원 (지름 5px)
        var rats = createDiv(5, 5); 
        rats.style.visibility = "hidden";
        rats.style.zIndex = "999";
        document.body.appendChild(tiny[i] = rats);
        starv[i] = 0;
        tinyv[i] = 0;

        var rats = createDiv(8, 8); 
        rats.style.visibility = "hidden";
        rats.style.zIndex = "999";
        document.body.appendChild(star[i] = rats);
    }
    set_width();
    sparkle();

    document.addEventListener("mousemove", function(e) {
        x = e.pageX;
        y = e.pageY;
    });
});

// ==========================================
// 4. 내부 연산 함수 (색상 범위 고정 및 원형 클립 수정)
// ==========================================
function sparkle() {
    var c;
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (c = 0; c < sparkles; c++) if (!starv[c]) {
            star[c].style.left = (starx[c] = x) + "px";
            star[c].style.top = (stary[c] = y + 1) + "px";
            
            star[c].style.clip = "auto"; 
            
            // 옐로우-그린 라인 색상 주입
            star[c].style.backgroundColor = YGColour();
            star[c].style.visibility = "visible";
            starv[c] = 50;
            break;
        }
    }
    for (c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i] == 25) {
        star[i].style.width = "4px";
        star[i].style.height = "4px";
    }
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
            return;
        }
    } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "3px";
        tiny[i].style.height = "3px";
        tiny[i].style.backgroundColor = star[i].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }
}

function update_tiny(i) {
    if (--tinyv[i] == 25) {
        tiny[i].style.width = "1.5px";
        tiny[i].style.height = "1.5px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
            return;
        }
    } else tiny[i].style.visibility = "hidden";
}

window.onscroll = set_scroll;
function set_scroll() {
    if (typeof(self.pageYOffset) == 'number') {
        sdown = self.pageYOffset; sleft = self.pageXOffset;
    } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
        sdown = document.body.scrollTop; sleft = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft = document.documentElement.scrollLeft; sdown = document.documentElement.scrollTop;
    } else {
        sdown = 0; sleft = 0;
    }
}

window.onresize = set_width;
function set_width() {
    var sw_min = 999999, sh_min = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
        if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
    }
    if (typeof(self.innerWidth) == 'number' && self.innerWidth) {
        if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
        if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
        if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
    }
    if (sw_min == 999999 || sh_min == 999999) { sw_min = 800; sh_min = 600; }
    swide = sw_min; shigh = sw_min;
}

function createDiv(height, width) {
    var div = document.createElement("div");
    div.className = "tinker-bubble"; 
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return (div);
}

function YGColour() {
    var r = Math.floor(Math.random() * 156) + 100; 
    var g = 255;                                   
    var b = Math.floor(Math.random() * 50);        
    return "rgb(" + r + ", " + g + ", " + b + ")";
}