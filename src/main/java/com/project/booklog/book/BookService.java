package com.project.booklog.book;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.booklog.book.dto.BookGetDto;
import com.project.booklog.book.dto.HighlightGetDto;
import com.project.booklog.book.vo.BookGetVo;
import com.project.booklog.book.vo.HighlightGetVo;
import com.project.booklog.book.vo.ReadingStatusCodeGetVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	private final BookMapper mapper;
	
	List<ReadingStatusCodeGetVo> getReadingStatusCode() {
		return mapper.getReadingStatusCode();
	}
	
	List<BookGetVo> getBook(BookGetDto dto) {
		return mapper.getBook(dto);
	}
	
	List<HighlightGetVo> getHighlight(HighlightGetDto dto) {
		return mapper.getHighlight(dto);
	}
}