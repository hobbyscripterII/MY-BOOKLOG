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
					<div class="highlight-wrap info" onclick="getReadme()" style="text-align: center; cursor: pointer">
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
					</div>
				</div>`;
	
	$contents.append(el);
}

function getReadme() {
	contentsClear();
	
	const el = `<div class="wrap">
					<div class="highlight-wrap">
					<p class="highlight readme">📌 프로젝트 기획 목적</p>
					<p class="highlight readme">▫️ 동기부여</p>
					<p class="highlight readme">▫️ 구절 기록용</p>
					<br>
					<p class="highlight readme">📌 프로젝트 제작 기간</p>
					<p class="highlight readme">▫️ 2025-04-12 ~ 2025-04-13</p>
					<br>
					<p class="highlight readme">📌 기술스택</p>
					<p class="highlight readme">▫️ Spring Boot, Spring Security</p>
					<p class="highlight readme">▫️ HTML/CSS, JQuery(AJAX)</p>
					<p class="highlight readme">▫️ RaspberryPI</p>
					<p class="highlight readme">▫️ Docker</p>
					<p class="highlight readme">▫️ Apache(Proxy Pass)</p>
					<p class="highlight readme">▫️ SSL</p>
					<br>
					<p class="highlight readme">📌 프로젝트 특징</p>
					<p class="highlight readme">▫️ 원페이지 프로젝트(AJAX)</p>
					<p class="highlight readme">▫️ NO BOOTSTRAP</p>
					<p class="highlight readme">▫️ 모바일 최적화(아마도)</p>
					<br>
					<p class="highlight readme">📌 프로젝트를 마무리하며</p>
					<p class="highlight readme">▫️ 디자인을 보니 내가 백엔드라서 다행이다.</p>
					<p class="highlight readme">▫️ 만들지말고 있는 거 쓰자..</p>
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
					
					el += `<div class="wrap">`;
					el += `<div class="highlight-wrap">`;
					
					if(fixYn == 'Y') {
						el += `<div style="text-align: right"><img class="img-bookmark" src="/image/img-bookmark.png"></div>`;
					}
					
					el += `<p class="highlight book-font">${highlight}</p>
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