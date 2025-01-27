package com.example.luckydraw.mapper;

import com.example.luckydraw.dto.request.UserCreationRequest;
import com.example.luckydraw.dto.response.UserResponse;
import com.example.luckydraw.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "isDeleted", constant = "false")
    @Mapping(target = "isSubmit", constant = "false")
    @Mapping(target = "isReceived", constant = "false")
    User prepareUserForSave(UserCreationRequest request);

    UserResponse toUserResponse(User user);
}
