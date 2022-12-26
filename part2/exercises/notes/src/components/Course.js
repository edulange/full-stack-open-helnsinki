const Header = ({ title }) => <h2>{title}</h2>;
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
    <h3>
      Total of {parts.reduce((acc, {exercises}) => acc + exercises, 0)} exercises
    </h3>
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

export default Course