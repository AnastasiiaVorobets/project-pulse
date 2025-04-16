export const PasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.,/-])[A-Za-z\\d@$!%*?&.,/-]+$');

export const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const PhoneRegex = /^\+380\d{9}$/;

export const NameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я'-]{0,29}$/;

export const CompanyNameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я'\s-]{0,49}$/;