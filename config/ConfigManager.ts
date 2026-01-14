import 'dotenv/config';

export class ConfigManager {
  private static instance: ConfigManager;

  public readonly baseUrl: string;
  public readonly username: string;
  public readonly password: string;

  private constructor() {
    this.baseUrl = this.readEnv('BASE_URL');
    this.username = this.readEnv('QUICKBASE_USERNAME');
    this.password = this.readEnv('QUICKBASE_PASSWORD');
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private readEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing env variable: ${key}`);
    }
    return value;
  }
}
