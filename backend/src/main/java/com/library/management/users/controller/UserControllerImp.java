package com.library.management.users.controller;

import com.library.management.constant.LibConstants;
import com.library.management.users.payload.*;
import com.library.management.users.service.UserService;
import com.library.management.utils.LibUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserControllerImp implements UserController {

    @Autowired
    private final UserService userService;

    @Override
    public ResponseEntity<String> signup(JwtRegister register) {

        try {
            return userService.signup(register);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @Override
    public ResponseEntity<?> login(AuthRequest request) {
        try {
            return userService.login(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.INVALID_DATA,HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserResponse>> getUserList() {
        try {
            return userService.getUserList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<UserResponse>>(new ArrayList<>(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> enableDisableUser(@PathVariable long id) {
        try {
            return userService.enableDisableUser(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> blockUser(@PathVariable long id) {
        try {
            return userService.blockedUser(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> uploadProfile(ProfileUploadRequest request) {
        try {
            return userService.uploadProfile(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<UserResponse> getUserInfo(long id) {
        try {
            return userService.getUserInfo(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<UserResponse>(new UserResponse(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateProfile(long id, ProfileUpdate request) {
        try {
            return userService.updateProfile(id, request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(long id,ChangePasswordRequest request) {
        try {
            return userService.changePassword(id,request);
        } catch (Exception e)   {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //jwt in cookies
//    @Override
//    public ResponseEntity<?> login(AuthRequest request, HttpServletResponse response) {
//        try {
//            return userService.login(request,response);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return LibUtils.getResponse(LibConstants.INVALID_DATA,HttpStatus.BAD_REQUEST);
//    }

}
