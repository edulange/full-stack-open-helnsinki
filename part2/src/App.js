const Header = ({ title }) => <h1>{title}</h1>;
const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part part={part} key={part.id} />
		))}
    <p>
      Total of {parts.reduce((acc, {exercises}) => acc + exercises, 0)} exercises
    </p>
	</div>
);
//jesus christ xDDD, this is awesome

const Course = ({ course }) => {
	return (
		<>
			<Header title={course.name} />
			<Content parts={course.parts} />
		</>
	);
};

//app -> Course-> header + content => part + part
const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

console.log('course.parts', course.parts.reduce((acc, {exercises}) => acc + exercises, 0))

	return <Course course={course} />;
};

export default App;
