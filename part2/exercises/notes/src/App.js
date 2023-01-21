import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Notes";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/notes").then((response) => {
			console.log("promise fulfilled");
			setNotes(response.data);
		});
	}, []);
	console.log("render", notes.length, "notes");

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};
		setNotes(notes.concat(noteObject)); //ele cria uam copia do array, nunca deve mudar o estado diretamente
		setNewNote("");

		axios
			.post("http://localhost:3001/notes", noteObject)
			.then((response) => {
				setNotes(notes.concat(response.data));
				setNewNote("");
			});
	};

	const toggleImportance = (id) => {
		console.log(`importance of ${id} needs to be toggled`);
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value); //para aparecer na página ele precisa ser renderizado, logo precisa alterar o setnewnote
		//aqui coloca no input, aqui nao precisa prevent default!
		//n precisa p qele é usado no input e não no form, no form precisa prevent default
	};

	//vamos mudar o componente para ele armazenar a lista com todos notes para ser displayado no "notesToShow"
	//os items da lista dependem do state component
	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important === true); // n precisa desse true, é redundância

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportance(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
		</div>
	);
};
export default App;
