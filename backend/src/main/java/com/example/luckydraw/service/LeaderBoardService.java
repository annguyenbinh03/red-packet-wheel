package com.example.luckydraw.service;

import com.example.luckydraw.dto.response.LeaderBoardResponse;
import com.example.luckydraw.entity.LeaderBoard;
import com.example.luckydraw.repository.LeaderBoardRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LeaderBoardService {
    LeaderBoardRepository leaderBoardRepository;

    public List<LeaderBoardResponse> getLeaderBoard() {
        List<LeaderBoardResponse> leaderBoards = leaderBoardRepository.getAll();
        return leaderBoards;
    }
}
