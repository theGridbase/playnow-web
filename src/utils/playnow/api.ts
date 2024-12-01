import {
  ILoginInitiate,
  IRegisterUser,
  loginStep,
} from "@/app/_lib/interfaces";
import { getToken } from "next-auth/jwt";

export class PlayNowApi {
  private _baseURl: URL;

  constructor() {
    this._baseURl = new URL(`${process.env.NEXT_PUBLIC_API_URL}`);
  }

  public async getServerSession() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/token`,
        { method: "GET" , credentials : "include"}
      );
      return await response.json();
    } catch (error) {
      console.error("Err TOKEN", error);
    }
  }

  public async userLogin(step: loginStep, body: ILoginInitiate) {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_LOGIN_API_VERSION}/auth/`;

      switch (step) {
        case "logininitiate":
          url.pathname += "login";
          break;
        case "verify":
          url.pathname += "verify-otp";
          break;
        case "initialProfile":
          url.pathname += "profile";
          break;
        case "resendOtp":
          url.pathname += "resend-otp";
          break;
        default:
          break;
      }
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  public async forgetPassword(email: string) {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_LOGIN_API_VERSION}/auth/`;
      url.pathname += "forget-password";

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  public async resetPassword(token: string, password: string) {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_LOGIN_API_VERSION}/auth/`;
      url.pathname += "reset-password";

      url.searchParams.append("token", token);

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  public async registerUser(body: IRegisterUser) {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_LOGIN_API_VERSION}/auth/`;
      url.pathname += "register";

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  public async getProfileExtras() {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_PROFILE_API_VERSION}/profile/`;
      url.pathname += `extras`;

      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  public async getPlaceTypes() {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_PLACETYPE_API_VERSION}/place-types`;

      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }
  public async getAmenities() {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_AMENITY_API_VERSION}/amenity`;

      const request = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }

  public async createUserGround(body: any) {
    try {
      const url = new URL(this._baseURl.toString());
      url.pathname = `${process.env.NEXT_PUBLIC_GROUND_API_VERSION}/ground`;

      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await request.json();
    } catch (error) {
      console.error("Error", error);
    }
  }
}
