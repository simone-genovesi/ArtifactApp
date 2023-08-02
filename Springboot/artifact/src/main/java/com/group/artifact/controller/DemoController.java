package com.group.artifact.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo-controller")
public class DemoController {

    @GetMapping
    @PostAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> sayHello() {
//          TEST
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userName = authentication.getName();
//        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("user"))) {
            return ResponseEntity.ok("Hello from secured endpoint");
//        } else {
//            return ResponseEntity.status(401).body("L'utente %s ha provato il metodo ma non ha i requisiti richiesti".formatted(userName));
//        }
    }

}
