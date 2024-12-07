package com.commerce.bank.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.bank.demo.models.Budget;
import com.commerce.bank.demo.models.FixedExpense;

import java.util.List;

public interface FixedExpenseRepository extends JpaRepository<FixedExpense, Long> {
    List<FixedExpense> findByBudget(Budget budget);  // Find all fixed expenses for a specific budget
}

