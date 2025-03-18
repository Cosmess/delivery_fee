import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BentoAuthService {
  private readonly firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_AUTH_API_KEY}`;
  private readonly email = process.env.BENTO_TEST_EMAIL;
  private readonly password = process.env.BENTO_TEST_PASSWORD;

  async getUserToken(): Promise<string> {
    try {
      const response = await axios.post(this.firebaseAuthUrl, {
        returnSecureToken: true,
        email: this.email,
        password: this.password,
        clientType: "CLIENT_TYPE_WEB",
      });

      return response.data.idToken;
    } catch (error) {
      throw new Error(`Erro ao obter o token: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async getUserUUID(token: string): Promise<string> {
    try {
      const response = await axios.get('https://api.bento.ky/api/v1/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.uuid;
    } catch (error) {
      throw new Error(`Erro ao obter o UUID: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}
