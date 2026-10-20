import { Seq } from 'immutable';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function printBestStudents(object) {
  const bestStudents = Seq(object)
    .filter((student) => student.score >= 70)
    .map((student) => ({
      ...student,
      firstName: capitalize(student.firstName),
      lastName: capitalize(student.lastName),
    }));

  console.log(bestStudents.toJS());
}
