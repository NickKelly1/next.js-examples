import Link from 'next/link';

const people = [
  { vehicle: 'car', name: 'Bruno', },
  { vehicle: 'bike', name: 'John', },
  { vehicle: 'airplane', name: 'Nick', },
];

export default function Details() {
  return (
    <div>
      {people.map((person, i) => (
        <div key={i}>
          <Link key={i} as={`/vehicles/${person.vehicle}/${person.name}`} href="/vehicles/[vehicle]/[person]">
            <a>{`Navigate to ${person.name}'s ${person.vehicle}`}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}