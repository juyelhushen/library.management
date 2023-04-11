package com.library.management.users.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdate {
    private String firstname;
    private String lastname;
    private String email;
    private String mobilenumber;
}
