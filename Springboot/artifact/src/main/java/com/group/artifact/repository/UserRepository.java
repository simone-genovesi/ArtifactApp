package com.group.artifact.repository;

import com.group.artifact.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository
        extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

}
