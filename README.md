[![codecov](https://codecov.io/gh/GGCristo/grade-school/branch/master/graph/badge.svg?token=bnONakHC75)](https://codecov.io/gh/GGCristo/grade-school)
[![Coverage Status](https://coveralls.io/repos/github/GGCristo/grade-school/badge.svg?branch=master)](https://coveralls.io/github/GGCristo/grade-school?branch=master)
# Explicación
## Scripts:
``"test": "mocha",``\
Corre los test con mocha \
\
``"coverage": "c8 mocha",``\
Ejecuta c8 para ver los coverage en una tabla en local\
\
 ``"coverageReport": "c8 --reporter=lcov mocha",`` \
 Genera los reporte, este será el input de Codecov (o cualquier otra herramienta del mismo estilo)\
 \
 ``"codecov": "c8 --reporter=lcov mocha && codecov",`` \
 Ejecuta el codecov del último commit sin tener que hacer push \
 __Nota:__ Tienen que tener el token en codecov.yml, como se mostró en la presentación de Marta y Vanessa\
 Si quieren tener un codecov.yml distinto al por defecto y no subir el token al repositorio pueden usar esta otra sintaxis: ``bash <(curl -s https://codecov.io/bash) -t token`` [[enlace](https://docs.codecov.io/docs/about-the-codecov-bash-uploader)] \
 \
 ``"coveralls": "c8 --reporter=text-lcov mocha | coveralls",`` \
 Ejecuta el coverall del último commit sin tener que hacer push\
 \
 ``"lint": "eslint ."`` Ejecuta eslint en la línea de comandos.\
 \
 __Diferencias entre ``lcov`` y ``lcov-text``__ [[enlace](https://github.com/istanbuljs/nyc/issues/744#issuecomment-359335029)]:\
 Estos son argumentos que existen tanto en ``nyc`` como en ``c8``, la diferencia esta en que ``lcoc-text`` retorna el reporte para que sirva de output a otros comandos (con unn pipe(tubería) por ejemplo), mientras que ``lcov`` tiene el comportamiento más esperado de escribir en disco, por lo que más tarde otros programas pueden leer de un fichero.
 ## Actions
~~~
name: Coverage
on: push

jobs:
  Codecov:
    name: Codecov
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci && npm run coverageReport
      - name: Codecov
        uses: codecov/codecov-action@v1
        with:
          token: ${{ secrets.CODECOV_TOKEN }} 
          files: ./coverage/lcov.info
      - name: Coveralls
        uses: coverallsapp/github-action@v1.1.2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
~~~
``npm ci && npm run coverageReport`` \
Haz una instalación limpia en la máquina virtual y escribe los reportes/informes.\
\
``uses: codecov/codecov-action@v1`` \
Sube los reportes a CodeCov\
\
``files: ./coverage/lcov.info``\
No es necesario especificar los reportes CodeCov ya lo hace por ti pero ``... --reporter=lcov ...`` me generaba un reporte extra temporal, y solo me interesa que se suba uno.\
\
``token: ${{ secrets.CODECOV_TOKEN }}`` \
En repositorios públicos no es necesario subir un token, pero quería hacerlo lo suficientemente generíco para que funcione en ambos.
Al subir un token a un repositorio publico es recomendado ocultarlo, por lo que use las ``secrets`` de Github.

# Grade School

Given students' names along with the grade that they are in, create a roster
for the school.

In the end, you should be able to:

- Add a student's name to the roster for a grade
  - "Add Jim to grade 2."
  - "OK."
- Get a list of all students enrolled in a grade
  - "Which students are in grade 2?"
  - "We've only got Jim just now."
- Get a sorted list of all students in all grades.  Grades should sort
  as 1, 2, 3, etc., and students within a grade should be sorted
  alphabetically by name.
  - "Who all is enrolled in school right now?"
  - "Let me think. We have
  Anna, Barb, and Charlie in grade 1,
  Alex, Peter, and Zoe in grade 2
  and Jim in grade 5.
  So the answer is: Anna, Barb, Charlie, Alex, Peter, Zoe and Jim"

Note that all our students only have one name.  (It's a small town, what
do you want?)

## For bonus points

Did you get the tests passing and the code clean? If you want to, these
are some additional things you could try:

- If you're working in a language with mutable data structures and your
  implementation allows outside code to mutate the school's internal DB
  directly, see if you can prevent this. Feel free to introduce additional
  tests.

Then please share your thoughts in a comment on the submission. Did this
experiment make the code better? Worse? Did you learn anything from it?

## Setup

Go through the setup instructions for Javascript to install the necessary
dependencies:

[https://exercism.io/tracks/javascript/installation](https://exercism.io/tracks/javascript/installation)

## Requirements

Please `cd` into exercise directory before running all below commands.

Install assignment dependencies:

```bash
$ npm install
```

## Making the test suite pass

Execute the tests with:

```bash
$ npm test
```

In the test suites all tests but the first have been skipped.

Once you get a test passing, you can enable the next one by changing `xtest` to
`test`.


## Submitting Solutions

Once you have a solution ready, you can submit it using:

```bash
exercism submit grade-school.js
```

## Submitting Incomplete Solutions

It's possible to submit an incomplete solution so you can see how others have
completed the exercise.

## Exercise Source Credits

A pairing session with Phil Battos at gSchool [http://gschool.it](http://gschool.it)

