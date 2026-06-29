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

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
    const mapOption = {
        center: new kakao.maps.LatLng(37.31, 126.84), // 초기 임시 좌표 (주소 변환 전)
        level: 3 // 지도의 확대 레벨
    };  

    // 지도를 생성합니다    
    const map = new kakao.maps.Map(mapContainer, mapOption); 

    // 장소 검색 서비스 객체를 생성합니다
    const ps = new kakao.maps.services.Places(); 

    // 검색된 마커들을 담을 배열입니다 (변하는 값이므로 let 사용)
    let searchMarkers = [];
    
    // 인포윈도우(말풍선) 객체 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 회사 위치를 저장할 변수
    let companyCoords = null;

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 1. 소희님 주소로 지도의 중심을 잡고 기본 마커를 찍습니다
    geocoder.addressSearch('경기도 안산시 상록구 광덕산2로 376', (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            companyCoords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 회사 위치 마커 생성
            const marker = new kakao.maps.Marker({
                map: map,
                position: companyCoords
            });

            // 회사 마커 위에 띄울 말풍선
            const companyWindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;font-size:12px;font-weight:bold;color:#2C4224;">FOR-LOG</div>'
            });
            companyWindow.open(map, marker);

            // 지도의 중심을 안산 주소로 이동시킵니다
            map.setCenter(companyCoords);
        } 
    });    

    // 2. 키워드 검색 기능 함수
   function searchPlaces() {
    const keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    removeSearchMarkers();

    // companyCoords(안산 주소2000m(2km) 안에서만 검색합니다.
    if (companyCoords) {
        ps.keywordSearch(keyword, placesSearchCB, {
            location: companyCoords,
            radius: 2000 // 미터 단위 (2km)
        });
    } else {
        // 혹시라도 주소 로드가 늦어지면 현재 지도 중심 기준으로 검색합니다.
        ps.keywordSearch(keyword, placesSearchCB, {
            location: map.getCenter(),
            radius: 2000
        });
    }
}

    // 엔터키를 눌러도 검색이 실행되도록 설정
    document.getElementById('keyword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPlaces();
        }
    });

    // 장소검색이 완료됐을 때 호출되는 콜백함수입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();

            for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

            // 검색된 장소들이 화면에 다 보이도록 지도 시점을 조정합니다
            map.setBounds(bounds);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
        }
    }

    // 지도에 검색 마커를 표시하는 함수입니다
    function displayMarker(place) {
        const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        searchMarkers.push(marker);

        // 마커를 클릭하면 장소 이름이 말풍선으로 뜹니다
        kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(`<div style="padding:5px;font-size:12px;max-width:200px;word-break:break-all;">${place.place_name}</div>`);
            infowindow.open(map, marker);
        });
    }

    // 이전 검색 마커들을 제거하는 함수입니다
    function removeSearchMarkers() {
        for (let i = 0; i < searchMarkers.length; i++) {
            searchMarkers[i].setMap(null);
        }
        searchMarkers = [];
        infowindow.close();
    }
