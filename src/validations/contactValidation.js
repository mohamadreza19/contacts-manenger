import * as Yup from 'yup'

export const contactSchema = Yup.object().shape({
    fullname:Yup.string().required("نام و نام خانوادگی تازتمی میباشد"),
    photo: Yup.string().url("ادرس معتبر نمی باشد").required("تصویر الزامی میبتشد"),
    mobile: Yup.number().min(12,"شماره مبایل نباید کمتر از 12 رقم باشد")
        .required("مبایل الزامی میباشد"),
    email: Yup.string().email("آدرس ایمیل معتبر نمی بادش"),
    job: Yup.string().nullable()
})