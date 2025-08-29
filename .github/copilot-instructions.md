# GitHub Copilot Instructions

This file provides coding practices, standards, and guidelines for the Microsoft Cloud repository to help GitHub Copilot generate code that follows our project conventions.

## Project Overview

This repository contains samples and hands-on tutorials for Microsoft Cloud integration scenarios across Azure, Microsoft 365, Power Platform, and GitHub. The codebase includes multiple sample applications and comprehensive documentation built with Docusaurus.

## Coding Standards and Practices

### General Guidelines
- Follow Microsoft coding conventions and best practices
- Maintain consistency with existing code patterns in the repository
- Use descriptive variable and function names that clearly indicate purpose
- Add appropriate comments for complex logic and integration points
- Follow the principle of least privilege for security configurations

### Technology Stack Preferences
- **Frontend**: React with TypeScript, Angular with TypeScript
- **Backend**: Node.js with TypeScript, C# with .NET
- **Documentation**: Markdown with Docusaurus
- **Cloud Services**: Azure services, Microsoft 365 APIs, Power Platform
- **Package Management**: npm for JavaScript/TypeScript projects, NuGet for C#

### File Organization
- Group related functionality in appropriate directories under `samples/`
- Use clear, descriptive folder names that indicate the integration scenario
- Include README.md files for each sample with setup and usage instructions
- Place shared utilities and common code in reusable modules

### TypeScript/JavaScript Standards
- Use TypeScript for new JavaScript projects
- Enable strict mode in TypeScript configurations
- Use interfaces for type definitions
- Implement proper error handling with try-catch blocks
- Use async/await for asynchronous operations
- Follow ES6+ syntax and features

### C# Standards
- Follow .NET coding conventions
- Use async/await patterns for asynchronous operations
- Implement proper exception handling
- Use dependency injection where appropriate
- Follow SOLID principles

## Security Guidelines

### Authentication and Authorization
- Always implement proper authentication using Microsoft identity platform
- Use secure token storage and handling practices
- Implement proper scope validation for Microsoft Graph API calls
- Never hardcode credentials or sensitive information

### API Security
- Validate all input parameters
- Implement rate limiting where appropriate
- Use HTTPS for all external communications
- Follow OWASP security guidelines

### Environment Configuration
- Use environment variables for configuration
- Provide example configuration files (.env.example)
- Document all required environment variables in README files

## Code Review Requirements

### Security Checklist
- [ ] No hardcoded secrets or credentials
- [ ] Proper input validation implemented
- [ ] Authentication and authorization properly configured
- [ ] HTTPS used for all external communications
- [ ] Error messages don't expose sensitive information

### Performance Considerations
- [ ] Efficient API calls with appropriate batching
- [ ] Proper caching strategies implemented where beneficial
- [ ] Resource cleanup (dispose patterns, connection closing)
- [ ] Avoid N+1 query problems

### Code Quality
- [ ] Code follows established patterns in the repository
- [ ] Proper error handling implemented
- [ ] Unit tests added for new functionality
- [ ] Documentation updated for new features
- [ ] TypeScript types properly defined

## Testing Requirements

### Unit Testing
- Write unit tests for business logic
- Use Jest for JavaScript/TypeScript testing
- Use MSTest or xUnit for C# testing
- Aim for meaningful test coverage of critical paths

### Integration Testing
- Test Microsoft Graph API integrations
- Validate Azure service connections
- Test authentication flows end-to-end

## Documentation Standards

### README Files
- Include clear setup instructions
- Document all prerequisites and dependencies
- Provide step-by-step configuration guidance
- Include troubleshooting section
- Add links to relevant Microsoft documentation

### Code Comments
- Document complex business logic
- Explain integration-specific configurations
- Document API endpoint purposes and parameters
- Include links to relevant Microsoft documentation

## Pull Request Guidelines

### Commit Messages
- Use conventional commit format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep first line under 50 characters
- Include detailed description for complex changes

### PR Description Template
- Clearly describe the changes and their purpose
- List any breaking changes
- Include testing instructions
- Reference related issues
- Provide screenshots for UI changes

### Branch Naming
- Use descriptive names: `feature/graph-integration`, `fix/auth-bug`
- Include issue numbers when applicable: `fix/issue-123-auth`

## Integration-Specific Guidelines

### Microsoft Graph
- Use the Microsoft Graph SDK when available
- Implement proper retry policies for transient failures
- Use appropriate Graph scopes with principle of least privilege
- Handle pagination for large result sets

### Azure Services
- Use Azure SDK for service integrations
- Implement proper connection string management
- Use managed identities when possible
- Follow Azure naming conventions

### Power Platform
- Follow Power Platform best practices
- Document custom connector requirements
- Use environment variables for configuration

This file should be updated as the project evolves and new patterns emerge.