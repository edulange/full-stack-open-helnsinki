import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);
	console.log("render", notes.length, "notes");

	const toggleImportance = (id) => {
		console.log(`importance of ${id} needs to be toggled`);
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(
					notes.map((note) => (note.id !== id ? note : returnedNote))
				);
			})
			.catch((error) => {
				alert(
					`the note '${note.content}" was already deleted from server`
				);
			});
		setNotes(notes.filter((n) => n.id !== id));
	};

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});

		axios
			.post("http://localhost:3001/notes", noteObject)
			.then((response) => {
				setNotes(notes.concat(response.data));
				setNewNote("");
			});
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
/* fullstack oath
I will have my browser developer console open all the time
I will use the network tab of the browser dev tools to ensure that frontend and backend are communicating as I expect
I will constantly keep on eye the state of the server to make sure that the data sent there by the fronend is saved there as I expect
I progress with small steps
I will write lots of console.log statements to make sure I understand how the code behaves and to help pinpoint problems
If my code does not work, I will not write more code. Instead, I start deleting the code until it works or just return to a state when everything still was still working
*/
