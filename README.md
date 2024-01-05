# v0.7.0

##

####

### data in all courses in curriculum

constants.js

- extra key:values

```js
export const WORD_SUBSECTION = {
  M_2: 'm_2',
  M_3: 'm_3',
  M_4: 'm_4',
  O_1: 'o_1',
  T_1: 't_1',
}
```

- in all course controllers

```js
import Word from '../../models/wordModel.js'
import { WORD_SUBSECTION } from '../../utils/constants.js'
```

crudController.js

```js
const queryObject = {
  subsection: [
    WORD_SUBSECTION.INTRO_1,
    WORD_SUBSECTION.INTRO_2,
    WORD_SUBSECTION.INTRO_3,
    WORD_SUBSECTION.INTRO_4,
    WORD_SUBSECTION.INTRO_5,
    WORD_SUBSECTION.INTRO_6,
    WORD_SUBSECTION.INTRO_7,
  ],
}

const CrudData = await Word.find(queryObject)

res.status(StatusCodes.OK).json({ CrudData })
```

domainController

```js
const queryObject = {
  subsection: [
    WORD_SUBSECTION.V_1,
    WORD_SUBSECTION.V_2,
    WORD_SUBSECTION.V_3,
    WORD_SUBSECTION.V_4,
    WORD_SUBSECTION.M_1,
    WORD_SUBSECTION.M_2,
    WORD_SUBSECTION.M_3,
    WORD_SUBSECTION.M_4,
    WORD_SUBSECTION.S_1,
    WORD_SUBSECTION.S_2,
    WORD_SUBSECTION.S_3,
    WORD_SUBSECTION.S_4,
  ],
}

const domainData = await Word.find(queryObject)
res.status(StatusCodes.OK).json({ domainData })
```

tupleController

```js
const queryObject = {
  subsection: [
    WORD_SUBSECTION.T_1,
    WORD_SUBSECTION.J_1,
    WORD_SUBSECTION.J_2,
    WORD_SUBSECTION.J_3,
    WORD_SUBSECTION.J_4,
    WORD_SUBSECTION.J_5,
    WORD_SUBSECTION.SPR_1,
    WORD_SUBSECTION.SPR_2,
    WORD_SUBSECTION.SPR_3,
    WORD_SUBSECTION.G_1,
    WORD_SUBSECTION.G_2,
    WORD_SUBSECTION.O_1,
    WORD_SUBSECTION.OSP_1,
    WORD_SUBSECTION.OSP_2,
    WORD_SUBSECTION.OSP_3,
  ],
}

const tupleData = await Word.find(queryObject)

res.status(StatusCodes.OK).json({ tupleData })
```

placeController.js

```js
const queryObject = {
  subsection: [WORD_SUBSECTION.N_1, WORD_SUBSECTION.NYP_1, WORD_SUBSECTION.I_1],
}

const placeData = await Word.find(queryObject)
res.status(StatusCodes.OK).json({ placeData })
```

itemController.js

```js
const queryObject = {
  subsection: [
    WORD_SUBSECTION.K_1,
    WORD_SUBSECTION.L_1,
    WORD_SUBSECTION.L_2,
    WORD_SUBSECTION.L_3,
    WORD_SUBSECTION.VINKEL,
  ],
}

const itemData = await Word.find(queryObject)

res.status(StatusCodes.OK).json({ itemData })
```
