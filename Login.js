// --------------------------- 기본 전환 관련 코드 ---------------------------

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// 'register' 버튼 클릭 시
registerBtn.addEventListener('click', () => {
    container.classList.add("active"); // 컨테이너에 "active" 클래스를 추가 (회원가입 폼 표시)
});

// 'login' 버튼 클릭 시
loginBtn.addEventListener('click', () => {
    container.classList.remove("active"); // 컨테이너에서 "active" 클래스 제거 (로그인 폼 표시)
});


// --------------------------- sign up / login 기능 ---------------------------

// HTML 문서가 완전히 로드되었을 때 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {

    const signinBtn = document.getElementById('signin');
    const signupBtn = document.getElementById('signin-btn');
    const loginBtn2 = document.getElementById('login-btn');

    // 로그인 시 사용자 ID를 입력하는 input 요소 가져오기
    const userIdInput = document.getElementById('user-id');

    // 페이지가 처음 로드될 때, sessionStorage에 저장된 로그인된 사용자 ID를 가져옴
    const savedUserId = sessionStorage.getItem('loggedInUser');

    // 저장된 ID가 있으면 로그인된 상태로 설정 (true), 없으면 false
    let isLoggedIn = savedUserId ? true : false;

    // 로그인된 상태라면 네비게이션 바를 사용자 ID로 업데이트
    if (isLoggedIn) {
        updateNavbar(savedUserId);
    }

    // ------------------- 로그인 버튼 클릭 이벤트 -------------------
    signinBtn.addEventListener('click', () => {
        // 입력창에 입력된 사용자 ID를 공백 제거 후 가져오기
        const userId = userIdInput.value.trim();

        // ID가 비어있지 않다면
        if (userId !== "") {
            sessionStorage.setItem('loggedInUser', userId); // sessionStorage에 사용자 ID 저장
            isLoggedIn = true; // 로그인 상태로 변경
            updateNavbar(userId); // 네비게이션 바를 ID로 업데이트
            location.reload(); // 페이지 새로고침 (변경사항 반영)
        }
    });

    // ------------------- 로그아웃 버튼 클릭 이벤트 -------------------
    loginBtn2.addEventListener('click', () => {
        // 로그인 상태일 경우
        if (isLoggedIn) {
            sessionStorage.removeItem('loggedInUser'); // sessionStorage에서 사용자 ID 삭제
            isLoggedIn = false; // 로그아웃 상태로 변경
            updateNavbar(""); // 네비게이션 바 초기화
            location.reload(); // 페이지 새로고침 (로그아웃 반영)
        }
    });

    // ------------------- 네비게이션 바 업데이트 함수 -------------------
    function updateNavbar(userId) {
        if (isLoggedIn) {
            signupBtn.textContent = userId; // 'Sign Up' 글자를 사용자 ID로 변경
            loginBtn2.textContent = 'Log Out'; // 'Login' 글자를 'Log Out'으로 변경
        } else {
            signupBtn.textContent = 'Sign Up'; // 'Sign Up'으로 원래대로 복원
            loginBtn2.textContent = 'Login'; // 'Login'으로 원래대로 복원
        }
    }
});
