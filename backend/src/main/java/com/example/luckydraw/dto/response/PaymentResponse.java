package com.example.luckydraw.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
public class PaymentResponse {
    String username;
    String fullName;
    String paymentMethod;
    String accountNumber;
    String bank;
    Boolean isSubmit;
    Boolean isReceived;
    Integer totalAmount;
}
