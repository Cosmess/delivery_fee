import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firestore } from '../../infrastructure/firebase/firebase.config';

@Injectable()
export class RequestService {
  private collection = firestore.collection('requests');

  /**
   * Logs a request into Firestore.
   * @param data Request data to be logged.
   */
  async logRequest(data: any): Promise<void> {
    try {
      data.timestamp = new Date().toISOString(); // Ensure timestamp is always included
      await this.collection.add(data);
      console.log(`✅ Request logged: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error(`❌ Error logging request: ${error.message}`);
      throw new InternalServerErrorException('Failed to log request');
    }
  }

  /**
   * Fetches the last 10 requests from Firestore.
   * @returns An array of the last 10 request logs.
   */
  async getLastRequests(): Promise<any[]> {
    try {
      const snapshot = await this.collection.orderBy('timestamp', 'desc').limit(10).get();

      if (snapshot.empty) {
        console.log('⚠️ No requests found in Firestore.');
        return [];
      }

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`❌ Error fetching last requests: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch last requests');
    }
  }
}
