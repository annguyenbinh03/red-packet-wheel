package com.example.luckydraw.repository;

import com.example.luckydraw.entity.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(@Size(max = 50) @NotNull String username);
    Optional<User> findByUsername(@Size(max = 50) @NotNull String username);
}
