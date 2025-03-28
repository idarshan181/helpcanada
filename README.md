# Next.js Boilerplate Project

A modern Next.js boilerplate project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: [Geist](https://vercel.com/font) font optimization
- **Development**: Hot reload enabled
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- **Node.js** (v18.17 or higher)
- Package manager of your choice:
  - npm
  - yarn
  - pnpm
  - bun

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Run the development server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure
```

├── commitlint.config.ts
├── components.json
├── eslint.config.mjs
├── lint-staged.config.js
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   └── schema.prisma
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── app
│   │   ├── (auth)
│   │   ├── (dashboard)
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── general
│   │       └── Providers.tsx
│   └── lib
│       ├── auth.ts
│       ├── db.ts
│       └── utils.ts
├── tsconfig.json
└── types
    ├── env.d.ts
    └── next-auth.d.ts
```

## 🔄 Development Workflow

### Git Workflow

1. **Initialize Git** (if not already done):
```bash
git init
```

2. **Create a new branch**:
```bash
git checkout -b feature/your-feature-name
```

3. **Stage your changes**:
```bash
git add .
```

4. **Commit your changes**:
```bash
git commit -m "feat: add new feature"
```

5. **Push to remote repository**:
```bash
git push origin feature/your-feature-name
```

### Commit Message Convention

Follow semantic commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🚀 Deployment

The easiest way to deploy your Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

To learn more about Next.js, explore these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Created with ❤️ using [Next.js](https://nextjs.org/)
