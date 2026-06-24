package com.studentconnect.backend.service;

import com.studentconnect.backend.dto.AuthResponse;
import com.studentconnect.backend.dto.LoginRequest;
import com.studentconnect.backend.dto.SignupRequest;
import com.studentconnect.backend.entity.User;
import com.studentconnect.backend.enums.Role;
import com.studentconnect.backend.repository.UserRepository;
import com.studentconnect.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        Role role = Role.valueOf(request.getRole().toUpperCase());

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .phone(request.getPhone())
                .course(request.getCourse())
                .studentId(request.getStudentId())
                .build();

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(
                user.getEmail(), user.getRole().name(), user.getName(), user.getId()
        );

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name().toLowerCase())
                .name(user.getName())
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Verify role matches
        Role requestedRole = Role.valueOf(request.getRole().toUpperCase());
        if (user.getRole() != requestedRole) {
            throw new RuntimeException("Invalid role for this account");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(), user.getRole().name(), user.getName(), user.getId()
        );

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name().toLowerCase())
                .name(user.getName())
                .userId(user.getId())
                .email(user.getEmail())
                .build();
    }
}
