package com.commerce.bank.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.bank.demo.models.Debt;

import java.util.List;

public interface DebtRepository extends JpaRepository<Debt, Long> {
    List<Debt> findByUserId(Long userId);
}
