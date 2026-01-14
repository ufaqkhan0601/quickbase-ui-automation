**Quickbase UI Automation – Playwright**

This repository contains the UI automation coding exercise for Quickbase, implemented using Playwright.
The goal of this project is to demonstrate test design, framework structure, and best practices while keeping the solution simple and maintainable.

**Tech Stack**

Language: TypeScript
Test Framework: Playwright
Design Pattern: Page Object Model (POM)
Test Runner & Reporting: Playwright Test Runner with HTML Report

Project Structure
├── config/                 # Environment and configuration management
├── fixtures/               # Playwright fixtures (setup / dependency injection)
├── pages/                  # Page Object classes
├── tests/                  # UI test suites
├── data/                   # Test data and data-driven inputs (JSON)
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript compiler configuration
├── .env                    # Environment variable file to store urls and other secret information
└── README.md

-------------------------------------------------------------------

**Design Patterns Applied (File-Level Mapping)**

**Singleton Pattern**

File: config/ConfigManager.ts
The ConfigManager is implemented as a Singleton.Ensures environment configuration is loaded once and shared across the framework.Prevents inconsistent configuration access during test execution.
Why:Centralized, immutable configuration is critical for test stability.

**Factory / Provider Pattern**

File: fixtures/testFixtures.ts
Playwright fixtures act as object providers for page instances.Page objects are created and injected into tests without exposing construction logic.Tests request dependencies instead of instantiating them directly.
Why:Improves test isolation, enforces consistency, and aligns with dependency inversion.

**Page Object Model (POM)**

Files: pages/*.ts (e.g., LoginPage, HomePage, TablesPage)
Each UI page is represented by a dedicated class.Locators and UI behavior are encapsulated inside page objects.Tests interact with business actions, not selectors.
Why:Reduces coupling between tests and UI structure and improves maintainability.

-------------------------------------------------------------------------
**SOLID Principles (Pragmatic Application)**

**Single Responsibility**:

Pages handle UI actions, tests handle test logic.

**Open / Closed**:

Page objects can be extended without modifying test cases.

**Dependency Inversion**:

Tests depend on abstractions (fixtures, pages), not Playwright internals.

----------------------------------------------------------------------------
**Fixtures & Setup**

Playwright fixtures are used to manage setup and dependency injection.
Login and navigation are centralized to avoid duplication.

---------------------------------------------------------------------------

**Data-Driven Testing**

Test data is externalized into JSON files.
Same test logic is executed with multiple datasets to validate different inputs.

---------------------------------------------------------------------------

**Test Suites & Coverage**

The solution includes the following UI test suites:
**Create Table (From Scratch)** – End-to-end happy path
**Validation** – Duplicate table name error handling
**Data-Driven Table Creation** – Multiple datasets using JSON
**Tables List Actions** – Copy table and delete copied table (cleanup included)

-----------------------------------------------------------------------------
**Logging & Reporting**

Relies on Playwright’s built-in HTML report, traces, screenshots, and video.
No custom logger is introduced to avoid unnecessary complexity.

-----------------------------------------------------------------------------
**Setup & Execution**

**Prerequisites**

Node.js 18+
npm

--------------------------------------------------------------------------
**Install dependencies**
npm install

------------------------------------------------------------------------
**Configure environment**

BASE_URL=https://team.quickbase.com/
USERNAME=<your-username>
PASSWORD=<your-password>

--------------------------------------------------------------------------
**Commands to execute tests**:

**Run all tests**

npx playwright test

**Run tests by tag**

npx playwright test --grep @regression
npx playwright test --grep @datadriven


**View report**

npx playwright show-report

--------------------------------------------------------------------------

**Notes**

The solution intentionally avoids overengineering.
Focus is placed on clarity, structure, and correctness rather than exhaustive coverage.
Destructive actions (delete) are performed only on test-created data

--------------------------------------------------------------------------
**Author**: Mohammad
**Purpose**: Quickbase UI Automation Coding Exercise
