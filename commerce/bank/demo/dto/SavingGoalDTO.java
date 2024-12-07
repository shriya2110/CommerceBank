package com.commerce.bank.demo.dto;

import java.math.BigDecimal;

public class SavingGoalDTO {
	private Long id;
	private Long budgetId; // Added budgetId to link the fixed expense to a specific budget
    private String name;
    private BigDecimal amount;
    
	// Getters and setters
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getBudgetId() {
		return budgetId;
	}
	public void setBudgetId(Long budgetId) {
		this.budgetId = budgetId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

}
