package com.project.booklog.book.vo;

import lombok.Data;

@Data
public class BookGetVo {
	private int ibook;
	private String title;
	private String author;
	private String publisher;
	private String publisherDate;
	private String comment;
	private String thumbnail;
	private String readingStatusCode;
	private String readingStatusName;
}
