package com.example.luckydraw.controller;

import com.example.luckydraw.dto.response.ApiResponse;
import com.example.luckydraw.dto.response.LeaderBoardResponse;
import com.example.luckydraw.dto.response.UserResponse;
import com.example.luckydraw.service.LeaderBoardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LeaderBoardController {
    LeaderBoardService leaderBoardService;

    @GetMapping("/get-all")
    public ApiResponse<List<LeaderBoardResponse>> getUserInfo() {
        return ApiResponse.<List<LeaderBoardResponse>>builder()
                .result(leaderBoardService.getLeaderBoard())
                .build();
    }
}
