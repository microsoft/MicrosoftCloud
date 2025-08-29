# AGENTS.md - Microsoft Cloud Integrations

This document provides comprehensive information about the Microsoft Cloud Integrations repository structure, conventions, and development guidelines for AI agents and developers working with this codebase.

## Project Overview

The Microsoft Cloud Integrations repository provides samples and hands-on exercises for different Microsoft Cloud integration scenarios across Azure, Microsoft 365, Power Platform, and GitHub. This repository serves as a comprehensive resource for developers looking to integrate multiple Microsoft Cloud services.

**Website**: https://microsoft.github.io/MicrosoftCloud/

## Project Structure and Architecture

### Repository Organization
```
MicrosoftCloud/
├── .github/                    # GitHub workflows and configurations
├── samples/                    # Sample applications and integrations
│   ├── openai-acs-msgraph/    # OpenAI + Azure Communication Services + Microsoft Graph
│   ├── teams-apps/            # Microsoft Teams applications
│   ├── productivity-hub/      # Productivity integration examples
│   └── [other samples]/       # Additional integration samples
├── tutorials/                 # Docusaurus-based documentation and tutorials
├── public/                    # Static assets and built tutorials
└── files/                     # Additional resources and documentation
```

### Sample Application Architecture
Each sample follows a consistent structure:
- **Client**: Frontend application (typically Angular with TypeScript)
- **Server**: Backend API (Node.js with Express and TypeScript)
- **Documentation**: README with setup and configuration instructions
- **Configuration**: Environment examples and deployment configurations

### Technology Stack
- **Frontend Framework**: Angular 19+ with TypeScript
- **UI Components**: Microsoft Graph Toolkit (MGT), Angular Material
- **Backend Runtime**: Node.js with Express
- **Language**: TypeScript (strict mode)
- **Documentation**: Docusaurus with MDX
- **Deployment**: GitHub Pages, Azure services
- **Communication**: Azure Communication Services (ACS)
- **Identity**: Microsoft Graph, MSAL authentication
- **AI Services**: OpenAI integration

## Coding Conventions and Standards

### TypeScript Guidelines
- Use strict TypeScript configuration with proper type definitions
- Implement interfaces for all data structures and API responses
- Use async/await patterns for asynchronous operations
- Prefer const assertions and readonly properties where appropriate

### Angular Best Practices
- Follow Angular style guide and naming conventions
- Use standalone components (Angular 17+ pattern)
- Implement proper dependency injection and services
- Use reactive forms and RxJS operators appropriately
- Implement lazy loading for feature modules

### File Naming Conventions
- Use kebab-case for file names: `customer-list.component.ts`
- Use PascalCase for class names: `CustomerListComponent`
- Use camelCase for variables and functions: `getUserData()`
- Use UPPER_SNAKE_CASE for constants: `API_BASE_URL`

### Code Organization
- Group related functionality in feature modules
- Use shared services for cross-cutting concerns
- Implement proper error handling and logging
- Follow single responsibility principle for components and services

### API and Integration Patterns
- Use environment variables for configuration
- Implement proper authentication flows with MSAL
- Use Microsoft Graph SDK instead of direct HTTP calls
- Follow Azure Communication Services SDK patterns
- Implement proper error handling and retry logic

## Testing Protocols

### Testing Framework Requirements
- **Unit Testing**: Use Jest for TypeScript/Node.js services
- **Component Testing**: Use Angular Testing Utilities with Jasmine
- **Integration Testing**: Test API endpoints and service integrations
- **E2E Testing**: Use Playwright or Cypress for critical user flows

### Testing Guidelines
- Write tests for all business logic and services
- Mock external dependencies (Microsoft Graph, Azure services)
- Test error conditions and edge cases
- Maintain minimum 70% code coverage for critical paths
- Include tests for authentication and authorization flows

### Sample Testing Structure
```typescript
// Example service test
describe('GraphService', () => {
  let service: GraphService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphService]
    });
    service = TestBed.inject(GraphService);
  });

  it('should retrieve user profile', async () => {
    // Test implementation
  });
});
```

## Development Environment Setup

### Prerequisites
- Node.js 16+ (specified in tutorials/package.json)
- npm or yarn package manager
- Angular CLI for frontend development
- Azure subscription for cloud services testing
- Microsoft 365 developer tenant (optional)

### Environment Configuration
1. Copy `.env.example` to `.env` in sample directories
2. Configure Azure Communication Services credentials
3. Set up Microsoft Graph application registration
4. Configure OpenAI API keys (where applicable)

### Running Development Environment
```bash
# Install root dependencies
npm install

# Build and serve tutorials
npm run build-tutorials

# For individual samples
cd samples/[sample-name]/client
npm install
npm start

cd ../server/typescript
npm install
npm start
```

## Pull Request Guidelines and Workflow

### PR Creation Requirements
- **Title Format**: Use conventional commit format (feat, fix, docs, chore)
- **Description**: Include clear explanation of changes and business value
- **Issue Reference**: Link to related issues using "Fixes #issue-number"
- **Testing**: Verify all affected samples build and run successfully
- **Documentation**: Update relevant README files and tutorials

### PR Review Checklist
- [ ] Code follows TypeScript and Angular best practices
- [ ] No hardcoded secrets or credentials
- [ ] All dependencies are properly declared
- [ ] Integration tests pass for affected services
- [ ] Documentation is updated for new features
- [ ] Breaking changes are clearly documented
- [ ] Performance impact is considered and tested

### Merge Requirements
- All CI/CD checks must pass
- At least one code review approval
- Documentation updates included
- No merge conflicts with main branch

## Microsoft Cloud Services Integration Guidelines

### Microsoft Graph Integration
- Use `@microsoft/mgt` components for common scenarios
- Implement proper scopes and permissions requests
- Handle Graph API rate limiting and throttling
- Use batch requests for multiple operations
- Cache responses appropriately

### Azure Communication Services
- Follow ACS SDK patterns for calling, chat, SMS, and email
- Implement proper user identity and access token management
- Handle connection states and network failures gracefully
- Use ACS UI components where available

### Authentication and Security
- Use MSAL.js for Microsoft identity authentication
- Implement proper token refresh and caching
- Follow principle of least privilege for API permissions
- Validate all user inputs and API responses
- Use HTTPS for all communications

### Error Handling and Logging
- Implement comprehensive error boundaries in Angular
- Log errors appropriately without exposing sensitive data
- Provide user-friendly error messages
- Use proper HTTP status codes in API responses

## Deployment and DevOps

### GitHub Pages Deployment
- Tutorials are automatically built and deployed to GitHub Pages
- Use `npm run build-deploy` to build and deploy tutorials
- Static assets are served from the `public` directory

### Sample Deployment
- Each sample includes deployment instructions in its README
- Use Azure services for cloud deployment where applicable
- Provide both local development and cloud deployment options
- Include monitoring and logging configurations

## Contributing Guidelines

### Getting Started
1. Fork the repository and create a feature branch
2. Set up development environment following the setup guide
3. Review existing samples and documentation patterns
4. Start with small, focused contributions

### Code Quality Standards
- All code must pass linting and type checking
- Follow established patterns and conventions
- Include comprehensive error handling
- Add appropriate logging and monitoring

### Documentation Standards
- Keep README files up to date
- Include clear setup and configuration instructions
- Provide troubleshooting guidance
- Link to relevant Microsoft documentation

This repository follows the Microsoft Open Source Code of Conduct. For questions or contributions, please refer to the main README.md file.