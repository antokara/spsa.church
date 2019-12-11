# types

## gql

we need the generic type so that ts validates properly

## svg

we need the generic type so that ts validates properly

## other

expiramental APIs do not yet have typings, so to properly use them, we need to add them manually

## html-to-react

no typings exist yet
https://github.com/aknuds1/html-to-react/issues/108

## htmlparser2

dependency of `sanitize-html`

similar with this one
`import * as ElementType from "domelementtype";`
change to
`import * as ElementType from 'domhandler/node_modules/domelementtype/lib/index';`

## domutils

dependency of `sanitize-html` -> `htmlparser2`

I had to change
`import { DomElement } from "domhandler";`
to
`import { ElementType as DomElement } from 'domhandler/node_modules/domelementtype/lib/index';`
because

- `domhandler` does not export `DomElement`
- and `domelementtype` just exports `ElementType` not `DomElement`
