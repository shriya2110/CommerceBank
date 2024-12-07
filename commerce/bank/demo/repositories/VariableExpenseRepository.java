package com.commerce.bank.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.bank.demo.models.Budget;
import com.commerce.bank.demo.models.VariableExpense;

import java.util.List;

public interface VariableExpenseRepository extends JpaRepository<VariableExpense, Long> {
    List<VariableExpense> findByBudget(Budget budget);  // Find all variable expenses for a specific budget
}

