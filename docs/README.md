# Documentation map

Documentation is organized by decision lifetime rather than by implementation folder.

## Architecture

Current contracts that should change with the code:

- [Information architecture](architecture/information-architecture.md)
- [Color system](architecture/color-system.md)
- [UI kit and layout](architecture/ui-kit.md)

## Operations

Procedures for running the deployed website:

- [Deployment and rollback](operations/deployment.md)
- [Repository extraction](operations/repository-extraction.md)

## Archive

Historical proposals and research are retained for context but are not implementation contracts:

- [Original homepage draft](archive/homepage-draft.ja.md)

When behavior changes, update the relevant architecture or operations document in the same pull
request. Avoid putting current requirements only in an issue, pull request, or component comment.
