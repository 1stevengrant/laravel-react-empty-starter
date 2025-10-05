declare namespace App.Data {
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
additional: Array<any>;
};
}
