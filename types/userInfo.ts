interface UserInfo {
    access_token: String,
    refresh_token: String
}

export function isUserInfo(obj: any): obj is UserInfo {
    return obj && typeof obj === "object" && "refresh_token" in obj;
}