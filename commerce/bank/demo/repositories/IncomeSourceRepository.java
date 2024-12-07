package com.commerce.bank.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.bank.demo.models.Budget;
import com.commerce.bank.demo.models.IncomeSource;

import java.util.List;

public interface IncomeSourceRepository extends JpaRepository<IncomeSource, Long> {
    List<IncomeSource> findByBudget(Budget budget);  // Find all income sources associated with a specific budget
}

