import { Department } from "../abstract"

export const unitDescription: Record<Department, string> = {
    CRM: 'Крым',
    MSK: 'Москва',
    RND: 'Ростов-на-Дону',
    SPB: 'Санкт Петербург',
    VLG: 'Волгоград',
    KRN: 'Краснодар',
    PTG: 'Пятигорск'
}

export const unitColor: Record<Department, string> = {
    CRM: 'info',
    MSK: 'secondary',
    RND: 'success',
    SPB: 'danger',
    VLG: 'warning',
    KRN: 'primary',
    PTG: 'black'
}