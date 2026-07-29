## Unmade Decisions

### Auth mechanism

Determines the type of UserId (string vs int vs Guid)

### HTTPS in local development

Currently HTTP only, to be fixed

### Public setters on entities

Chose the mainstream option, "anemic domain model" critique exists

### TrustServerCertificate should not be true on production

### Local DB is SQL Server Express; fine for dev, production uses a hosted database

### Add currency type field to JobApplication

### Anemic domain model.

JobApplication exposes public setters on every property, so any code can put any field into any state. Alternative: private setters plus methods that express real operations (MarkApplied(), RecordOffer(...)), so invalid states can't be constructed. Deferred until auth and CRUD land — revisit before the entity gains real business rules.

## Made Decisions

### Monorepo

Reasoning: Frontend and backend don't need separate commits
Drawback: Harder to give frontend and backend separate release schedules later
Alternative: separate repos for frontend and backend
Decision Made: 7/20/26

### Layered Solution

Reasoning: Scales better, clear separation of concerns, references flow in one direction
Drawback: More ceremony than may be strictly needed
Alternative: Everything in one main project
Decision Made: 7/20/26

### Minimal APIs

Reasoning: Modern .NET standard
Drawback: Most existing enterprise code uses controllers
Alternative: Controller pattern
Decision Made: 7/20/26

### Enums as strings

Reasoning: Easier to understand value at a glance (reading a string vs having to know what a number means), reordering the enum in code can't silently change what existing rows mean
Drawback: Slightly larger rows, database no longer validates the values
Alternative: Enums as ints (.NET default)
Decision Made: 7/20/26

### Integer keys

Reasoning: Easier to read than Guids, ownership will and must be enforced always
Drawback: IDs are guessable in URLs, authorization is the only thing protecting them
Alternative: Guid keys
Decision Made: 7/20/26

### .NET 10

Reasoning: Long-term support (LTS) release - 3 years of security patches vs 18 months for non-LTS
Drawback: Newer than most tutorials and libraries
Alternative: .NET 8
Decision Made: 7/20/26

### Primary Constructors

Reasoning: Removes noise, modern .NET standard, use explicit constructors when constructor needs actual logic
Drawback: Can accidentally reassign an injected dependency
Alternative: Explicit constructors
Decision Made: 7/21/26
