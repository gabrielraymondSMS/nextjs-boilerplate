# 📘 FRONTEND BOILERPLATE DOCUMENTATION

## 1. INTRODUCTION

Welcome to the **Frontend Boilerplate**!

This boilerplate is designed for **fast**, **scalable**, and **modern** web app development using:

- **Next.js 15 (App Router)**
- **TypeScript**
- **Zustand** for state management
- **React Query** for data fetching
- **Tailwind CSS** for styling

---

## 2. GETTING STARTED

### 🔧 Installation

```bash
git clone [repo]
cd nextjs-boilerplate
npm install
```
Development: 
```bash
npm run dev
```
Build:
```bash
npm run build
```

3. Project Structure

```
src/
│
├── app/                                # Next.js 14 App Router
│   ├── (auth)/                         # Authentication pages (e.g. login, register)
│   │   ├── login/                      # Login page
│   │   ├── register/                   # Register page
│   │   └── layout.tsx                  # Layout just for authentication route
│   │
│   ├── (protected)/                    # Protected route (requires authentication)
│   │   ├── users/                      
│   │   │   ├── [userId]                
│   │   │   │    └── page.tsx           # "/users/[userId]" page for displaying user detail, edit/update (protected)
│   │   │   └── page.tsx                # "/users" page for displaying user list (protected)
│   │   └── layout.tsx                  # Layout just for protected route
│   │       
│   │
│   ├── api/                            # Route handlers for API endpoints (Next.js App Router)
│   │   ├── auth/                       # Endpoint: /api/auth
│   │   └── users/                      # Endpoint: /api/users
│   │       ├── [id]                    # Dynamic route: /api/users/:id
│   │       │    └── route.tsx          # Get or manipulate a specific user by ID
│   │       └── route.tsx               # Get all users or create a new user
│   │
│   ├── global.css                      # Global styles (imported in layout.tsx)
│   ├── layout.tsx                      # Root layout shared across all pages
│   └── page.tsx                        # Root page ("/") – typically the home or landing page
│
│
├── components/                         # Reusable UI components
│   ├── common/                         # Common components (e.g., buttons, inputs)
│   └── features/                       # Feature-specific components
│       ├── auth/
│       │   ├── Login.tsx               # Component form for login form
│       │   └── Register.tsx            # Componet form for register form
│       └── user-management/            #
│           ├── ConfirmationUser.tsx    # Modal for confiramtion action in User
│           ├── CreateUser.tsx          # Component to create User (This component will be in the form of a modal/popup component)
│           ├── EditUser.tsx            # Componet to edit user (in page user detail "/users/[userId]")
│           ├── PhotoProfileUpload.tsx  
│           └── UserManagement.tsx      # Component to display list
│
├── hooks/                              # Custom React hooks for reusable logic
│   ├── auth/                   
│   │   ├── useLogin.ts                 # Hook for login logic
│   │   └── useRegister.ts              # Hook for registration logic
│   │
│   └── users/                          # Hooks related to user data management
│       ├── useCreateUser.ts            # Hook to handle user creation
│       ├── useDeleteUser.ts            # Hook to handle user deletion
│       ├── useUpdateUser.ts            # Hook to handle user updates
│       └── useUsers.ts                 # Hook to fetch the user list
│
├── lib/                                # Utility functions and libraries
│   ├── api/                            # API client and services
│   │   ├── auth/
│   │   │   └── authService.ts   
│   │   ├── users/
│   │   │   └── userService.ts   
│   │   └── client.ts                   # Axios client
│   ├── options/
│   ├── utils/
│   ├── validation/
│   │   └── validationSchemas.ts
│   └── constants/                      # Constants (e.g., API endpoints)
│
│
├── providers/
│   └── AppProviders.tsx                # This file wraps the entire app with global providers such as React Query's
│
├── stores/                             # Zustand stores
│   └── useUIStore.ts                   # UI-related state (e.g., theme, modals)
│
├── styles/                             # External CSS files
│
├── types/                              # TypeScript types
│   ├── api/                            # API response/request types
│   └── pokemon.ts                      # Pokemon-related types
└── middleware.ts                       # Middleware to handle auth, redirects, or request rewrites

```

4. Features
- Next.js 15 App Router
- TypeScript Strict Mode
- React Query with Hydration
- Zustand state management
- Tailwind CSS
- React-hook-form
- yup validation
- Foldre-align structure
- Environment Variable Support

5. Configuration
.env.example
NEXT_PUBLIC_API_BASE_URL=https://api.example.com


6. ⚡ Data Fetching with React Query
Our boilerplate uses React Query for efficient and scalable data fetching. Below is the full setup:

🛠️ Step 1: Configure Base URLs in .env
In your root .env file, add API base URLs:
```jsx
NEXT_PUBLIC_SONERGY_BASE_URL=https://your-api.com
```

📁 Step 2: Set Up Axios Client
File: src/lib/api/client.ts
```jsx
import axios from "axios"
import Cookies from "js-cookie"

// 1️⃣ Define base URLs from environment variables
const BASE_URLS = {
  SONERGY: process.env.NEXT_PUBLIC_SONERGY_BASE_URL || "",
}

// 2️⃣ Create dynamic Axios instance based on the API name
export const createAxiosClient = (apiName: keyof typeof BASE_URLS) => {
  const instance = axios.create({
    baseURL: BASE_URLS[apiName],
    headers: {
      "Content-Type": "application/json",
    },
  })

  // 3️⃣ Attach token from cookies (if exists)
  instance.interceptors.request.use((config) => {
    const token = Cookies.get("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return instance
}

// 4️⃣ Export specific API clients
export const sonergyApiClient = createAxiosClient("SONERGY")

```


📁 Step 3: Create API Services
File: src/lib/api/users/userService.ts
```jsx
import { User } from "@/types/ColumnType"
import { sonergyApiClient } from "../client"

// 📄 Fetch paginated list of users
export const fetchUserList = async (params: any) => {
  const response = await sonergyApiClient.get("/users", { params })
  return response?.data?.data
}
```

🧠 Step 4: Create a Custom Hook with React Query
File: src/hooks/useUserList.ts
```jsx
import { fetchUserList } from "@/lib/api/users/userService"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export const useUserList = (params: { limit: number; page: number }) => {
  const memoizedParams = useMemo(() => params, [params.limit, params.page])

  return useQuery({
    queryKey: ["userList", memoizedParams],
    queryFn: () => fetchUserList(params),
    staleTime: 1000 * 60 * 5, // Cache stays fresh for 5 minutes
    gcTime: 1000 * 60 * 10,   // Cache is removed after 10 minutes if unused
    placeholderData: (previousData) => previousData, // Keep old data on re-fetch
  })
}
```

🧩 Step 5: Use the Hook in a Component
```jsx
const {
  data: userListData,           // 👥 Fetched user list
  isLoading: isUserListLoading, // ⏳ Loading state
  // error: userError,          // ❌ Uncomment to handle errors
} = useUserList({
  page: pagination.page,
  limit: pagination.limit,
})

```

🔁 Mutation Setup (POST, PUT, DELETE)
Steps 1 & 2 are the same as fetching. We continue from Step 3.

📁 Step 3: Create API Service for Mutation
File: src/lib/api/users/userService.ts
```jsx
import { User } from "@/types/ColumnType";
import { sonergyApiClient } from "../client";

// Create a new user
export const createUser = async (body: User) => {
  const response = await sonergyApiClient.post("/users", body);
  return response.data;
};
```

🧠 Step 4: Create Custom Mutation Hook
File: src/hooks/useCreateUser.ts
```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/lib/api/users/userService";
import { User } from "@/types/ColumnType";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return useMutation<any, Error, User>({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("Register successful:", data?.data);
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error: any) => {
      showSnackbar(error?.response?.data?.message, "error", "top");
    },
  });
};
```

🧩 Step 5: Use Mutation Hook in Component
```jsx
const { mutate } = useCreateUser();

const onSubmit: SubmitHandler<CreateUserFormInputs> = (data) => {
  mutate(
    {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
    },
    {
      onSuccess: () => {
        setIsShow(false);
        setIsShowConfirmationCreate(false);
        reset();
      },
      onError: () => {
        setIsShow(true);
        setIsShowConfirmationCreate(false);
      },
    }
  );
};
```
