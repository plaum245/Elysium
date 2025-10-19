$(document).ready(function () {
	// 문서가 완전히 로드되었을 때 이 함수가 실행됩니다.

	console.clear();
	// 콘솔을 초기화하여 이전 메시지를 지웁니다.

	// Animation----------------------------------------------------------------------------------------------------
	const { gsap } = window;
	// GSAP(GreenSock Animation Platform)을 window 객체에서 가져옵니다. 애니메이션에 사용됩니다.

	// content.card1------------------------------------------------
	const buttons = {
		prev: document.querySelector(".btn--left"),
		next: document.querySelector(".btn--right"),
	};
	// 이전 및 다음 버튼 요소를 정의하고 `buttons` 객체에 저장합니다.

	const cardsContainerEl = document.querySelector(".cards__wrapper");
	const appBgContainerEl = document.querySelector(".app__bg");
	// 카드 및 배경 이미지를 감싸는 메인 컨테이너 요소를 저장합니다.

	const cardInfosContainerEl = document.querySelector(".info__wrapper");
	// 카드 정보가 포함된 요소를 저장합니다.

	buttons.next.addEventListener("click", () => swapCards("right"));
	// 다음 버튼을 클릭할 때 `swapCards` 함수를 "right" 방향으로 호출하도록 이벤트 리스너를 추가합니다.

	buttons.prev.addEventListener("click", () => swapCards("left"));
	// 이전 버튼을 클릭할 때 `swapCards` 함수를 "left" 방향으로 호출하도록 이벤트 리스너를 추가합니다.

	// SwapCards----------------
	function swapCards(direction) {
		// 주어진 방향에 따라 카드를 교체하는 함수입니다.

		const currentCardEl = cardsContainerEl.querySelector(".current--card");
		const previousCardEl = cardsContainerEl.querySelector(".previous--card");
		const nextCardEl = cardsContainerEl.querySelector(".next--card");
		// 현재, 이전, 다음 카드 요소를 선택합니다.

		const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
		const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
		const nextBgImageEl = appBgContainerEl.querySelector(".next--image");
		// 현재, 이전, 다음 배경 이미지 요소를 선택합니다.

		changeInfo(direction);
		// 방향에 따라 카드 정보를 업데이트하는 함수를 호출합니다.

		swapCardsClass();
		// 각 카드 요소의 클래스 이름을 업데이트하여 시각적 효과를 변경하는 함수를 호출합니다.

		removeCardEvents(currentCardEl);
		// 현재 카드에서 이벤트 리스너를 제거하는 함수를 호출합니다.

		function swapCardsClass() {
			// 카드 요소들의 클래스 이름을 변경하여 방향에 따른 효과를 적용하는 내부 함수입니다.

			currentCardEl.classList.remove("current--card");
			previousCardEl.classList.remove("previous--card");
			nextCardEl.classList.remove("next--card");
			// 현재, 이전, 다음 카드에서 특정 클래스를 제거합니다.

			currentBgImageEl.classList.remove("current--image");
			previousBgImageEl.classList.remove("previous--image");
			nextBgImageEl.classList.remove("next--image");
			// 현재, 이전, 다음 배경 이미지에서 특정 클래스를 제거합니다.

			currentCardEl.style.zIndex = "60";
			currentBgImageEl.style.zIndex = "-2";
			// 현재 카드와 배경 이미지의 z-index를 설정하여 적절한 레이어링을 적용합니다.

			if (direction === "right") {
				// 오른쪽 방향으로 카드 이동하는 로직입니다.

				previousCardEl.style.zIndex = "20";
				nextCardEl.style.zIndex = "30";
				// 오른쪽 이동을 위한 이전 및 다음 카드의 z-index를 설정합니다.

				nextBgImageEl.style.zIndex = "-1";
				// 오른쪽 이동을 위한 다음 배경 이미지의 z-index를 설정합니다.

				currentCardEl.classList.add("previous--card");
				previousCardEl.classList.add("next--card");
				nextCardEl.classList.add("current--card");
				// 오른쪽 이동에 맞춰 각 카드 요소에 적절한 클래스를 추가합니다.

				currentBgImageEl.classList.add("previous--image");
				previousBgImageEl.classList.add("next--image");
				nextBgImageEl.classList.add("current--image");
				// 오른쪽 이동에 맞춰 각 배경 이미지 요소에 적절한 클래스를 추가합니다.
			} else if (direction === "left") {
				// 왼쪽 방향으로 카드 이동하는 로직입니다.

				previousCardEl.style.zIndex = "30";
				nextCardEl.style.zIndex = "20";
				// 왼쪽 이동을 위한 이전 및 다음 카드의 z-index를 설정합니다.

				previousBgImageEl.style.zIndex = "-1";
				// 왼쪽 이동을 위한 이전 배경 이미지의 z-index를 설정합니다.

				currentCardEl.classList.add("next--card");
				previousCardEl.classList.add("current--card");
				nextCardEl.classList.add("previous--card");
				// 왼쪽 이동에 맞춰 각 카드 요소에 적절한 클래스를 추가합니다.

				currentBgImageEl.classList.add("next--image");
				previousBgImageEl.classList.add("current--image");
				nextBgImageEl.classList.add("previous--image");
				// 왼쪽 이동에 맞춰 각 배경 이미지 요소에 적절한 클래스를 추가합니다.
			}
		}
	}

		// ChangeInfo----------------
	function changeInfo(direction) {
		let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
		let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
		let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");
		// 현재, 이전, 다음 카드 정보를 선택합니다.

		gsap.timeline()
			.to([buttons.prev, buttons.next], {
				duration: 0.2,
				opacity: 0.5,
				pointerEvents: "none",
			})
			// 다음과 이전 버튼을 일시적으로 비활성화하여 투명도와 클릭 이벤트를 설정합니다.

			.to(
				currentInfoEl.querySelectorAll(".text"),
				{
					duration: 0.4,
					stagger: 0.1, // 한 글자씩 차례대로 올라가는 텍스트 효과
					translateY: "-120px",
					opacity: 0,
				},
				"-="
			)
			// 현재 카드 정보의 텍스트가 위로 사라지도록 애니메이션을 적용합니다.

			.call(() => { // 화살표 함수: `function() { swapInfosClass(); }`의 축약
				swapInfosClass(direction);
			})
			// 카드 정보를 업데이트하는 함수 호출합니다.

			.call(() => initCardEvents())
			// 카드 이벤트를 초기화하는 함수 호출합니다.

			.fromTo(
				direction === "right"
					? nextInfoEl.querySelectorAll(".text")
					: previousInfoEl.querySelectorAll(".text"),
				{
					opacity: 0,
					translateY: "40px",
				},
				{
					duration: 0.4,
					stagger: 0.1,
					translateY: "0px",
					opacity: 1,
				}
			)
			// 방향에 따라 이전 또는 다음 카드 정보가 올라오는 애니메이션을 적용합니다.

			.to([buttons.prev, buttons.next], {
				duration: 0.2,
				opacity: 1,
				pointerEvents: "all",
			});
			// 다음과 이전 버튼의 투명도와 클릭 이벤트를 복원합니다.

		function swapInfosClass() {
			currentInfoEl.classList.remove("current--info");
			previousInfoEl.classList.remove("previous--info");
			nextInfoEl.classList.remove("next--info");
			// 현재, 이전, 다음 정보의 클래스를 제거합니다.

			if (direction === "right") {
				currentInfoEl.classList.add("previous--info");
				nextInfoEl.classList.add("current--info");
				previousInfoEl.classList.add("next--info");
			} else if (direction === "left") {
				currentInfoEl.classList.add("next--info");
				nextInfoEl.classList.add("previous--info");
				previousInfoEl.classList.add("current--info");
			}
			// 방향에 맞춰 카드 정보의 클래스를 업데이트합니다.
		}
	}

	// Current Card Animation----------------
	function updateCard(e) {
		const card = e.currentTarget; // 이벤트가 부착된 부모 요소를 반환합니다.
		const box = card.getBoundingClientRect();
		// 요소의 크기와 현재 뷰포트에서의 요소 위치 정보를 가져옵니다.

		const centerPosition = {
			x: box.left + box.width / 2,
			y: box.top + box.height / 2,
		};
		// 요소의 중심 위치를 계산합니다.

		let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
		// 요소 중심을 기준으로 마우스 위치에 따라 각도를 계산합니다.

		gsap.set(card, {
			"--current-card-rotation-offset": `${angle}deg`,
			// 마우스 움직임에 따라 카드 각도를 설정합니다.
		});

		const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
		gsap.set(currentInfoEl, {
			rotateY: `${angle}deg`,
		});
		// 마우스 움직임에 따라 현재 정보 카드의 각도도 조정합니다.
	}

	function resetCardTransforms(e) {
		const card = e.currentTarget;
		const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");

		gsap.set(card, {
			"--current-card-rotation-offset": 0,
		});
		gsap.set(currentInfoEl, {
			rotateY: 0,
		});
		// 카드와 정보 카드의 각도를 초기화합니다.
	}

	function initCardEvents() {
		const currentCardEl = cardsContainerEl.querySelector(".current--card");
		currentCardEl.addEventListener("pointermove", updateCard);
		// 현재 카드 요소에 마우스 이동 이벤트를 추가하여 `updateCard` 함수를 실행합니다.

		currentCardEl.addEventListener("pointerout", (e) => {
			resetCardTransforms(e);
		});
		// 마우스가 카드에서 벗어날 때 `resetCardTransforms` 함수를 실행합니다.
	}

	function removeCardEvents(card) {
		card.removeEventListener("pointermove", updateCard);
		// 카드에서 마우스 이동 이벤트를 제거하여 `updateCard` 실행을 중지합니다.
	}

		// 초기 애니메이션 함수 설정 ----------------
	function init() {

		let tl = gsap.timeline(); // gsap의 타임라인 애니메이션 객체 생성

		tl.to(cardsContainerEl.children, { // cardsContainerEl의 자식 요소들에 애니메이션 적용
				delay: 0, // 애니메이션 시작 지연 시간 없음
				duration: 0.5, // 애니메이션 지속 시간 설정
				stagger: { // 요소별 애니메이션 시간차 설정
					ease: "power4.inOut", // "power4.inOut" 이징 적용으로 부드러운 시작과 끝 처리
					from: "right", // 오른쪽부터 순차적으로 애니메이션 실행
					amount: 0.1, // 각 요소별 애니메이션 시작 시간차 간격
				},
				"--card-translateY-offset": "0%", // Y축 오프셋을 0%로 설정해 요소가 원래 위치로 이동
			})
			.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), { // 현재 선택된 카드 정보의 텍스트 요소들에 애니메이션 적용
				delay: 0.3, // 애니메이션 지연 시간 0.3초 설정
				duration: 0.5, // 애니메이션 지속 시간 0.5초 설정
				stagger: 0.1, // 텍스트 요소 하나씩 순차적으로 애니메이션 적용
				opacity: 1, // 투명도 100%로 설정
				translateY: 0, // Y축 위치 원래대로 이동
			})
			.to([buttons.prev, buttons.next], { // 이전/다음 버튼에 애니메이션 설정
				duration: 0.4, // 애니메이션 지속 시간 0.4초
				opacity: 1, // 투명도 100%로 설정해 버튼을 보이게 함
				pointerEvents: "all", // 모든 포인터 이벤트 활성화해 버튼 클릭 가능하게 설정
			},
			"-=0.4" // 이전 애니메이션보다 0.4초 일찍 시작
		);
	}

	// 초기 이미지 로드 대기 설정 ----------------
	const waitForImages = () => {
		gsap.set(cardsContainerEl.children, { // cardsContainerEl의 자식 요소들에 설정값 적용
			"--card-translateY-offset": "10vh", // Y축 오프셋을 10vh로 설정해 요소가 위쪽에 위치하도록 함
		});
		gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), { // 현재 카드의 텍스트 요소에 설정값 적용
			translateY: "10px", // Y축 위치를 10px로 설정해 텍스트가 위쪽에 위치
			opacity: 0, // 투명도를 0으로 설정해 보이지 않게 함
		});
		gsap.set([buttons.prev, buttons.next], { // 이전/다음 버튼에 설정값 적용
			pointerEvents: "none", // 포인터 이벤트 비활성화해 클릭 불가 상태로 설정
			opacity: "0", // 투명도를 0으로 설정해 보이지 않게 함
		});
		init(); // 초기 애니메이션 함수 호출
	};

	// 휠 스크롤 이벤트 설정 -------------------------------
	window.addEventListener("wheel", function(e){         // 기본 이벤트 제거: 휠을 굴렸을 때 스크롤이 되지 않도록 하기 위해 
		e.preventDefault();                               // 기본 휠 스크롤 동작 제거한다. passive를 false로 해줘야
	},{passive: false});                                  // preventDefault()을 이용해서 이벤트 자체를 막을 수 있기 때문에, 
//                                                        // 부라우저는 scroll을 계속할 지 안할지 매번 검사하게 된다. 
	var $html = $("html");                                // 참조하는 요소 미리 탐색 및 선언: jQuery로 HTML 요소를 선택

	var page = 1;                                         // 현재 페이지를 1로 초기 설정

	var lastPage = $(".content").length;                  // 마지막 페이지 번호

	$html.animate({scrollTop:0},10);                      // 초기 페이지 로드 시 스크롤 위치를 최상단으로 설정

	$(window).on("wheel", function(e){                    // 휠을 굴리면 다음페이지, 이전페이지: 이벤트 핸들러로 마우스 휠을 굴리면 발생하는 이벤트

		if($html.is(":animated")) return;                 // 애니메이션 중이면 함수 종료

		if(e.originalEvent.deltaY > 0){                   // 휠을 아래로 스크롤할 때
			if(page == lastPage) return;                  // 마지막 페이지라면 페이지 증가하지 않음

			page++;                                       // 현재 페이지 수 1 증가
		}else if(e.originalEvent.deltaY < 0){             // 휠을 위로 스크롤할 때
			if(page == 1) return;                         // 첫 번째 페이지라면 페이지 감소하지 않음

			page--;                                       // 현재 페이지 수 1 감소
		}
		var posTop = (page-1) * $(window).height();       // 현재 페이지의 스크롤 위치 계산
		console.log($(window).height(), posTop, page);    // 현재 창 높이, 스크롤 위치, 페이지 수 출력

		$html.animate({scrollTop : posTop});              // 계산된 위치로 스크롤 이동
	});

	// 스크롤 이동 설정 -------------------------------
	$(".scroll_move").click(function(event) {
		console.log(".scroll_move");
		event.preventDefault(); // 기본 앵커 동작 방지
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500); // 클릭한 위치로 500ms 동안 부드럽게 스크롤 이동
	});

	// 클래스가 'scroll_on"인 모든 요소를 선택 ----------------
	const $counters = $(".scroll_on"); 

	// 노출 비율(%)과 애니메이션 반복 여부(true/false) 설정
	const exposurePercentage = 100;  // 요소가 화면에 100% 노출되었을 때 애니메이션 실행
	const loop = true;               // 애니메이션이 반복되도록 설정 (요소가 화면 밖으로 나가면 다시 숨김)

	// 윈도우의 스크롤 이벤트 모니터링
	$(window).on('scroll', function() {
		// 각 "scroll_on" 클래스 요소에 대해 반복
		$counters.each(function() {
			const $el = $(this); // 현재 요소를 $el에 저장

			// 요소의 위치 정보 가져오기
			const rect = $el[0].getBoundingClientRect();
			const winHeight = window.innerHeight;           // 현재 브라우저 창의 높이
			const contentHeight =  rect.bottom - rect.top;  // 요소의 높이

			// 요소가 화면에 특정 비율만큼 노출될 때 처리
			if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
				$el.addClass('active');     // 요소에 'active' 클래스 추가
				if(page == 2) {             // 현재 페이지가 2라면
					waitForImages();        // 이미지 로딩 대기 함수 호출
				}
			}
			// 요소가 화면에서 완전히 사라졌을 때 처리
			if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
				$el.removeClass('active');   // 요소에서 'active' 클래스 제거
			}
		});
	}).scroll(); // 초기 스크롤 이벤트 호출

})
