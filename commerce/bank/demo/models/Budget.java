package com.commerce.bank.demo.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String name;
    
    private int month;  // Represents the month of the budget
    private int year;  // Represents the year of the budget

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL)
    private List<IncomeSource> incomeSources;

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL)
    private List<FixedExpense> fixedExpenses;

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL)
    private List<VariableExpense> variableExpenses;
    
    // Getters and setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public List<IncomeSource> getIncomeSources() {
		return incomeSources;
	}

	public void setIncomeSources(List<IncomeSource> incomeSources) {
		this.incomeSources = incomeSources;
	}

	public List<FixedExpense> getFixedExpenses() {
		return fixedExpenses;
	}

	public void setFixedExpenses(List<FixedExpense> fixedExpenses) {
		this.fixedExpenses = fixedExpenses;
	}

	public List<VariableExpense> getVariableExpenses() {
		return variableExpenses;
	}

	public void setVariableExpenses(List<VariableExpense> variableExpenses) {
		this.variableExpenses = variableExpenses;
	}

}
