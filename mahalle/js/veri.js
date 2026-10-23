// Oyunun sabit verileri: karakterler, bölümler, anılar, sonlar.
const HIKAYE = [];

const KARAKTERLER = {
  'Mert':          { id: 'mert',   renk: '#c4462f' },
  'Defne':         { id: 'defne',  renk: '#2f6f8f' },
  'Nine':          { id: 'nine',   renk: '#7a5a8c' },
  'Cemil Amca':    { id: 'cemil',  renk: '#6b5a3a' },
  'Nermin Teyze':  { id: 'nermin', renk: '#b4466a' },
  'Hasan Abi':     { id: 'hasan',  renk: '#333a44' },
  'Tolga':         { id: 'tolga',  renk: '#3a6b3a' },
  'Rıza Bey':      { id: 'riza',   renk: '#5a4a2a' },
  'Kadir Amca':    { id: 'kadir',  renk: '#4a6a8a' },
  'Selim':         { id: 'selim',  renk: '#5a5a7a' },
  'Erol Amca':     { id: 'erol',   renk: '#4a5a4a' },
  'Orhan Bey':     { id: 'orhan',  renk: '#555' },
  'Zeki Bey':      { id: 'zeki',   renk: '#3a5a6a' },
  'Saadet Hanım':  { id: 'saadet', renk: '#7a4a4a' },
  'Ali Amca':      { id: 'ali',    renk: '#5a4a3a' },
  'Muhtar':        { id: 'muhtar', renk: '#4a4a4a' },
  'Annem':         { id: 'anne',   renk: '#8a4a5a' },
  'Babam':         { id: 'baba',   renk: '#3a4a5a' },
  'Gül Teyze':     { id: 'gul',    renk: '#6a5a8a' },
  'Kız':           { id: 'defne',  renk: '#2f6f8f', takma: 'Kız' },
  'Adam':          { id: null,     renk: '#555' },
};

// Saatli Maarif takvimi yaprakları
const BOLUMLER = {
  1: { ay: 'Haziran', yil: 1996, gun: 14, haftagunu: 'Cuma',      ad: 'Karne Günü',      soz: 'Yaz, kapısını karne ile açar.' },
  2: { ay: 'Temmuz',  yil: 1996, gun: 13, haftagunu: 'Cumartesi', ad: 'Revanş',          soz: 'Top yuvarlaktır; arsa da öyle.' },
  3: { ay: 'Ağustos', yil: 1996, gun: 24, haftagunu: 'Cumartesi', ad: 'Elektrikler Gidince', soz: 'Karanlıkta komşular birbirini daha iyi görür.' },
  4: { ay: 'Eylül',   yil: 1996, gun: 16, haftagunu: 'Pazartesi', ad: 'Önlük ve Plan',   soz: 'Kağıtla gelen kağıtla gider.' },
  5: { ay: 'Ekim',    yil: 1996, gun: 26, haftagunu: 'Cumartesi', ad: 'Kermes',          soz: 'Börek isteyen önce imza atar.' },
  6: { ay: 'Kasım',   yil: 1996, gun: 12, haftagunu: 'Salı',      ad: 'Yağmur',          soz: 'Bir ağacı kimse dikmez; hep beraber büyütülür.' },
  7: { ay: 'Ekim',    yil: 2026, gun: 15, haftagunu: 'Perşembe',  ad: 'Otuz Yıl Sonra',  soz: 'Değişirken ne yaptığın kalır.' },
};

// Anı defterindeki fotoğraflar (Defne'nin makinesinden)
const ANILAR = {
  karne:        { baslik: 'Karne günü',            tarih: "'96 6 14", yer: 'okul',   zaman: 'ogle',   yazi: 'Teşekkür belgesi. Matematik üç. Fena değil.' },
  turbo:        { baslik: 'Ferrari çıktı',          tarih: "'96 6 14", yer: 'bakkal', zaman: 'ogle',   yazi: 'Üç yıldır Toros çıkıyordu.' },
  sepet:        { baslik: 'Tam yağlı',              tarih: "'96 6 14", yer: 'sokak',  zaman: 'ogle',   yazi: 'Nermin Teyze\'nin sepeti. Zeytinler Cemil Amca\'dan.' },
  ilk_aksam:    { baslik: 'Burada ilk fotoğraf',    tarih: "'96 6 14", yer: 'arsa',   zaman: 'aksam',  yazi: 'Sen, Mert, Hasan Abi, motor, Karabaş, dut ağacı.' },
  cam:          { baslik: 'Şangırt',                tarih: "'96 7 13", yer: 'sokak',  zaman: 'ogleden_sonra', yazi: 'Nermin Teyze\'nin mutfak camı.' },
  mac:          { baslik: 'Revanş alındı',          tarih: "'96 7 13", yer: 'arsa',   zaman: 'ogleden_sonra', yazi: 'Taşlardan kale, tebeşirden penaltı noktası.' },
  tabela:       { baslik: 'Mavi tabela',            tarih: "'96 7 13", yer: 'arsa',   zaman: 'aksam',  yazi: 'Kasım 1996. Dört ay.', tabela: true },
  deniz:        { baslik: 'Florya',                tarih: "'96 8 11", yer: 'deniz', zaman: 'ogleden_sonra', yazi: 'Gri değil. Gerçekten mavi.' },
  harita:       { baslik: 'N.Y. 1979',              tarih: "'96 8 24", yer: 'balkon', zaman: 'ogleden_sonra', yazi: 'Kalemle boyanmış küçük yeşil bir kare.' },
  tavla:        { baslik: 'Düşeş',                  tarih: "'96 8 24", yer: 'bakkal', zaman: 'gece',   yazi: 'Mum ışığında tavla. Cemil Amca bıraktı mı, bilinmez.' },
  masal:        { baslik: 'Dutun masalı',           tarih: "'96 8 24", yer: 'sokak',  zaman: 'gece',   yazi: 'Sonrası yok. Ağaç hâlâ orada.' },
  yildizlar:    { baslik: 'Çıkmayan fotoğraf',      tarih: "'96 8 24", yer: 'cati',   zaman: 'gece',   yazi: 'Çok karanlık. Ama yine de bileceğim.' },
  asker:        { baslik: 'Asker yolu',             tarih: "'96 8 25", yer: 'sokak',  zaman: 'sabah',  yazi: 'AKASYA 96 — HASAN.' },
  okul:         { baslik: 'Beşinci sınıf',          tarih: "'96 9 16", yer: 'okul',   zaman: 'sabah',  yazi: 'Kolalı yaka. Yeni sıra arkadaşı.' },
  kermes_plan:  { baslik: 'Dutun altında toplantı', tarih: "'96 9 16", yer: 'arsa',   zaman: 'aksam',  yazi: 'KERMES. İMZA. Toprağa dalla yazıldı.', tabela: true },
  defter:       { baslik: 'Yüz kırk iki imza',      tarih: "'96 9 20", yer: 'bakkal', zaman: 'aksam',  yazi: 'Veresiye defterinin son sayfası.' },
  karanlik_oda: { baslik: 'Kırmızı ışık',           tarih: "'96 9 21", yer: 'defne',  zaman: 'gece',   yazi: 'Beyaz kağıtta yavaş yavaş beliren bir yaz.' },
  mektup:       { baslik: 'Postacı amca acele et',  tarih: "'96 9 22", yer: 'oda',    zaman: 'gece',   yazi: 'Kareli defterden koparılmış bir sayfa.' },
  sergi:        { baslik: 'Akasya Sokağı, 1996',    tarih: "'96 10 26", yer: 'arsa',  zaman: 'ogleden_sonra', yazi: 'Herkes kendini gördü.', tabela: true, kermes: true },
  tolga:        { baslik: 'T.',                     tarih: "'96 10 26", yer: 'arsa',  zaman: 'ogleden_sonra', yazi: 'Bahçesinde incir vardı.', tabela: true, kermes: true },
  orhan:        { baslik: 'Arşive inecek',          tarih: "'96 10 26", yer: 'arsa',  zaman: 'aksam',  yazi: 'Börek tepsileriyle tutturulmuş bir harita.', tabela: true, kermes: true },
  defne_foto:   { baslik: 'Dutun altında Defne',    tarih: "'96 10 26", yer: 'arsa',  zaman: 'gece',   yazi: 'Hep o çekti. Bir kere de sen.', tabela: true },
  park:         { baslik: 'Akasya Parkı',           tarih: "'97 4 23", yer: 'arsa',   zaman: 'sabah',  yazi: 'Mahalle halkı tarafından korunmuştur.', park: true },
  dut:          { baslik: 'Dut kaldı',              tarih: "'97 6 14", yer: 'arsa',   zaman: 'aksam',  yazi: 'Dutun altında iki bank, bir salıncak.', apartman: true },
  mektuplar:    { baslik: 'Köln\'den',              tarih: "'97 1 10", yer: 'oda',    zaman: 'gece',   yazi: 'Akasya\'da benim bir yerim var mı hâlâ?' },
  son_mac:      { baslik: 'Son maç',                tarih: "'96 11 12", yer: 'arsa',  zaman: 'sabah',  yazi: 'Kimse skor tutmadı.', hava: 'yagmur', tabela: true },
  pencere:      { baslik: 'Pencereden',             tarih: "'96 11 12", yer: 'oda',   zaman: 'sabah',  yazi: 'Biri bakmalı.', hava: 'yagmur' },
};

const SONLAR = {
  park:     { ad: 'Akasya Parkı',  ipucu: 'Kağıtla gelen kağıtla gider. Ve kalabalık gerekir.' },
  dut:      { ad: 'Dut Kalır',     ipucu: 'Rıza Bey bir zamanlar orada oynayan bir çocuktu.' },
  mektup:   { ad: 'Mektuplar',     ipucu: 'Gidenler de bir yere aittir.' },
  son_mac:  { ad: 'Son Maç',       ipucu: 'Arsa değil, oynayanlar.' },
  yalniz:   { ad: 'Pencereden',    ipucu: 'Bazen yeterince insan olmaz.' },
};
