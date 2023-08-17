'use client'

import { parseISO, format } from 'date-fns'

type Props = {
    dateString: string
} & React.HTMLAttributes<HTMLTimeElement>

export default function Date({ dateString, ...rest}: Props) {
  const date = parseISO(dateString)

  return <time dateTime={dateString} {...rest}>{format(date, 'dd/MM/yyyy')}</time>
}
