# Fullstack Hamoria

## front End

### front 3 layers

#### Layer 0 v0.0.1

[x]all tools for development with a team (secure n-scalled)
---[x]developter: emmet, react-native snippets
---[x]arcitecur: built with vite to configure proxy
---[x]testing: easier w same css. (troubleshot)
[x]color root node with favvicon and title (packages to color decending nedos)
---[x]Test: app does render

#### Layer 1 v0.0.2

Story: basic navigation
[x]Data context support: set up router
---[x]static test
---[x]create pages to render dynamically
---[x]Test: can navigate with url

[x]Interior Points
---[x]index to but pages inside homeLayout for shared maintenance
---[x]Link interior points
---[x]Test: can navigate with user interaction

[x]Errors bubble up
---[x]errors from internal errors
---[x]Test: ???

Story: advanced navigation
[x]shared parent responsibility
---[x]navigate 1 active
---[x]Test: sharedLayout has a default page
---[x]Navigation depend 404 error and later user privileges
---[x]test bas redirect url
[x] default FormRow components

#### Layer 2 v0.0.3

[]global context

[]partitioned logic of nav and body
---[x]Layout fixed/relative 2 column set up
---[x]main wrapper for m/n scaled prop drilling and nav privilege
---[x]m-scaled navigation of existing content extend context
---[]Conditional Containers
-----[x] nav links are aware of non default sidebar
-----[x]nav toggle sidebar default/non default and set conditional user?.name for logout container
[x]Navigate and local storage
---[x]insert theam when app access local storage

## Backend

### White and black box v0.1.0

#### White box is monitored

[x]set up server
---[x]Test log
[x]es6 modules
---[x]test named imports

#### Remote black boxes

[x]Nodemon and express
---[x]Test: server is running
[x]Basic Express server accept JSON
---[x]Test: accept JSON
[x]Morgan and doteEnv
---[x]Test: set up DoteENV during dev || production

### proper remote set up for identification of achievements v0.1.1

#### successive Flow

[x]basic Crud with Middleware
---[x]Test all crud methods as if was server

#### Erroneous flow

[]Connection dependence
---[]constants with domain restrictions
[]Expressive module application with middleware
---[]errorHandlerMiddleware
---[]CustomError

### Effective validate data v0.1.2

#### type Domain restriction

[]general validation
---[]creation validation

#### user Domain restrictions

[]Validate initial user
[]validate different types of users

### Identifying structure v0.1.3

#### Higher order user concerns

[]hash security for success and errors
---[]Test: registered password is encrypted
[]comparator and certificate for user
[]Store connected tables/documents

#### proper remote set up for public documents/tables

[]Middleware interpretation
---[]Identity is extracted from cookie
[]Permission granted/rejected

### Identifying workload v0.1.4

[]User privilaged actions
[]Fullstack development
---[]Test call backend through proxy
