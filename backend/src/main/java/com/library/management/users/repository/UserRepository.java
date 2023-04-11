package com.library.management.users.repository;

import com.library.management.users.model.User;
import com.library.management.users.payload.UserResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(String email);

    @Query("SELECT new com.library.management.users.payload.UserResponse(u.id,u.firstname,u.lastname,u.email,u.mobilenumber,u.locked,u.enabled,u.fine,u.role,u.createdOn) FROM User u")
    List<UserResponse> getAllUsers();

    @Transactional
    @Modifying
    @Query("UPDATE User u SET enabled = false WHERE u.id = :id")
    void enableDisableUser(long id);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET locked = false WHERE u.id = :id")
    void blockUser(long id);

    @Query("SELECT new com.library.management.users.payload.UserResponse(u.id,u.firstname,u.lastname,u.email,u.mobilenumber,u.locked,u.enabled,u.fine,u.role,u.createdOn) FROM User u WHERE u.id = :id")
    UserResponse getUserInfo(long id);

}
