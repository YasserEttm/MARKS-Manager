package com.example.jeeproject.services;

import com.example.jeeproject.entities.Element;
import com.example.jeeproject.entities.Module;

import java.util.List;

public interface ModuleService {
    public List<Module> getAllModule();
    public List<Element> getElements(String codeModule);
}
