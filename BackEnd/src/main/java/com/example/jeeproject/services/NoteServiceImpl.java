package com.example.jeeproject.services;

import com.example.jeeproject.dto.NoteDto;
import com.example.jeeproject.entities.Modalite;
import com.example.jeeproject.entities.Note;
import com.example.jeeproject.entities.Users;
import com.example.jeeproject.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {
    @Autowired
    private NoteRepository noteRepository;

    @Override
    public List<Note> findByElement(String element) {
        return noteRepository.findAllByElement_NomElement(element);
    }

    @Override
    public List<Note> findByEtudiant(String cin) {
        return noteRepository.findAllByEtudiant_Id(cin);
    }

    @Override
    public List<Note> saveListNotes(List<Note> notes) {
        return noteRepository.saveAll(notes);
    }

    @Override
    public void updateNote(Note note) {
        Note noteCherche = noteRepository.findById(note.getId()).get();
        noteCherche.setNoteFinal(note.getNoteFinal());
        noteCherche.setNoteCc(note.getNoteCc());
        noteCherche.setNoteTP(note.getNoteTP());
        noteCherche.setNoteProjet(note.getNoteProjet());
        noteRepository.save(noteCherche);
    }

    @Override
    public List<Note> all() {
        return noteRepository.findAll();
    }
}
