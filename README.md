# Custody Management System

A comprehensive custody management application built with Next.js 15+, TypeScript, TailwindCSS, and modern web technologies.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15+ App Router, TypeScript, TailwindCSS
- **Component Architecture**: Well-organized, reusable components following best practices
- **Authentication**: Secure user authentication and authorization
- **Case Management**: Complete custody case lifecycle management
- **Document Management**: Upload, organize, and manage case documents
- **Dashboard**: Comprehensive overview with analytics and insights
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript support with strict type checking
- **Form Validation**: Robust form validation with Zod schemas
- **API Integration**: RESTful API integration with Axios
- **State Management**: Efficient state management with Zustand
- **Data Fetching**: Optimized data fetching with TanStack Query

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

### State & Data
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Development
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest + Testing Library
- **Type Checking**: TypeScript

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes group
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── common/           # Common/shared components
├── lib/                  # Utility libraries
│   ├── utils.ts          # General utilities
│   ├── api.ts            # API client configuration
│   ├── auth.ts           # Authentication utilities
│   └── validations.ts    # Zod validation schemas
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── constants/            # Application constants
└── styles/               # Additional styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+ or yarn 1.22+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd custody-mgmt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🏗️ Development Guidelines

### Component Organization

- **File Size**: Keep components under 200 lines
- **Single Responsibility**: One component per file
- **Naming**: Use PascalCase for components, camelCase for utilities
- **Structure**: Follow the established folder structure

### Code Style

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured rules
- **Prettier**: Auto-format code on save
- **Imports**: Use absolute imports with `@/` prefix

### Best Practices

1. **Component Structure**:
   ```tsx
   // Imports
   import { ... } from '...'
   
   // Types
   interface ComponentProps {
     // ...
   }
   
   // Component
   export function Component({ ...props }: ComponentProps) {
     // Logic
     
     return (
       // JSX
     )
   }
   ```

2. **Custom Hooks**: Extract reusable logic into custom hooks
3. **Error Handling**: Implement proper error boundaries and handling
4. **Performance**: Use React.memo, useMemo, useCallback when needed
5. **Accessibility**: Follow WCAG guidelines

## 🧪 Testing

The project uses Jest and Testing Library for testing:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Docker

```bash
# Build the image
docker build -t custody-mgmt .

# Run the container
docker run -p 3000:3000 custody-mgmt
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please:

1. Check the [documentation](docs/)
2. Search existing [issues](issues)
3. Create a new [issue](issues/new)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Beautiful icons