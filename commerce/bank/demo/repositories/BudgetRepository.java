package com.commerce.bank.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.bank.demo.models.Budget;
import com.commerce.bank.demo.models.User;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    
    Optional<Budget> findByUserAndMonthAndYear(User user, int month, int year);

}

