package com.project.booklog.api;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {
	private ApiStatus apiStatus;
	
	public ApiException(ApiStatus apiStatus) {
		this.apiStatus = apiStatus;
	}
}
