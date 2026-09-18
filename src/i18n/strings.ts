export interface AppStrings {
  appName: string
  tagline: string
  nav: {
    dashboard: string
    recovery: string
    templates: string
    history: string
    myInfo: string
    settings: string
    privacy: string
  }
  dashboard: {
    quickTitle: string
    quickSubtitle: string
    friendPlaceholder: string
    templateLabel: string
    chooseTemplate: string
    go: string
    prepare: string
    recentRequests: string
    noRecent: string
    emptyProfileTitle: string
    emptyProfileBody: string
    addInfo: string
    emptyTemplateTitle: string
    createTemplateCta: string
  }
  myInfo: {
    title: string
    subtitle: string
    username: string
    email: string
    phone: string
    chatType: string
    save: string
  }
  chatTypes: {
    friend: string
    group: string
    best_friend: string
    other: string
  }
  templates: {
    title: string
    subtitle: string
    create: string
    newTitle: string
    editTitle: string
    name: string
    use: string
    edit: string
    duplicate: string
    delete: string
    setDefault: string
    isDefault: string
    save: string
    empty: string
    emptyBody: string
  }
  preview: {
    title: string
    username: string
    email: string
    phone: string
    chatType: string
    friendUsername: string
    copy: string
    openSupport: string
    saveRequest: string
    back: string
    usedTemplate: string
  }
  history: {
    title: string
    search: string
    all: string
    open: string
    copy: string
    reuse: string
    delete: string
    friend: string
    template: string
    date: string
    status: string
    empty: string
  }
  status: {
    pending: string
    submitted: string
    recovered: string
    failed: string
  }
  settings: {
    title: string
    language: string
    theme: string
    light: string
    dark: string
    system: string
    defaultTemplate: string
    notifications: string
    privacyTitle: string
    deleteAll: string
    deleteConfirmTitle: string
    deleteConfirmBody: string
    confirm: string
    cancel: string
  }
  privacy: {
    title: string
    points: readonly string[]
  }
  toast: {
    profileSaved: string
    templateSaved: string
    templateUpdated: string
    templateDeleted: string
    templateDuplicated: string
    requestCreated: string
    dataCopied: string
    requestDeleted: string
    defaultSet: string
    allDataDeleted: string
  }
  errors: {
    required: string
    invalidEmail: string
    invalidPhone: string
    templateNameRequired: string
    friendUsernameRequired: string
  }
  common: {
    cancel: string
    close: string
    loading: string
  }
}

export const strings: Record<'ar' | 'en', AppStrings> = {
  ar: {
    appName: 'SnapStreak Recovery',
    tagline: 'استعد نموذج طلب الستريك خلال ثوانٍ',
    nav: {
      dashboard: 'الرئيسية',
      recovery: 'استعادة',
      templates: 'القوالب',
      history: 'السجل',
      myInfo: 'بياناتي',
      settings: 'الإعدادات',
      privacy: 'الخصوصية',
    },
    dashboard: {
      quickTitle: 'استعادة سريعة',
      quickSubtitle: 'أدخل اسم المستخدم فقط',
      friendPlaceholder: '@username',
      templateLabel: 'القالب',
      chooseTemplate: 'اختيار القالب',
      go: 'استعادة',
      prepare: 'تجهيز طلب الاستعادة',
      recentRequests: 'آخر الطلبات',
      noRecent: 'لا توجد طلبات بعد',
      emptyProfileTitle: 'ابدأ بإعداد بياناتك',
      emptyProfileBody: 'احفظ بياناتك مرة واحدة لتتمكن من إنشاء طلبات الاستعادة بسرعة.',
      addInfo: 'إضافة بياناتي',
      emptyTemplateTitle: 'لم تقم بإنشاء أي قالب بعد',
      createTemplateCta: 'إنشاء قالب',
    },
    myInfo: {
      title: 'بياناتي',
      subtitle: 'تُحفظ محليًا على جهازك فقط وتُستخدم لتعبئة نماذج الاستعادة',
      username: 'اسم مستخدم Snapchat',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      chatType: 'نوع الدردشة',
      save: 'حفظ البيانات',
    },
    chatTypes: {
      friend: 'الدردشة مع صديق',
      group: 'دردشة جماعية',
      best_friend: 'أصدقاء مقربون',
      other: 'أخرى',
    },
    templates: {
      title: 'قوالب الاستعادة',
      subtitle: 'أنشئ قوالب جاهزة من بياناتك لاستخدامها بضغطة واحدة',
      create: 'إنشاء قالب',
      newTitle: 'قالب جديد',
      editTitle: 'تعديل القالب',
      name: 'اسم القالب',
      use: 'استخدام القالب',
      edit: 'تعديل',
      duplicate: 'نسخ',
      delete: 'حذف',
      setDefault: 'تعيين كافتراضي',
      isDefault: 'القالب الافتراضي',
      save: 'حفظ القالب',
      empty: 'لم تقم بإنشاء أي قالب بعد',
      emptyBody: 'أنشئ قالبك الأول من بياناتك المحفوظة.',
    },
    preview: {
      title: 'طلب استعادة الستريك',
      username: 'اسم المستخدم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      chatType: 'نوع الدردشة',
      friendUsername: 'اسم مستخدم الصديق',
      copy: 'نسخ البيانات',
      openSupport: 'فتح Snapchat Support',
      saveRequest: 'حفظ الطلب',
      back: 'العودة',
      usedTemplate: 'القالب المستخدم',
    },
    history: {
      title: 'سجل الطلبات',
      search: 'بحث عن اسم مستخدم...',
      all: 'الكل',
      open: 'فتح',
      copy: 'نسخ',
      reuse: 'إعادة الاستخدام',
      delete: 'حذف',
      friend: 'الصديق',
      template: 'القالب',
      date: 'التاريخ',
      status: 'الحالة',
      empty: 'لا توجد طلبات استعادة حتى الآن',
    },
    status: {
      pending: 'قيد الانتظار',
      submitted: 'تم الإرسال',
      recovered: 'تمت الاستعادة',
      failed: 'فشلت',
    },
    settings: {
      title: 'الإعدادات',
      language: 'اللغة',
      theme: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      system: 'تلقائي',
      defaultTemplate: 'القالب الافتراضي',
      notifications: 'الإشعارات',
      privacyTitle: 'الخصوصية',
      deleteAll: 'حذف جميع بياناتي',
      deleteConfirmTitle: 'حذف جميع البيانات؟',
      deleteConfirmBody: 'سيتم حذف بياناتك وقوالبك وسجل طلباتك نهائيًا من هذا الجهاز. لا يمكن التراجع عن هذا الإجراء.',
      confirm: 'تأكيد الحذف',
      cancel: 'إلغاء',
    },
    privacy: {
      title: 'الخصوصية',
      points: [
        'الموقع لا يطلب كلمة مرور Snapchat أبدًا.',
        'الموقع لا يسجّل الدخول إلى حساب Snapchat الخاص بك.',
        'البيانات تُستخدم فقط لتجهيز طلبات الدعم الرسمية.',
        'جميع البيانات مخزّنة محليًا على جهازك ويمكنك حذفها في أي وقت.',
        'الموقع لا يتجاوز أنظمة الحماية أو CAPTCHA الخاصة بـ Snapchat.',
      ],
    },
    toast: {
      profileSaved: 'تم حفظ البيانات ✓',
      templateSaved: 'تم إنشاء القالب ✓',
      templateUpdated: 'تم تحديث القالب ✓',
      templateDeleted: 'تم حذف القالب',
      templateDuplicated: 'تم نسخ القالب ✓',
      requestCreated: 'تم إنشاء طلب الاستعادة ✓',
      dataCopied: 'تم نسخ بيانات الطلب بنجاح ✓',
      requestDeleted: 'تم حذف الطلب',
      defaultSet: 'تم تعيين القالب كافتراضي ✓',
      allDataDeleted: 'تم حذف جميع بياناتك',
    },
    errors: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'صيغة البريد الإلكتروني غير صحيحة',
      invalidPhone: 'صيغة رقم الجوال غير صحيحة',
      templateNameRequired: 'اسم القالب مطلوب',
      friendUsernameRequired: 'اسم مستخدم الصديق مطلوب',
    },
    common: {
      cancel: 'إلغاء',
      close: 'إغلاق',
      loading: '...جارٍ التحميل',
    },
  },
  en: {
    appName: 'SnapStreak Recovery',
    tagline: 'Prep your streak recovery request in seconds',
    nav: {
      dashboard: 'Dashboard',
      recovery: 'Recovery',
      templates: 'Templates',
      history: 'History',
      myInfo: 'My Info',
      settings: 'Settings',
      privacy: 'Privacy',
    },
    dashboard: {
      quickTitle: 'Quick Recovery',
      quickSubtitle: 'Enter a username, that\u2019s it',
      friendPlaceholder: '@username',
      templateLabel: 'Template',
      chooseTemplate: 'Choose a template',
      go: 'Recover',
      prepare: 'Prepare recovery request',
      recentRequests: 'Recent requests',
      noRecent: 'No requests yet',
      emptyProfileTitle: 'Set up your info',
      emptyProfileBody: 'Save your details once so every recovery request is ready in seconds.',
      addInfo: 'Add my info',
      emptyTemplateTitle: "You haven't created a template yet",
      createTemplateCta: 'Create a template',
    },
    myInfo: {
      title: 'My Information',
      subtitle: 'Stored only on this device and used to fill recovery requests',
      username: 'Snapchat username',
      email: 'Email address',
      phone: 'Phone number',
      chatType: 'Chat type',
      save: 'Save info',
    },
    chatTypes: {
      friend: 'Chat with a friend',
      group: 'Group chat',
      best_friend: 'Best friends',
      other: 'Other',
    },
    templates: {
      title: 'Recovery Templates',
      subtitle: 'Build ready-to-go templates from your saved info',
      create: 'Create template',
      newTitle: 'New template',
      editTitle: 'Edit template',
      name: 'Template name',
      use: 'Use template',
      edit: 'Edit',
      duplicate: 'Duplicate',
      delete: 'Delete',
      setDefault: 'Set as default',
      isDefault: 'Default template',
      save: 'Save template',
      empty: "You haven't created a template yet",
      emptyBody: 'Create your first template from your saved info.',
    },
    preview: {
      title: 'Streak Recovery Request',
      username: 'Username',
      email: 'Email',
      phone: 'Phone',
      chatType: 'Chat type',
      friendUsername: 'Friend\u2019s username',
      copy: 'Copy data',
      openSupport: 'Open Snapchat Support',
      saveRequest: 'Save request',
      back: 'Back',
      usedTemplate: 'Template used',
    },
    history: {
      title: 'Request History',
      search: 'Search by username...',
      all: 'All',
      open: 'Open',
      copy: 'Copy',
      reuse: 'Reuse',
      delete: 'Delete',
      friend: 'Friend',
      template: 'Template',
      date: 'Date',
      status: 'Status',
      empty: 'No recovery requests yet',
    },
    status: {
      pending: 'Pending',
      submitted: 'Submitted',
      recovered: 'Recovered',
      failed: 'Failed',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      defaultTemplate: 'Default template',
      notifications: 'Notifications',
      privacyTitle: 'Privacy',
      deleteAll: 'Delete all my data',
      deleteConfirmTitle: 'Delete all data?',
      deleteConfirmBody: 'Your info, templates and request history will be permanently removed from this device. This cannot be undone.',
      confirm: 'Delete everything',
      cancel: 'Cancel',
    },
    privacy: {
      title: 'Privacy',
      points: [
        'This site never asks for your Snapchat password.',
        'This site never signs in to your Snapchat account.',
        'Your data is used only to prepare official support requests.',
        'Everything is stored locally on your device and you can delete it anytime.',
        "This site does not bypass Snapchat's protections or CAPTCHA.",
      ],
    },
    toast: {
      profileSaved: 'Info saved ✓',
      templateSaved: 'Template created ✓',
      templateUpdated: 'Template updated ✓',
      templateDeleted: 'Template deleted',
      templateDuplicated: 'Template duplicated ✓',
      requestCreated: 'Recovery request created ✓',
      dataCopied: 'Request data copied ✓',
      requestDeleted: 'Request deleted',
      defaultSet: 'Set as default template ✓',
      allDataDeleted: 'All your data was deleted',
    },
    errors: {
      required: 'This field is required',
      invalidEmail: 'Enter a valid email address',
      invalidPhone: 'Enter a valid phone number',
      templateNameRequired: 'Template name is required',
      friendUsernameRequired: "Friend's username is required",
    },
    common: {
      cancel: 'Cancel',
      close: 'Close',
      loading: 'Loading...',
    },
  },
}
