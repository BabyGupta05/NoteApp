
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({
    date: new Date().toLocaleDateString(),
    heading: "",
    note: ""
  });
  const [editNoteId, setEditNoteId] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await axios.get('https://lazy-gray-dog-tam.cyclic.app/note', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = { ...noteData };

      await axios.post('https://lazy-gray-dog-tam.cyclic.app/note/create', newNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getNotes();
      setNoteData({
        heading: "",
        note: ""
      })
    } catch (error) {
      console.log(error);
    }
  };

  const startEditingNote = (noteId) => {
    setEditNoteId(noteId);
  };

  const editNote = async (noteId, updatedNote) => {
    try {
      await axios.patch(`https://lazy-gray-dog-tam.cyclic.app/note/edit/${noteId}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getNotes();
      setEditNoteId('');
      setNoteData({
        heading: "",
        note: ""
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`https://lazy-gray-dog-tam.cyclic.app/note/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={createNote}>
        <input
          type="text"
          placeholder='heading'
          value={noteData.heading}
          onChange={(e) => setNoteData({ ...noteData, heading: e.target.value })}
        />
        <input
          type="text"
          placeholder='notes'
          value={noteData.note}
          onChange={(e) => setNoteData({ ...noteData, note: e.target.value })}
        />
        <input type="submit" value="create" />
      </form>
      <div className="view">
        {notes.map((note) => (
          <div key={note._id} className='container'>
            <p>Date: {note.date}</p>
            {editNoteId === note._id ? (
              <>
                <input
                  type="text"
                  placeholder="New Heading"
                  value={noteData.heading}
                  onChange={(e) => setNoteData({ ...noteData, heading: e.target.value })}
                />
                <textarea
                  type="text"
                  placeholder="New Note"
                  value={noteData.note}
                  onChange={(e) => setNoteData({ ...noteData, note: e.target.value })}
                />
                <button onClick={() => editNote(note._id, noteData)}>Save</button>
              </>
            ) : (
              <>
                <p>Heading: {note.heading}</p>
                <p>Note: {note.note}</p>
                <div>
                  <button onClick={() => startEditingNote(note._id)}>Edit</button>
                  <button onClick={() => deleteNote(note._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
