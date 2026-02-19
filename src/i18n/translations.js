// UI translations for Bahasa Malaysia and English
// Prayer names (Subuh, Zohor, etc.) stay the same in both languages — they are Islamic terms

export const T = {
  ms: {
    // Header nav
    navHome: 'Utama',
    navRead: 'Baca',
    navProgress: 'Kemajuan',
    navSettings: 'Tetapan',

    // Dark mode
    switchToLight: 'Tukar ke mod cerah',
    switchToDark: 'Tukar ke mod gelap',

    // HomePage - Welcome
    welcomeTitle: 'Ramadhan Mubarak',
    dayOfThirty: (day) => `Hari ${day} dari 30 — Juz ${day}`,
    juzComplete: (done, today) => `${done}/30 Juz selesai · ${today}/5 hari ini`,

    // HomePage - Prayer times
    prayerTimes: 'Waktu Solat',
    loading: 'Memuatkan...',
    inTime: (t) => `lagi ${t}`,

    // HomePage - Today's segments
    todaysReading: 'Bacaan Hari Ini',
    now: 'Sekarang',
    done: 'Selesai',
    segmentOf: (i, day) => `Bahagian ${i} dari Juz ${day}`,
    repeat: 'Ulang →',
    start: 'Mula →',

    // ReaderPage - Landing
    continueToday: (juz) => `Teruskan Juz Hari Ini — Juz ${juz}`,
    allJuz: 'Semua 30 Juz',
    gridLegend: 'Titik = Bahagian selesai · ✓ = semua 5 Bahagian selesai',

    // ReaderPage - Reader
    ayatInSegment: (n) => `${n} ayat dalam Bahagian ini`,
    tryAgain: 'Cuba lagi',
    segmentComplete: '✓ Bahagian Selesai',
    markComplete: 'Tandakan Selesai',
    nextSegment: 'Bahagian Seterusnya →',
    nextJuz: 'Juz Seterusnya →',
    khatam: 'Khatam Al-Quran — Alhamdulillah',

    // ProgressPage
    yourProgress: 'Kemajuan Anda',
    segmentsDone: 'Bahagian selesai',
    daysComplete: 'Hari Selesai',
    segmentsRead: 'Bahagian Dibaca',
    overall: 'Keseluruhan',
    dayJuz: (d) => `Hari ${d} — Juz ${d}`,
    openReader: 'Buka Bacaan →',
    khatamMessage: 'Anda telah mengkhatam seluruh Al-Quran Ramadhan ini.',

    // SettingsPage
    settings: 'Tetapan',
    ramadhanDay: 'Hari Ramadhan',
    manualDay: (day) => `Ditetapkan manual ke Hari ${day}`,
    autoDay: (day) => `Auto: Hari ${day} (dari 19 Feb 2026)`,
    resetAuto: 'Kembali ke auto',
    location: 'Lokasi',
    usingGPS: 'Menggunakan lokasi GPS anda',
    usingState: (name) => `Menggunakan waktu solat ${name}`,
    detectingLocation: 'Mengesan lokasi...',
    selectState: 'Pilih negeri anda',
    detecting: 'Mengesan...',
    useGPS: 'Guna GPS',
    arabicFontSize: 'Saiz Font Arab',
    fontSizeDesc: 'Laraskan saiz tulisan Arab Uthmani dalam pembaca.',
    prayerReminders: 'Peringatan Solat',
    notifNotSupported: 'Notifikasi tidak disokong dalam pelayar ini.',
    notifDenied: 'Kebenaran notifikasi ditolak. Sila aktifkan dalam tetapan pelayar anda.',
    notifEnabled: 'Anda akan menerima peringatan pada setiap waktu solat dengan Bahagian bacaan Juz anda.',
    notifDisabled: 'Aktifkan untuk menerima peringatan pada setiap waktu solat bagi meneruskan bacaan Al-Quran.',
    iosNotice: 'Notis iPhone / iPad',
    iosPWA: 'Notifikasi berfungsi semasa aplikasi dibuka. iOS mungkin menghentikan semakan latar belakang apabila aplikasi diminimumkan. Untuk hasil terbaik, buka aplikasi semasa waktu solat.',
    iosInstall: 'Untuk notifikasi berfungsi di iOS, anda perlu',
    iosInstallBold: 'install aplikasi ini ke Skrin Utama',
    iosInstallAfter: 'dahulu. Tekan butang Kongsi, kemudian "Tambah ke Skrin Utama". Notifikasi hanya berfungsi pada PWA yang diinstall di iOS 16.4+.',
    language: 'Bahasa',
    langDesc: 'Pilih bahasa antara muka aplikasi.',

    // InstallBanner
    installTitle: 'Pasang Ramadhan 30 Juz',
    installDesc: 'Tambah ke skrin utama untuk akses pantas & bacaan luar talian',
    later: 'Nanti',
    install: 'Pasang',

    // AyahCard
    highlighted: 'Ditanda',

    // SegmentTabs labels
    segmentLabel: (name, i) => `${name} — Bahagian ${i}`,
  },

  en: {
    // Header nav
    navHome: 'Home',
    navRead: 'Read',
    navProgress: 'Progress',
    navSettings: 'Settings',

    // Dark mode
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',

    // HomePage - Welcome
    welcomeTitle: 'Ramadhan Mubarak',
    dayOfThirty: (day) => `Day ${day} of 30 — Juz ${day}`,
    juzComplete: (done, today) => `${done}/30 Juz complete · ${today}/5 today`,

    // HomePage - Prayer times
    prayerTimes: 'Prayer Times',
    loading: 'Loading...',
    inTime: (t) => `in ${t}`,

    // HomePage - Today's segments
    todaysReading: "Today's Reading",
    now: 'Now',
    done: 'Done',
    segmentOf: (i, day) => `Segment ${i} of Juz ${day}`,
    repeat: 'Review →',
    start: 'Start →',

    // ReaderPage - Landing
    continueToday: (juz) => `Continue Today's Juz — Juz ${juz}`,
    allJuz: 'All 30 Juz',
    gridLegend: 'Dots = segments complete · ✓ = all 5 segments done',

    // ReaderPage - Reader
    ayatInSegment: (n) => `${n} ayat in this segment`,
    tryAgain: 'Try again',
    segmentComplete: '✓ Segment Complete',
    markComplete: 'Mark as Complete',
    nextSegment: 'Next Segment →',
    nextJuz: 'Next Juz →',
    khatam: 'Khatam Al-Quran — Alhamdulillah',

    // ProgressPage
    yourProgress: 'Your Progress',
    segmentsDone: 'segments done',
    daysComplete: 'Days Complete',
    segmentsRead: 'Segments Read',
    overall: 'Overall',
    dayJuz: (d) => `Day ${d} — Juz ${d}`,
    openReader: 'Open Reader →',
    khatamMessage: 'You have completed the entire Quran this Ramadhan.',

    // SettingsPage
    settings: 'Settings',
    ramadhanDay: 'Ramadhan Day',
    manualDay: (day) => `Manually set to Day ${day}`,
    autoDay: (day) => `Auto-calculated: Day ${day} (from 19 Feb 2026)`,
    resetAuto: 'Reset to auto-detect',
    location: 'Location',
    usingGPS: 'Using your GPS location',
    usingState: (name) => `Using ${name} prayer times`,
    detectingLocation: 'Detecting location...',
    selectState: 'Select your state',
    detecting: 'Detecting...',
    useGPS: 'Use GPS instead',
    arabicFontSize: 'Arabic Font Size',
    fontSizeDesc: 'Adjust the size of Arabic Uthmani script in the reader.',
    prayerReminders: 'Prayer Reminders',
    notifNotSupported: 'Notifications are not supported in this browser.',
    notifDenied: 'Notification permission was denied. Please enable it in your browser settings.',
    notifEnabled: 'You will receive reminders at each prayer time with your Juz reading segment.',
    notifDisabled: 'Enable to get reminders at each prayer time to continue your Quran reading.',
    iosNotice: 'iPhone / iPad Notice',
    iosPWA: 'Notifications work when the app is open. iOS may pause background checks when the app is minimized. For best results, keep the app open during prayer times.',
    iosInstall: 'For notifications to work on iOS, you must',
    iosInstallBold: 'install this app to your Home Screen',
    iosInstallAfter: 'first. Tap the Share button, then "Add to Home Screen". Notifications only work in installed PWAs on iOS 16.4+.',
    language: 'Language',
    langDesc: 'Choose the app interface language.',

    // InstallBanner
    installTitle: 'Install Ramadhan 30 Juz',
    installDesc: 'Add to home screen for quick access & offline reading',
    later: 'Later',
    install: 'Install',

    // AyahCard
    highlighted: 'Highlighted',

    // SegmentTabs labels
    segmentLabel: (name, i) => `${name} — Segment ${i}`,
  },
}
