$(document).ready(function () {
    // 문서가 완전히 로드되었을 때 이 함수가 실행됩니다.
    console.clear();  // 콘솔을 초기화하여 이전 메시지를 지웁니다.

    // 제품 목록 초기화
    const products = [
        { id: 1, name: '마시멜로 핫초코', price: 5500 },
        { id: 2, name: '애플 시나몬', price: 5500 },
        { id: 3, name: '딸기 스노우 케이크', price: 5800 },
        { id: 4, name: '스노우 베리 와플', price: 6000 },
        { id: 5, name: '아메리카노', price: 4500 },
        { id: 6, name: '카페 라떼', price: 5000 },
        { id: 7, name: '카라멜 마키아토', price: 5500 },
        { id: 8, name: '카페 모카', price: 5500 },
        { id: 9, name: '콜드브루', price: 5000 },
        { id: 10, name: '레몬 에이드', price: 5200 },
        { id: 11, name: '청포도 에이드', price: 5200 },
        { id: 12, name: '허브 티', price: 4800 },
        { id: 13, name: '홍차', price: 4800 },
        { id: 14, name: '허니 밀크 케이크', price: 5500 },
        { id: 15, name: '티라미수 쇼콜라 케이크', price: 6000 },
        { id: 16, name: '바닐라 캐러멜 케이크', price: 5800 },
        { id: 17, name: '초코 와플', price: 6000 },
        { id: 18, name: '딸기 와플', price: 6200 },
        { id: 19, name: '아몬드 와플', price: 6200 }
    ];

    let cart = [];  // 장바구니 배열 초기화

    const cartContainer = document.getElementById('cart-container');  // 장바구니 HTML 요소 선택
    const totalPriceElem = document.getElementById('total-price');  // 총 금액을 표시할 HTML 요소 선택

    // 장바구니에 제품 추가하는 함수
    const addToCart = (id) => {
        const product = products.find(p => p.id === id);  // id로 제품 찾기
        const existingItem = cart.find(item => item.id === id);  // 장바구니에 이미 있는지 확인

        if (existingItem) {  // 이미 장바구니에 있는 경우
            existingItem.quantity += 1;  // 수량 증가
        } else {
            cart.push({ ...product, quantity: 1 });  // 새로운 제품 추가
        }
        renderCart();  // 장바구니 렌더링 함수 호출
    };

    // 장바구니 내용 렌더링 함수
    const renderCart = () => {
        if (cart.length === 0) {  // 장바구니가 비었을 경우
            cartContainer.innerHTML = '<p>장바구니가 비어있습니다.</p>';
            totalPriceElem.innerHTML = '';  // 총 금액 비우기
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <span>${item.name}</span>
                    <div>
                        <button class="dec" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="inc" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">삭제</button>
                    </div>
                </div>
            `).join('');  // 장바구니 항목을 HTML로 변환

            totalPriceElem.innerHTML = `총 금액: ${getTotalPrice().toLocaleString()}원`;  // 총 금액 업데이트

            // 각 버튼에 이벤트 리스너 추가
            document.querySelectorAll('.dec').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.closest('.cart-item').getAttribute('data-id'));
                    updateQuantity(productId, 'decrease');  // 수량 감소
                });
            });

            document.querySelectorAll('.inc').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.closest('.cart-item').getAttribute('data-id'));
                    updateQuantity(productId, 'increase');  // 수량 증가
                });
            });

            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.closest('.cart-item').getAttribute('data-id'));
                    removeFromCart(productId);  // 장바구니에서 삭제
                });
            });
        }
    };

    // 수량 업데이트 함수 (증가/감소)
    const updateQuantity = (id, action) => {
        const item = cart.find(i => i.id === id);  // 해당 제품 찾기
        if (item) {
            if (action === 'increase') {
                item.quantity += 1;  // 수량 증가
            } else if (action === 'decrease') {
                item.quantity = Math.max(1, item.quantity - 1);  // 최소 수량 1로 설정
            }
            renderCart();  // 장바구니 렌더링
        }
    };

    // 장바구니에서 제품 삭제 함수
    const removeFromCart = (id) => {
        const itemIndex = cart.findIndex(i => i.id === id);  // 해당 제품 인덱스 찾기
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);  // 제품 삭제
        }
        renderCart();  // 장바구니 렌더링
    };

    // 총 금액 계산 함수
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);  // 총 금액 계산
    };

    // '장바구니에 추가' 버튼 클릭 이벤트
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.closest('.product').getAttribute('data-id'));  // 제품 ID 추출
            addToCart(productId);  // 장바구니에 추가
        });
    });

    renderCart();  // 페이지 로드 시 장바구니 렌더링

    // 휠 스크롤 이벤트 설정-----------------------------------------------------------------------------

    window.addEventListener("wheel", function(e){ 
        e.preventDefault();              // 기본 휠 스크롤 동작 제거 (스크롤을 방지)
    }, {passive: false});                // passive: false를 설정하여 preventDefault()가 제대로 동작하도록 설정

    var $html = $("html");               // jQuery로 HTML 요소를 선택하여 $html 변수에 할당

    var page = 1;                        // 현재 페이지를 1로 초기화

    var lastPage = $(".content").length; // 마지막 페이지 번호를 구함

    $html.animate({scrollTop: 0}, 10);   // 페이지 로드시, 스크롤을 최상단으로 이동시킴

    $(window).on("wheel", function(e) { 
        if($html.is(":animated")) return; // 애니메이션이 실행 중이면 이벤트를 종료

        if(e.originalEvent.deltaY > 0) {        // 휠을 아래로 스크롤할 때
            if(page == lastPage) return;        // 마지막 페이지면 페이지를 증가시키지 않음
            page++;                             // 페이지 수 증가
        } else if(e.originalEvent.deltaY < 0) { // 휠을 위로 스크롤할 때
            if(page == 1) return;               // 첫 페이지면 페이지를 감소시키지 않음
            page--;                             // 페이지 수 감소
        }

        var posTop = (page - 1) * $(window).height(); // 현재 페이지의 스크롤 위치 계산
        $html.animate({scrollTop: posTop});           // 계산된 위치로 스크롤을 부드럽게 이동
    });

    // 스크롤 이동 설정
    $(".scroll_move").click(function(event) {
        event.preventDefault();                                             // 기본 앵커 동작 방지
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500); // 클릭 위치로 부드럽게 스크롤
    });

    // 클래스가 'scroll_on'인 모든 요소 선택
    const $counters = $(".scroll_on");

    // 노출 비율 설정: 화면에 100% 노출되었을 때 애니메이션 실행
    const exposurePercentage = 100;

    // 애니메이션 반복 여부 설정 (요소가 화면 밖으로 나가면 다시 숨김)
    const loop = true;

    // 윈도우 스크롤 이벤트 모니터링
    $(window).on('scroll', function() {
        // 각 "scroll_on" 클래스 요소에 대해 반복
        $counters.each(function() {
            const $el = $(this); // 현재 요소를 $el에 저장

            const rect = $el[0].getBoundingClientRect();  // 요소의 위치 정보 가져오기
            const winHeight = window.innerHeight;         // 브라우저 창의 높이
            const contentHeight = rect.bottom - rect.top; // 요소의 높이

            // 요소가 화면에 노출될 때 애니메이션 실행
            if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                $el.addClass('active'); // 요소에 'active' 클래스 추가
                if (page == 2) {        // 페이지가 2일 때
                    waitForImages();    // 이미지 로딩 대기 함수 호출
                }
            }

            // 요소가 화면 밖으로 나갔을 때
            if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                $el.removeClass('active'); // 요소에서 'active' 클래스 제거
            }
        });
    }).scroll(); // 스크롤 이벤트 호출
});
