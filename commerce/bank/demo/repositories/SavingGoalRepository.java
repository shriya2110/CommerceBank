package com.commerce.bank.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.bank.demo.models.Budget;
import com.commerce.bank.demo.models.SavingGoal;

import java.util.List;

public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {
    List<SavingGoal> findByBudget(Budget budget);  // Find all saving goals for a specific budget
}

