# TrailMark Decision Log

## Made Decisions

### Project Structure

---

### Monorepo

Frontend and backend in one repo. Simpler shared history and tooling, but harder to give them separate release schedules later.
Decided On: 7/20/26

### Layered Solution (Domain / Infrastructure / Api)

Scales better, clear separation of concerns, references flow one direction (Api → Infrastructure → Domain, never back). More upfront ceremony than a single project.
Decided On: 7/20/26

### DTOs organized by feature, not by type

DTOs live in Api/Features/<Feature>/ alongside their endpoints, not in a shared Dtos/ folder. Things that change together stay together (cohesion); flat-by-type scatters a feature across folders as the app grows.
Decided On: 7/21/26

---

### Platform & Style

---

### .NET 10

Latest LTS release — 3 years of security patches vs 18 months for non-LTS. Newer than most tutorials and libraries.
Decided On: 7/20/26

### Minimal APIs

Modern .NET standard, less boilerplate than controllers. Most existing enterprise code still uses controllers, so fewer examples match.
Decided On: 7/20/26

### Primary Constructors

Removes noise, modern .NET standard. Use explicit constructors when construction needs real logic. Risk: can accidentally reassign an injected dependency.
Decided On: 7/21/26

---

### Data Modeling

---

### Enums as strings

Readable value at a glance (string vs a number you have to decode), and reordering the enum in code can't silently change what existing rows mean. Cost: database no longer validates the values, and enums-as-ints is the .NET default.
Decided On: 7/20/26

### Integer keys for domain entities

JobApplication.Id and other domain keys are int. Easier to read than GUIDs, smaller/faster. IDs are guessable in URLs — acceptable because ownership filtering (not obscurity) is what protects them. Note: user keys are GUID instead — see Auth.
Decided On: 7/20/26

### Money as decimal(18,2)

decimal stores base-10 exactly; float/double introduce rounding errors and must never be used for money.
Decided On: 7/20/26

### Timestamp naming convention

\_\_\_At for system audit timestamps (CreatedAt, UpdatedAt). Business dates use nouns. AppliedOn kept as a deliberate exception — AppliedDate/ApplicationDate would stutter against the type and the JobApplication name.
Decided On: 7/23/26

### DTOs — never expose EF entities over HTTP

Entities serve the database; the API is a contract. Keeping them separate means storage can change without breaking clients, and the input DTO physically can't be over-posted (no Id/UserId fields to bind). Cost: boilerplate — near-duplicate properties on request/response types, accepted deliberately.
Decided On: 7/21/26

### Hand-written mappers, no AutoMapper

Mapping is explicit extension methods (ToResponse, ToEntity). Rename a property and it fails at compile time instead of silently not mapping. Avoids a dependency, and AutoMapper's licensing went commercial. Cost: a few lines of manual mapping per type.
Decided On: 7/27/26

---

## Auth

---

### Self-hosted ASP.NET Core Identity (middle path)

Identity owns password hashing and the user store; we hand-write the register/login/me endpoints for control and to learn the flow. More surface area for mistakes than the pre-built MapIdentityApi endpoints, but full control over behavior and responses.
Decided On: 8/10/26

### Cookie auth over tokens

First-party same-site app (our Angular frontend + our API, one domain). HttpOnly cookie can't be read by JS, killing XSS token theft. Costs CSRF setup (SameSite + anti-forgery). Alternative — JWT bearer tokens — shines for multiple/independent clients we don't have.
Decided On: 8/10/26

### User keys are GUID (native Guid, not string)

Applies to all Identity keys (AspNetUsers.Id etc.) and JobApplication.UserId which references them. Unguessable and portable, unlike int. Chose the native Guid type over Identity's default string container — smaller and type-safe. Cost: harder to read than int; slight extra config to override the default.
Decided On: 8/10/26

### Password policy — length only, 12-char minimum

No composition rules (digit/upper/symbol all disabled). Per NIST: length beats forced character classes, which push users toward predictable patterns like Password1!. Cost: some users/auditors expect the traditional rules.
Decided On: 8/10/26

### OnDelete.Cascade for AppUser → JobApplications

Deleting a user deletes their applications — the data is meaningless without its owner, and it's the account-deletion / GDPR-friendly behavior. Alternative was Restrict (block deleting a user with applications). Revisit if soft-delete on users lands, since cascade interacts with it.
Decided On: 8/10/26

### No navigation property from JobApplication → AppUser

JobApplication.UserId is a bare Guid with no AppUser reference. A navigation property would make Domain depend on Infrastructure (where AppUser lives), inverting the layering. EF enforces the relationship from the FK alone.
Decided On: 8/10/26

### Connection string in user secrets (local)

Keeps the connection string out of the repo and Git history. Plain-text local store, Development only — production mechanism still TBD.
Decided On: 8/10/26

### Endpoint routes use plural kebab-case noun, no verbs (POST /job-applications)

Decided On: 8/21/26

### Immutable DTOs, mutable entities

Decided On: 8/21/26

### Audit timestamps stamped centrally via a SaveChangesAsync override + IAuditable marker interface, one UtcNow per batch, Added sets both, Modified sets UpdatedAt only

Decided On: 8/21/26

### Broken-invariant guards throw InvalidOperationException rather than returning client-facing status codes; GetRequiredUserId reads the id claim off ClaimsPrincipal (no UserManager round-trip) and throws if absent/unparseable.

Decided On: 8/21/26

---

## Unmade / Open Decisions

---

### All endpoints should return TypedResults over Results

### Local HTTPS

Currently HTTP only. Now higher priority because it's coupled to cookie auth — a login cookie must not travel over HTTP (wants the Secure flag).

### TrustServerCertificate must not be true in production

Dev-only convenience; a production cert must be properly trusted.

### Web Proxy config "Secure": false only in development

### Production database

Local is SQL Server Express (fine for dev). Production will use a hosted DB.

### Timestamp auto-stamping

SaveChanges override to set CreatedAt/UpdatedAt automatically. Deferred; currently nothing populates them.

### Input validation

.NET 10 has built-in minimal-API validation — approach to be looked up when we build it. Right now an over-long field fails at the DB (500) instead of a clean 400.

### Soft delete (DeletedAt)

Whether "delete" stamps a timestamp and filters rows out instead of removing them. Coupled to the ownership-filter work (same EF mechanism). Undecided.

### Currency field on JobApplication

A salary is an amount + a unit; only the amount is stored. Add an ISO 4217 code (USD, EUR) later — cheap migration.

### Anemic domain model / public setters

Entities expose public setters on every property (mainstream, but any code can set any field to anything). Alternative: private setters + methods expressing real operations (MarkApplied(), RecordOffer(...)) so invalid states can't be constructed. Deferred until CRUD lands, before entities gain business rules.

### Auth isPersistent hardcoded to false

Wire to a real "remember me" checkbox once the frontend exists.

---

## Notes (not decisions)

- Migration history was collapsed to a single InitialCreate pre-release. Fine while nothing is deployed; never delete/collapse an applied migration once there's a production database — always move forward with a new one.
