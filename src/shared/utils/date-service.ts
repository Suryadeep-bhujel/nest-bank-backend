import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// 👉 "1993-04-15 00:00:00.000 +05:30"
export class DateService {
    convertToDBDateString(dateString: string, format: string = "DD-MM-YYYY"): string | null {
        // Parse DD-MM-YYYY
        const parsed = dayjs(dateString, format);
        // Format with IST (+05:30) offset
        const formatted = parsed.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss.SSS Z");
        return formatted
    }
    convertToDate(dateString: string, format: string = "DD-MM-YYYY"): Date | null {
        if (!dateString) return null;
        const parsed = dayjs(dateString, format);
        if (!parsed.isValid()) return null;
        return parsed.toDate();
    }
}