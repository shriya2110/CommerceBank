package com.commerce.bank.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.commerce.bank.demo.dto.BudgetDTO;
import com.commerce.bank.demo.dto.FixedExpenseDTO;
import com.commerce.bank.demo.dto.IncomeSourceDTO;
import com.commerce.bank.demo.dto.SavingGoalDTO;
import com.commerce.bank.demo.dto.VariableExpenseDTO;
import com.commerce.bank.demo.models.Budget;
import com.commerce.bank.demo.models.FixedExpense;
import com.commerce.bank.demo.models.IncomeSource;
import com.commerce.bank.demo.models.SavingGoal;
import com.commerce.bank.demo.models.User;
import com.commerce.bank.demo.models.VariableExpense;
import com.commerce.bank.demo.repositories.BudgetRepository;
import com.commerce.bank.demo.repositories.FixedExpenseRepository;
import com.commerce.bank.demo.repositories.IncomeSourceRepository;
import com.commerce.bank.demo.repositories.SavingGoalRepository;
import com.commerce.bank.demo.repositories.UserRepository;
import com.commerce.bank.demo.repositories.VariableExpenseRepository;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private IncomeSourceRepository incomeSourceRepository;

    @Autowired
    private FixedExpenseRepository fixedExpenseRepository;

    @Autowired
    private VariableExpenseRepository variableExpenseRepository;

    @Autowired
    private UserRepository userRepository;  // You need this to fetch User by ID
    
    @Autowired
    private SavingGoalRepository savingGoalRepository;

    // Save or update budget for a specific month and year
    public void saveOrUpdateBudget(BudgetDTO budgetDTO) throws Exception {
        // Fetch the user by the ID in budgetDTO
        User user = userRepository.findById(budgetDTO.getUserId())
                .orElseThrow(() -> new Exception("User not found"));

        // Find if a budget for this user, month, and year already exists
        Budget budget = budgetRepository.findByUserAndMonthAndYear(user, budgetDTO.getMonth(), budgetDTO.getYear())
                .orElse(new Budget());

        budget.setUser(user);
        budget.setName(budgetDTO.getName());
        budget.setMonth(budgetDTO.getMonth());
        budget.setYear(budgetDTO.getYear());
        
        // Save the budget
        budgetRepository.save(budget);

        // Save income, fixed, and variable expenses (similar logic as shown earlier)
        // Add logic to save income sources, fixed and variable expenses here...
    }
    
    // Save saving goals
    public void saveSavingGoals(List<SavingGoalDTO> savingGoalDTOList, Long budgetId) throws Exception {
    	Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new Exception("Budget not found"));
    	
    	// Save saving goals
        for (SavingGoalDTO savingGoalDTO : savingGoalDTOList) {
            SavingGoal savingGoal = savingGoalDTO.getId() != null ? 
            		savingGoalRepository.findById(savingGoalDTO.getId()).orElse(new SavingGoal()) 
            		: new SavingGoal();
            savingGoal.setName(savingGoalDTO.getName());
            savingGoal.setAmount(savingGoalDTO.getAmount());
            savingGoal.setBudget(budget);  // Associate with the current budget
            savingGoalRepository.save(savingGoal);
        }
    }
    
    // Save income source for an existing budget
    public void saveIncome(List<IncomeSourceDTO> incomeSourceDTOList, Long budgetId) throws Exception {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new Exception("Budget not found"));

        for (IncomeSourceDTO incomeSourceDTO : incomeSourceDTOList) {
            IncomeSource incomeSource = incomeSourceDTO.getId() != null ? incomeSourceRepository.findById(incomeSourceDTO.getId()).orElse(new IncomeSource()) 
            															: new IncomeSource();
            incomeSource.setSourceName(incomeSourceDTO.getSourceName());
            incomeSource.setAmount(incomeSourceDTO.getAmount());
            incomeSource.setBudget(budget);  // Associate with the budget
            incomeSourceRepository.save(incomeSource);
        }
    }

    // Save fixed expense for an existing budget
    public void saveFixedExpense(List<FixedExpenseDTO> fixedExpenseDTOList, Long budgetId) throws Exception {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new Exception("Budget not found"));

        for (FixedExpenseDTO fixedExpenseDTO : fixedExpenseDTOList) {
        	FixedExpense fixedExpense = fixedExpenseDTO.getId() != null ? fixedExpenseRepository.findById(fixedExpenseDTO.getId()).orElse(new FixedExpense()) 
        																: new FixedExpense();
            fixedExpense.setBudget(budget);
            fixedExpense.setCategory(fixedExpenseDTO.getCategory());
            fixedExpense.setAmount(fixedExpenseDTO.getAmount());
            fixedExpenseRepository.save(fixedExpense);	
        }
    }

    // Save variable expense for an existing budget
    public void saveVariableExpense(List<VariableExpenseDTO> variableExpenseDTOList, Long budgetId) throws Exception {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new Exception("Budget not found"));
        
        for (VariableExpenseDTO variableExpenseDTO : variableExpenseDTOList) {
        	VariableExpense variableExpense = variableExpenseDTO.getId() != null ? variableExpenseRepository.findById(variableExpenseDTO.getId()).orElse(new VariableExpense()) 
        																: new VariableExpense();
            variableExpense.setBudget(budget);
            variableExpense.setCategory(variableExpenseDTO.getCategory());
            variableExpense.setAmount(variableExpenseDTO.getAmount());
            variableExpenseRepository.save(variableExpense);	
        }
    }

    // Retrieve the budget by month and year
    public BudgetDTO getBudgetByMonthAndYear(int month, int year, Long userId) throws Exception {
        // Fetch the user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        // Find the budget by user, month, and year
        Budget budget = budgetRepository.findByUserAndMonthAndYear(user, month, year)
                .orElse(null);

        if (budget == null) {
            return null;
        }
        
        Long budgetId = budget.getId();

        BudgetDTO budgetDTO = new BudgetDTO();
        budgetDTO.setMonth(budget.getMonth());
        budgetDTO.setYear(budget.getYear());
        budgetDTO.setBudgetId(budgetId);
        budgetDTO.setName(budget.getName());

        // Add logic to populate income sources, fixed, and variable expenses
        
        // Fetch income sources
        List<IncomeSourceDTO> incomeSourceDTOs = budget.getIncomeSources()
                .stream()
                .map(incomeSource -> {
                    IncomeSourceDTO dto = new IncomeSourceDTO();
                    dto.setSourceName(incomeSource.getSourceName());
                    dto.setAmount(incomeSource.getAmount());
                    dto.setId(incomeSource.getId());
                    dto.setBudgetId(budgetId);
                    return dto;
                }).collect(Collectors.toList());
        budgetDTO.setIncomeSources(incomeSourceDTOs);

        // Fetch fixed expenses
        List<FixedExpenseDTO> fixedExpenseDTOs = budget.getFixedExpenses()
                .stream()
                .map(fixedExpense -> {
                    FixedExpenseDTO dto = new FixedExpenseDTO();
                    dto.setCategory(fixedExpense.getCategory());
                    dto.setAmount(fixedExpense.getAmount());
                    dto.setId(fixedExpense.getId());
                    dto.setBudgetId(budgetId);
                    return dto;
                }).collect(Collectors.toList());
        budgetDTO.setFixedExpenses(fixedExpenseDTOs);

        // Fetch variable expenses
        List<VariableExpenseDTO> variableExpenseDTOs = budget.getVariableExpenses()
                .stream()
                .map(variableExpense -> {
                    VariableExpenseDTO dto = new VariableExpenseDTO();
                    dto.setCategory(variableExpense.getCategory());
                    dto.setAmount(variableExpense.getAmount());
                    dto.setId(variableExpense.getId());
                    dto.setBudgetId(budgetId);
                    return dto;
                }).collect(Collectors.toList());
        budgetDTO.setVariableExpenses(variableExpenseDTOs);

        // Retrieve and set saving goals
        List<SavingGoal> savingGoals = savingGoalRepository.findByBudget(budget);
        budgetDTO.setSavingGoals(
            savingGoals.stream()
                       .map(goal -> {
                    	   SavingGoalDTO dto = new SavingGoalDTO();
                    	   dto.setName(goal.getName());
                    	   dto.setAmount(goal.getAmount());
                    	   dto.setId(goal.getId());
                           dto.setBudgetId(budgetId);
                    	   return dto;
                       }).collect(Collectors.toList())
        );
        return budgetDTO;
    }
}


