package com.project.booklog.admin.book.dto;

import lombok.Data;

@Data
public class BookInsDto {
	private String title;
	private String author;
	private String publisher;
	private String publisherDate;
	private String genre;
	private String comment;
	private String readingStatus;
}
