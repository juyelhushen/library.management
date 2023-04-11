package com.library.management.users.controller;

import com.library.management.users.payload.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/user")
@CrossOrigin(origins = "*")
public interface UserController {

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody(required = true) JwtRegister register);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody(required = true) AuthRequest request);

    @GetMapping("/list")
    public ResponseEntity<List<UserResponse>> getUserList();

    @GetMapping("/info/{id}")
    public ResponseEntity<UserResponse> getUserInfo(@PathVariable long id);

    @GetMapping("/enabledisable/{id}")
    public ResponseEntity<String> enableDisableUser(@PathVariable long id);

    @GetMapping("/block/{id}")
    public ResponseEntity<String> blockUser(@PathVariable long id);

    @PutMapping("/updateprofile/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable long id, @RequestBody ProfileUpdate request);

    @PostMapping("/upload/profile")
    public ResponseEntity<String> uploadProfile(@RequestBody ProfileUploadRequest request);

    @PutMapping("/changepassword/{id}")
    public ResponseEntity<String> changePassword(@PathVariable long id, @RequestBody ChangePasswordRequest request);


    //jet in cookies
//    public ResponseEntity<?> login(@RequestBody(required = true) AuthRequest request, HttpServletResponse response);
}
