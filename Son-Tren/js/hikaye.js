// Son Tren — diyaloglar ve anılar.
// Satır: { k: 'Konuşan', m: 'metin' } (k yoksa anlatı)
// Seçim: { secim: [{ m: 'metin', git: 'diyalog', e: { bayrak: true, ani: 'saat' } }] }
// Olay:  { olay: 'ad' } oyun koduna haber verir.  Atlama: { git: 'diyalog' }

export const KISILER = {
  kondukter: { ad: 'Kondüktör', renk: '#9fb4d6' },
  husnu: { ad: 'Hüsnü Usta', renk: '#e0b87a' },
  murat: { ad: 'Murat', renk: '#9ccf8a' },
  elif: { ad: 'Elif', renk: '#ffd25a' },
  sen: { ad: 'Sen', renk: '#ffffff' },
};

export const BOLUMLER = [
  { ad: 'Uyanış', durak: '—', saat: '00:00', hava: 'gece' },
  { ad: 'Ayazlı Ova', durak: 'AYAZLI OVA', saat: '01:12', hava: 'kar' },
  { ad: 'Yağmurlu Şehir', durak: 'ISLAK KÖPRÜ', saat: '02:40', hava: 'yagmur' },
  { ad: 'Deniz Kıyısı', durak: 'MEHTAP', saat: '03:55', hava: 'deniz' },
  { ad: 'Şafak', durak: 'SON DURAK', saat: '04:17', hava: 'safak' },
];

export const ANILAR = {
  saat: {
    baslik: 'Dedemin saati',
    metin: [
      'Duvarları saatlerle dolu küçük bir dükkân. Yüzlerce tik tak, hepsi aynı anda.',
      'Tezgâhın arkasında gözlüklü bir adam, büyüteciyle bir çarkın üstüne eğilmiş.',
      '"Gel bakalım," diyor. "Sana bir sır vereyim. Saatler pille değil, kalple çalışır."',
      'Dedem. Hüsnü Usta, dedemmiş.',
    ],
  },
  mektup: {
    baslik: 'Babamın mektubu',
    metin: [
      'Bir mutfak masası. Annem, sararmış bir zarfı açıyor, gülerken bir yandan ağlıyor.',
      '"Baban askerden yazmıştı bunu," diyor. "Kavga etmiştik, gitmeden önce. Bu mektup gelene kadar konuşmadım onunla."',
      '"Sonra bu geldi. Ve ben bir daha hiç kızamadım ona."',
      'Murat. Genç, korkmuş, yağmurda ıslanmış asker. Babammış.',
    ],
  },
  resim: {
    baslik: 'Kardeşimin resmi',
    metin: [
      'Mutfak masasında boya kalemleri, her yer renk renk.',
      'Küçük bir kız, dilini dişlerinin arasına sıkıştırmış, kâğıda bir şey çiziyor. Gri bir kedi. Yanında iki çöp adam.',
      '"Bu sensin," diyor, büyüğünü göstererek. "Bu da ben. Bu da Duman."',
      'Elif. Benim küçük kardeşim.',
    ],
  },
};

export const ESYALAR = {
  bilet: { ad: 'Bilet', aciklama: 'Kalkış: —. Varış: —. Koltuk 7. Saat: 04:17. Kağıt nemli, kenarları kıvrılmış.' },
  cark: { ad: 'Pirinç çark', aciklama: 'Tırnak kadar küçük, dişleri ince ince işlenmiş bir saat çarkı. Şekerliğin dibinden çıktı.' },
  saat: { ad: 'Cep saati', aciklama: 'Gümüş kapaklı eski bir cep saati. Kapağın içinde kazıma bir yazı var: "Zaman, hatırlayanındır." Akrep ve yelkovan 04:17\'de duruyor.' },
  kalem: { ad: 'Kurşun kalem', aciklama: 'Ucu yeni açılmış, yarısı kemirilmiş bir kurşun kalem. Bavulun yan cebindeydi.' },
  pul: { ad: 'Pul', aciklama: 'Üstünde bir tren resmi olan eski bir pul. Değeri yazılı değil.' },
  mektup: { ad: 'Mektup', aciklama: 'Kapalı bir zarf. Üstünde dikkatli harflerle: "Leyla Yıldız, Akasya Sokağı No: 3, İstanbul." Pul yapıştırılmış.' },
  sardalya: { ad: 'Sardalya kutusu', aciklama: 'Büfenin rafından alınmış küçük bir konserve. Kedilerin en sevdiği koku.' },
  resim: { ad: 'Elif\'in resmi', aciklama: 'Boya kalemiyle çizilmiş bir resim. Bir yatak, yatakta biri uyuyor. Yanında üç kişi ve gri bir kedi. Üstte kocaman harflerle: UYAN.' },
};

// Gizli fotoğraflar (isteğe bağlı)
export const FOTOGRAFLAR = {
  f1: 'Bir doğum günü pastası. Mumları üfleyen bir çocuk, arkada gülen bir aile. Arkasında: "7 yaş."',
  f2: 'Karlı bir sokakta kızak çeken iki çocuk. Biri düşmüş, ikisi de gülüyor.',
  f3: 'Bir sahilde dört kişi ve bir kedi. Arkasında: "Hep birlikte, Florya."',
};

export const DIYALOG = {
  // ---------------------------------------------------------- 0 · Uyanış
  uyanis: [
    { m: 'Tren sallanıyor. Raylar ritmik bir sesle tıkırdıyor: tak-tak, tak-tak.' },
    { m: 'Gözlerini açıyorsun. Bir koltuktasın, pencereden kar yağıyor. Vagon boş.' },
    { m: 'Nereye gittiğini hatırlamıyorsun. Neden burada olduğunu da.' },
    { m: 'Yanındaki koltukta bir kağıt duruyor.' },
    { olay: 'ipucu_bilet' },
  ],
  bilet_bul: [
    { m: 'Bir tren bileti. Ama varış yeri boş. Kalkış yeri de.' },
    { m: 'Sadece bir koltuk numarası ve bir saat var: 04:17.' },
    { olay: 'kondukter_gelir' },
  ],
  kondukter_ilk: [
    { k: 'kondukter', m: 'Biletler lütfen.' },
    { m: 'Kondüktör uzun, ince bir adam. Kasketinin siperi yüzünü gölgeliyor. Elinde eski bir fener sallanıyor.' },
    { m: 'Bileti uzatıyorsun. Zımbalamıyor; sadece uzun uzun bakıyor.' },
    { k: 'kondukter', m: 'Varış yeri yazmamışlar. Olur böyle. Bazı biletler yolda yazılır.' },
    { secim: [
      { m: 'Bu tren nereye gidiyor?', git: 'kondukter_ilk_nereye' },
      { m: 'Ben kimim?', git: 'kondukter_ilk_kim' },
    ] },
  ],
  kondukter_ilk_nereye: [
    { k: 'kondukter', m: 'Herkesin gitmesi gereken yere. Ama önce birkaç durak var.' },
    { k: 'kondukter', m: 'Her durakta biri biner. Onlara iyi bak. Bazen insan kendini başkalarının yüzünde bulur.' },
    { olay: 'kondukter_gider' },
  ],
  kondukter_ilk_kim: [
    { k: 'kondukter', m: 'Onu bilmem. Ama yolculuk bitene kadar öğrenirsin, eğer istersen.' },
    { k: 'kondukter', m: 'Her durakta biri biner. Onlara iyi bak. Bazen insan kendini başkalarının yüzünde bulur.' },
    { olay: 'kondukter_gider' },
  ],
  kondukter_sonra: [
    { k: 'kondukter', m: 'Bir sonraki durak yakında. Pencereden bak; dışarısı her seferinde biraz değişir.' },
  ],

  // ---------------------------------------------------------- 1 · Ayazlı Ova · Hüsnü Usta
  husnu_ilk: [
    { m: 'Yaşlı bir adam. Kalın bir yelek, burnunun ucunda gözlük, başında kasket. Paltosunun omuzlarında kar.' },
    { m: 'Elinde gümüş kapaklı bir cep saati var. Açıp kapatıyor, açıp kapatıyor.' },
    { k: 'husnu', m: 'Kusura bakma evladım. Bu saat durdu. Ben de onunla birlikte durdum sanki.' },
    { k: 'husnu', m: 'Kırk yıl saatçilik yaptım. Bir çark düşmüş içinden, küçücük bir pirinç çark. Onsuz yürümüyor.' },
    { k: 'husnu', m: 'Biraz önce yemekli vagonda çay içiyordum. Orada düşürmüş olmalıyım. Ama dizlerim artık eğilmiyor.' },
    { secim: [
      { m: 'Ben bulurum, Usta.', git: 'husnu_ilk_evet', e: { husnu_iyi: true } },
      { m: 'Saat kaçta durdu?', git: 'husnu_ilk_saat' },
    ] },
  ],
  husnu_ilk_saat: [
    { k: 'husnu', m: 'Dört on yedide. Gece mi, sabah mı, bilmiyorum. Ama tam dört on yedi.' },
    { m: 'Biletindeki saat de 04:17. Bir an içinde bir şey kıpırdıyor.' },
    { k: 'husnu', m: 'Çarkı bulursan belki yeniden yürür. Yemekli vagona bir bakar mısın?' },
    { olay: 'gorev_cark' },
  ],
  husnu_ilk_evet: [
    { k: 'husnu', m: 'Sağ ol evladım. Yemekli vagon şu kapıdan geçince. Ben masada şekerle oynayıp duruyordum, belki oraya düşmüştür.' },
    { olay: 'gorev_cark' },
  ],
  husnu_bekle: [
    { k: 'husnu', m: 'Yemekli vagonda, masanın orada. Küçücük bir şey, dikkatli bak.' },
  ],
  cark_bul: [
    { m: 'Şekerliğin kapağını kaldırıyorsun. Küp şekerlerin arasında bir şey parlıyor.' },
    { m: 'Küçük, pirinç bir çark. Dişleri ince ince işlenmiş.' },
    { olay: 'esya_cark' },
  ],
  sekerlik_bos: [
    { m: 'Küp şekerler. Bir tanesini alıp çayına atmak istiyorsun ama ortada çay yok.' },
  ],
  husnu_cark: [
    { m: 'Çarkı uzatıyorsun. Hüsnü Usta\'nın gözleri parlıyor.' },
    { k: 'husnu', m: 'İşte bu! Ah, sen ne iyi çocuksun.' },
    { m: 'Cebinden minicik bir tornavida çıkarıyor. Elleri titriyor ama bir kere bile kaçırmıyor. Kapak açılıyor, çark yerine oturuyor.' },
    { m: 'Tık. Bir kere. Sonra sessizlik.' },
    { k: 'husnu', m: 'Hmm. Çark yerinde ama yürümüyor. Demek ki eksik olan çark değilmiş.' },
    { k: 'husnu', m: 'Bu saat oğlumundu biliyor musun? Küçükken hep sorardı: "Baba, saat kaç? Baba, ne zaman eve geleceksin?"' },
    { k: 'husnu', m: 'Ben hep dükkândaydım. Başkalarının saatlerini tamir ederken kendi zamanımı kaçırdım.' },
    { secim: [
      { m: 'Belki o saatleri o da hatırlıyordur. Sen hatırladığın için.', git: 'husnu_son_iyi', e: { ani: 'saat' } },
      { m: 'Saatler kalple çalışır, derler. Belki senin kalbin hâlâ dükkândadır.', git: 'husnu_son_iyi', e: { ani: 'saat' } },
      { m: 'Geçmiş geçmişte kaldı, Usta. Üzülme artık.', git: 'husnu_son_soguk' },
    ] },
  ],
  husnu_son_iyi: [
    { m: 'Hüsnü Usta duruyor. Sana uzun uzun bakıyor, gözlüğünün üstünden.' },
    { k: 'husnu', m: '"Saatler kalple çalışır." Bunu ben söylerdim. Torunuma.' },
    { k: 'husnu', m: 'Al. Bu saati sen taşı. Benim elimde durdu, belki senin elinde yürür.' },
    { olay: 'esya_saat' },
    { k: 'husnu', m: 'Ben bir sonraki durakta ineceğim. Beni bekleyen biri var. Hep vardı.' },
    { olay: 'bolum_bitti' },
  ],
  husnu_son_soguk: [
    { k: 'husnu', m: 'Haklısın belki. Geçmiş geçmişte kalır.' },
    { m: 'Ama sesi kırık. Saati sana uzatıyor.' },
    { k: 'husnu', m: 'Yine de al bunu. Benim işime yaramıyor artık.' },
    { olay: 'esya_saat' },
    { olay: 'bolum_bitti' },
  ],
  husnu_veda: [
    { k: 'husnu', m: 'Durak geldi. Hoşça kal evladım. Saati kurmayı unutma; ama zorlama, kendi zamanında yürür.' },
  ],

  // ---------------------------------------------------------- 2 · Yağmurlu Şehir · Murat
  murat_ilk: [
    { m: 'Sırılsıklam bir genç. Üstünde asker üniforması, başında bere. Kucağında bir mektup kâğıdı, yarısı yazılmış.' },
    { k: 'murat', m: 'Pardon, burası boş mu? Sağ ol. Ayaklarım dondu, iki saattir yağmurda bekliyorum.' },
    { k: 'murat', m: 'Bu mektubu bitirmem lazım. Yarın birliğe teslim olacağım, ondan önce göndermem lazım.' },
    { k: 'murat', m: 'Ama kalemim kırıldı. Bavulumda bir kalem daha vardı ama bavul şu rafta, uzanamıyorum, kolum ağrıyor.' },
    { secim: [
      { m: 'Kime yazıyorsun?', git: 'murat_kime' },
      { m: 'Kalemi ben alırım.', git: 'murat_kalem' },
    ] },
  ],
  murat_kime: [
    { k: 'murat', m: 'Leyla\'ya. Nişanlım. Gitmeden önce kavga ettik, çok saçma bir şey yüzünden.' },
    { k: 'murat', m: 'Bir şey söyledim, söylememem gereken. Sonra kapıyı çarpıp çıktım. Özür bile dilemedim.' },
    { git: 'murat_kalem' },
  ],
  murat_kalem: [
    { k: 'murat', m: 'Bir de pul lazım. Postaneye uğrayacak vaktim yok. Kondüktörde olabilir belki, yemekli vagonda dolaşıyordu.' },
    { olay: 'gorev_mektup' },
  ],
  murat_bekle: [
    { k: 'murat', m: 'Kalem bavulun yan cebinde. Pul için de kondüktöre sorabilirsin.' },
  ],
  bavul_kalem: [
    { m: 'Raftaki yeşil bavulu indiriyorsun. Yan cepte, bir paket sigaranın ve buruşuk bir otobüs biletinin arasında bir kurşun kalem.' },
    { olay: 'esya_kalem' },
  ],
  bavul_bos: [
    { m: 'Eski, yeşil bir bavul. Üstünde bir etiket: "M. Yıldız, Erzurum."' },
  ],
  kondukter_pul: [
    { k: 'kondukter', m: 'Pul mu? Mektup gönderen kalmadı sanıyordum.' },
    { m: 'Ceketinin iç cebinden küçük bir pul çıkarıyor. Üstünde bir tren resmi var.' },
    { k: 'kondukter', m: 'Al. Her mektubun bir pulu olmalı. Yoksa yolda kaybolur. İnsanlar gibi.' },
    { olay: 'esya_pul' },
  ],
  murat_yaz: [
    { m: 'Kalemi ve pulu uzatıyorsun. Murat\'ın yüzü aydınlanıyor.' },
    { k: 'murat', m: 'Sen bir meleksin. Dur, son cümleyi yazamıyorum. Üç kere yazdım, üç kere sildim.' },
    { k: 'murat', m: 'Sence ne yazayım? Son cümle önemli. Okuyan insanın aklında o kalır.' },
    { secim: [
      { m: '"Döndüğümde ilk işim sana sarılmak olacak."', git: 'murat_son_iyi', e: { ani: 'mektup', satir: 'Döndüğümde ilk işim sana sarılmak olacak.' } },
      { m: '"Haklıydın. Özür dilerim. Seni seviyorum."', git: 'murat_son_iyi', e: { ani: 'mektup', satir: 'Haklıydın. Özür dilerim. Seni seviyorum.' } },
      { m: 'Hiçbir şey yazma. O zaten anlar.', git: 'murat_son_soguk' },
    ] },
  ],
  murat_son_iyi: [
    { m: 'Murat yazıyor. Yavaşça, dikkatle, harflerin üstünden iki kere geçerek.' },
    { k: 'murat', m: 'Tamam. Oldu. Bu oldu.' },
    { m: 'Zarfı kapatıyor, pulu yapıştırıyor, üstüne adresi yazıyor. Sonra zarfı sana uzatıyor.' },
    { k: 'murat', m: 'Bunu sen götürür müsün? Benim durağım yakında. Sen benden daha uzağa gidiyorsun, belli.' },
    { olay: 'esya_mektup' },
    { k: 'murat', m: 'Bir gün Leyla\'yı görürsen, söyle ona: Yağmurda bekledim ama hiç üşümedim.' },
    { olay: 'bolum_bitti' },
  ],
  murat_son_soguk: [
    { k: 'murat', m: 'Anlar mı sence? Bilmiyorum.' },
    { m: 'Mektubu yarım bırakıp zarfa koyuyor, pulu yapıştırıyor.' },
    { k: 'murat', m: 'Sen götür bunu. Benim elimde kalırsa hiç gönderemem.' },
    { olay: 'esya_mektup' },
    { olay: 'bolum_bitti' },
  ],
  murat_veda: [
    { k: 'murat', m: 'Benim durak bu. Mektup sende, unutma. Akasya Sokağı, üç numara.' },
  ],

  // ---------------------------------------------------------- 3 · Deniz Kıyısı · Elif
  elif_ilk: [
    { m: 'Sarı yağmurluklu küçük bir kız. Gözleri kıpkırmızı, burnunu çekiyor.' },
    { k: 'elif', m: 'Kedimi gördün mü? Duman. Gri, tombul, kuyruğunun ucu beyaz.' },
    { k: 'elif', m: 'Trene binerken kucağımdan kaçtı. Bir yerde saklanıyor ama çağırınca gelmiyor. Hiç gelmez zaten, çok inatçı.' },
    { secim: [
      { m: 'Beraber ararız. Ağlama.', git: 'elif_ilk_iyi', e: { elif_iyi: true } },
      { m: 'Kediler acıkınca ortaya çıkar.', git: 'elif_ilk_ipucu' },
    ] },
  ],
  elif_ilk_iyi: [
    { k: 'elif', m: 'Söz mü? Ama Duman yabancıları sevmez. Sadece sardalyaya gelir.' },
    { git: 'elif_ilk_ipucu' },
  ],
  elif_ilk_ipucu: [
    { k: 'elif', m: 'Yemekli vagonda bir büfe vardı. Belki orada sardalya vardır.' },
    { olay: 'gorev_kedi' },
  ],
  elif_bekle: [
    { k: 'elif', m: 'Duman sardalyaya bayılır. Sesini dinle, miyavlıyor bir yerde.' },
  ],
  bufe_sardalya: [
    { m: 'Büfenin rafında konserveler dizili. En öndekini alıyorsun: sardalya.' },
    { olay: 'esya_sardalya' },
  ],
  bufe_bos: [
    { m: 'Büfede birkaç konserve, bir çaydanlık ve bir sepet simit. Simitler bayat.' },
  ],
  kedi_yanlis: [
    { m: 'Eğilip bakıyorsun. Toz ve unutulmuş bir şemsiye. Kedi yok.' },
  ],
  kedi_bul: [
    { m: 'Sardalya kutusunu açıp koltuğun önüne koyuyorsun.' },
    { m: 'Bir süre hiçbir şey olmuyor. Sonra koltuğun altından iki sarı göz parlıyor.' },
    { m: 'Gri, tombul bir kedi, kuyruğunun ucu beyaz, temkinli adımlarla çıkıyor. Kokluyor. Yemeye başlıyor.' },
    { olay: 'kedi_cikar' },
  ],
  elif_kedi: [
    { k: 'elif', m: 'DUMAN!' },
    { m: 'Elif koşup kediyi kucaklıyor. Duman mırlıyor, sanki hiçbir şey olmamış gibi.' },
    { k: 'elif', m: 'Teşekkür ederim. Dur, sana bir şey vereceğim.' },
    { m: 'Çantasından boya kalemleri çıkarıyor, koltuğa yüzüstü uzanıp bir şey çiziyor. Dilini dişlerinin arasına sıkıştırmış.' },
    { k: 'elif', m: 'Sen beni tanıyor musun? Bana çok tanıdık geliyorsun.' },
    { secim: [
      { m: 'Galiba tanıyorum. Sen benim kardeşimsin.', git: 'elif_son_iyi', e: { ani: 'resim' } },
      { m: 'Seni hep tanıyordum, Elif.', git: 'elif_son_iyi', e: { ani: 'resim' } },
      { m: 'Hayır, seni ilk defa görüyorum.', git: 'elif_son_soguk' },
    ] },
  ],
  elif_son_iyi: [
    { k: 'elif', m: 'Biliyordum!' },
    { m: 'Resmi sana uzatıyor. Bir yatak, yatakta uyuyan biri. Yanında üç kişi ve gri bir kedi. Üstte kocaman harflerle: UYAN.' },
    { k: 'elif', m: 'Bu sensin. Uyuyorsun. Çok uzun zamandır uyuyorsun. Annem her gün ağlıyor.' },
    { k: 'elif', m: 'Ama ben ağlamıyorum. Çünkü sen her zaman uyanırsın. Pazar sabahları bile.' },
    { olay: 'esya_resim' },
    { olay: 'bolum_bitti' },
  ],
  elif_son_soguk: [
    { k: 'elif', m: 'Öyle mi?' },
    { m: 'Biraz bozuluyor ama yine de resmi sana uzatıyor. Bir yatak, yatakta biri. Üstte: UYAN.' },
    { k: 'elif', m: 'Bunu sana çizdim yine de. Duman\'ı bulduğun için.' },
    { olay: 'esya_resim' },
    { olay: 'bolum_bitti' },
  ],
  elif_veda: [
    { k: 'elif', m: 'Biz iniyoruz. Duman da el sallıyor, bak! Yani pati sallıyor.' },
  ],

  // ---------------------------------------------------------- 4 · Şafak · Kondüktör
  son_kondukter: [
    { m: 'Pencereden ilk ışık giriyor. Tarlalar altın rengi. Tren yavaşlıyor.' },
    { m: 'Kondüktör karşına oturuyor. Feneri söndürüyor; artık gerek yok.' },
    { k: 'kondukter', m: 'Son durağa geldik.' },
    { k: 'kondukter', m: 'Bu tren, kalanlarla gidenlerin arasındaki yolda gider. Bazıları burada iner, bazıları geri döner.' },
    { k: 'kondukter', m: 'Sen dört on yedide bindin. Karlı bir yolda, bir arabanın içinden.' },
    { olay: 'son_hatirla' },
  ],
  son_secim: [
    { k: 'kondukter', m: 'Biletine bak. Artık bir şey yazıyor olmalı.' },
    { olay: 'bilet_yazi' },
    { k: 'kondukter', m: 'Karar senin. İnersen döndüğün yer acı da olabilir, ağrı da. Ama seni bekleyenler var.' },
    { k: 'kondukter', m: 'Kalırsan bu trende yer var. Benim gibi. Fenerimi sana bırakırım.' },
    { secim: [
      { m: 'İnmek istiyorum. Eve dönmek istiyorum.', git: 'son_in' },
      { m: 'Kalmak istiyorum. Yoruldum.', git: 'son_kal' },
    ] },
  ],
  son_in: [
    { k: 'kondukter', m: 'İyi yolculuklar. Kapı açık.' },
    { olay: 'son_in' },
  ],
  son_kal: [
    { k: 'kondukter', m: 'Peki. Kasketim sana biraz büyük gelecek ama alışırsın.' },
    { olay: 'son_kal' },
  ],

  // ---------------------------------------------------------- genel
  kapi_kilitli: [{ m: 'Kapı kilitli. Arkasında motorun uğultusu.' }],
  pencere: [{ m: 'Pencereden dışarı bakıyorsun. Camda kendi yansıman var, ama yüzünü tam seçemiyorsun.' }],
  foto_bul: [{ m: 'Bir fotoğraf. Eski, köşeleri yıpranmış.' }, { olay: 'esya_foto' }],
};

export const SONLAR = {
  uyanis: {
    ad: 'Uyanış',
    metin: [
      'Bir ses. Bip... bip... bip...',
      'Beyaz bir tavan. Pencereden gün doğuyor, odaya altın rengi bir ışık düşüyor.',
      'Elinde sıcak bir el. Annen. Başını kaldırıyor, gözleri büyüyor.',
      'Kapıda babanın sesi, koridorda Elif\'in koşan ayakları.',
      'Komodinin üstünde dedenin saati. Kırk yıldır durduğu yerden, tik... tak... dört on sekiz.',
      'Zaman yeniden akıyor.',
    ],
  },
  yarim: {
    ad: 'Yarım Hatıra',
    metin: [
      'Bir ses. Bip... bip... bip...',
      'Beyaz bir tavan. Birileri adını söylüyor, ama ses çok uzaktan geliyor.',
      'Yüzler tanıdık, ama isimleri dilinin ucunda kalıyor. Bir kadın ağlıyor, bir adam elini tutuyor.',
      'Komodinin üstünde bir cep saati duruyor. Kimin olduğunu hatırlamıyorsun.',
      'Ama bir gün hatırlayacaksın. Kondüktör öyle demişti: bazı biletler yolda yazılır.',
    ],
  },
  kal: {
    ad: 'Son Durak',
    metin: [
      'Kasketi takıyorsun. Biraz büyük, gözlerinin üstüne düşüyor.',
      'Kondüktör perona iniyor, şafağın içinde yürüyüp gidiyor. Bir kere bile dönüp bakmıyor.',
      'Tren yeniden kalkıyor. Gece geri geliyor, kar yeniden yağmaya başlıyor.',
      'Bir sonraki durakta biri binecek. Kaybolmuş, korkmuş, adını hatırlamayan biri.',
      'Ona feneri tutacaksın. Biletine bakacaksın. "Bazı biletler yolda yazılır," diyeceksin.',
    ],
  },
};
