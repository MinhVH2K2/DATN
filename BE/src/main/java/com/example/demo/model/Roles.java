package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "roles")
@Builder
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "role_id")
    private String roleId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "role_code")
    private String roleCode;

    @Column(name = "description")
    private String description;

    @Column(name = "use_yn")
    private String useyn;

    @JsonIgnore
    @OneToMany(mappedBy = "roles")
    List<User> user;

    @ManyToMany(mappedBy = "roles")
    List<ShopMenu> shopMenus;

}
