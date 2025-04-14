let readingStatusHtml = ``;

function getReadingStatusHtml() {
	$.ajax({
	    type : 'GET',
	    url : '/book/reading_status_code',
	    dataType : 'json',
	    contentType : 'application/json',
	    success: (data) => {
			const status = data.status;
			
			if(status != '200') {
				alert('[알림] 데이터를 로드할 수 없습니다.');
			} else {
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const code = item.code || '';
					const name = item.name || '';
					
					readingStatusHtml += `<option value="${code}">${name}</option>`;
				});
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}

$(document).ready(function() {
	getInfo();
	getReadingStatusHtml();
});

function getInfo() {
	contentsClear();
	
	const el = `<div class="wrap">
					<div class="highlight-wrap first">
						<p class="highlight first">안녕하세요. <br>북로그 관리자 페이지입니다.</p>
					</div>
				</div>`
	
	$('.contents').append(el);
}

function contentsClear() {
	$('.contents').empty();
}

function addCencle(el) {
	if(confirm('등록을 취소하시겠습니까?')) {
		const wrapEl = $(el).closest('.wrap');
		wrapEl.remove();
	}
}

function addForm(el) {
	const html = `<div class="wrap">
				      <div class="highlight-wrap add">
							<label>하이라이트</label>
							<p class="highlight"><textarea id="highlight"></textarea></p>
								<label>제목</label>
							<p>
							<select id="author">
							</select>
							</p>
							<div class="btn-wrap">
								<button class="btn-red" onclick="addCencle(this)">등록 취소</button>
								<button class="btn-blue" onclick="add(this)">등록 완료</button>
							</div>
						</div>
					</div>`;

	const dto = {'searchReadingStatusCode' : 'A_2'};
					
	$.ajax({
	    type : 'GET',
	    url : '/book',
		data : dto,
	    dataType : 'json',
	    contentType : 'application/json',
	    success: (data) => {
			const status = data.status;
			let optionEl = ``;
			
			if(status != '200') {
				alert('[알림] 데이터를 로드할 수 없습니다.');
			} else {
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const ibook  = item.ibook;
					const title  = item.title;
					const author = item.author;
					
					optionEl += `<option value="${ibook}">${title} -${author}-</option>`;	
				});
				
				$(el).closest('.btn-wrap.top').after(html);
				$('#author').append(optionEl);
			}
	    },
	    error: (x) => {
			console.log(x);
		}
	});
}

function add(el) {
	if(confirm('등록하시겠습니까?')) {
		const highlightWrapEl = $(el).closest('.highlight-wrap');
		const highlightEl     = highlightWrapEl.find('.highlight textarea');
		const ibook           = highlightWrapEl.find('#author').val();
		const highlightText   = highlightEl.val();
		const dto 		      = {"ibook" : ibook, "highlight" : highlightText};
		
		$.ajax({
		    type : 'POST',
		    url : '/admin/highlight',
			data : JSON.stringify(dto),
		    dataType : 'json',
		    contentType : 'application/json',
		    success: (data) => {
				const status        = data.status;
				const result 	    = data.data.result;
				const successStatus = "200";
				const successCode   = "1";
				
				if(status == successStatus && result == successCode) {
					alert('등록이 완료되었습니다!');
					
					getHighlight();
				} else {
					alert('등록에 실패했습니다.');
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
}

function modifyForm(el, ihighlight) {
	const btnWrapEl       = $(el).closest('.btn-wrap');
	const highlightWrapEl = $(el).closest('.highlight-wrap');
	const highlightEl     = highlightWrapEl.find('.highlight');
	const authorEl        = highlightWrapEl.find('.author');
	const highlightText   = highlightEl.text();
	const authorText      = authorEl.text();
	const fixYn           = highlightWrapEl.find('#fixYn').val();
	const textareaHtml    = `<textarea>${highlightText}</textarea>`;
	let btnWrapHtml       = `	 <div class="fix-wrap">
								 <label>고정 여부</label>`;
								 
    if(fixYn == 'Y') {
		btnWrapHtml += `<input type="checkbox" id="fixYn" checked>`;
	} else {
		btnWrapHtml += `<input type="checkbox" id="fixYn">`;
	}
								 
	btnWrapHtml          += `</div>
							 <button onclick="delHighlight('${ihighlight}')">삭제</button>
						     <button class="btn-red" onclick="modifyCancel(this, '${ihighlight}')">수정 취소</button>
							 <button class="btn-blue" onclick="modify(this, '${ihighlight}')">수정 완료</button>`;
							 
	btnWrapEl.html(btnWrapHtml);
	highlightEl.html(textareaHtml);
}

function modifyCancel(el, ihighlight) {
	if(confirm('수정을 취소하시겠습니까?')) {
		const btnWrapEl       = $(el).closest('.btn-wrap');
		const highlightWrapEl = $(el).closest('.highlight-wrap');
		const highlightEl     = highlightWrapEl.find('.highlight');
		const authorEl        = highlightWrapEl.find('.author');
		const highlightText   = highlightEl.text();
		const authorText      = authorEl.text();
		const textareaHtml    = `${highlightText}`;
		const btnWrapHtml     = `<button onclick="modifyForm(this, '${ihighlight}')">수정</button>`;
								
		btnWrapEl.html(btnWrapHtml);
		highlightEl.html(textareaHtml);
	}
}

function modify(el, ihighlight) {
	if(confirm('수정하시겠습니까?')) {
		const highlightWrapEl = $(el).closest('.highlight-wrap');
		const fixWrapEl       = $(el).closest('.btn-wrap').find('.fix-wrap');
		const highlightEl     = highlightWrapEl.find('.highlight textarea');
		const highlightText   = highlightEl.val();
		const fixYn           = fixWrapEl.find('#fixYn').is(':checked') ? 'Y' : 'N';
		const dto 		      = {"ihighlight" : ihighlight, "highlight" : highlightText, "fixYn" : fixYn};
		
		$.ajax({
		    type : 'PUT',
		    url : '/admin/highlight',
			data : JSON.stringify(dto),
		    dataType : 'json',
		    contentType : 'application/json',
		    success: (data) => {
				const status        = data.status;
				const result 	    = data.data.result;
				const successStatus = "200";
				const successCode   = "1";
				
				if(status == successStatus && result == successCode) {
					alert('수정이 완료되었습니다!');
					
					getHighlight();
				} else {
					alert('수정에 실패했습니다.');
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
}

function delHighlight(ihighlight) {
	if(confirm('삭제하시겠습니까?')) {
		const dto = {"ihighlight" : ihighlight};
		
		$.ajax({
		    type : 'DELETE',
		    url : '/admin/highlight',
			data : JSON.stringify(dto),
		    dataType : 'json',
		    contentType : 'application/json',
		    success: (data) => {
				const status        = data.status;
				const result 	    = data.data.result;
				const successStatus = "200";
				const successCode   = "1";
				
				if(status == successStatus && result == successCode) {
					alert('삭제되었습니다!');
					
					getHighlight();
				} else {
					alert('삭제에 실패했습니다.');
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
}

function bookModifyForm(el, ibook) {
	const highlightWrapEl     = $(el).closest('.highlight-wrap');
	const titileEl            = highlightWrapEl.find('#book-title');
	const authorEl            = highlightWrapEl.find('#book-author');
	const publisherEl         = highlightWrapEl.find('#book-publisher');
	const readingStatusCodeEl = highlightWrapEl.find('#book-readingStatusCode');
	const readingStatusNameEl = highlightWrapEl.find('#book-readingStatusName');
	const title               = titileEl.text();
	const author              = authorEl.text();
	const publisher           = publisherEl.text();
	const readingStatusCode   = readingStatusCodeEl.val();
	const readingStatusName   = readingStatusNameEl.text();
	const textareaHtml        = `<input type="hidden" id="book-readingStatusName" value="${readingStatusName}">
							     <p>제목</p>
							     <input type="text" id="book-title" value="${title}">
							     <p>저자</p>
							     <input type="text" id="book-author" value="${author}">
						         <p>출판사</p>
						         <input type="text" id="book-publisher" value="${publisher}">
							     <p>읽기 상태</p>
							     <select id="book-readingStatusCode">` + `<option value="${readingStatusCode}">${readingStatusName}</option>` + readingStatusHtml + `</select>
						         <div class="btn-wrap">
							 	    <button onclick="delBook('${ibook}')">삭제</button>
							 	    <button class="btn-red" onclick="bookModifyCancel(this, '${ibook}')">수정 취소</button>
							 	    <button class="btn-blue" onclick="bookModify(this, '${ibook}')">수정 완료</button>
							     </div>`;
	
	highlightWrapEl.html(textareaHtml);
}

function bookModify(el, ibook) {
	if(confirm('수정하시겠습니까?')) {
		const highlightWrapEl     = $(el).closest('.highlight-wrap');
		const titileEl            = highlightWrapEl.find('#book-title');
		const authorEl            = highlightWrapEl.find('#book-author');
		const publisherEl         = highlightWrapEl.find('#book-publisher');
		const readingStatusCodeEl = highlightWrapEl.find('#book-readingStatusCode');
		const title               = titileEl.val();
		const author              = authorEl.val();
		const publisher           = publisherEl.val();
		const readingStatusCode   = readingStatusCodeEl.val();
		const dto                 = {"ibook" : ibook, "title" : title, "author" : author, "publisher" : publisher, "readingStatus" : readingStatusCode};	
		
		$.ajax({
		    type : 'PUT',
		    url : '/admin/book',
			data : JSON.stringify(dto),
		    dataType : 'json',
		    contentType : 'application/json',
		    success: (data) => {
				const status        = data.status;
				const result 	    = data.data.result;
				const successStatus = "200";
				const successCode   = "1";
				
				if(status == successStatus && result == successCode) {
					alert('수정이 완료되었습니다!');
					
					getBook('A_0');
				} else {
					alert('수정에 실패했습니다.');
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
}

function bookModifyCancel(el, ibook) {
	if(confirm('수정을 취소하시겠습니까?')) {
		const highlightWrapEl   = $(el).closest('.highlight-wrap');
		const titileEl          = highlightWrapEl.find('#book-title');
		const authorEl          = highlightWrapEl.find('#book-author');
		const publisherEl       = highlightWrapEl.find('#book-publisher');
		const readingStatusName = highlightWrapEl.find('#book-readingStatusName').val();
		const titleText         = titileEl.val();
		const authorText        = authorEl.val();
		const publisherText     = publisherEl.val();
		const textareaHtml      = `<p>제목 : <span id="book-title">${titleText}</span></p>
								   <p>저자 : <span id="book-author">${authorText}</span></p>
								   <p>출판사 : <span id="book-publisher">${publisherText}</span></p>
								   <p>읽기 상태 : <span id="book-readingStatusName">${readingStatusName}</span></p>
											
								   <div class="btn-wrap">
								       <button onclick="bookModifyForm(this, '${ibook}')">수정</button>
								   </div>`

		highlightWrapEl.html(textareaHtml);
	}
}

function bookAddCancel(el) {

}

function bookAdd(el) {
	if(confirm('등록하시겠습니까?')) {
		const highlightWrapEl   = $(el).closest('.highlight-wrap');
		const title             = highlightWrapEl.find('#book-title').val();
		const author            = highlightWrapEl.find('#book-author').val();
		const publisher         = highlightWrapEl.find('#book-publisher').val();
		const readingStatusCode = highlightWrapEl.find('#book-readingStatusCode').val();
		const dto 		        = {"title" : title, "author" : author, "publisher" : publisher, "readingStatus" : readingStatusCode};
		
		$.ajax({
		    type : 'POST',
		    url : '/admin/book',
			data : JSON.stringify(dto),
		    dataType : 'json',
		    contentType : 'application/json',
		    success: (data) => {
				const status        = data.status;
				const result 	    = data.data.result;
				const successStatus = "200";
				const successCode   = "1";
				
				if(status == successStatus && result == successCode) {
					alert('등록이 완료되었습니다!');
					
					getBook('A_0');
				} else {
					alert('등록에 실패했습니다.');
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
}

function bookAddForm(el) {
		const html = `<div class="wrap">
						  <div class="highlight-wrap add">
							  <p>제목</p>
							  <input type="text" id="book-title">
							  <p>저자</p>
							  <input type="text" id="book-author">
							  <p>출판사</p>
							  <input type="text" id="book-publisher">
							  <p>읽기 상태</p>
							  <select id="book-readingStatusCode">` + readingStatusHtml + `</select>
							  <div class="btn-wrap">
								  <button class="btn-red" onclick="bookAddCancel(this)">등록 취소</button>
								  <button class="btn-blue" onclick="bookAdd(this)">등록 완료</button>
							  </div>
						  </div>
					  </div>`;
		
	$(el).closest('.btn-wrap.top').after(html);
}

function delBook(ibook) {
	if(confirm('삭제하시겠습니까?')) {
		const dto = {"ibook" : ibook};
		
		$.ajax({
		    type : 'DELETE',
		    url : '/admin/book',
			data : JSON.stringify(dto),
		    dataType : 'json',
		    contentType : 'application/json',
		    success: (data) => {
				const status        = data.status;
				const result 	    = data.data.result;
				const successStatus = "200";
				const successCode   = "1";
				
				if(status == successStatus && result == successCode) {
					alert('삭제되었습니다!');
					
					getHighlight();
				} else {
					alert('삭제에 실패했습니다.');
				}
		    },
		    error: (x) => {
				console.log(x);
			}
		});
	}
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
				const result     = data.data;
				const dataLength = result.length;
				let el           = ``;
				el               += `<div class="wrap add">
										 <div class="btn-wrap top">
										 <button class="btn-blue" onclick="bookAddForm(this)">등록</button>
										 </div>
								     </div>`;
				
				if(dataLength == 0) {
					el += `<div class="wrap">
							   <div class="highlight-wrap" style="text-align: center">
							   <p>아직 없습니다.</p>
							   </div>
						   </div>`

					$('.contents').append(el);
				} else {
					$.each(result, function(idx, item) {
						const ibook             = item.ibook             || '';
						const author   	        = item.author            || '';
						const title  	        = item.title             || '';
						const publisher         = item.publisher         || '';
						const readingStatusCode = item.readingStatusCode || '';
						const readingStatusName = item.readingStatusName || '';
						
						el                      += `<div class="wrap">
													    <div class="highlight-wrap">
															<input type="hidden" id="book-readingStatusCode" value="${readingStatusCode}">
															<p>제목 : <span id="book-title">${title}</span></p>
															<p>저자 : <span id="book-author">${author}</span></p>
															<p>출판사 : <span id="book-publisher">${publisher}</span></p>
															<p>읽기 상태 : <span id="book-readingStatusName">${readingStatusName}</span></p>
															
															<div class="btn-wrap top">
																<button onclick="bookModifyForm(this, '${ibook}')">수정</button>
															</div>
													    </div>
										            </div>`
					});
					
					$('.contents').append(el);
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
			const status  = data.status;
			let el        = `<div class="wrap add">
								<div class="btn-wrap top">
									<button class="btn-blue" onclick="addForm(this)">등록</button>
								</div>
							 </div>`;
			
			if(status != '200') {
				alert('[알림] 데이터를 로드할 수 없습니다.');
			} else {
				const result = data.data;
				
				$.each(result, function(idx, item) {
					const author   	 = item.author     || '';
					const title  	 = item.title      || '';
					const highlight  = item.highlight  || '';
					const ihighlight = item.ihighlight || '';
					const fixYn      = item.fixYn      || 'N';
					
					/*
					if(fixYn == 'Y') {
						el += `<div class="wrap" style="justify-content: right">
								   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
								       <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
								   </svg>`;
					} else {
						el += `<div class="wrap">`;
					}
					*/
					
					el += `<div class="wrap">`;
					el += `<div class="highlight-wrap">
								    <input type="hidden" id="fixYn" value="${fixYn}">
									<p class="highlight book-font">${highlight}</p>
									<p class="author">- ${title} '${author}' -</p>
									<div class="btn-wrap">
										<button onclick="modifyForm(this, '${ihighlight}')">수정</button>
									</div>
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