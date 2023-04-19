package com.example.jeeproject.services;

import com.example.jeeproject.dto.NoteDto;
import com.example.jeeproject.entities.Note;

import java.util.List;

public interface NoteService {

    public List<Note> findByElement(String element);
    public List<Note> findByEtudiant(String cin);
    public List<Note> saveListNotes(List<Note>notes);
    public List<Note> all();
    public void updateNote(Note note);
}
