package com.project.booklog.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@RequestMapping("/admin")
@Controller
@RequiredArgsConstructor
public class AdminController {
	@GetMapping("/login")
	public String login() {
		return "admin/login";
	}
	
	@GetMapping("/home")
	public String home() {
		return "admin/home";
	}
}
