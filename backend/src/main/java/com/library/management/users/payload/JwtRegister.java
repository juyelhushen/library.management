package com.library.management.users.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtRegister {

    private String firstname;
    private String lastname;
    private String email;
    private String mobilenumber;
//    private LocalDate dateOfBirth;
    private String password;
}
