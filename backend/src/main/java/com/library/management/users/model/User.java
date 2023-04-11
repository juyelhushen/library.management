package com.library.management.users.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.library.management.users.model.Role;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "users")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstname;
    private String lastname;
    private String email;
    private String mobilenumber;
    private String password;
//    @JsonFormat(pattern = "MM-dd-yyyy")
//    private LocalDate datebfbirth;
    private boolean locked;
    private boolean enabled;
    private float fine;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Date createdOn;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "users")
    private UserProfile profile;





    public User(long id) {
        this.id = id;
    }
}
