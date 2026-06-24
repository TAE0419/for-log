$(document).ready(function() {

    /* ----------------------------------------------------------------------
       1. FAQ (자주 묻는 질문) 아코디언 토글 제어
       ---------------------------------------------------------------------- */
    $('.faq-question').on('click', function() {
        var $currentItem = $(this).closest('.faq-item');
        var $currentAnswer = $currentItem.find('.faq-answer');

        // 이미 열려있는 항목을 누른 경우 -> 부드럽게 닫기
        if ($currentItem.hasClass('active')) {
            $currentAnswer.slideUp(250, function() {
                $currentItem.removeClass('active');
            });
        } 
        // 닫혀있는 항목을 누른 경우 -> 기존 열린 항목들을 닫고 이 항목만 열기
        else {
            $('.faq-item.active').find('.faq-answer').slideUp(250);
            $('.faq-item.active').removeClass('active');

            $currentItem.addClass('active');
            $currentAnswer.stop().slideDown(250);
        }
    });


    /* ----------------------------------------------------------------------
       2. NEWS (공지사항) 목록 - 상세보기 화면 연동 인터랙션
       ---------------------------------------------------------------------- */
    var newsData = {
        5: { title: "FOR-LOG 서비스 점검 안내", date: "2026.06.23", content: "안녕하세요. FOR-LOG 팀입니다.<br><br>안정적인 서비스 제공을 위해 정기 시스템 점검이 진행될 예정입니다.<br>점검 시간 동안에는 서비스 이용이 일시 제한되오니 양해 부탁드립니다.<br><br>■ 점검 시간: 2026년 6월 24일 02:00 ~ 06:00 (4시간)" },
        4: { title: "개인정보처리방침 개정 안내", date: "2026.06.15", content: "안녕하세요. FOR-LOG입니다.<br><br>새로운 연동 기능 도입에 따라 개인정보처리방침이 개정될 예정입니다.<br>변경된 세부 조항은 마이페이지 공지 문서에서 상시 확인 가능합니다." },
        3: { title: "[이벤트] 여름맞이 한정판 포록이 다이어리 스티커 증정 안내", date: "2026.06.01", content: "포록이 캐릭터를 사랑해주시는 유저분들을 위한 한정판 굿즈 이벤트!<br>이번 달 벨로그/로그 작성 미션을 달성하신 모든 분께 스마트 다이어리 스티커 팩을 우편으로 발송해 드립니다." },
        2: { title: "모바일 앱(App) 환경 최적화 업데이트 완료 안내", date: "2026.05.20", content: "FOR-LOG 모바일 웹뷰 및 하이브리드 앱 환경에서의 레이아웃 깨짐 현상을 수정하고 폰트 로딩 속도를 200% 개선하였습니다." },
        1: { title: "FOR-LOG 정식 서비스 런칭 및 가입 축하 가이드", date: "2026.05.01", content: "반갑습니다! 당신의 하루를 기록하는 FOR-LOG가 드디어 정식 오픈했습니다.<br>지금 첫 로그를 작성하고 웰컴 포인트를 받아 가세요!" }
    };

    // 테이블 로우(Row) 클릭 이벤트
    $('.news-table tbody').on('click', '.news-item', function() {
        var id = $(this).data('id');
        var data = newsData[id];

        if(data) {
            $('.detail-title').text(data.title);
            $('.detail-date').text(data.date);
            $('.detail-content').html(data.content);

            // 목록을 숨기고 디테일 패널 표시
            $('.news-list-stripe-bg').fadeOut(200, function() {
                $('.news-detail-wrap').fadeIn(200);
            });
        }
    });

    // 상세보기 내 '목록으로 돌아가기' 버튼 클릭 이벤트
    $('.btn-back-list').on('click', function() {
        $('.news-detail-wrap').fadeOut(200, function() {
            $('.news-list-stripe-bg').fadeIn(200);
        });
    });

});