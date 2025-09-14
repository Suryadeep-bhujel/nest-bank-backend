import { v4 as uuidv4 } from 'uuid';
class AppService {
    private static instance: AppService;
    
    private constructor() {}
    
    public static getInstance(): AppService {
        if (!AppService.instance) {
        AppService.instance = new AppService();
        }
        return AppService.instance;
    }
    generateOid(): string  {
        return uuidv4().replace(/-/g, '');
    }
    public async init(): Promise<void> {
        // Initialization logic here
    }
}