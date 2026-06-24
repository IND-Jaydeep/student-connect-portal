package com.studentconnect.backend.config;

import com.studentconnect.backend.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Admin-only endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/statistics/**").hasRole("ADMIN")

                        // Admin/Faculty endpoints
                        .requestMatchers(HttpMethod.POST, "/api/notices").hasAnyRole("ADMIN", "FACULTY")
                        .requestMatchers("/api/notices/analyze").hasAnyRole("ADMIN", "FACULTY")
                        .requestMatchers(HttpMethod.POST, "/api/timetable").hasAnyRole("ADMIN", "FACULTY")
                        .requestMatchers(HttpMethod.DELETE, "/api/timetable/**").hasAnyRole("ADMIN", "FACULTY")
                        .requestMatchers(HttpMethod.POST, "/api/exams").hasAnyRole("ADMIN", "FACULTY")
                        .requestMatchers("/api/grievances/resolve/**").hasAnyRole("ADMIN", "FACULTY")
                        .requestMatchers(HttpMethod.PUT, "/api/grievances/*/resolve").hasAnyRole("ADMIN", "FACULTY")

                        // All authenticated users
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
