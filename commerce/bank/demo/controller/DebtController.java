package com.commerce.bank.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.commerce.bank.demo.models.Debt;
import com.commerce.bank.demo.services.DebtService;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
public class DebtController {

    @Autowired
    private DebtService debtService;

    // Save a debt
    @PostMapping("/save")
    public ResponseEntity<Debt> saveDebt(@RequestBody Debt debt) {
    	System.out.println("Request to save debt: "+debt.toString());
        Debt savedDebt = debtService.saveDebt(debt);
        return ResponseEntity.ok(savedDebt);
    }

    // Get debts for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Debt>> getDebtsByUserId(@PathVariable Long userId) {
    	System.out.println("Request to fetch debts by user Id: "+userId);
        List<Debt> debts = debtService.getDebtsByUserId(userId);
        return ResponseEntity.ok(debts);
    }
}

