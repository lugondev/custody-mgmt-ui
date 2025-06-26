# Contributing to Custody Management System

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/your-org/custody-mgmt/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/your-org/custody-mgmt/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

## Development Setup

### Prerequisites

- Node.js 18+ or Bun
- Git

### Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/custody-mgmt.git
cd custody-mgmt
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using bun (recommended)
bun install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
# Using npm
npm run dev

# Using bun
bun dev
```

## Code Style

We use ESLint and Prettier to maintain code quality and consistency.

### Running Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

### Running Prettier

```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format
```

## Testing

We use Jest and React Testing Library for testing.

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Examples

```bash
feat: add multi-signature wallet support
fix: resolve transaction approval bug
docs: update API documentation
style: format code with prettier
refactor: optimize wallet balance calculation
test: add unit tests for transaction service
chore: update dependencies
```

## Security

Security is paramount in a custody management system. Please:

- Never commit sensitive information (API keys, private keys, etc.)
- Follow secure coding practices
- Report security vulnerabilities privately to security@custody-mgmt.com
- Use environment variables for configuration
- Validate all inputs
- Implement proper error handling

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose.

### Review Criteria

- Code quality and style
- Test coverage
- Documentation updates
- Security considerations
- Performance impact
- Backward compatibility

## Feature Requests

We welcome feature requests! Please:

1. Check existing issues to avoid duplicates
2. Provide detailed use cases
3. Consider the impact on existing functionality
4. Be open to discussion and feedback

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the code of conduct

## Getting Help

If you need help:

1. Check the [documentation](README.md)
2. Search existing [issues](https://github.com/your-org/custody-mgmt/issues)
3. Ask questions in [discussions](https://github.com/your-org/custody-mgmt/discussions)
4. Contact maintainers

## Recognition

Contributors will be recognized in:

- Release notes
- Contributors section
- Special mentions for significant contributions

Thank you for contributing to making digital asset custody more secure and accessible!