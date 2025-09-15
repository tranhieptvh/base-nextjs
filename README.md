# Base NextJS

A modern, full-featured NextJS application template with authentication, state management, and all essential frontend features built-in.

## 🚀 Features

### Core Framework
- **Next.js 14+** with App Router
- **React 18+** with concurrent features
- **TypeScript** for type safety

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library
- **Lucide React** for beautiful icons
- **Framer Motion** for animations
- Dark/Light theme support

### State Management
- **Zustand** for lightweight state management
- **React Query** for server state management
- **React Hook Form** for form handling

### Development Tools
- **ESLint** and **Prettier** for code quality
- **Husky** for git hooks
- **TypeScript** for type checking

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── features/         # Feature-specific components
│   └── common/           # Common components
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── store/                # State management
├── services/             # API services
└── types/                # TypeScript types
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd base-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API
API_BASE_URL="http://localhost:3000/api"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# App Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_NAME="Base NextJS App"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Tailwind CSS

The project uses Tailwind CSS v4 with custom configuration. See `tailwind.config.js` for details.

### TypeScript

TypeScript is configured with strict mode enabled. See `tsconfig.json` for configuration.

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

## 📚 Key Features

### Authentication
- Complete authentication system
- Protected routes
- JWT token management
- Role-based access control

### State Management
- Global state with Zustand
- Server state with React Query
- Form state with React Hook Form

### UI/UX
- Responsive design
- Dark/Light theme
- Loading states
- Error handling
- Toast notifications

### Development Experience
- TypeScript for type safety
- ESLint and Prettier
- Hot reload
- Path mapping
- Custom hooks

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js buildpack
- **Railway**: Connect your GitHub repository
- **Docker**: Use the included Dockerfile

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Query Documentation](https://tanstack.com/query/latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
