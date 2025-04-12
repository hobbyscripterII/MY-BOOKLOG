package com.project.booklog.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.booklog.book.dto.BookGetDto;
import com.project.booklog.book.dto.HighlightGetDto;
import com.project.booklog.book.vo.BookGetVo;
import com.project.booklog.book.vo.HighlightGetVo;
import com.project.booklog.book.vo.ReadingStatusCodeGetVo;

@Mapper
public interface BookMapper {
	public List<ReadingStatusCodeGetVo> getReadingStatusCode();
	public List<BookGetVo> getBook(BookGetDto dto);
	public List<HighlightGetVo> getHighlight(HighlightGetDto dto);
}