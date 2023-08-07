package com.group.artifact.controller;

import com.group.artifact.model.user.User;
import com.group.artifact.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/controller")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DemoController {

    private final UserRepository userRepository;

    @GetMapping("/get-user")
    public ResponseEntity<User> getUserProfile() {
        // Ottieni l'utente autenticato dal SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // L'email dell'utente corrisponde al suo nome in Spring Security

        // Recupera l'intero oggetto User dal database utilizzando l'email
        User user = userRepository.findByEmail(email).orElseThrow();

        return ResponseEntity.ok(user);
    }

    @GetMapping("get-profile/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userRepository.findById(id));
    }

}
