package com.example.luckydraw.repository;

import com.example.luckydraw.dto.response.LeaderBoardResponse;
import com.example.luckydraw.entity.LeaderBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderBoardRepository extends JpaRepository<LeaderBoard, Integer> {
    @Query("SELECT new com.example.luckydraw.dto.response.LeaderBoardResponse(u.id, u.fullName, u.image, lb.totalAmount) " +
            " FROM User u, LeaderBoard lb " +
            " WHERE lb.user = u")
    public List<LeaderBoardResponse> getAll();
}
