# Digital Asset Custody Management System

A comprehensive digital asset custody management platform built with Next.js 15+, TypeScript, TailwindCSS, and modern web technologies. This enterprise-grade solution provides secure custody services for cryptocurrencies and digital assets.

## 🚀 Features

### Core Custody Features
- **Multi-Signature Wallets**: Support for hot, cold, and multi-signature wallet configurations
- **Transaction Management**: Secure transaction creation, approval workflows, and execution
- **Asset Management**: Multi-blockchain support with real-time portfolio tracking
- **Compliance & Reporting**: Built-in AML/KYC compliance with automated reporting
- **Security Controls**: Advanced security features including MFA, role-based access, and audit trails

### Platform Features
- **Modern Tech Stack**: Built with Next.js 15+ App Router, TypeScript, TailwindCSS
- **Component Architecture**: Well-organized, reusable components following best practices
- **Authentication**: Secure user authentication and authorization with role-based permissions
- **Dashboard**: Comprehensive overview with real-time analytics and insights
- **User Management**: Complete user lifecycle management with granular permissions
- **API Management**: RESTful API with comprehensive documentation and key management
- **Audit & Compliance**: Complete audit trails and compliance monitoring
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript support with strict type checking
- **Form Validation**: Robust form validation with Zod schemas

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
│   ├── dashboard/         # Main dashboard application
│   │   ├── analytics/     # Analytics and reporting
│   │   ├── api/          # API management
│   │   ├── approvals/    # Transaction approvals
│   │   ├── audit/        # Audit logs
│   │   ├── compliance/   # Compliance management
│   │   ├── portfox-ai/   # AI-powered portfolio management
│   │   ├── reports/      # Financial reports
│   │   ├── security/     # Security settings
│   │   ├── settings/     # System settings
│   │   ├── team/         # Team management
│   │   ├── transactions/ # Transaction management
│   │   ├── users/        # User management
│   │   └── wallets/      # Wallet management
│   ├── login/            # Authentication pages
│   ├── ui-guideline/     # UI component showcase
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Landing page
├── components/           # Reusable components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   ├── common/          # Common/shared components
│   ├── dashboard/       # Dashboard-specific components
│   ├── wallets/         # Wallet-related components
│   └── ai/              # AI-powered components
├── lib/                 # Utility libraries
│   ├── utils.ts         # General utilities
│   ├── api.ts           # API client configuration
│   ├── auth.ts          # Authentication utilities
│   ├── validations.ts   # Zod validation schemas
│   ├── mock-data.ts     # Mock data for development
│   └── mock-api.ts      # Mock API responses
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── constants/           # Application constants
└── styles/              # Additional styles
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

## 🔐 Security Features

### Multi-Layer Security
- **Multi-Signature Wallets**: Configurable threshold signatures for enhanced security
- **Hardware Security Module (HSM)**: Integration with HSM for key management
- **Role-Based Access Control (RBAC)**: Granular permissions and access controls
- **Multi-Factor Authentication (MFA)**: TOTP and hardware key support
- **IP Whitelisting**: Restrict access by IP addresses
- **Session Management**: Secure session handling with automatic timeouts

### Compliance & Audit
- **AML/KYC Integration**: Built-in compliance workflows
- **Audit Trails**: Comprehensive logging of all system activities
- **Regulatory Reporting**: Automated compliance reporting (SAR, CTR, etc.)
- **Data Encryption**: End-to-end encryption for sensitive data
- **Backup & Recovery**: Secure backup and disaster recovery procedures

## 🏗️ Architecture

### Frontend Architecture
- **Component-Based**: Modular React components with TypeScript
- **State Management**: Efficient state handling with React hooks
- **Form Validation**: Robust validation using Zod schemas
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Error Handling**: Comprehensive error boundaries and user feedback

### Backend Integration
- **RESTful APIs**: Clean API design with proper HTTP methods
- **Authentication**: JWT-based authentication with refresh tokens
- **Rate Limiting**: API rate limiting for security and performance
- **Caching**: Intelligent caching strategies for optimal performance
- **Real-time Updates**: WebSocket integration for live data updates

### Blockchain Integration
- **Multi-Chain Support**: Bitcoin, Ethereum, and other major blockchains
- **Transaction Monitoring**: Real-time transaction tracking and confirmations
- **Gas Optimization**: Smart gas fee estimation and optimization
- **Cold Storage**: Secure offline storage for long-term holdings
- **Hot Wallet Management**: Secure online wallets for daily operations

## 📊 Key Features

### Dashboard & Analytics
- **Portfolio Overview**: Real-time portfolio valuation and performance
- **Transaction History**: Comprehensive transaction tracking and filtering
- **Risk Analytics**: Advanced risk assessment and monitoring
- **Performance Metrics**: Detailed performance analysis and reporting
- **Market Data**: Live market data integration and price alerts

### Wallet Management
- **Multi-Signature Setup**: Easy configuration of multi-sig wallets
- **Address Generation**: Secure address generation and management
- **Balance Tracking**: Real-time balance updates across all wallets
- **Transaction Creation**: Intuitive transaction creation with approval workflows
- **Backup & Recovery**: Secure seed phrase and key backup procedures

### User & Team Management
- **Role-Based Permissions**: Flexible role and permission system
- **Team Collaboration**: Multi-user workflows with approval processes
- **Activity Monitoring**: User activity tracking and session management
- **Notification System**: Configurable alerts and notifications
- **API Access**: Secure API key management for integrations

## 🔧 Configuration

### Environment Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/custody_db

# Blockchain
BITCOIN_RPC_URL=http://localhost:8332
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-project-id

# External Services
EMAIL_SERVER_URL=smtp://user:password@smtp.example.com:587
S3_BUCKET_NAME=custody-documents
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Caching**: Intelligent caching for fast load times
- **CDN**: Global content delivery for optimal performance

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- 📧 Email: support@custody-mgmt.com
- 📖 Documentation: [docs.custody-mgmt.com](https://docs.custody-mgmt.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/custody-mgmt/issues)

---

**Built with ❤️ for secure digital asset custody management**