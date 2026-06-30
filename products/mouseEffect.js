// ==========================================
// 1. 공통 스타일 주입 (탑버튼 + 완벽한 원형 스타일)
// ==========================================
const style = document.createElement('style');
style.textContent = `
    /* 우측 하단 탑버튼 */
    .btn-top {
        position: fixed;
        bottom: 40px; right: 40px;
        width: 50px; height: 50px;
        background-color: #333; color: #fff;
        border: none; border-radius: 50%;
        z-index: 10001; 
        font-size: 14px; font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        opacity: 0; visibility: hidden;
        transition: all 0.3s ease;
        cursor: pointer; 
    }
    .btn-top:hover { background-color: #555; }
    .btn-top.is-show { opacity: 1; visibility: visible; }

    /* 모든 입자를 찌그러짐 없는 완벽한 원형으로 고정 */
    .tinker-bubble {
        border-radius: 50% !important;
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

    // --- [B] 완벽한 원형 레이어 생성 ---
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
        // 크기가 줄어들 때도 찌그러지지 않게 축소 조절
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
        // 색상 유지
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

// [수정] 색상 범위를 노란색(Yellow)에서 초록색(Green) 라인으로 한정하는 새로운 랜덤 함수
function YGColour() {
    var r = Math.floor(Math.random() * 156) + 100; // 100 ~ 255 (높은 레드로 노란 톤 확보)
    var g = 255;                                   // 그린 최대 고정 (연두~초록 베이스)
    var b = Math.floor(Math.random() * 50);        // 0 ~ 50 (블루를 최소화하여 노랑-초록 유도)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}