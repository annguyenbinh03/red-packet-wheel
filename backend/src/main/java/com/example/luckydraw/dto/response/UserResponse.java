package com.example.luckydraw.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String password;
    String fullName;
    Integer spinCount;
    String paymentMethod;
    String accountNumber;
    String bank;
    Boolean isSubmit;
    Boolean isReceived;
    Boolean isDeleted;
    String unPass;
    List<RoleResponse> roles;
}
