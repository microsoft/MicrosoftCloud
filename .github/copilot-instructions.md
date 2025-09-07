# GitHub Copilot Instructions

This file provides guidelines for GitHub Copilot when working with the Microsoft Cloud Integrations repository.

## Coding Practices and Standards

### General Guidelines
- Follow TypeScript best practices and use strict type checking
- Use modern ES6+ syntax and async/await patterns
- Implement proper error handling with try-catch blocks
- Use meaningful variable and function names that describe their purpose
- Add JSDoc comments for public APIs and complex functions

### Technology Stack
- **Frontend**: Angular 19+ with TypeScript, Microsoft Graph Toolkit (MGT)
- **Backend**: Node.js with Express and TypeScript
- **Documentation**: Docusaurus with MDX
- **Cloud Services**: Azure Communication Services, Microsoft Graph, OpenAI

### Project Structure
- Place Angular components in feature-specific directories
- Use shared components and services in `src/app/shared/`
- Server-side code goes in `/server/typescript/` directories
- Documentation and tutorials in `/tutorials/docs/`
- Sample applications in `/samples/` with descriptive folder names

### Dependencies and Packages
- Prefer Microsoft official packages (@microsoft/mgt, @azure/*)
- Use exact versions for critical dependencies
- Keep package.json files up to date and remove unused dependencies
- Use npm for package management

## Code Review Guidelines

### Security Considerations
- Never commit secrets, API keys, or credentials to the repository
- Use environment variables for configuration values
- Validate all user inputs and API responses
- Implement proper authentication and authorization
- Review Azure Communication Services and Microsoft Graph API usage for security best practices

### Performance Guidelines
- Implement proper loading states and error boundaries in Angular components
- Use lazy loading for routes and modules where appropriate
- Optimize API calls and avoid unnecessary requests
- Cache responses when appropriate using Angular HTTP interceptors

### Testing Requirements
- Write unit tests for business logic and services
- Include integration tests for API endpoints
- Test Angular components with proper mocking
- Ensure all sample applications have clear setup and run instructions

## Commit Messages and PR Guidelines

### Commit Message Format
Use conventional commit format:
```
type(scope): description

Examples:
feat(samples): add new OpenAI integration example
fix(tutorials): correct API endpoint documentation
docs(readme): update installation instructions
chore(deps): update Angular to v19
```

### Pull Request Requirements
- Include clear description of changes and their purpose
- Reference related issues using "Fixes #issue-number"
- Ensure all samples build and run successfully
- Update documentation when adding new features or samples
- Include screenshots for UI changes
- Test integration with Microsoft Cloud services

### Branch Naming
- Use descriptive branch names: `feature/openai-integration`, `fix/auth-bug`, `docs/api-updates`
- Keep branches focused on single features or fixes

## Sample Application Guidelines

### Structure Requirements
- Include README.md with setup instructions
- Provide .env.example file with required configuration
- Use consistent folder structure across samples
- Include Dockerfile or deployment instructions where applicable

### Documentation Standards
- Document all required Azure service configurations
- Include step-by-step setup guides
- Provide troubleshooting sections
- Add links to relevant Microsoft documentation

### Integration Patterns
- Use Microsoft Graph SDK for Microsoft 365 integrations
- Implement proper authentication flows (MSAL, OAuth)
- Follow Azure Communication Services best practices
- Use Microsoft Graph Toolkit components where applicable

## Microsoft Cloud Services Integration

### Microsoft Graph
- Use the Microsoft Graph SDK instead of direct HTTP calls
- Implement proper scopes and permissions
- Handle rate limiting and throttling
- Use batch requests for multiple operations

### Azure Communication Services
- Follow ACS SDK patterns for calling, chat, and SMS
- Implement proper user identity management
- Handle connection states and errors gracefully

### Power Platform
- Use Power Platform APIs and connectors appropriately
- Document required permissions and setup steps
- Follow Power Platform governance guidelines