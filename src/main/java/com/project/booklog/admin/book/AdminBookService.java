package com.project.booklog.admin.book;

import org.springframework.stereotype.Service;

import com.project.booklog.admin.book.dto.BookDelDto;
import com.project.booklog.admin.book.dto.BookInsDto;
import com.project.booklog.admin.book.dto.BookUpdDto;
import com.project.booklog.admin.book.dto.HighlightDelDto;
import com.project.booklog.admin.book.dto.HighlightInsDto;
import com.project.booklog.admin.book.dto.HighlightUpdDto;
import com.project.booklog.cmmn.ResultVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminBookService {
	private final AdminBookMapper mapper;
	
	ResultVo insHighlight(HighlightInsDto dto) {
		return new ResultVo(mapper.insHighlight(dto));
	}
	
	ResultVo updHighlight(HighlightUpdDto dto) {
		return new ResultVo(mapper.updHighlight(dto));
	}
	
	ResultVo delHighlight(HighlightDelDto dto) {
		return new ResultVo(mapper.delHighlight(dto));
	}
	
	ResultVo insBook(BookInsDto dto) {
		return new ResultVo(mapper.insBook(dto));
	}
	
	ResultVo updBook(BookUpdDto dto) {
		return new ResultVo(mapper.updBook(dto));
	}
	
	ResultVo delBook(BookDelDto dto) {
		return new ResultVo(mapper.delBook(dto));
	}
}