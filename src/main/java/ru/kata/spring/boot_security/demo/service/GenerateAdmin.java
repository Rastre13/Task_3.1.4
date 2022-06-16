package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.annotation.PostConstruct;
import java.util.Collections;

@Component
public class GenerateAdmin {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public GenerateAdmin(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    private Role role1 = new Role(1L, "ROLE_ADMIN");
    private Role role2 = new Role(2L, "ROLE_USER");

    public Role getRole1() {
        return role1;
    }

    public Role getRole2() {
        return role2;
    }

    @PostConstruct
    public void setAdmin() {
        roleRepository.save(getRole1());
        roleRepository.save(getRole2());

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
        admin.setFirstName("admin");
        admin.setLastName("adminov");
        admin.setAge((byte) 20);
        admin.setEmail("admin@mail.ru");
        admin.setRoles(Collections.singleton(getRole1()));
        userRepository.save(admin);
    }
}
