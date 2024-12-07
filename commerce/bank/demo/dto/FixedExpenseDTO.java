package com.commerce.bank.demo.dto;

import java.math.BigDecimal;

public class FixedExpenseDTO {
	private Long id;
    private Long budgetId; // Added budgetId to link the fixed expense to a specific budget
    private String category;
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
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
    
}