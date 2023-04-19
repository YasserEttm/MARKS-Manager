package com.example.jeeproject.controllers;

import com.example.jeeproject.dto.NoteDto;
import com.example.jeeproject.entities.Note;
import com.example.jeeproject.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/note")
public class NoteController {
    @Autowired
    private NoteService noteService;
    @GetMapping(value = "/element/{id}")
    public List<Note> findByElement(@PathVariable String id){
        return noteService.findByElement(id);
    }
    @GetMapping(value = "/etudiant/{code}")
    public List<Note> findByEtudiant(@PathVariable String code){
        return noteService.findByEtudiant(code);
    }
    @PostMapping(value = "/saveNotes")
    public List<Note> saveAllNotes(@RequestBody List<Note> notes){
        return noteService.saveListNotes(notes);
    }

    @PostMapping(value = "/saveNote")
    public void updateNote(@RequestBody Note note){
        noteService.updateNote(note);
    }
    @GetMapping("/all")
    public List<Note> findAll(){
        return noteService.all();
    }

}
