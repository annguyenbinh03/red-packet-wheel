package com.example.luckydraw.repository;

import com.example.luckydraw.entity.Role;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, String> {
    Role findRoleByName(@Size(max = 50) String name);
    @Query("SELECT r FROM Role r JOIN UserRole ur ON r.name = ur.roleName.name WHERE ur.user.id = :userId")
    List<Role> findAllRoleByUserId(@Param("userId") String userId);
}
