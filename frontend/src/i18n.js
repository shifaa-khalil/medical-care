import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        logout: "Logout",
        email: "Email",
        password: "Password",
        login: "Login",
        register: "Register",
        registerinstead: "register instead",
        logininstead: "login instead",
        createaccount: "Create Account",
        dob: "Date of birth",
        name: "Name",
        gender: "Gender",
        medicalcase: "Medical case",
        patientname: "Patient name",
        addedin: "Added in",
        patientcase: "Patient case",
        moredetails: "more details",
        morepatients: "See more",
        lesspatients: "See less",
        medications: "Medications",
        droppatient: "drop patient",
        addnote: "add note",
        addmedication: "add medication",
        dropmedication: "drop",
        editmedication: "edit",
        here: "here",
        male: "male",
        female: "female",
        medicationname: "Medication name",
        medicationusage: "Medication usage",
        submit: "Submit",
        cancel: "Cancel",
        notecontent: "Note content",
        profile: "Profile",
        notes: "Notes",
        nodata: "no data",
      },
    },
    tr: {
      translation: {
        // navbar
        welcome: "Hoş geldin",
        logout: "Çıkış yap",
        // login, register
        email: "E-posta",
        password: "Şifre",
        login: "Giriş yapmak",
        register: "Kayıt olmak",
        registerinstead: "kayıt olmak",
        logininstead: "giriş yapmak",
        createaccount: "Hesap oluşturmak",
        dob: "Doğum tarihi",
        name: "İsim",
        gender: "Cinsiyet",
        // patient card & home
        medicalcase: "Tıbbi durum",
        patientname: "Hasta adı",
        addedin: "Eklendi",
        patientcase: "Hasta vakası",
        moredetails: "daha fazla detay",
        morepatients: "Daha fazla gör",
        lesspatients: "Daha az görün",
        // patient
        medications: "ilaçlar",
        droppatient: "hastayı bırak",
        addnote: "not ekle",
        addmedication: "ilaç ekle",
        dropmedication: "düşürmek",
        editmedication: "düzenlemek",
        here: "burada",
        male: "erkek",
        female: "dişi",
        medicationname: "ilaç adı",
        medicationusage: "ilaç kullanımı",
        submit: "Göndermek",
        cancel: "İptal etmek",
        notecontent: "Not içeriği",
        // patient profile
        profile: "Profil",
        notes: "Notlar",
        nodata: "veri yok",
      },
    },
    ar: {
      translation: {
        // navbar
        welcome: "أهلا",
        logout: "تسجيل الخروج",
        // login, register
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        registerinstead: "إنشاء حساب",
        logininstead: "تسجيل الدخول",
        createaccount: "إنشاء حساب",
        dob: "تاريخ الميلاد",
        name: "الإسم",
        gender: "الجنس",
        // patient card & home
        medicalcase: "الحالة الطبية",
        patientname: "إسم المريض",
        addedin: "سجل في تاريخ",
        patientcase: "الحالة الطبية",
        moredetails: "المزيد من التفاصيل",
        morepatients: "عرض المزيد",
        lesspatients: "عرض أقل",
        // patient
        medications: "الأدوية",
        droppatient: "إزالة المريض",
        addnote: "إضافة ملاحظة",
        addmedication: "إضافة دواء",
        dropmedication: "إزالة",
        editmedication: "تعديل",
        here: "هنا",
        male: "ذكر",
        female: "أنثى",
        medicationname: "إسم العلاج",
        medicationusage: "طريقة الإستخدام",
        submit: "تثبيت",
        cancel: "إلغاء",
        notecontent: "محتوى الملاحظات",
        // patient profile
        profile: "الملف الشخصي",
        notes: "الملاحظات",
        nodata: "لا يوجد بيانات",
      },
    },
  },
});

export default i18n;
