package com.example.luckydraw.controller;

import com.example.luckydraw.dto.request.UserCreationRequest;
import com.example.luckydraw.dto.response.ApiResponse;
import com.example.luckydraw.dto.response.UserResponse;
import com.example.luckydraw.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping("/create")
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping("/info/my-info")
    public ApiResponse<UserResponse> getUserInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping("/info/{userId}")
    public ApiResponse<UserResponse> getUserInfo(@PathVariable("userId") String userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserInfo(userId))
                .build();
    }

    @GetMapping("/info/all")
    public ApiResponse<List<UserResponse>> getAllUserInfo() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAllUserInfo())
                .build();
    }
}
