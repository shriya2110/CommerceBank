package com.commerce.bank.demo.utils;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String secret = "mzraCnqux+7DbXVg7RVyEjWxceIQ2zsKfk0qTaYYJrE=";
    private final SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));

    // Generate a JWT token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiration
                .signWith(key) // Sign with the secret key
                .compact();
    }

    // Extract email (subject) from JWT token
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Validate JWT token
    public Boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    // Check if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Extract all claims from token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key) // Use the key for parsing
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}