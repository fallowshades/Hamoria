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
---[x]Test: all crud methods as if was server

#### Erroneous flow

[x]white and black box error flow support routes
---[x]Test something went wrong
---[c]set up routes
[x]Connection dependence
---[x]constants with domain restrictions
---[x]Test create model
[x]Expressive module application with middleware
---[x]status codes
---[x]errorHandlerMiddleware
---[x]CustomError bad requests

### Effective validate data v0.1.2

#### type Domain restriction

[x]general validation
---[x]creation validation
---[x]validate id

#### user Domain restrictions

[x]Validate initial user
[x]validate different types of users

### Identifying structure v0.1.3

#### Higher order user concerns

[x]hash security for success and errors
---[x]Test: registered password is encrypted
[x]comparator and certificate for user
[x]Store connected tables/documents

#### proper remote set up for public documents/tables

[x]Middleware interpretation
---[x]Identity is extracted from cookie
[x]Permission granted/rejected

### Identifying workload v0.1.4

[x]User privilaged actions
---[x]Test, patch,get user/data
[x]Fullstack development
---[x]Test call backend through proxy
---[x]test custom instance axios

## Privileged pages

### Register Page v0.2.0

[]vertical scaling
-[]action handled by parent router
-[]errors encapsulated managment with hook (less catch code in context)
-[]respons data is interprited from Object.fromEntities
-[]vertical session encapsulated in require attribute (register user)
[]horizontal scaling
-[]horizontal sessiion encapsulated in useNavigate hook and disable attribute (navigational state)
-[]horizontal scaling not encapsulated is caught feedback. (Readt toastify)

### Dashboard page v0.2.1

-[]Log in user (unChecked errors, 3rd type error)
---[]navigational effect caused by response redirect.
---[]is second child element in parent router with similar session managment
-[]useAction data hook (checked errors)
---[]checked session errors conditional password length return caught as feedback.

-[]Loaders (redirect before page render)
---[]encapsulate the mounted useEffect
-[]getCurrent (common cause = jwt issues)
---[]what is passed down Outlet with useLoaderData

### Jobs page v0.2.2

---[]support tree transfor objects
---[]create transfor lifeCycle
---[]context map presentational data dynamically

### Admin page v0.2.3

[]special network Application
---[]use dashboardContext to access role
---[]state item with user data as input (from loader data)

### Profile page v0.2.4

[]both front and backend together with backend acting as control of upload
---[]concern in time of development and production
---[]concern local space notification \_Directory
---[]how does server controll data with string
[]path to presentatioal destination
---[]accept attribute
---[]challanges with size pressentational ctrl session and content type
[]Source transmition
---[]ready dst to persist data, since hosted server limitation.
---[]a method to transmit (mb callback)
---[]connected onto additional node (name, key, secrete)
---[]redundancy
[]test user
---[]front static async
---[]back accumulate extra user properties for later checking.

### stats page v0.2.5

tool to extract table data
---[]1 column (reduce)
---[]set of columns (map)

### All Jobs page v0.2.6

[]params to send request
---[]interactive session ctrl link to url reset.
---[]automatic session search value set with context hook
[]pagination of response data
---[]consideration of existence.
---[]shifted array/range is dependent on url
