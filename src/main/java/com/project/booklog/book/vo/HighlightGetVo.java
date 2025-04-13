package com.project.booklog.book.vo;

import lombok.Data;

@Data
public class HighlightGetVo {
	private int ihighlight;
	private int ibook;
	private String highlight;
	private String title;
	private String author;
	private String fixYn;
	private String createdAt;
}