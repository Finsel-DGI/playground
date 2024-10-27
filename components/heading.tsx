import clsx from 'clsx'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  > & {
  weight?: string
}

export function Heading({ className, level = 1, weight = "font-semibold", ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx('text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl', weight, className)}
    />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx('text-lg/6 md:text-xl/7 font-semibold text-zinc-950', className)}
    />
  )
}
