package com.library.management.users.service;

import com.library.management.constant.LibConstants;
import com.library.management.repository.OrderRepository;
import com.library.management.jwt.JwtAuthFilter;
import com.library.management.jwt.JwtUtils;
import com.library.management.users.payload.*;
import com.library.management.users.impl.UserDetailsServiceImp;
import com.library.management.users.model.Role;
import com.library.management.users.model.User;
import com.library.management.users.repository.UserRepository;
import com.library.management.utils.LibUtils;
import com.library.management.wrapper.OrderResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    @Autowired
    private final UserRepository repository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImp userDetailsService;
    private final JwtAuthFilter filter;
    private final OrderRepository orderRepository;


    @Override
    public ResponseEntity<String> signup(JwtRegister register) {
        try {
            if (signupValidate(register)) {
                User user = repository.findByEmail(register.getEmail());
                if (Objects.isNull(user)) {
                    repository.save(register(register));
                    return LibUtils.getResponse("Successfully registered.", HttpStatus.OK);
                } else {
                    return LibUtils.getResponse("Email already Exits", HttpStatus.BAD_REQUEST);
                }
            } else {
                return LibUtils.getResponse(LibConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private User register(JwtRegister register) {
        return User.builder()
                .firstname(register.getFirstname())
                .lastname(register.getLastname())
                .email(register.getEmail())
//                .dateOfBirth(register.getDateOfBirth())
                .mobilenumber(register.getMobilenumber())
                .password(passwordEncoder.encode(register.getPassword()))
                .locked(true)
                .enabled(true)
                .fine(0)
                .role(Role.USER)
                .createdOn(new Date(System.currentTimeMillis()))
                .build();

    }

    private boolean signupValidate(JwtRegister register) {
        return register.getFirstname() != null &&
                register.getLastname() != null &&
                register.getEmail() != null &&
                register.getPassword() != null &&
                register.getMobilenumber() != null;
    }

    @Override
    public ResponseEntity<?> login(AuthRequest request) {
        log.info("inside login");
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()));
            if (auth.isAuthenticated()) {
                User user = repository.findByEmail(request.getEmail());
//                UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());
                if (user.isEnabled()) {
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    String jwtToken = jwtUtils.generateToken(user);
//                    UserDetailsImp userDetails = (UserDetailsImp)  auth.getPrincipal();
//                    List<String> roles =userDetails.getAuthorities().stream().ma
//                    JwtResponse token = JwtResponse.builder().token(jwtToken).build();


                    return ResponseEntity.ok(new JwtResponse(user.getFirstname(), user.getLastname(), jwtToken, user.getRole(), "Login Successfully"));
//                    return LibUtils.getResponse("Successfully Logged in.",HttpStatus.OK);
                } else {
                    return LibUtils.getResponse("You account has disabled, Please contact admin.", HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse("Wrong Credentials", HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserResponse>> getUserList() {
        try {
            List<UserResponse> userList = repository.getAllUsers();
            for (UserResponse user : userList) {
                List<OrderResponse> orders = orderRepository.getOrderByUserId(user.getId());
                float fine = 0;
                for (OrderResponse order : orders) {
                    if (!(order.getBookId() != 0 && order.isReturned())) {
                        Calendar cal = Calendar.getInstance();
                        cal.setTime(order.getOrderedOn());
                        cal.add(Calendar.DAY_OF_YEAR, 7);
                        Date maxDays = cal.getTime();
                        Date currentDays = new Date();
                        long extractTime = currentDays.getTime() - maxDays.getTime();
                        long extraDays = extractTime / (24 * 60 * 60 * 1000);
                        if (extraDays < 0) {
                            extraDays = 0;
                        }
                        fine = extraDays * 2;
                        user.setFine(user.getFine() + fine);
                    }
                }
            }
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<UserResponse>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> enableDisableUser(@PathVariable long id) {
        try {
            User user = repository.findById(id).get();
            if (user.isEnabled()) {
                repository.enableDisableUser(user.getId());
                return new ResponseEntity<String>("success", HttpStatus.OK);
            } else {
                user.setEnabled(true);
                repository.save(user);
                return new ResponseEntity<String>("User account is activated", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> blockedUser(@PathVariable long id) {
        try {
            User user = repository.findById(id).get();
            if (user.isLocked()) {
                repository.blockUser(user.getId());
                return new ResponseEntity<String>("success", HttpStatus.OK);
            } else {
                user.setLocked(true);
                repository.save(user);
                return new ResponseEntity<String>("User account is unblocked.", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> uploadProfile(ProfileUploadRequest request) {
        try {
            return LibUtils.getResponse("Success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<UserResponse> getUserInfo(long id) {
        try {
            Optional<User> result = repository.findById(id);
            if (result.isPresent()) {
                UserResponse resultResponse = repository.getUserInfo(id);
                return new ResponseEntity<>(resultResponse, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new UserResponse(), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new UserResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateProfile(long id, ProfileUpdate request) {
        try {
            User user = repository.findById(id).get();
            user.setFirstname(request.getFirstname());
            user.setLastname(request.getLastname());
            user.setEmail(request.getEmail());
            user.setMobilenumber(request.getMobilenumber());
            repository.save(user);
            return LibUtils.getResponse("Profile updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(long id, ChangePasswordRequest request) {
        try {
            User user = repository.findById(id).get();
            BCryptPasswordEncoder b = new BCryptPasswordEncoder();
            if (isValidRequest(request)) {
                if (b.matches(request.getCurrentPassword(), user.getPassword())) {
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    repository.save(user);
                    return LibUtils.getResponse("Password has been Changed Successfully", HttpStatus.OK);
                } else {
                    return LibUtils.getResponse("Incorrect current password", HttpStatus.BAD_REQUEST);
                }
            } else {
                return LibUtils.getResponse(LibConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return LibUtils.getResponse(LibConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean isValidRequest(ChangePasswordRequest request) {
        return request.getCurrentPassword() != null && request.getNewPassword() != null;
    }
}

// for cookies

//                    Cookie cookie = new Cookie("jwt", jwtToken);
//                    cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
////                cookie.setSecure(true);
//                    cookie.setHttpOnly(true);
//                    cookie.setPath("/"); // Global
//
