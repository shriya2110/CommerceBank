package com.commerce.bank.demo.dto;

import java.math.BigDecimal;
import java.util.List;

public class BudgetDTO {
	private Long userId;
    private Long budgetId;
    private String name;
    private int month;  // Added month
    private int year;   // Added year
    private BigDecimal savingGoal;
    private List<IncomeSourceDTO> incomeSources;
    private List<FixedExpenseDTO> fixedExpenses;
    private List<VariableExpenseDTO> variableExpenses;
    private List<SavingGoalDTO> savingGoals;
   
    // Getters and setters
        
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
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
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public BigDecimal getSavingGoal() {
		return savingGoal;
	}
	public void setSavingGoal(BigDecimal savingGoal) {
		this.savingGoal = savingGoal;
	}
	public List<IncomeSourceDTO> getIncomeSources() {
		return incomeSources;
	}
	public void setIncomeSources(List<IncomeSourceDTO> incomeSources) {
		this.incomeSources = incomeSources;
	}
	public List<FixedExpenseDTO> getFixedExpenses() {
		return fixedExpenses;
	}
	public void setFixedExpenses(List<FixedExpenseDTO> fixedExpenses) {
		this.fixedExpenses = fixedExpenses;
	}
	public List<VariableExpenseDTO> getVariableExpenses() {
		return variableExpenses;
	}
	public void setVariableExpenses(List<VariableExpenseDTO> variableExpenses) {
		this.variableExpenses = variableExpenses;
	}
	public List<SavingGoalDTO> getSavingGoals() {
		return savingGoals;
	}
	public void setSavingGoals(List<SavingGoalDTO> savingGoals) {
		this.savingGoals = savingGoals;
	}
	
	
}
