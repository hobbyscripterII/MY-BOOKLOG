package com.project.booklog.admin.book;

import org.apache.ibatis.annotations.Mapper;

import com.project.booklog.admin.book.dto.BookDelDto;
import com.project.booklog.admin.book.dto.BookInsDto;
import com.project.booklog.admin.book.dto.BookUpdDto;
import com.project.booklog.admin.book.dto.HighlightDelDto;
import com.project.booklog.admin.book.dto.HighlightInsDto;
import com.project.booklog.admin.book.dto.HighlightUpdDto;

@Mapper
public interface AdminBookMapper {
	public int insHighlight(HighlightInsDto dto);
	public int updHighlight(HighlightUpdDto dto);
	public int delHighlight(HighlightDelDto dto);
	public int insBook(BookInsDto dto);
	public int updBook(BookUpdDto dto);
	public int delBook(BookDelDto dto);
}
