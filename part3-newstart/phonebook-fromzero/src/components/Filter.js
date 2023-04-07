import { Input } from "./Form";
import { Person } from "./Person";

// usa o componente input
// componente para dar um search e filtrar
export const AddFilter = ({ filter, onChange }) => (
	<>
		<Input
			text="Filter contacts shown with: "
			value={filter}
			onChange={onChange}
		/>
	</>
);

//filros e mapa da persons list
export const ShowFiltered = (props) => (
	<ul>
		{props.contacts
			.filter(
				(person) =>
					person.name
						.toLowerCase()
						.includes(props.filter.toLowerCase()) ||
					person.number.includes(props.filter)
			)
			.map((person) => {
				return Person(person, props);
			})}
	</ul>
);
