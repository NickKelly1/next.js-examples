import React from 'react'
import Link from 'next/link'

export interface IHomepageProps {
  //
}

export function Homepage(props: IHomepageProps) {
  return (
    <div>
      <h1>
        Hello
      </h1>
      <Link href="/people">
        <a>
          People
        </a>
      </Link>
      <hr />
      <Link href="/vehicles">
        <a>
          vehicles
        </a>
      </Link>
    </div>
  )
}
