package com.project.booklog.security;

import java.io.IOException;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.project.booklog.cmmn.Const;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MySuccessHandler implements AuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String redirectUrl = "/";
		
		for(GrantedAuthority authority : authorities) {
			String role = authority.getAuthority();
			
			if(role.equals(Const.ROLE_ADMIN)) {
				redirectUrl = "/admin/home";
			}
		}
		
		response.sendRedirect(redirectUrl);
	}
}