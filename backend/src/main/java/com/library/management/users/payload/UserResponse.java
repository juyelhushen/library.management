package com.library.management.users.payload;

import com.library.management.users.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private boolean locked;
    private boolean enabled;
    private float fine;
    private Role role;
    private Date createdOn;


}
