package com.project.booklog.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final MySuccessHandler mySuccessHandler;
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(c -> c.disable())
                .formLogin(in -> in
                        .loginPage("/admin/login")
                        .loginProcessingUrl("/admin/login")
                        .usernameParameter("id")
                        .passwordParameter("pwd")
                        .failureUrl("/admin/login?fail")
                        .successHandler(mySuccessHandler)
                        .permitAll())
                .authorizeHttpRequests(a -> a
                		// 정적 리소스 및 예외 페이지
                		.requestMatchers("/", "/book/**", "/admin/login", "/css/**", "/js/**", "/image/**", "/favicon.ico").permitAll()
                		.requestMatchers("/admin/**").hasRole("ADMIN")
                );
        httpSecurity.logout(out -> {
                 out.logoutUrl("/logout")
                    .addLogoutHandler((request, response, authentication) -> {
                        HttpSession session = request.getSession();
                        if (session != null) {
                            session.invalidate();
                        }
                    })
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.sendRedirect("/");
                    });
        });
        return httpSecurity.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}