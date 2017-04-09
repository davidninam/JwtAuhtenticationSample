package com.mathijsblok.auth.config;

import com.mathijsblok.auth.security.AuthManager;
import com.mathijsblok.auth.security.filters.JwtAuthenticationFilter;
import com.mathijsblok.auth.security.filters.JwtLoginFilter;
import com.mathijsblok.auth.security.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private TokenAuthenticationService tokenAuthenticationService;

    @Autowired
    private AuthManager authManager;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
                .disable()
            .addFilterBefore(new JwtLoginFilter("/api/login", authManager, tokenAuthenticationService),
                    UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtAuthenticationFilter(tokenAuthenticationService),
                    UsernamePasswordAuthenticationFilter.class)
            .logout()
                .logoutUrl("/api/logout")
                .clearAuthentication(true)
                .logoutSuccessUrl("/")
            .and()
            .authorizeRequests()
                .antMatchers("/api/login")
                .permitAll()
            .anyRequest()
                .authenticated();
    }
}
