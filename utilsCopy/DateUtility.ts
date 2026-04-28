/**
 * Utility class for performing various date-related operations.
 */
export class DateUtility {
    /**
     * Gets today's date in MM/DD/YYYY format.
     * @returns The current date as a string in MM/DD/YYYY format.
     */
    getTodayDate(): string {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Adds a specified number of years to the current date.
     * @param years - The number of years to add.
     * @returns The new date as a string in MM/DD/YYYY format.
     */
     addYearsToDate(years: number): string {
        const today = new Date();
         today.setFullYear(today.getFullYear() + years);
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Adds a specified number of days to the current date.
     * @param days - The number of days to add.
     * @returns The new date as a string in MM/DD/YYYY format.
     */
    addDaysToDate(days: number): string {
        const today = new Date();
        today.setDate(today.getDate() + days);
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Subtracts a specified number of years from the current date.
     * @param years - The number of years to subtract.
     * @returns The new date as a string in MM/DD/YYYY format.
     */
    subtractYearsFromDate(years: number): string {
        const today = new Date();
        today.setFullYear(today.getFullYear() - years);
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Subtracts a specified number of days from the current date.
     * @param days - The number of days to subtract.
     * @returns The new date as a string in MM/DD/YYYY format.
     */
    subtractDaysFromDate(days: number): string {
        const today = new Date();
        today.setDate(today.getDate() - days);
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Converts a date from MM/DD/YYYY format to YYYY-MM-DD format.
     * @param dateStr - The date string in MM/DD/YYYY format.
     * @returns The date string in YYYY-MM-DD format.
     */
    convertMMDDYYYYToYYYYMMDD(dateStr: string): string {
        const mm = dateStr.substring(0, 2);
        const dd = dateStr.substring(3, 5);
        const yyyy = dateStr.substring(6, 10);
        return `${yyyy}-${mm}-${dd}`;
    }


    /**
     * Converts a date from MM/DD/YYYY format to YYYY-MM-DD format.
     * @param dateStr - The date string in MM/DD/YYYY format.
     * @returns The date string in YYYY-MM-DD format.
     */
    convertYYYYMMDDToMMDDYYYY(dateStr: string): string {
        const yyyy = dateStr.substring(0, 4);
        const mm = dateStr.substring(5, 7);
        const dd = dateStr.substring(8, 10);
        return `${mm}/${dd}/${yyyy}`;
    }

    /**
     * Appends a random number based on the current timestamp to a given string.
     * @param str - The base string to append the random number to.
     * @returns The string with the appended random number.
     */
    appendRandomNumberToString(str: string): string {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const SSSS = String(now.getMilliseconds()).padStart(4, '0');
        const randomNumber = `${yyyy}${mm}${dd}${hh}${min}${ss}${SSSS}`;
        return `${str}_${randomNumber}`;
    }

    public getDateNDaysAgo(daysAgo: number): string {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }

      getDateNDaysFromNow(daysAhead: number): string {
        const date = new Date();
        date.setDate(date.getDate() + daysAhead);
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }
}