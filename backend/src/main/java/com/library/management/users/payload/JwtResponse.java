package com.library.management.users.payload;

import com.library.management.users.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    private String firstname;
    private String lastname;
    private String token;
    private Role roles;
    private String message;


}
