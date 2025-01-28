package com.example.luckydraw.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BankingRequest {
    String paymentMethod;
    String bank;
    String accountNumber;
}
