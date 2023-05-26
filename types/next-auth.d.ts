/* eslint-disable no-unused-vars */
import { Session,User } from "next-auth/jwt"
import { JWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: UserId
  }
}

declare module "next-auth" {
    interface Session {
      user: User & {
        id: UserId
      }
    }
  }