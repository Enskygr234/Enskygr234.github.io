HIKAYE.push(String.raw`
=== b2_basla
@bolum 2
@yer sokak sabah
Temmuz geliyor, sıcağıyla, tozuyla, karpuz kabuklarıyla.
Sokakta asfalt yumuşuyor. Kediler arabaların altına çekiliyor. Öğleden sonraları bütün mahalle uyuyor, sadece dondurmacının zili çalıyor.
@eger #mert_ders -> b2_ders
@eger #mert_sakladi -> b2_yakalandi
-> b2_takim

=== b2_ders
@yer balkon ogle
Sizin balkonda, ninenin fesleğenlerinin arasında, Mert'le matematik çalışıyorsunuz.
Kesirler. Mert kesirlerden nefret ediyor.
Mert: Bir pizzayı neden sekize bölüyorlar? Pizzayı kim sekize böler? Ben hiç pizza yemedim ki!
* Pizzayı bırak, simit düşün. Bir simidi dörde bölersin. -> b2_ders_simit
* Haklısın. Hadi bugünlük bu kadar. {mert+1} -> b2_ders_birak

=== b2_ders_simit
Mert düşünüyor. Gözleri parlıyor.
Mert: Dört kişiye bir simit. Çeyrek. Bir simidin çeyreği!
Ninenin getirdiği tabaktan bir simit alıp dörde bölüyor, bir parçasını ağzına atıyor.
Mert: Dörtte bir. Bu kolaymış be. Bunu niye pizzayla anlatıyorlar?
Bir saat boyunca her şeyi simitle anlatıyorsun. Kesirler, yüzdeler, bölme. Tabakta tek simit kalmıyor.
Nine kapıdan bakıp gülüyor.
Nine: Bu gidişle matematik değil fırın açacaksınız.
@etki mert+1
@bayrak mert_ogreniyor
-> b2_takim

=== b2_ders_birak
Mert defteri kapatıyor, gökyüzüne bakıp ofluyor.
Mert: Sen iyi birisin biliyor musun? Ben bazen aptal gibi hissediyorum. Ama seninle değil.
Bir şey söylemiyorsun. Bazen bir şey söylememek en iyisi.
-> b2_takim

=== b2_yakalandi
@yer sokak sabah
Mert'in evinin önünden geçerken bağırışlar duyuluyor.
Kadir Amca: Bir! Bir! Ve sen bunu bir hafta sakladın!
Karne sakladığı yerden düşmüş. Annesi çamaşır yıkarken bulmuş. Pantolonun cebinde, ıslak, mavi mürekkebi akmış bir karne.
Mert penceredeki demirlerin arkasından sana bakıyor. Cezalı. Tüm yaz.
Kadir Amca çıkıyor, dolmuşunun anahtarlarını şıngırdatarak. Seni görüyor.
Kadir Amca: Sen de mi biliyordun bunu?
* Evet, benim fikrimdi. Özür dilerim. {cesaret+2 mert+2} -> b2_itiraf
* Hayır, bilmiyordum Kadir Amca. {mert-1} -> b2_yalan

=== b2_itiraf
Kadir Amca bir süre sana bakıyor. Anahtarlar susuyor.
Kadir Amca: Senin fikrindi demek.
Kadir Amca: Bak çocuk. Ben sekizinci sınıftan ayrıldım. Dolmuşu ben istemedim, dolmuş beni buldu. Mert benim gibi olmasın. Anladın mı?
Başını sallıyorsun.
Kadir Amca: Ona ders çalıştırırsan cumartesi maça çıkabilir. Çalıştırmazsan çıkamaz.
Gidiyor. Pencereden Mert iki başparmağını kaldırıyor.
@bayrak mert_ders
@not Kadir Amca sana güvendi.
-> b2_ders

=== b2_yalan
Kadir Amca başını sallıyor, gidiyor.
Pencereden Mert sana bakıyor. Bir şey demiyor. Demesine gerek yok.
O hafta Mert'i sadece pencerede görüyorsun. Maç gününe kadar.
Cuma akşamı Kadir Amca yumuşuyor. Annesi ikna etmiş. Mert maça çıkabilecek ama sonra eve.
@bayrak mert_kirgin
-> b2_takim

=== b2_takim
@yer sokak ogleden_sonra
Temmuz günleri birbirine benziyor ve hiçbiri sıkıcı değil.
Öğleden sonra üçte, sokağın başından bir zil sesi: dondurmacı Rasim Amca. Beyaz önlüğü, üç tekerlekli arabası, arabanın üstünde dev bir külah maketi.
Bütün çocuklar aynı anda pencerelerden fırlıyor. Annelerden para koparmanın tam zamanı.
Ceplerinde ancak bir külahlık para var.
@eger #defne_tanisti -> b2_dondurma_defne
* Kendine bir külah al, çikolatalı. -> b2_dondurma_tek
* Karabaş'a da bir top al. Dondurma yemeyi hak etti. {karabas+1} -> b2_dondurma_kopek

=== b2_dondurma_defne
Defne kaldırımın kenarında duruyor. Ceplerini yokluyor, boş çıkıyor. Köln'den getirdikleri markları henüz bozdurmamışlar.
Rasim Amca'nın arabasındaki renklere bakıyor, sanki hepsini fotoğraflamak istiyormuş gibi.
* Kendine bir külah al, çikolatalı. -> b2_dondurma_tek
* İki top al, birini Defne'ye ver. {defne+1} -> b2_dondurma_paylas
* Karabaş'a da bir top al. Dondurma yemeyi hak etti. {karabas+1} -> b2_dondurma_kopek

=== b2_dondurma_tek
Çikolatalı. Güneşte, ilk yalamayla erimeye başlıyor. Parmaklarından bileğine akıyor.
Bu dünyadaki en iyi tat. En azından bu öğleden sonra.
-> b2_penalti_ders

=== b2_dondurma_paylas
Bir külah, iki top: çikolata ve limon. Limonu Defne'ye uzatıyorsun.
Defne: Köln'de dondurma kışın da yenir. Ama burada daha güzel. Neden biliyor musun?
Neden?
Defne: Çünkü burada eriyor. Acele etmen lazım. Acele edince daha güzel oluyor.
Defne limonlu dondurmayı üç ısırıkta bitiriyor. Sonra dişleri donuyor, yüzünü buruşturuyor. Gülüyorsunuz.
-> b2_penalti_ders

=== b2_dondurma_kopek
Rasim Amca sana tuhaf tuhaf bakıyor ama bir top vanilyayı kağıt bardağa koyup veriyor.
Karabaş'ın önüne bırakıyorsun. Karabaş önce kokluyor, sonra burnuna değdiriyor, sonra irkilip geri çekiliyor. Soğuk!
Sonra yavaş yavaş, dikkatle yalıyor. Bardağı da yiyor. Kağıdını da.
Nermin Teyze balkondan izliyor.
Nermin Teyze: İnsana vermiyorlar, köpeğe dondurma veriyorlar! Ah bu çocuklar!
Ama sesinde öfke yok. Neredeyse gülüyor.
@bayrak karabas_dost
-> b2_penalti_ders

=== b2_penalti_ders
@yer arsa gece
Maçtan bir gece önce, sokak lambasının altında Hasan Abi seni ve Mert'i arsaya çağırıyor.
Hasan Abi: Penaltı çalışacağız. Tolga'larla maç penaltıya kalırsa hazır olun.
Taşlardan kalenin önüne topu koyuyor.
Hasan Abi: Şimdi dinleyin. Kaleciye bakmayın. Kaleci size bakar, siz ona bakarsanız ne yapacağınızı anlar. Siz topa bakın. Sonra köşeye. Sadece köşeye.
Mert vuruyor. Top dut ağacına çarpıyor, bir avuç dut yere dökülüyor.
Hasan Abi: Köşeye dedim, ağaca değil!
Sen vuruyorsun.
* Hasan Abi'nin dediği gibi: topa, sonra köşeye bak. {hasan+1} #penalti_ders -> b2_ders_kose
* Kendi bildiğin gibi, var gücünle vur. -> b2_ders_guc

=== b2_ders_kose
Topa bakıyorsun. Sonra sağ alt köşeye. Sonra sadece köşeye.
Vuruyorsun. Top yerden, iki taşın tam arasından, sokak lambasının ışığında bir gölge gibi geçiyor.
Hasan Abi ıslık çalıyor.
Hasan Abi: İşte bu. Bunu unutma. Topa, sonra köşeye.
-> b2_ders_bitis

=== b2_ders_guc
Var gücünle vuruyorsun. Top havalanıyor, kalenin üstünden, arsanın duvarından, sokağın öbür tarafına uçuyor.
Bir yerlerden bir kedi bağırıyor.
Hasan Abi gülüyor.
Hasan Abi: Güç güzel ufaklık. Ama gol, güçle değil, akılla atılır.
-> b2_ders_bitis

=== b2_ders_bitis
Gece geç oluyor. Hasan Abi motoruna yaslanmış, kasetçalarda kısık sesle eski bir şarkı.
Hasan Abi: Benim askerden döndüğümde bu arsada olun. Tamam mı? Siz büyümüş olursunuz, ben yaşlanmış olurum. Ama arsa aynı olsun.
Mert: Arsa hep aynı olur Hasan Abi.
Hasan Abi bir şey demiyor. Sadece dut ağacına bakıyor.
-> b2_takim_asil

=== b2_takim_asil
@yer arsa ogle
Cumartesi. Maç günü.
Takımı toplamak gerekiyor. Beş kişi lazım.
Sen. Mert. Gözlüklü Selim, ki koşamaz ama kaleye geçer. İkizler, Burak'la Barış, ki hiçbir zaman pas vermezler.
Ama Barış'ın kolu alçıda. Bisikletten düşmüş. Dört kişisiniz.
Mert: Dört kişi Tolga'lara karşı oynarsak beşe sıfır değil ona sıfır yeriz.
@eger #defne_tanisti -> b2_defne_gelir
-> b2_defne_uzak

=== b2_defne_gelir
Arsanın kenarından bir ses.
Defne: Ben oynayabilirim.
Defne, fotoğraf makinesini boynundan çıkarmış, saçlarını arkadan bağlamış. Ayağında beyaz spor ayakkabıları var, sokakta kimsede olmayan türden.
Defne: Köln'de kulüpte oynadım. İki yıl. Sol bek.
Mert'in yüzü kızarıyor.
Mert: Kızlar maç oynamaz. Hem Tolga'lar dalga geçer.
Defne kollarını kavuşturuyor. Bekliyor. Mert de sana bakıyor. Herkes sana bakıyor.
* Defne oynasın. Sol bek lazım bize. {defne+2 mert-1} #defne_oynar -> b2_defne_evet
* Mert, bir dene bakalım, bir pas versin. {defne+1} #defne_oynar -> b2_defne_dene
* Defne bugün fotoğrafları çeksin, sonra bakarız. {mert+1 defne-1} -> b2_defne_hayir

=== b2_defne_evet
Mert bir şey diyecek oluyor, sonra yutkunuyor.
Mert: Peki. Ama Tolga'lar dalga geçerse ben karışmam.
Defne fotoğraf makinesini sana uzatıyor.
Defne: Bunu sen tut. Kimseye verme. Gol atarsam, fotoğrafımı çek.
@etki defne+1
-> b2_tolga

=== b2_defne_dene
Mert topu Defne'ye doğru sertçe vuruyor. Biraz fazla sert.
Defne topu göğsüyle yumuşatıyor, yere indiriyor, sol ayağıyla Mert'in bacaklarının arasından geçiriyor.
Kimse konuşmuyor.
Selim gözlüğünü düzeltiyor.
Selim: Bu... bu yasal mı?
Mert ağzı açık bakıyor. Sonra sırıtıyor.
Mert: Tamam. Sol bek.
@etki mert+1
-> b2_tolga

=== b2_defne_hayir
Defne bir an duruyor. Sonra omuz silkiyor, fotoğraf makinesini yine boynuna takıyor.
Defne: Tamam. Ben fotoğraf çekerim. Fotoğrafçılar da takımdır.
Ama gülümsemiyor. Dut ağacının gölgesine oturuyor, dizlerini kucaklıyor.
Ve dördünüz kalıyorsunuz. Ama Hasan Abi, son dakikada kaleye Karabaş'ı dikiyor.
Hasan Abi: Bak, en azından havlar.
-> b2_tolga

=== b2_defne_uzak
Kimse yok. Sokakta ancak Karabaş var.
Dördünüz kalıyorsunuz. Hasan Abi son dakikada kaleye Karabaş'ı dikiyor.
Hasan Abi: Bak, en azından havlar.
Üç numaranın penceresinden yeni gelen kız izliyor. Perdenin arkasından. Bir an göz göze geliyorsunuz. Perde kapanıyor.
-> b2_tolga

=== b2_tolga
@yer arsa ogle
Üst Sokak takımı geliyor. Önde Tolga.
Tolga sizin yaşınızda ama bir kafa uzun. Formalı geliyor, gerçek bir forma, sırtında numarası var. Ayağında krampon.
Tolga: Ne bu? Kreş mi açtınız?
Arkadaşları gülüyor.
Tolga arsaya, dut ağacına, taş kalelere bakıyor. Garip bir gülümsemeyle.
Tolga: Bu arsada son maçlarınızı oynayın bari. Amcam burayı alıyor. Seneye burada apartman olacak, benim amcamın apartmanı.
Mert: Yalan söylüyorsun!
Tolga: Sor bakkalınıza. O bilir.
Hasan Abi düdüğü çalıyor. Gerçek bir düdük, askerlik şubesinin önünden almış.
Hasan Abi: Laf bitti. Top ortada.
* Tolga'ya cevap ver: Burası bizim. Hiçbir yere gitmiyor. {cesaret+1} -> b2_mac_basla
* Hiçbir şey deme. Maçta cevap verirsin. -> b2_mac_basla

=== b2_mac_basla
@yer arsa ogle
Maç başlıyor. Toz kalkıyor.
Üst Sokak hızlı, sert, kalabalık. Beş dakikada bir gol yiyorsunuz. Tolga'nın kafası.
Tolga: Bir sıfır! Daha başlamadık!
@eger #defne_oynar -> b2_mac_defne
Topu kapıyorsun, Mert'e veriyorsun, Mert kaybediyor. Bir daha. Bir daha.
Selim kalede bir topu kafasıyla çıkarıyor, gözlüğü uçuyor.
İlk yarı biterken skor iki sıfır.
-> b2_devre

=== b2_mac_defne
Ama sonra Defne topu Tolga'nın ayağından alıyor. Kimse bunu beklemiyordu, Tolga da beklemiyordu.
Defne sol kanattan koşuyor, ortalıyor. Top Mert'in kafasına çarpıp ağlara... yani taşların arasına giriyor.
Mert: GOOOL!
Mert koşup Defne'ye sarılıyor. Sonra ne yaptığını fark edip geri çekiliyor. Kulakları kıpkırmızı.
İlk yarı biterken skor bir bir.
@bayrak gol_defne
-> b2_devre

=== b2_devre
@yer arsa ogleden_sonra
Devre arası. Dut ağacının gölgesine yığılıyorsunuz. Hasan Abi çeşmeden su taşıyor, Cemil Amca bakkaldan bir kasa gazoz gönderiyor. "Hesap yok" diye haber yollamış.
Mert yerden aldığı bir dalla toprağa çizgiler çiziyor.
Mert: Tolga hep ortadan geliyor. Biz kenarları boş bırakıyoruz.
Plan lazım.
* Hücum: Herkes ileri, ne olursa olsun! {cesaret+1} #plan_hucum -> b2_ikinci
* Savunma: Arkada kalıp kontra atak bekleyelim. #plan_savunma -> b2_ikinci
* Mert'e sor: Sen kaptansın, sen söyle. {mert+1} #plan_mert -> b2_ikinci

=== b2_ikinci
@yer arsa ogleden_sonra
İkinci yarı. Güneş tepede. Karabaş kalenin yanında dilini sarkıtmış, soluyor.
@eger #plan_mert -> b2_ikinci_mert
@eger #plan_hucum -> b2_ikinci_hucum
Arkada bekliyorsunuz. Tolga'lar geliyor, geliyor, duvara çarpıyor gibi geri dönüyor. Sabır.
Sonra bir top kapıyorsun ve koşuyorsun. Önünde kimse yok.
-> b2_penalti

=== b2_ikinci_hucum
Hep birlikte ileri. Toz, bağırış, dirsekler.
Bir gol daha yiyorsunuz ama bir tane de atıyorsunuz. Burak, hayatında ilk defa pas veriyor. Herkes şaşırıyor, en çok da Burak.
-> b2_penalti

=== b2_ikinci_mert
Mert herkesi topluyor.
Mert: Ben ortada, sen sağda, Selim kalede. Burak sola. Ve kimse Tolga'yı tek başına durdurmaya çalışmasın. İki kişi gideceğiz.
Mert kaptanlık yapıyor. Gerçekten. İlk defa biri onu dinliyor ve o da bunu biliyor.
Plan işliyor. Tolga iki kişinin arasında kalıyor, top senin ayağına geliyor.
@etki mert+1
-> b2_penalti

=== b2_penalti
Ceza sahası sayılan çizginin içinde, Tolga'nın arkadaşı arkandan kayıyor. Düşüyorsun. Dizin kanıyor.
Hasan Abi düdüğü çalıyor.
Hasan Abi: Penaltı!
Tolga: Ne penaltısı! Kendisi düştü!
Hasan Abi: Hakem benim. Penaltı.
Skor eşit olsa da olmasa da bu son dakika. Bu son şut.
Kim atacak?
* Sen at. Dizin kanıyor ama bu senin penaltın. {cesaret+1} -> b2_pen_sen
* Mert atsın. Kaptan o. {mert+2} -> b2_pen_mert
* [#defne_oynar] Defne atsın. Kulüpte oynamış. {defne+2} -> b2_pen_defne

=== b2_pen_sen
Topu taşların arasına, beyaz tebeşirle çizilmiş noktaya koyuyorsun. Dizin zonkluyor.
Tolga'nın kalecisi kollarını açmış, sırıtıyor.
@eger #penalti_ders -> b2_pen_sen_ders
Koşuyorsun. Vuruyorsun.
Top kalecinin parmaklarına değiyor, direğe, yani taşa çarpıyor, ve içeri giriyor.
Bütün sokak bağırıyor. Balkonlardan bile.
@bayrak gol_sen
-> b2_cam

=== b2_pen_sen_ders
Kaleciye bakmıyorsun. Topa bakıyorsun. Sonra köşeye. Sadece köşeye.
Hasan Abi'nin sesi kafanın içinde: Topa, sonra köşeye.
Vuruyorsun. Top yerden, kalecinin uzandığı yerin tam tersinden, iki taşın arasından geçiyor.
Hasan Abi düdüğü ağzından çıkarıp sana göz kırpıyor.
Bütün sokak bağırıyor. Balkonlardan bile.
@bayrak gol_sen
-> b2_cam

=== b2_pen_mert
Mert topu alıyor. Ellerinin titrediğini görüyorsun.
Mert: Ya kaçırırsam?
Kaçırmazsın, diyorsun. Sen kaptansın.
Mert koşuyor. Vuruyor. Top köşeye gidiyor, kaleci yanlış tarafa uçuyor.
Gol.
Mert ellerini havaya kaldırıp dizlerinin üstüne düşüyor. Gözleri yaşlı ama söylersen inkâr eder.
@bayrak gol_mert
-> b2_cam

=== b2_pen_defne
Defne topu alıyor. Tolga'nın arkadaşları ıslık çalıyor.
Tolga: Kızlar penaltı atar mı lan!
Defne hiçbir şey demiyor. Topu bir kez zıplatıyor, yere koyuyor, üç adım geri gidiyor.
Vuruyor. Top kalecinin kafasının hemen üstünden, taşların tam ortasından geçiyor.
Tolga'nın ağzı açık kalıyor. Mert, Defne'yi omuzlarına almaya çalışıyor ama ikisi birden toza düşüyor. Gülüyorsunuz. Herkes gülüyor.
@bayrak gol_defne
@etki mert+1
-> b2_cam

=== b2_cam
@eger #baba_mac -> b2_islik
-> b2_cam_asil

=== b2_islik
Bir ıslık. İnce, keskin, bütün sokaktan duyulan bir ıslık.
Başını kaldırıyorsun. Üçüncü kattaki penceremizde babam. Pijamalarıyla, gözleri uykudan şiş, iki parmağı ağzında.
Sana el sallıyor. Sonra perde kapanıyor. Uyumaya gitti. Ama gördü.
@etki cesaret+1
-> b2_cam_asil

=== b2_cam_asil
Ama sevinç uzun sürmüyor.
Tolga, sinirden, topu tüm gücüyle uzağa vuruyor. Top yükseliyor, yükseliyor...
ŞANGIRT.
Nermin Teyze'nin mutfak camı.
Bir saniye sessizlik. Bütün sokak donuyor. Tolga'nın arkadaşları kaçmaya başlıyor bile.
Nermin Teyze balkona çıkıyor. Elinde oklava.
Nermin Teyze: KİM ATTI BUNU!
Tolga yanında, kaçmaya hazır. Sana bakıyor. Gözleriyle bir şey söylüyor: söylersen görürsün.
* Tolga attı, Nermin Teyze. Ben gördüm. {cesaret+2 nermin+1} -> b2_cam_tolga
* Bizim maçımızdı, biz öderiz. Takım olarak. {nermin+2 mert+1} #cam_odedik -> b2_cam_biz
* Sus. Herkes gibi kaç. {nermin-2} -> b2_cam_kac

=== b2_cam_tolga
Tolga'nın yüzü bembeyaz oluyor.
Nermin Teyze: Tolga mı? Rıza'nın yeğeni mi? O apartman mafyası Rıza'nın yeğeni mi?
Nermin Teyze'nin sesi sokağın öbür ucundan bile duyuluyor. Tolga kaçıyor ama çok geç. Bütün sokak biliyor artık.
Nermin Teyze: Söyleyeyim de amcası ödesin! Her şeyi alıyor zaten, bir cam da ödesin!
Hasan Abi kahkahayı basıyor.
@bayrak tolga_dusman
@ani cam
-> b2_tabela

=== b2_cam_biz
Nermin Teyze oklavayı indiriyor. Şaşırıyor.
Nermin Teyze: Siz mi ödeyeceksiniz? Neyle?
Ceplerinizi boşaltıyorsunuz. Buruşuk paralar, bozuklar, bir de Mert'in Ferrari resmi. Yetmiyor. Hiç yetmiyor.
Ama Nermin Teyze'nin gözleri yumuşuyor.
Nermin Teyze: Paranızı koyun cebinize. Camcı Ahmet'e söylerim, bana borçlu zaten. Ama siz bana bir şey yapacaksınız.
Nermin Teyze: Pazar günü balkona gelip benimle çay içeceksiniz. Herkes. Kimse benimle çay içmiyor artık.
Mert sana bakıyor. Bu ceza mı ödül mü, karar veremiyorsunuz.
@ani cam
-> b2_tabela

=== b2_cam_kac
Herkes kaçıyor. Sen de kaçıyorsun.
Arkadan Nermin Teyze'nin sesi:
Nermin Teyze: Görmedim sanmayın! Hepinizi gördüm! Hepinizin annesine söyleyeceğim!
Söylüyor da. Akşam annen eve gelince sana öyle bir bakıyor ki, cama sen vurmuşsun gibi.
@bayrak cam_kacti
-> b2_tabela

=== b2_tabela
@yer arsa aksam
Akşamüstü. Maçın yorgunluğu, dizindeki yanık, ağzındaki toz tadı.
Arsaya bir kamyonet yanaşıyor. Üstünde "RIZA YAPI" yazıyor. İki adam iniyor, ellerinde iki demir direk ve kocaman bir tabela.
Tabelayı dut ağacının dibine dikiyorlar.
Sokakta yürüyen herkes duruyor.
Tabelada, parlak mavi zemin üstünde beyaz harflerle:
"RIZA YAPI — BU ARSADA 5 KATLI LÜKS KONUT YAPILACAKTIR. KASIM 1996."
Mert harfleri yüksek sesle okuyor. Yavaş yavaş, heceleyerek. Her hecede sesi biraz daha düşüyor.
Mert: Kasım. Kasım ne zaman?
Kasım, yazın bitişi, okulun başlangıcı, sonbaharın sonu demek. Dört ay.
@ani tabela
@bayrak tabela
Bakkalın kapısında Cemil Amca. Gözlükleri elinde. Tabelaya bakıyor.
Hiç bu kadar yaşlı görünmemişti.
* Cemil Amca'nın yanına git. Ne olduğunu sor. {cemil+1} -> b2_cemil
* Tabelayı yerinden sökmeye çalış. {cesaret+1} -> b2_tabela_sok
* Eve git. Hiçbir şey düşünmek istemiyorsun. -> b2_eve

=== b2_cemil
@yer bakkal aksam
Cemil Amca seni içeri alıyor. Kepengi yarıya kadar indiriyor.
Cemil Amca: O arsa kardeşimindi. Rahmetli Nuri'nin. Nuri öldükten sonra yeğenlerine kaldı. Yeğenler Almanya'da, Hollanda'da. Arsayı hiç görmemiş çocuklar.
Cemil Amca: Rıza gidip onları bulmuş. Bir fiyat vermiş, onlar da imzalamış. Bana kimse sormadı.
Cemil Amca bir an susuyor.
Cemil Amca: O dutu babamız Nuri doğduğu sene dikti. Fidanı Malatya'dan getirdi. Elli yedi yaşında o ağaç, Nuri'yle yaşıt.
Veresiye defterinin kapağını okşuyor.
Cemil Amca: Bir şey yapılmaz evladım. Para konuşunca dut susar.
* Bir şey yapılır. Bir yolunu bulacağız. {cemil+2 cesaret+1} #cemil_soz -> b2_cemil_soz
* Çok üzüldüm Cemil Amca. {cemil+1} -> b2_cemil_uzgun

=== b2_cemil_soz
Cemil Amca gözlüklerini takıp sana bakıyor. Uzun uzun.
Cemil Amca: Sen bana Nuri'yi hatırlattın şimdi. O da böyle derdi. Bir yolu bulunur, derdi.
Kahverengi defteri açıyor, en son sayfaya bir şey yazıyor. Görmene izin vermiyor.
Cemil Amca: Hadi git evine. Ninen merak eder.
@not Cemil Amca sana inanmak istiyor.
-> b2_bitis

=== b2_cemil_uzgun
Cemil Amca başını sallıyor, sana bir sakız uzatıyor. Bu sefer sen almıyorsun. Ikiniz de ne yapacağınızı bilmiyorsunuz.
-> b2_bitis

=== b2_tabela_sok
Direğe sarılıyorsun, çekiyorsun. Mert de geliyor. Sonra Selim, Burak. Defne bile.
Direk kımıldamıyor. Betona gömmüşler. Daha bugün.
Kamyonetteki adamlardan biri gülüyor.
Adam: Uğraşmayın çocuklar. Rıza Bey sağlam iş yapar.
Hasan Abi motoruyla geliyor, adamlara uzun uzun bakıyor. Adamlar kamyonete binip gidiyor.
Hasan Abi: Tabelayı sökmekle bir şey olmaz ufaklıklar. Rıza'nın elinde tapu var. Kağıtla gelen kağıtla gider.
Kağıtla gelen kağıtla gider. Bu cümle aklına takılıyor.
@bayrak kagit
-> b2_bitis

=== b2_eve
@yer sokak aksam
Eve yürüyorsun. Arkana bakmamaya çalışıyorsun.
Ama tabelanın mavisi akşamın içinde, gözünün kenarında, parlıyor, parlıyor.
-> b2_bitis

=== b2_bitis
@yer oda gece
O gece uyuyamıyorsun.
Penceren arsaya bakıyor. Sokak lambasının ışığında tabela, bir hayalet gibi.
@eger #gol_sen -> b2_bitis_gol
@eger #gol_mert -> b2_bitis_gol
@eger #gol_defne -> b2_bitis_gol
Maçı kaybettiniz. Ama artık o bile önemli görünmüyor.
-> b2_son_dusunce

=== b2_bitis_gol
Maçı kazandınız. Revanşı aldınız. Bu yazın en güzel günü olmalıydı.
Belki de öyleydi. Belki de bir gün dönüp baktığında, öyle olduğunu anlayacaksın.
@bayrak mac_kazandik
@ani mac
-> b2_son_dusunce

=== b2_son_dusunce
Kasım. Dört ay. On altı hafta. Kaç cumartesi, kaç maç kaldı?
Nine kapıdan bakıyor.
Nine: Uyumadın mı kuzum?
* Nine, bir şeyi kurtarmak mümkün mü? {nine+1} -> b2_nine
* Uyuyorum nine. -> b3_basla

=== b2_nine
Nine yatağının kenarına oturuyor. Yatak gıcırdıyor.
Nine: Neyi kurtarmak?
Arsayı, diyorsun. Dut ağacını. Her şeyi.
Nine uzun süre susuyor. Sonra elini saçlarının arasında gezdiriyor.
Nine: Biz köyden geldiğimizde burada sadece tarla vardı. Sonra evler oldu, sonra apartmanlar. Her şey değişir kuzum. Ama değişirken insan ne yapar, o kalır. Ne yaptığın kalır.
Nine: Uyu şimdi. Yarın düşünürsün.
-> b3_basla
`);
