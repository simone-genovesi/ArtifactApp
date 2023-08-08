package com.group.artifact.service;

import com.group.artifact.model.AuthenticationRequest;
import com.group.artifact.model.AuthenticationResponse;
import com.group.artifact.model.RegisterRequest;
import com.group.artifact.model.exceptions.UserAlreadyExistsException;
import com.group.artifact.model.user.Role;
import com.group.artifact.model.user.User;
import com.group.artifact.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request)
            throws UserAlreadyExistsException {

        Optional<User> existUser = userRepository.findByEmail(request.getEmail());
        if ( existUser.isPresent() ) throw new UserAlreadyExistsException(request.getEmail());

        else {
            var user = User.builder()
                    .id(UUID.randomUUID().toString().split("-")[0])
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .created(LocalDateTime.now())
                    .build();
            userRepository.save(user);
            var jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
