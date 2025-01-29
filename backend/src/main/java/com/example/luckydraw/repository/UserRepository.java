package com.example.luckydraw.repository;

import com.example.luckydraw.dto.response.PaymentResponse;
import com.example.luckydraw.entity.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(@Size(max = 50) @NotNull String username);
    Optional<User> findByUsername(@Size(max = 50) @NotNull String username);

    @Query("SELECT new com.example.luckydraw.dto.response.PaymentResponse(u.username, u.fullName, u.paymentMethod, u.accountNumber, u.bank, u.isSubmit, u.isReceived, lb.totalAmount) " +
            "FROM User u, LeaderBoard lb " +
            "WHERE u = lb.user")
    List<PaymentResponse> getAllPaymentInfo();
}
