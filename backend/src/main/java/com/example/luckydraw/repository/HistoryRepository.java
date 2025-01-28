package com.example.luckydraw.repository;

import com.example.luckydraw.entity.History;
import com.example.luckydraw.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {
    List<History> findAllByUser(User user);
}
