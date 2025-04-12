package com.project.booklog.book;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.booklog.api.ApiResponse;
import com.project.booklog.book.dto.BookGetDto;
import com.project.booklog.book.dto.HighlightGetDto;
import com.project.booklog.book.vo.BookGetVo;
import com.project.booklog.book.vo.HighlightGetVo;
import com.project.booklog.book.vo.ReadingStatusCodeGetVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/book")
@RestController
@RequiredArgsConstructor
public class BookController {
	private final BookService service;
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<BookGetVo>>> getBook(BookGetDto dto) {
		List<BookGetVo> vo = service.getBook(dto);
		ApiResponse<List<BookGetVo>> apiResponse = ApiResponse.<List<BookGetVo>>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@GetMapping("/reading_status_code")
	public ResponseEntity<ApiResponse<List<ReadingStatusCodeGetVo>>> getReadingStatusCode() {
		List<ReadingStatusCodeGetVo> vo = service.getReadingStatusCode();
		ApiResponse<List<ReadingStatusCodeGetVo>> apiResponse = ApiResponse.<List<ReadingStatusCodeGetVo>>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@GetMapping("/highlight")
	public ResponseEntity<ApiResponse<List<HighlightGetVo>>> getHighlight(HighlightGetDto dto) {
		List<HighlightGetVo> vo = service.getHighlight(dto);
		ApiResponse<List<HighlightGetVo>> apiResponse = ApiResponse.<List<HighlightGetVo>>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
}
