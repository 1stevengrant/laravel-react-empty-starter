declare namespace App {
    namespace Data {
        export type PrdStatusData = {
            testCases: App.Data.TestCaseData[];
            summary: App.Data.PrdSummaryData;
        };
        export type PrdSummaryData = {
            total: number;
            passing: number;
            failing: number;
        };
        export type ProgressEntryData = {
            type: string;
            prdItems: string[];
            title: string;
            changes: string[];
            nextSteps: string | null;
        };
        export type ProgressReportData = {
            date: string;
            entries: App.Data.ProgressEntryData[];
            summary: App.Data.ProgressSummaryData;
        };
        export type ProgressSummaryData = {
            total: number;
            implemented: number;
            fixed: number;
            verified: number;
        };
        export type TestCaseData = {
            category: string;
            description: string;
            steps: string[];
            passes: boolean;
        };
        export type UserData = {
            id: number;
            first_name: string;
            last_name: string;
            name: string;
            email: string;
            avatar: string | null;
            email_verified_at: string | null;
            created_at: string;
            updated_at: string;
        };
    }
}
