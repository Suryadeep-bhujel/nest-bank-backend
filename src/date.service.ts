import { Global, Injectable } from '@nestjs/common';
import  dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat)
@Injectable()
export class DateService {
    getCurrentDate(): string {
        return dayjs().format('YYYY-MM-DD');
    }

    getCurrentTime(): string {
        return dayjs().format('HH:mm:ss');
    }

    getCurrentDateTime(): string {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
    }

    getCurrentTimestamp(): number {
        return dayjs().unix();
    }
    convertToDate(date: any, format: string): Date {
        const datevalue  = dayjs(date, format).toDate();
        console.log("datevalue", datevalue);
        return datevalue;
        const formattedDate: Date = dayjs(date, format).toDate();
        return formattedDate;
    }
    // // Assign to DTO
    // createCustomerDto.dateOfBirth = formattedDate;

    //         return dayjs(date, 'YYYY-MM-DD', true).isValid();
    // getCurrentDateTimeWithTimezone(timezone: string): string {
    //     return dayjs().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    // }
    // getCurrentDateWithTimezone(timezone: string): string {
    //     return dayjs().tz(timezone).format('YYYY-MM-DD');
    // }
    // getCurrentTimeWithTimezone(timezone: string): string {
    //     return dayjs().tz(timezone).format('HH:mm:ss');
    // }

}
