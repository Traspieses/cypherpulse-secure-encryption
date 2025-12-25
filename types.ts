
export interface CryptoResult {
  text: string;
  type: 'encrypted' | 'decrypted' | 'error';
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
