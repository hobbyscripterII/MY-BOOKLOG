package com.project.booklog.admin.book.dto;

import lombok.Data;

@Data
public class BookUpdDto {
	private int ibook;
	private String title;
	private String author;
	private String publisher;
	private String readingStatus;
}