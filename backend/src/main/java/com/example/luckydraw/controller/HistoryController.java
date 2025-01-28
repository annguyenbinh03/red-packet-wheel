package com.example.luckydraw.controller;

import com.example.luckydraw.dto.response.ApiResponse;
import com.example.luckydraw.dto.response.UserResponse;
import com.example.luckydraw.service.HistoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryController {
    HistoryService historyService;

    @PostMapping("/spin-info")
    public ApiResponse<Void> saveSpinInfo(@RequestParam Integer spin, @RequestParam Integer amount) {
        historyService.saveHistory(spin, amount);
        return ApiResponse.<Void>builder()
                .build();
    }
}
