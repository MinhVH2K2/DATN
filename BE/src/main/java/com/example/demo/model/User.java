package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "users")
@Builder
public class User extends AbstractEntity {

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String passWord;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

//    @Column(name = "")
//    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "status")
    private String status;

    @Column(name = "is_del")
    private boolean isDel;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles roles;


}
