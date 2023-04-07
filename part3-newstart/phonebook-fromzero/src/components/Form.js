// para o botão
export const Button = (props) => (
	<button type={props.type} onClick={props.onClick}>
		{props.text}
	</button>
);

// para os campos do input
export const Input = (props) => (
	<p>
		{props.text}
		<input value={props.value} onChange={props.onChange} />
	</p>
);

//para o form rendering e funções
// usa os componentes de input e botão
export const Form = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
			<Input
				text="Name: "
				value={props.valueName}
				onChange={props.onNameChange}
			/>
			<Input
				text="Number: "
				value={props.valueNumber}
				onChange={props.onNumberChange}
			/>
			<Button type="submit" text={props.buttonText} />
		</form>
	);
};
