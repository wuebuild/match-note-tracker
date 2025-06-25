interface User {
    id: String,
    name: String,
    email: String,
    refresh_token: String
}

interface AccountInfo {
    name: string,
    email: string,
    password: string,
    confirmPassword?: string
}

interface Login {
    email: string,
    password: string
}

interface UserToken {
    id: string,
    email: string,
    name: string,
    access_token: string,
    refresh_token: string
}