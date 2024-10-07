package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "menu_role")
@Builder
public class MenuRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_role_id")
    private String menuRoleId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles roles;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private ShopMenu shopMenu;
}
