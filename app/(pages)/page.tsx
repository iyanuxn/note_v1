"use client";

import React, { useState } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { IoIosAdd, IoMdMore } from "react-icons/io";
import { FiTrash } from "react-icons/fi";
import NoteContent from "../components/NoteContent";

const Page = () => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState("Title");
  const [noteContent, setNoteContent] = useState(
    "After weeks of meticulous planning and countless late nights, our surprise party for Jane went off without a hitch. The look of sheer delight on her face, the joyful laughter echoing throughout the room, and the way everyone came together to celebrate made the entire experience feel nothing short of supercalifragilisticexpialidocious. It was a perfect culmination of all our hard work and love, transforming an ordinary evening into something truly magical and unforgettable."
  );
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([]);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const handleAddNewNote = () => {
    setIsNewNote(true);
    setShowNoteForm(true);
    setNoteTitle("Title");
    setNoteContent(
      "After weeks of meticulous planning and countless late nights, our surprise party for Jane went off without a hitch. The look of sheer delight on her face, the joyful laughter echoing throughout the room, and the way everyone came together to celebrate made the entire experience feel nothing short of supercalifragilisticexpialidocious. It was a perfect culmination of all our hard work and love, transforming an ordinary evening into something truly magical and unforgettable."
    );
  };

  const handleSaveNote = () => {
    if (noteTitle.trim() !== "" || noteContent.trim() !== "") {
      setNotes((prevNotes) => [
        ...prevNotes,
        { title: noteTitle, content: noteContent },
      ]);

      setNoteTitle("");
      setNoteContent("");
      setShowNoteForm(false);
    } else {
      console.log("Note cannot be saved with both title and content empty.");
    }
  };

  const handleCancel = () => {
    setShowNoteForm(false);
    setNoteTitle("");
    setNoteContent("");
    setIsNewNote(true);
  };

  const handleNoteClick = (index: number) => {
    setSelectedNote(index);
    setIsEditing(false);
    setIsNewNote(false);
  };

  const handleEditNote = () => {
    if (selectedNote !== null) {
      setIsEditing(true);
      setIsNewNote(false);
      setNoteTitle(notes[selectedNote].title);
      setNoteContent(notes[selectedNote].content);
    }
  };

  const handleUpdateNote = () => {
    if (selectedNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNote] = { title: noteTitle, content: noteContent };
      setNotes(updatedNotes);

      setIsEditing(false);
    }
  };

  const handleDeleteNote = (index: number) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    setShowMenu(null);
    if (selectedNote === index) {
      setNoteTitle("");
      setNoteContent("");
      setShowNoteForm(false);
      setSelectedNote(null);
    }
  };

  return (
    <div>
      <div className="h-screen w-screen md:hidden flex items-center justify-center">
        <span className="italic">Coming soon :)</span>
      </div>
      {/* desktop */}
      <div className="h-screen w-screen md:flex hidden">
        {/* Left Nav */}
        <div className="h-full w-[25%] p-3">
          <div className="dark:bg-[#2c2c2c] bg-neutral-50 flex flex-col gap-5 w-full h-full rounded-2xl transition-all duration-300 ease-in-out">
            {/* Title */}
            <div className="px-6 pt-10 flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#2c2c2c] dark:bg-[#fefefe] transition-all duration-300 ease-in-out"></div>
              <span className="text-3xl font-bold tracking-tighter">
                takesnote
              </span>
            </div>

            {/* Add new note */}
            <button
              className="w-full py-4 px-8 flex items-center gap-2 dark:hover:bg-neutral-700 hover:bg-neutral-100 transition-all duration-100 ease-in-out"
              onClick={handleAddNewNote}
            >
              <div className="h-6 w-6 rounded-md flex items-center justify-center bg-neutral-300 text-neutral-900 text-2xl">
                <IoIosAdd />
              </div>
              Add new note
            </button>

            {/* Notes list */}
            <div className="flex-grow scrollbar-thin overflow-auto p-3 space-y-3">
              {notes.length > 0 ? (
                notes.map((note, index) => (
                  <div
                    key={index}
                    onClick={() => handleNoteClick(index)}
                    className={`relative cursor-pointer p-4 rounded-xl ${
                      selectedNote === index
                        ? "bg-neutral-300 dark:bg-black"
                        : "bg-neutral-100 dark:bg-neutral-800"
                    }`}
                  >
                    {/* Menu Button */}
                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(showMenu === index ? null : index);
                      }}
                    >
                      <IoMdMore className="text-neutral-600 dark:text-neutral-300" />
                    </div>

                    {/* Menu Dropdown */}
                    <div
                      className={`absolute overflow-hidden top-8 right-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-xl shadow-lg transition-all duration-300 ease-in-out
                    ${
                      showMenu === index
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-4 scale-0 opacity-0"
                    }
                    `}
                    >
                      <button
                        onClick={() => handleDeleteNote(index)}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 font-bold  w-full text-left"
                      >
                        <FiTrash className="text-red-400" />
                        Delete
                      </button>
                    </div>

                    <h3
                      className={`text-lg font-semibold ${
                        selectedNote === index
                          ? "text-neutral-900 dark:text-white/80"
                          : ""
                      }`}
                    >
                      {note.title}
                    </h3>
                    <p
                      className={`text-sm truncate ${
                        selectedNote === index
                          ? "text-neutral-900 dark:text-white/40"
                          : ""
                      }`}
                    >
                      {note.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center bg-neutral-100 rounded-lg dark:bg-neutral-800 h-full">
                  <span className="text-neutral-600 italic">
                    "You do not have any notes <br /> at least not yet"
                  </span>
                </div>
              )}
            </div>

            <ThemeSwitcher />
          </div>
        </div>

        {/* Right Side Content */}
        <NoteContent
          showNoteForm={showNoteForm}
          setShowNoteForm={setShowNoteForm}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          handleSaveNote={handleSaveNote}
          handleCancel={handleCancel}
          selectedNote={selectedNote}
          isEditing={isEditing}
          handleEditNote={handleEditNote}
          handleUpdateNote={handleUpdateNote}
          notes={notes}
          isNewNote={isNewNote}
        />
      </div>
    </div>
  );
};

export default Page;
