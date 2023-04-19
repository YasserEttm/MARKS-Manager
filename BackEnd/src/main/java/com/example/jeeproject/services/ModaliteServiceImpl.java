package com.example.jeeproject.services;

import com.example.jeeproject.repositories.ModaliteRepository;
import com.example.jeeproject.entities.Modalite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModaliteServiceImpl implements ModaliteService{
    @Autowired
    private ModaliteRepository modaliteRepository;
    public List<Modalite> getAllModalites(){
        return modaliteRepository.findAll();
    }
}
