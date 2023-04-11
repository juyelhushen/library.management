package com.library.management.users.service;

import com.library.management.users.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface UserService {

    ResponseEntity<String> signup(JwtRegister register);

    ResponseEntity<?> login(AuthRequest request);

    ResponseEntity<List<UserResponse>> getUserList();

    ResponseEntity<String> enableDisableUser(@PathVariable long id);

    ResponseEntity<String> blockedUser(@PathVariable long id);

    ResponseEntity<String> uploadProfile(ProfileUploadRequest request);

    ResponseEntity<UserResponse> getUserInfo(long id);

    ResponseEntity<String> updateProfile(long id, ProfileUpdate request);

    ResponseEntity<String> changePassword(long id,ChangePasswordRequest request);
    //jwt in cookies
//    ResponseEntity<?> login(AuthRequest request, HttpServletResponse response);
}
