# Agents Documentation

This file provides comprehensive information about the Microsoft Cloud repository structure, coding conventions, and development practices to help AI agents understand and contribute to the codebase effectively.

## Project Structure and Architecture

### Repository Overview
The Microsoft Cloud repository is organized to provide samples and hands-on tutorials for integration scenarios across Microsoft's cloud ecosystem:

```
MicrosoftCloud/
├── .github/                    # GitHub configuration and workflows
│   ├── workflows/             # GitHub Actions CI/CD pipelines
│   └── copilot-instructions.md # GitHub Copilot guidelines
├── samples/                   # Integration sample applications
│   ├── acs-to-teams-meeting/  # Azure Communication Services to Teams
│   ├── data-reporting-with-azure-functions-power-automate/
│   ├── microsoft-graph-scenarios/
│   ├── openai-acs-msgraph/    # OpenAI + ACS + Microsoft Graph
│   ├── productivity-hub/       # Productivity applications
│   └── teams-apps/            # Microsoft Teams applications
├── tutorials/                 # Docusaurus documentation site
│   ├── docs/                  # Tutorial documentation
│   ├── src/                   # Docusaurus source files
│   └── static/                # Static assets
├── public/                    # Built documentation output
└── files/                     # Shared files and resources
```

### Architecture Patterns
- **Microservices**: Each sample demonstrates specific integration scenarios
- **Client-Server**: Most samples include both frontend and backend components
- **API-First**: RESTful APIs for backend services
- **Documentation-Driven**: Comprehensive tutorials for each sample

## Technology Stack and Framework Guidelines

### Frontend Technologies
- **React**: Primary frontend framework for web applications
- **Angular**: Alternative frontend framework for specific samples
- **TypeScript**: Preferred over JavaScript for type safety
- **Material UI / Fluent UI**: Microsoft design system components

### Backend Technologies
- **Node.js + Express**: JavaScript/TypeScript backend services
- **ASP.NET Core**: C# backend applications
- **Azure Functions**: Serverless compute for lightweight services
- **Azure App Service**: Web application hosting

### Microsoft Cloud Integrations
- **Microsoft Graph**: For Office 365, Azure AD, and productivity data
- **Azure Communication Services**: For communication features
- **Power Platform**: For low-code/no-code solutions
- **Azure Cognitive Services**: For AI capabilities
- **Microsoft Teams**: For collaboration integrations

## Coding Conventions and Style Guidelines

### Naming Conventions

#### Files and Directories
- Use lowercase with hyphens for sample directories: `acs-to-teams-meeting`
- Use PascalCase for C# files: `GraphService.cs`
- Use camelCase for TypeScript/JavaScript files: `userService.ts`
- Use kebab-case for component files: `user-profile.component.ts`

#### Variables and Functions
- **TypeScript/JavaScript**: camelCase
  ```typescript
  const userProfileData = await getUserProfile();
  const isAuthenticated = checkAuthStatus();
  ```

- **C#**: PascalCase for public members, camelCase for private
  ```csharp
  public class GraphService
  {
      private readonly string clientId;
      public async Task<User> GetUserAsync()
  }
  ```

#### Constants
- Use UPPER_SNAKE_CASE for constants
  ```typescript
  const MAX_RETRY_ATTEMPTS = 3;
  const API_BASE_URL = 'https://graph.microsoft.com';
  ```

### Code Organization Patterns

#### Sample Project Structure
Each sample should follow this structure:
```
sample-name/
├── README.md                  # Setup and usage instructions
├── client/                    # Frontend application
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── server/                    # Backend application
│   ├── csharp/               # C# implementation
│   └── nodejs/               # Node.js implementation
└── docs/                     # Additional documentation
```

#### Component Organization
- Group related functionality in modules
- Use barrel exports for clean imports
- Separate business logic from UI components
- Implement proper separation of concerns

### Error Handling Patterns

#### TypeScript/JavaScript
```typescript
try {
  const result = await graphClient.api('/me').get();
  return result;
} catch (error) {
  console.error('Failed to fetch user data:', error);
  throw new Error('User data retrieval failed');
}
```

#### C#
```csharp
try
{
    var user = await graphClient.Me.Request().GetAsync();
    return user;
}
catch (ServiceException ex)
{
    logger.LogError(ex, "Failed to retrieve user data");
    throw new ApplicationException("User data retrieval failed", ex);
}
```

## Testing Protocols and Requirements

### Testing Framework Standards
- **JavaScript/TypeScript**: Jest for unit testing, Cypress for E2E testing
- **C#**: xUnit or MSTest for unit testing
- **Integration Tests**: Test Microsoft Graph and Azure service integrations

### Test Organization
```
src/
├── components/
│   ├── UserProfile/
│   │   ├── UserProfile.tsx
│   │   ├── UserProfile.test.tsx
│   │   └── UserProfile.module.css
└── services/
    ├── graphService.ts
    └── graphService.test.ts
```

### Test Naming Conventions
- Test files: `*.test.ts` or `*.spec.ts`
- Test descriptions should be descriptive:
  ```typescript
  describe('GraphService', () => {
    it('should return user profile when authenticated', async () => {
      // Test implementation
    });
  });
  ```

### Mock External Dependencies
- Mock Microsoft Graph calls in unit tests
- Use test doubles for Azure services
- Provide sample data fixtures

## Pull Request Guidelines and Workflow

### Branch Naming Strategy
- Feature branches: `feature/description-of-feature`
- Bug fixes: `fix/issue-number-short-description`
- Documentation: `docs/update-readme`
- Samples: `sample/integration-name`

### Commit Message Format
Follow conventional commit specification:
```
type(scope): short description

Detailed description of changes if needed

- List specific changes
- Reference issues: Fixes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Template
When creating pull requests, include:

1. **Description**: Clear summary of changes
2. **Type of Change**: Feature, bug fix, documentation, etc.
3. **Testing**: How the changes were tested
4. **Screenshots**: For UI changes
5. **Checklist**: 
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No breaking changes (or properly documented)

### Code Review Standards
- All code must be reviewed before merging
- Focus on security, performance, and maintainability
- Ensure proper error handling and logging
- Verify integration points work correctly
- Check for accessibility compliance in UI changes

## Development Environment Setup

### Prerequisites
- Node.js 16+ for JavaScript/TypeScript projects
- .NET 6+ for C# projects
- Visual Studio Code (recommended editor)
- Azure CLI for Azure service interactions
- Microsoft Graph Explorer for API testing

### Environment Configuration
Each sample includes environment configuration:
- `.env.example` files with required variables
- Clear documentation of Azure AD app registration steps
- Instructions for obtaining API keys and connection strings

### Local Development
- Use npm scripts for common tasks
- Implement hot reload for development efficiency
- Provide Docker configurations where applicable
- Include debugging configurations for VS Code

## Security and Compliance Guidelines

### Authentication Patterns
- Use Microsoft Authentication Library (MSAL) for authentication
- Implement proper token lifecycle management
- Follow least privilege principle for API scopes
- Never commit secrets to version control

### Data Handling
- Implement proper data validation
- Use secure communication (HTTPS)
- Follow Microsoft privacy guidelines
- Implement appropriate logging without exposing sensitive data

### Compliance Requirements
- Follow Microsoft Open Source Code of Conduct
- Adhere to security vulnerability reporting process
- Implement accessibility standards (WCAG 2.1 AA)
- Include appropriate license headers

## Documentation Standards

### README Requirements
Each sample must include:
- Clear description of the integration scenario
- Step-by-step setup instructions
- Prerequisites and dependencies
- Configuration requirements
- Usage examples
- Troubleshooting guide
- Links to relevant Microsoft documentation

### Code Documentation
- Use JSDoc for TypeScript/JavaScript
- Use XML documentation comments for C#
- Document complex business logic
- Include examples for public APIs
- Link to relevant Microsoft Graph or Azure documentation

### Tutorial Documentation
- Written in Markdown
- Include code samples
- Provide step-by-step instructions
- Include screenshots where helpful
- Link to working sample code

## Contribution Guidelines

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make changes following these guidelines
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

### Sample Contribution Guidelines
When adding new samples:
- Ensure the integration scenario is unique
- Follow the established project structure
- Include comprehensive documentation
- Provide both client and server implementations when applicable
- Test all integration points thoroughly

This documentation should be updated as the project evolves and new patterns are established.