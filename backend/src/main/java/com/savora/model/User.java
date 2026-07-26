package com.savora.model;
import jakarta.persistence.*; import java.time.*;
@Entity @Table(name="users") public class User { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public String name; @Column(nullable=false,unique=true) public String email; @Column(nullable=false) public String password; public String phone,avatar; @Enumerated(EnumType.STRING) public Role role=Role.CUSTOMER; public Instant createdAt=Instant.now(); }
