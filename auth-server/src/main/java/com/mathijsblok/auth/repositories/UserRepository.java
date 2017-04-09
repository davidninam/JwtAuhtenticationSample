package com.mathijsblok.auth.repositories;

import com.mathijsblok.auth.entities.Authority;
import com.mathijsblok.auth.entities.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UserRepository {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User findByUsername(String username) {
        if (!username.equals("123")) return null;

        User u = new User();
        u.setUsername(username);
        u.setPassword(encoder.encode("123"));
        u.setAuthorities(Arrays.asList(new Authority("ADMIN"), new Authority("USER")));
        return u;
    }
}
