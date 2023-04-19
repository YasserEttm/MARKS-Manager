package com.example.jeeproject.controllers;

import com.example.jeeproject.entities.Modalite;
import com.example.jeeproject.services.ModaliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/modalite")
@CrossOrigin
public class ModaliteController {
    @Autowired
    private ModaliteService modaliteService;
    @GetMapping(value = "/all")
    public List<Modalite> getAllModalites(){
        return modaliteService.getAllModalites();
    }
}
