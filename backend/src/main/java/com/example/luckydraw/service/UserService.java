package com.example.luckydraw.service;

import com.example.luckydraw.dto.request.BankingRequest;
import com.example.luckydraw.dto.request.UserCreationRequest;
import com.example.luckydraw.dto.response.RoleResponse;
import com.example.luckydraw.dto.response.SpinAndMoneyResponse;
import com.example.luckydraw.dto.response.UserResponse;
import com.example.luckydraw.entity.*;
import com.example.luckydraw.exception.AppException;
import com.example.luckydraw.exception.ErrorCode;
import com.example.luckydraw.mapper.UserMapper;
import com.example.luckydraw.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserRoleRepository userRoleRepository;
    RoleRepository roleRepository;
    RolePermissionRepository rolePermissionRepository;
    HistoryRepository historyRepository;

    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername((request.getUsername())))
            throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.prepareUserForSave(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUnPass(request.getPassword());
        userRepository.save(user);

        generateRoleForUser(user, userRoleRepository);

        return userMapper.toUserResponse(user);
    }

    @Transactional
    public void saveBankInfo(BankingRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setPaymentMethod(request.getPaymentMethod());
        user.setBank(request.getBank());
        user.setAccountNumber(request.getAccountNumber());
        user.setIsSubmit(true); 
        userRepository.save(user);
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUserInfo(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        UserResponse userResponse = userMapper.toUserResponse(user);
        userResponse.setRoles(getRoleResponseByUserId(user.getId()));
        return userResponse;
    }

    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        UserResponse userResponse = userMapper.toUserResponse(user);
        userResponse.setRoles(getRoleResponseByUserId(user.getId()));
        return userResponse;
    }

    public String getName() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return user.getUsername();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUserInfo() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty())
            throw new AppException(ErrorCode.USER_LIST_EMPTY);
        List<UserResponse> userResponses = new ArrayList<>();
        for (User user : users) {
            UserResponse userResponse = userMapper.toUserResponse(user);
            userResponse.setRoles(getRoleResponseByUserId(user.getId()));
            userResponses.add(userResponse);
        }
        return userResponses;
    }

    public SpinAndMoneyResponse getSpinCount(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer totalMoney = findTotalPrizedMoney(user);
        SpinAndMoneyResponse response = new SpinAndMoneyResponse(user.getSpinCount(), totalMoney);
        return response;
    }
    public Integer findTotalPrizedMoney(User user) {
        List<History> histories = historyRepository.findAllByUser(user);
        Integer totalPrizeMoney = 0;
        for (History history : histories) {
            totalPrizeMoney += history.getAmount();
        }
        return totalPrizeMoney;
    }

    private List<RoleResponse> getRoleResponseByUserId(String userId) {
        List<Role> roles = roleRepository.findAllRoleByUserId(userId);
        List<RoleResponse> roleResponseList = new ArrayList<>();
        for (Role role : roles) {
            Set<String> permissions = rolePermissionRepository.findPermissionsByRoleId(role.getName());
            RoleResponse roleResponse = new RoleResponse(role.getName(), role.getDescription(), permissions);
            roleResponseList.add(roleResponse);
        }
        return roleResponseList;
    }

    private void generateRoleForUser(User user, UserRoleRepository userRoleRepository) {
        Role roleUser = roleRepository.findRoleByName("USER");
        if(roleUser != null) {
            UserRole userRole = new UserRole();
            UserRoleId userRoleId = new UserRoleId();
            userRoleId.setUserId(user.getId());
            userRoleId.setRoleName(roleUser.getName());
            userRole.setId(userRoleId);
            userRole.setUser(user);
            userRole.setRoleName(roleUser);
            userRoleRepository.save(userRole);
        }else
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
    }
}
