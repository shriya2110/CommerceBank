package com.commerce.bank.demo.services;

import com.commerce.bank.demo.models.User;
import com.commerce.bank.demo.repositories.UserRepository;
import com.commerce.bank.demo.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public String registerUser(String firstName, String lastName, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists!");
        }

        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(firstName, lastName, email, hashedPassword);
        userRepository.save(newUser);
        
        return jwtUtil.generateToken(email);
    }

    public Map authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent() || !passwordEncoder.matches(password, userOpt.get().getPasswordHash())) {
            throw new RuntimeException("Invalid credentials!");
        }
//        return userOpt.get();
        String token = jwtUtil.generateToken(email);
        Map responseMap = new HashMap();
        responseMap.put("token", token);
        responseMap.put("userId", userOpt.get().getId());
        return responseMap;
    }
    
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find the user from the database using the UserRepository
		Optional<User> userOptional = userRepository.findByEmail(email);
        
        // If user not found, throw exception
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        User user = userOptional.get();

        // Return a UserDetails object with the user's details and authorities
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
