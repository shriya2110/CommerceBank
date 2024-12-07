package com.commerce.bank.demo.controller;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.commerce.bank.demo.dto.BudgetDTO;
import com.commerce.bank.demo.dto.FixedExpenseDTO;
import com.commerce.bank.demo.dto.IncomeSourceDTO;
import com.commerce.bank.demo.dto.SavingGoalDTO;
import com.commerce.bank.demo.dto.VariableExpenseDTO;
import com.commerce.bank.demo.services.BudgetService;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {
    
    @Autowired
    private BudgetService budgetService;
    
    @PostMapping
    public ResponseEntity<String> saveBudget(@RequestBody BudgetDTO budgetDTO) {
        try {
            budgetService.saveOrUpdateBudget(budgetDTO);
            return ResponseEntity.ok("Budget saved successfully for " + budgetDTO.getMonth() + "/" + budgetDTO.getYear());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save budget: " + e.getMessage());
        }
    }
    
    @PutMapping
    public ResponseEntity<String> updateBudget(@RequestBody BudgetDTO budgetDTO) {
        try {
            budgetService.saveOrUpdateBudget(budgetDTO);
            return ResponseEntity.ok("Budget updated successfully for " + budgetDTO.getMonth() + "/" + budgetDTO.getYear());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save budget: " + e.getMessage());
        }
    }
    
    @PostMapping("/{budgetId}/income")
    @Validated
    public ResponseEntity<String> saveIncome(@RequestBody List<IncomeSourceDTO> incomeSourceDTOList,
    		@PathVariable(value="budgetId") @NotNull Long budgetId){
    	try {
    		System.out.println("Request to save income "+incomeSourceDTOList);
    		budgetService.saveIncome(incomeSourceDTOList, budgetId);
    		return ResponseEntity.ok("Income saved successfully");
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save income: " + e.getMessage());
    	}
    }
    
    @PostMapping("/{budgetId}/fixedExpense")
    @Validated
    public ResponseEntity<String> saveFixedExpense(@RequestBody List<FixedExpenseDTO> fixedExpenseDTOList,
    		@PathVariable(value="budgetId") @NotNull Long budgetId){
    	try {
    		budgetService.saveFixedExpense(fixedExpenseDTOList, budgetId);
    		return ResponseEntity.ok("Fixed Expense saved successfully");
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save fixed expense: " + e.getMessage());
    	}
    }
    
    @PostMapping("/{budgetId}/variableExpense")
    @Validated
    public ResponseEntity<String> saveVariableExpense(@RequestBody List<VariableExpenseDTO> variableExpenseDTOList,
    		@PathVariable(value="budgetId") @NotNull Long budgetId){
    	try {
    		budgetService.saveVariableExpense(variableExpenseDTOList, budgetId);
    		return ResponseEntity.ok("Variable expense saved successfully");
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save variable expense: " + e.getMessage());
    	}
    }
    
    @PostMapping("/{budgetId}/savingGoals")
    @Validated
    public ResponseEntity<String> saveSavingGoals(@RequestBody List<SavingGoalDTO> savingGoalDTOList,
    		@PathVariable(value="budgetId") @NotNull Long budgetId){
    	try {
    		budgetService.saveSavingGoals(savingGoalDTOList, budgetId);
    		return ResponseEntity.ok("Saving goals saved successfully");
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save saving goal: " + e.getMessage());
    	}
    }
    
    @GetMapping("/{userId}/{month}/{year}")
    @Validated
    public ResponseEntity<?> getBudget(@PathVariable @NotNull Long userId,
                                                @PathVariable @Min(1) @Max(12) int month,
                                                @PathVariable @NotNull int year) {
    	try {
    		// Retrieve the budget for the user
            BudgetDTO budgetDTO = budgetService.getBudgetByMonthAndYear(month, year, userId);
            return ResponseEntity.ok(budgetDTO);
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch budget: " + e.getMessage());
    	}
    }
    
    
}