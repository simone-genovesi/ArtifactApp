package com.group.artifact.model.exceptions;

public class UserAlreadyExistsException extends Exception {
    public UserAlreadyExistsException(String email) {
        super("Esiste già un utente con email: %s".formatted(email));
    }
}
