package com.project.booklog.admin.book;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.booklog.admin.book.dto.BookDelDto;
import com.project.booklog.admin.book.dto.BookInsDto;
import com.project.booklog.admin.book.dto.BookUpdDto;
import com.project.booklog.admin.book.dto.HighlightDelDto;
import com.project.booklog.admin.book.dto.HighlightInsDto;
import com.project.booklog.admin.book.dto.HighlightUpdDto;
import com.project.booklog.api.ApiResponse;
import com.project.booklog.cmmn.ResultVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/admin")
@RestController
@RequiredArgsConstructor
public class AdminBookController {
	private final AdminBookService service;
	
	@PostMapping("/book")
	public ResponseEntity<ApiResponse<ResultVo>> insBook(@RequestBody BookInsDto dto) {
		log.info("dto = {}", dto);
		
		ResultVo vo = service.insBook(dto);
		ApiResponse<ResultVo> apiResponse = ApiResponse.<ResultVo>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@PutMapping("/book")
	public ResponseEntity<ApiResponse<ResultVo>> updBook(@RequestBody BookUpdDto dto) {
		ResultVo vo = service.updBook(dto);
		ApiResponse<ResultVo> apiResponse = ApiResponse.<ResultVo>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@DeleteMapping("/book")
	public ResponseEntity<ApiResponse<ResultVo>> delBook(@RequestBody BookDelDto dto) {
		ResultVo vo = service.delBook(dto);
		ApiResponse<ResultVo> apiResponse = ApiResponse.<ResultVo>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@PostMapping("/highlight")
	public ResponseEntity<ApiResponse<ResultVo>> insHighlight(@RequestBody HighlightInsDto dto) {
		ResultVo vo = service.insHighlight(dto);
		ApiResponse<ResultVo> apiResponse = ApiResponse.<ResultVo>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@PutMapping("/highlight")
	public ResponseEntity<ApiResponse<ResultVo>> updHighlight(@RequestBody HighlightUpdDto dto) {
		ResultVo vo = service.updHighlight(dto);
		ApiResponse<ResultVo> apiResponse = ApiResponse.<ResultVo>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
	
	@DeleteMapping("/highlight")
	public ResponseEntity<ApiResponse<ResultVo>> delHighlight(@RequestBody HighlightDelDto dto) {
		ResultVo vo = service.delHighlight(dto);
		ApiResponse<ResultVo> apiResponse = ApiResponse.<ResultVo>success(vo);
		
		return ResponseEntity
				.ok(apiResponse);
	}
}
