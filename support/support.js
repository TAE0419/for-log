// header/footer
$(function () {
            $('.gnb > li').mouseenter(function () {
                $('.snb').stop().slideUp(300);
                $(this).children('.snb').stop().slideDown(300);
            });
            $('.gnb > li').mouseleave(function () {
                $('.snb').stop().slideUp(300);
            });

            $('.ham').click(function () {
                $('.dim').addClass('on');
                $('.hamSideMenu').addClass('on');
            });
            $('.dim').click(function () {
                $('.dim').removeClass('on');
                $('.hamSideMenu').removeClass('on');
            });
            $('.close').click(function () {
                $('.dim').removeClass('on');
                $('.hamSideMenu').removeClass('on');
            });

            $('.hamGnb > li > a').click(function (e) {
                e.preventDefault();
                let myMenu = $(this).siblings('.hamSnb');
                $('.hamSnb').not(myMenu).stop().slideUp(300);
                $(this).siblings('.hamSnb').stop().slideToggle(300);
            });
        });

// FAQ 
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const currentItem = question.closest('.faq-item');

        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });

        currentItem.classList.toggle('active');
    });
});

// AIP

let searchMarkers = []; 
    
// 정확한 위도와 경도 고정 좌표
const companyCoords = new kakao.maps.LatLng(37.30836859, 126.8509804); 

const mapContainer = document.getElementById('map'); 
const mapOption = {
    center: companyCoords, 
    level: 3 
};  

// 지도를 생성합니다    
const map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places();  
const infowindow = new kakao.maps.InfoWindow({ zIndex: 5 });

// 1. 회사 고정 핀 마커 생성
const companyMarker = new kakao.maps.Marker({
    position: companyCoords
});
companyMarker.setMap(map); // 처음에는 지도에 표시

// 2. 메인 초록 큰 말풍선 구조 세팅
const overlayContent = `
<div class="map-overlay-box">
    <div class="overlay-header">
        <span class="overlay-title">FOR-LOG</span>
    </div>
    <div class="overlay-body">
        <div class="overlay-img">
            <img src="img/smile 1.png" alt="FOR-LOG 개구리">
        </div>
        <div class="overlay-content">
            <p class="addr">경기 안산시 상록구 광덕1로 375</p>
            <p class="sub">4호선 한대앞역 2번 출구 > 도보 200m</p>
            <a href="#location" class="lnk">홈페이지</a>
        </div>
    </div>
</div>
`;

const companyWindow = new kakao.maps.CustomOverlay({
    content: overlayContent,
    map: map,
    position: companyCoords,
    yAnchor: 1.35 
});

// 렌더링 타이밍 이슈 방지 리사이즈 처리
setTimeout(function() {
    map.relayout();
    map.setCenter(companyCoords);
}, 300);

// 키워드 검색 함수 실행 시 (회사 고정 핀과 큰 말풍선을 모두 지도에서 숨김)
window.searchPlaces = function() {
    const keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    removeSearchMarkers();

    // 1) 검색창이 뜨면 큰 초록색 말풍선을 숨깁니다.
    if (typeof companyWindow !== 'undefined') {
        companyWindow.setMap(null);
    }
    
    // 2) 주변 맛집 클릭을 방해하지 않도록 회사 고정 핀도 지도에서 완전히 숨깁니다.
    if (typeof companyMarker !== 'undefined') {
        companyMarker.setMap(null);
    }

    if (companyCoords) {
        ps.keywordSearch(keyword, placesSearchCB, {
            location: companyCoords,
            radius: 2000 
        });
    } else {
        ps.keywordSearch(keyword, placesSearchCB, {
            location: map.getCenter(),
            radius: 2000
        });
    }
};

// 목록 우측 상단 ✕ 버튼 클릭 시 작동하는 함수 (회사 위치 복원)
window.closePlacesList = function() {
    const menuEl = document.getElementById('menu_wrap');
    if (menuEl) menuEl.style.display = 'none';
    
    // 검색된 마커들을 싹 지웁니다.
    removeSearchMarkers();

    // ✕ 버튼을 누르면 회사 고정 핀과 큰 말풍선을 다시 지도에 나타나게 하고 중심으로 이동합니다.
    if (typeof companyMarker !== 'undefined') {
        companyMarker.setMap(map);
    }

    if (typeof companyWindow !== 'undefined' && typeof map !== 'undefined') {
        companyWindow.setMap(map);
        map.setCenter(companyCoords);
    }
};

// 장소검색 완료 콜백함수
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        const menuEl = document.getElementById('menu_wrap');
        if (menuEl) menuEl.style.display = 'block';

        displayPlaces(data);
        displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
    }
}

// 검색 결과 목록과 마커를 표출하는 함수
function displayPlaces(places) {
    const listEl = document.getElementById('placesList'); 
    const menuEl = document.getElementById('menu_wrap');
    const fragment = document.createDocumentFragment(); 
    const bounds = new kakao.maps.LatLngBounds(); 
    
    if (listEl) removeAllChildNods(listEl);
    removeSearchMarkers();
    
    for (let i = 0; i < places.length; i++) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i); 
        const itemEl = getListItem(i, places[i]); 

        bounds.extend(placePosition);

        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title);
            });
            if (itemEl) {
                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                };
                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            }
        })(marker, places[i].place_name);

        if (itemEl) fragment.appendChild(itemEl);
    }

    if (listEl) {
        listEl.appendChild(fragment);
        if (menuEl) menuEl.scrollTop = 0;
    }

    map.setBounds(bounds);
}

// 검색결과 항목을 엘리먼트로 반환하는 함수
function getListItem(index, places) {
    const el = document.createElement('li');
    let itemStr = '<div class="info" style="padding:10px 0; border-bottom:1px solid #eee; font-size:13px; cursor:pointer;">' +
                  '   <h5 style="margin:0 0 5px 0; color:#2C4224; font-size:14px;">' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span style="color:#666;">' + places.road_address_name + '</span><br>';
    } else {
        itemStr += '    <span style="color:#666;">' +  places.address_name  + '</span><br>'; 
    }
    itemStr += '  <span style="color:#999; font-size:11px;">' + places.phone  + '</span>' +
               '</div>';           

    el.innerHTML = itemStr;
    return el;
}

// 검색 마커 생성 함수
function addMarker(position, idx) {
    const marker = new kakao.maps.Marker({
        position: position
    });

    marker.setMap(map); 
    searchMarkers.push(marker); 

    return marker;
}

// 검색 마커 제거 함수
function removeSearchMarkers() {
    for (let i = 0; i < searchMarkers.length; i++) {
        searchMarkers[i].setMap(null);
    }   
    searchMarkers = [];
    infowindow.close();
}

// 페이지번호 표시 함수
function displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    const fragment = document.createDocumentFragment(); 

    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;
        el.style.margin = "0 5px";
        el.style.textDecoration = "none";
        el.style.color = "#333";

        if (i === pagination.current) {
            el.style.fontWeight = "bold";
            el.style.color = "var(--main-color, #2C4224)";
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 인포윈도우 표출 함수 (검색 리스트용)
function displayInfowindow(marker, title) {
    const content = '<div style="padding:5px;z-index:1;font-size:12px;color:#333;">' + title + '</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}

function removeAllChildNods(el) { 
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

// 엔터키 검색 이벤트
const keywordInput = document.getElementById('keyword');
if (keywordInput) {
    keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.searchPlaces();
        }
    });
}