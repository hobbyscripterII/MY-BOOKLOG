$(document).ready(function() {
	const loginPath   = '/admin/login';
	const currentPath = location.pathname;
	
	if(currentPath != loginPath) {
		contentsClear();
		getInfo();
	}
});

function login() {
	const id  = $('#id');
	const pwd = $('#pwd');
	
	if(id.val() == '' && pwd.val() == '') {
		alert('아이디 혹은 패스워드가 입력되지 않았습니다.');
		return false;
	} else {
		$('#form').submit();
	}
}

function getInfo() {
	contentsClear();
	
	const el = `<div class="wrap">
					<div class="highlight-wrap first">
						<p class="highlight first">많이 읽을수록 더 많이 알게 된다. <br> 더 많이 배울수록 더 멀리 가게 된다.</p>
						<p class="author">- Dr. Seuss -</p>
					</div>
				</div>
				<div class="wrap">
					<div class="highlight-wrap" onclick="getReadme()" style="text-align: center; cursor: pointer">
						<h2>프로젝트 소개</h2>
					</div>
				</div>`
	
	$('.contents').append(el);
}

function contentsClear() {
	const $contents = $('.contents');
	
	$contents.empty();
	
	const el = `<div class="wrap">
					<div class="nav">
						<p><a onclick="getInfo()">홈</a></p>
						<p onclick="getReadme()">소개</p>
						<p onclick="getHighlight()">북마크</p>
						<p><a onclick="getBook('A_1')">읽기 전</a></p>
						<p><a onclick="getBook('A_2')">읽는 중</a></p>
						<p><a onclick="getBook('A_3')">읽기 완료</a></p>
						<p><a href="login">로그인</a></p>
					</div>
				</div>`;
	
	$contents.append(el);
}

function getReadme() {
	contentsClear();
	
	const el = `<div class="wrap">
					<div class="highlight-wrap">
					<p class="highlight readme">🗨️ 프로젝트 기획 목적</p>
					<p class="highlight readme">🥹 책 더 열심히 읽을려고</p>
					<br>
					<p class="highlight readme">🗨️ 프로젝트 제작 기간</p>
					<p class="highlight readme">🥹 2025-04-12 ~ 2025-04-13</p>
					<br>
					<p class="highlight readme">🗨️ 프로젝트 특징</p>
					<p class="highlight readme">🥹 AJAX 떡칠 & NO Bootstrap..</p>
					<p class="highlight readme">🥹 모바일 최적화(아마도)</p>
					<br>
					<p class="highlight readme">🗨️ 프로젝트 기능</p>
					<img src="/image/img-admin-home.png">
					<p class="highlight readme">🥹 작고 귀여운 관리자 페이지</p>
					<img src="/image/img-admin-highlight-add.png">
					<p class="highlight readme">🥹 등록된 서적에 인상깊은 구절을 기록할 수 있다.</p>
					<img src="/image/img-admin-highlight-modify.png">
					<p class="highlight readme">🥹 수정도 가능하며 고정 기능도 있다.</p>
					<img src="/image/img-admin-book-add.png">
					<p class="highlight readme">🥹 서적 등록이 가능하다.</p>
					<img src="/image/img-admin-book-modify.png">
					<p class="highlight readme">🥹 수정 및 삭제가 가능하다.</p>
					<br>
					<p class="highlight readme">🗨️ 프로젝트를 마무리하며</p>
					<p class="highlight readme">🥹 디자인을 보니 내가 백엔드라서 다행이다..</p>
					<p class="highlight readme">🥹 만들지말고 있는 거 쓰자..</p>
					</div>
				</div>`;
				
	$('.contents').append(el);
}

function getBook(status) {
	contentsClear();
	
	const dto = {'searchReadingStatusCode' : status};

			$.ajax({
			    type : 'GET',
			    url : '/book',
				data : dto,
			    dataType : 'json',
			    contentType : 'application/json',
			    success: (data) => {
					const status = data.status;
					
					if(status != '200') {
						alert('[알림] 데이터를 로드할 수 없습니다.');
					} else {
						const result = data.data;
						const dataLength = result.length;
						
						if(dataLength == 0) {
							const el = `<div class="wrap">
											<div class="highlight-wrap" style="text-align: center">
												<p>아직 없습니다.</p>
											</div>
										</div>`

							$('.contents').append(el);
						} else {
							$.each(result, function(idx, item) {
								const author   	= item.author    || '';
								const title  	= item.title     || '';
								const publisher = item.publisher || '';
								
								const el = `<div class="wrap">
												<div class="highlight-wrap">
													<p>제목 : ${title}</p>
													<p>저자 : ${author}</p>
													<p>출판사 : ${publisher}</p>
												</div>
											</div>`
								
								$('.contents').append(el);
							});
						}
						
					}
			    },
			    error: (x) => {
					console.log(x);
				}
			});
}

function getHighlight() {
	contentsClear();
	
	// const dto = {'' : , '' : };

	$.ajax({
	    type : 'GET',
	    url : '/book/highlight',
		// data : dto,
	    dataType : 'json',
	    contentType : 'application/json',
	    success: (data) => {
			const status = data.status;
			let el       = ``;
			
			if(status != '200') {
				alert('[알림] 데이터를 로드할 수 없습니다.');
			} else {
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const author   	= item.author    || '';
					const title  	= item.title     || '';
					const highlight = item.highlight || '';
					const fixYn     = item.fixYn     || 'N';
					
					if(fixYn == 'Y') {
						el += `<div class="wrap" style="justify-content: right">
								   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
								       <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
								   </svg>`;
					} else {
						el += `<div class="wrap">`;
					}
					
					el += `<div class="highlight-wrap">
									<p class="highlight">${highlight}</p>
									<p class="author">- ${title} '${author}' -</p>
						   </div>
					   </div>`;
				});
				
				$('.contents').append(el);
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}