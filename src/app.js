import "./components/note-item.js";
import "./components/note-list.js";
import "./components/note-form.js";
import "./components/app-bar.js";
import "./components/footer-bar.js";
import "./components/note-search.js";
import notesData from "./data/notes.js";

document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.querySelector("note-list");
  const searchComponent = document.querySelector("note-search");
  const formComponent = document.querySelector("note-form");

  // Ambil notes dari localStorage atau gunakan data default
  const savedNotes = JSON.parse(localStorage.getItem("notesData")) || notesData;
  noteList.notes = savedNotes;

  // Event ketika note baru ditambahkan dari form
  formComponent.addEventListener("add-note", (e) => {
    noteList.handleAdd(e);
  });

  // Event untuk pencarian dari komponen search
  searchComponent.addEventListener("search-note", (e) => {
    noteList.handleSearch(e);
  });
});
