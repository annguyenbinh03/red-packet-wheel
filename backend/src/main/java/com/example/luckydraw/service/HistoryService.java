package com.example.luckydraw.service;

import com.example.luckydraw.entity.History;
import com.example.luckydraw.entity.LeaderBoard;
import com.example.luckydraw.entity.User;
import com.example.luckydraw.exception.AppException;
import com.example.luckydraw.exception.ErrorCode;
import com.example.luckydraw.repository.HistoryRepository;
import com.example.luckydraw.repository.LeaderBoardRepository;
import com.example.luckydraw.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HistoryService {
    HistoryRepository historyRepository;
    UserRepository userRepository;
    LeaderBoardRepository leaderBoardRepository;

    public void saveHistory(Integer spin, Integer amount) {
        Integer spinCount = 0;
        switch (spin) {
            case 1:
                spinCount = 3;
                break;
            case 2:
                spinCount = 2;
                break;
            case 3:
                spinCount = 1;
                break;
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        History history = new History();
        history.setAmount(amount);
        history.setUser(user);
        history.setSpinCount(spinCount);
        history.setAt(new Timestamp(System.currentTimeMillis()));
        historyRepository.save(history);

        user.setSpinCount(user.getSpinCount() - 1);
        userRepository.save(user);

        if(spinCount == 3) {
            Integer totalPrize = findTotalPrizedMoney(user);
            saveLeaderBoard(user, totalPrize);
        }
    }

    public Integer findTotalPrizedMoney(User user) {
        List<History> histories = historyRepository.findAllByUser(user);
        Integer totalPrizeMoney = 0;
        for (History history : histories) {
            totalPrizeMoney += history.getAmount();
        }
        return totalPrizeMoney;
    }

    public void saveLeaderBoard(User user, Integer totalAmount) {
        LeaderBoard leaderBoard = new LeaderBoard();
        leaderBoard.setUser(user);
        leaderBoard.setTotalAmount(totalAmount);
        leaderBoardRepository.save(leaderBoard);
    }
}
