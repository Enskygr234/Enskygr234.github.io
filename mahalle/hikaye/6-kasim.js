HIKAYE.push(String.raw`
=== b6_basla
@bolum 6
@yer sokak sabah yagmur
Kasım'ın on ikisi. Salı. Yağmur yağıyor.
Haziran'da Defne sormuştu, burada neden hiç yağmur yok diye. İşte yağmur. Bütün yazın biriktirdiği yağmur, tek seferde.
Sabahın altısında uyanıyorsun. Bugün okula kimse gitmeyecek, bunu herkes biliyor. Pencereden bakıyorsun.
Sokağın başında, ıslak asfaltta, sarı bir iş makinesi. Kepçesi havada, bir böceğin kolu gibi. Arkasında bir kamyon. Arkasında Rıza Bey'in siyah arabası.
Nine kapıda. Hırkasını giymiş, başörtüsünü bağlamış.
Nine: Hadi kuzum. Giyin. Aşağı iniyoruz.
@eger #baba_gelir -> b6_baba
@eger #orhan -> b6_orhan_haber
-> b6_arsa

=== b6_baba
Babam mutfakta. Vardiyadan gelmiş, ama yatmamış. Üstünde iş tulumu hâlâ.
Babam: Ustabaşına söyledim. Bugün geç kalacağım dedim. Gerekirse hiç gitmem.
Babam: Nuri Abi olsaydı bugün arsada olurdu. O yoksa biz oluruz.
@eger #orhan -> b6_orhan_haber
-> b6_arsa

=== b6_orhan_haber
Telefon çalıyor. Bu saatte telefon hiç çalmaz.
Nine açıyor. Nermin Teyze. Sesi telefonun içinden taşıyor, odanın öbür ucundan bile duyuluyor.
Nermin Teyze: Orhan Bey aradı! Bulmuş! Aslı arşivdeymiş! Seksen sekizde imzasız değiştirilmiş plan, usulsüz! Durdurma kararını başkan imzalayacakmış, ama başkan saat dokuzda gelirmiş!
Saat altı buçuk. İş makineleri yedide başlar.
İki buçuk saat.
@bayrak karar_yolda
-> b6_arsa

=== b6_arsa
@yer arsa sabah yagmur
Arsaya iniyorsun. Yağmur, toprağı çamura çevirmiş. Dut ağacının son yaprakları yere yapışmış.
Ve oradalar.
Mert, yağmurluğu başına çekmiş. Selim, gözlüklerinin camları buğulu. İkizler, aynı renk botlarla.
@eger #defne_tanisti -> b6_defne_var
-> b6_kalabalik

=== b6_defne_var
Defne, fotoğraf makinesini poşete sarmış, göğsüne bastırmış.
-> b6_kalabalik

=== b6_kalabalik
@eger destek>=2 -> b6_buyukler
Birkaç yetişkin de geliyor. Uzaktan bakıyorlar, şemsiyelerinin altından. Yaklaşmıyorlar.
-> b6_zincir

=== b6_buyukler
Sonra yetişkinler geliyor.
@eger #cemil_destek -> b6_cemil_gelir
@eger #nermin_destek -> b6_nermin_gelir
@eger #kadir_destek -> b6_kadir_gelir
@eger #muhtar_destek -> b6_muhtar_gelir
-> b6_zincir

=== b6_cemil_gelir
Cemil Amca, kepengi bugün açmamış. Bakkalın kapısında bir kağıt: "BUGÜN KAPALIYIZ. ARSADAYIZ."
Elinde veresiye defteri, poşete sarılı.
@eger #nermin_destek -> b6_nermin_gelir
@eger #kadir_destek -> b6_kadir_gelir
@eger #muhtar_destek -> b6_muhtar_gelir
-> b6_zincir

=== b6_nermin_gelir
Nermin Teyze, hayatında ilk defa balkondan değil, sokaktan. Pembe bir yağmurluk, başında yine çiçekli yazma. Arkasında bütün apartman.
@eger #kadir_destek -> b6_kadir_gelir
@eger #muhtar_destek -> b6_muhtar_gelir
-> b6_zincir

=== b6_kadir_gelir
Kadir Amca'nın dolmuşu arsanın girişine park ediyor. İş makinesinin tam önüne. Motoru kapatıyor, anahtarı cebine koyuyor, kollarını kavuşturuyor.
Kadir Amca: Dolmuş arıza yaptı. Çekici gelene kadar buradayım. Çekici de... öğlen gelir herhalde.
@eger #muhtar_destek -> b6_muhtar_gelir
-> b6_zincir

=== b6_muhtar_gelir
Muhtar Hayri Bey geliyor, Ali Amca'yla kol kola. Elinde muhtarlık mühürü ve bir dosya.
Muhtar: Mahallenin itirazı var. Kayda geçti. Mühürlü.
-> b6_zincir

=== b6_zincir
@yer arsa sabah yagmur
İş makinesi homurdanıyor. Rıza Bey arabasından iniyor, şemsiyesiz. Yağmur jöleli saçlarını bozuyor.
Rıza Bey: Çekilin çocuklar. Bugün iş var.
Mert sana bakıyor. Defne sana bakıyor. Herkes sana bakıyor. Neden hep sana bakıyorlar?
Belki de bütün yaz her şeyi bir arada tutan sendin. Belki de bunu bir tek sen bilmiyordun.
* Dut ağacının çevresinde el ele tutuşun. Zincir olun. {cesaret+1} -> b6_el_ele
* Rıza Bey'in yanına git. Onunla konuş. {cesaret+1} -> b6_konus

=== b6_el_ele
Mert'in elini tutuyorsun. Mert Selim'inkini. Selim ikizlerden birininkini.
Halka büyüyor. Çocuklar, sonra büyükler. Dut ağacının gövdesinin etrafında, çamurun içinde, yağmurun altında bir insan halkası.
Karabaş halkanın ortasında, ağacın dibinde oturuyor. Havlamıyor. Sadece bakıyor.
Kimse bir şey söylemiyor. Sadece yağmurun sesi ve iş makinesinin motoru.
@eger #baba_gelir -> b6_zincir_baba
-> b6_zincir_hasan

=== b6_zincir_baba
Halkada bir el seninkini sıkıca tutuyor. Büyük, nasırlı, yağ kokulu bir el. Babam.
Tulumunun üstünde yağmurdan koyulaşmış lekeler. Sana bakmıyor, ileriye, iş makinesine bakıyor. Ama elini bırakmıyor.
-> b6_zincir_hasan

=== b6_zincir_hasan
@eger hasan>=4 -> b6_hasan_doner
-> b6_karar

=== b6_hasan_doner
Sonra sokağın başından bir ıslık.
Herkes dönüp bakıyor. Yağmurun içinde, yeşil bir askeri parka, sırtında bir çanta, kazınmış bir kafa.
Mert: HASAN ABİ!
Hasan Abi. Yol izni. Kimseye haber vermeden, gece otobüsüyle gelmiş.
Çantasını çamura bırakıyor, halkaya katılıyor, senin öbür elini tutuyor.
Hasan Abi: Sözünü tuttun ufaklık. Arsa hâlâ burada. Şimdi beraber tutalım.
@etki cesaret+1
-> b6_karar

=== b6_konus
Rıza Bey'in önüne geçiyorsun. Yağmur yüzünden akıyor.
Bana yazın o dut ağacının altında ne yaptığını anlat, diyorsun. Neden orada oynadığını.
Rıza Bey sana bakıyor. Yağmur. İş makinesi. Herkes.
@eger #riza_gordu -> b6_riza_hatira
Rıza Bey: Anlatacak bir şey yok. Çocukluk işte.
Ama gözlerini dut ağacından ayıramıyor.
-> b6_karar

=== b6_riza_hatira
Rıza Bey'in sesi değişiyor.
Rıza Bey: Nuri bana top oynamayı öğretti. Ben sıskaydım, kimse almazdı takıma. Nuri aldı. Kaleye koydu. Bir gol yemeden maç bitirdim, Nuri beni omuzlarına aldı. O dutun altında.
Rıza Bey: Babam o hafta beni dövdü, okulu ektim diye. Ama yine de o gün hayatımın en güzel günüydü.
Yağmur. Rıza Bey gözlerini siliyor ama yağmurdan mı, bilemiyorsun.
@bayrak riza_acildi
-> b6_karar

=== b6_karar
@yer arsa sabah yagmur
@eger #orhan & destek>=3 -> son_park
@eger #riza_gordu & destek>=2 -> son_dut
@eger #riza_acildi & destek>=2 -> son_dut
@eger #defne_gider & defne>=6 -> son_mektup
@eger mert>=5 -> son_mac
@eger defne>=6 -> son_mac
-> son_yalniz

=== son_park
@yer arsa sabah yagmur
Saat sekiz kırk beş.
Kadir Amca'nın dolmuşu değil bu sefer, belediyenin beyaz arabası sokağa giriyor. Orhan Bey iniyor. Elinde bir dosya, dosyada ıslak mürekkepli bir kağıt.
Orhan Bey: Durdurma kararı! Başkan erken geldi! Necati'nin haritasını görünce kalemi kendisi aldı!
Kağıdı Rıza Bey'e uzatıyor. Rıza Bey okuyor. Yağmur kağıdın üstüne damlıyor, mürekkep biraz yayılıyor, ama okunuyor.
Uzun bir sessizlik.
@eger #riza_acildi -> son_park_riza
Rıza Bey kağıdı katlıyor, cebine koyuyor. İş makinesinin şoförüne başıyla işaret ediyor. Motor susuyor.
Rıza Bey: Mahkemede görüşürüz.
Gidiyor. Ama mahkemede görüşmüyorsunuz. Hiçbir zaman.
-> son_park_kutlama

=== son_park_riza
Rıza Bey kağıdı katlıyor. Sonra sana bakıyor. Sonra dut ağacına.
Rıza Bey: Biliyor musunuz? İyi oldu.
Herkes şaşkın.
Rıza Bey: Bir apartman daha yapsam ne olacak. Ama bir çocuk Nuri'nin beni omzuna aldığı gibi birini omzuna alamazsa... ona yazık.
Şoföre işaret ediyor. Motor susuyor. Rıza Bey ceketini çıkarıp dut ağacının dibine, ıslak toprağa oturuyor.
Rıza Bey: Parkı ben yaptırırım. Bankları, salıncakları. Bir şartım var. Dutun yanına bir tabela. "Nuri'nin Dutu."
Cemil Amca'nın gözlerinden yaşlar akıyor. Yağmurda kimse fark etmiyor. Herkes fark ediyor.
@bayrak riza_park
-> son_park_kutlama

=== son_park_kutlama
Sonra bir çığlık. Mert'in. Sonra bütün çocukların. Sonra büyüklerin.
Nermin Teyze yazmasını çıkarıp sallıyor. Kadir Amca dolmuşun kornasına basıyor, durmadan. Karabaş havlıyor, havlıyor, çamurda daireler çizerek koşuyor.
Mert seni yerden kaldırıp omuzlarına almaya çalışıyor, ikiniz de çamura düşüyorsunuz.
@eger #defne_tanisti -> son_park_flas
-> son_park_son

=== son_park_flas
Defne poşetten makinesini çıkarıyor. Yağmur umurunda değil.
Defne: Kıpırdamayın! Bir tane daha!
Flaş.
-> son_park_son

=== son_park_son
@son park
@ani park
Ertesi yılın baharında arsaya çim ekiliyor. İki salıncak, bir kaydırak, dört bank. Taş kaleler yerine gerçek kaleler, beyaz boyalı.
Dut ağacının yanına küçük bir tabela dikiliyor. Mavi değil, yeşil.
"AKASYA PARKI — Mahalle halkı tarafından korunmuştur. 1996."
Ve yıllar sonra bile, o parkta her yaz bir çocuk penaltı atıyor.
-> epilog

=== son_dut
@yer arsa sabah yagmur
Rıza Bey uzun süre dut ağacına bakıyor.
Sonra iş makinesinin şoförüne dönüyor.
Rıza Bey: Bugün çalışmıyoruz. Kapat.
Motor susuyor. Yağmurun sesi birden çok yüksek.
Rıza Bey: Apartmanı yapacağım. Para verdim, söz verdim, geri dönemem. Ama...
Dut ağacına yürüyor. Elini gövdesine koyuyor.
Rıza Bey: Bu ağaç kalacak. Projeyi değiştireceğim. Apartman arkaya kayacak. Önü bahçe olacak, herkese açık. Dutun altında bank olacak. Çocuklar oynayacak.
Cemil Amca: Söz mü Rıza?
Rıza Bey: Söz Cemil Ağabey. Nuri'nin hatırına.
Kimse ne yapacağını bilmiyor. Tam bir zafer değil bu. Tam bir yenilgi de değil.
Sonra Mert alkışlamaya başlıyor. Yavaşça. Sonra başkaları.
@son dut
@ani dut
Apartman bir yılda yükseliyor. Beş kat, sarı boyalı. Ama önünde dut ağacı. Dutun altında iki bank, bir de küçük bir salıncak.
Top oynamak için çok küçük artık. Ama yaz akşamları çocuklar dutun altında oturup dut yiyor, ağızları yüzleri mor oluyor.
Rıza Bey de bazen gelip banka oturuyor. Kimseyle konuşmuyor. Sadece bakıyor.
-> epilog

=== son_mektup
@yer arsa sabah yagmur
Hiçbir şey yetmiyor. İmzalar, kermes, el ele tutuşmalar.
Saat dokuzda polis geliyor. Kibar ama kararlı. Çocukları kenara alıyorlar, büyükleri kenara alıyorlar.
İş makinesi dut ağacına yaklaşıyor.
Defne yanında, elini sıkıca tutuyor. Yüzünü omzuna gömüyor. Bakamıyor.
Sen bakıyorsun. Biri bakmalı.
Elli yedi yıllık ağaç, üç dakikada yere yatıyor.
@yer sokak aksam
Aralık'ta, Defne'yi uğurluyorsunuz.
Aynı beyaz minibüs, aynı K harfli plaka. Üstünde yine iple bağlanmış eşyalar.
Defne sana bir zarf uzatıyor. Kalın. İçinde fotoğraflar. Bütün yaz. Her biri.
Defne: Negatifler bende. Bunlar senin. Unutma diye.
Defne: Ve mektup yaz. Pullu. Postacı amca acele et.
Minibüs gidiyor. Sokağın sonunda kornaya basıyor. Bir, iki, üç. Hasan Abi'nin dolmuşu gibi.
@son mektup
@ani mektuplar
O kış ilk mektubu yazıyorsun. Sonra ikincisini. Sonra her ay.
Defne cevap veriyor. Köln'den, yağmurdan, okuldan, yeni arkadaşlarından. Her mektubun içinde bir fotoğraf. Bir nehir, bir kilise, bir pencere.
Ve her mektubun sonunda aynı cümle: "Akasya'da benim bir yerim var mı hâlâ?"
Var, diye yazıyorsun her seferinde. Var.
-> epilog

=== son_mac
@yer arsa sabah yagmur
Hiçbir şey yetmiyor. İmzalar, kermes, el ele tutuşmalar.
Rıza Bey saatine bakıyor.
Rıza Bey: Bir saat. Size bir saat veriyorum. Sonra çekiliyorsunuz.
Bir saat.
Mert topu çıkarıyor. Nereden çıkardığını kimse bilmiyor. Eski, yamalı, deri top. İlk maçın topu.
Mert: Son maç. Kimse kaybetmeyecek.
@eger #tolga_dost -> son_mac_tolga
-> son_mac_oyun

=== son_mac_tolga
Sokağın başında Tolga beliriyor. Arkasında Üst Sokak takımı. Hepsi ıslak.
Tolga, amcasının yanından geçerken bakmıyor bile.
Tolga: Kaleci lazım mı?
Rıza Bey bir şey söylemiyor. Söyleyemiyor.
-> son_mac_oyun

=== son_mac_oyun
Çamurda oynuyorsunuz. Yağmurda. Kimse skor tutmuyor.
Herkes düşüyor, herkes kalkıyor. Selim kaleden çıkıp gol atıyor, hayatında ilk defa. Burak pas veriyor, Barış pas veriyor.
@eger #defne_tanisti -> son_mac_defne
-> son_mac_bitis

=== son_mac_defne
Defne sol kanattan koşuyor, ortalıyor, Mert kafayla vuruyor. Top dut ağacının gövdesine çarpıp içeri giriyor.
Mert: Dut'tan gol! Dut da bizim takımda!
-> son_mac_bitis

=== son_mac_bitis
Bir saat bitiyor. Rıza Bey düdük çalmıyor ama saatine bakıyor.
Hepiniz arsanın ortasında, nefes nefese, çamurdan kimin kim olduğu belli değil.
Mert topu dut ağacının dibine bırakıyor.
Mert: Burada kalsın.
Çekiliyorsunuz. İş makinesi ilerliyor. Arkanıza bakmıyorsunuz. Hiçbiriniz.
@son son_mac
@ani son_mac
Apartman bir yılda yükseliyor. Beş kat, sarı boyalı. Altında bir market, otomatik kapılı.
Ama siz başka bir arsa buluyorsunuz. Sonra başka bir sokak. Sonra okul bahçesi. Topu oynayacak bir yer hep bulunuyor.
Arsa değilmiş asıl olan, diye düşünüyorsun yıllar sonra. Asıl olan, oynayanlarmış.
-> epilog

=== son_yalniz
@yer oda sabah yagmur
Hiçbir şey yetmiyor.
Ya da belki hiçbir şey yeterince olmadı. Yeterince insan, yeterince kağıt, yeterince el.
Pencerenin önünde duruyorsun. Arsaya inmeye gücün yok.
Aşağıda birkaç çocuk, birkaç yetişkin. Polis geliyor, kibar ama kararlı. Herkesi kenara alıyorlar.
İş makinesi dut ağacına yaklaşıyor.
Nine yanına geliyor. Elini omzuna koyuyor.
Nine: Bakmasan da olur kuzum.
Bakıyorsun. Biri bakmalı.
Elli yedi yıllık ağaç, üç dakikada yere yatıyor.
@son yalniz
@ani pencere
Apartman bir yılda yükseliyor. Beş kat, sarı boyalı.
O yazdan sonra Mert'le eskisi kadar görüşmüyorsunuz. Defne başka bir okula geçiyor. Nermin Teyze'nin balkonu boş kalıyor.
Ama nine her akşam sana o masalı anlatmaya devam ediyor. Dut ağacının masalını. Sonunu her seferinde biraz değiştirerek.
Ve bir gün fark ediyorsun: sen de bir gün birine anlatacaksın. Daha iyi bir sonla.
-> epilog

=== epilog
@yer sokak aksam
@bolum 7
Otuz yıl sonra. Ekim, 2026.
Akasya Sokağı'na arabayla giriyorsun. Hiç bu kadar dar olduğunu hatırlamıyordun.
Apartmanlar yenilenmiş, sıvaları boyanmış. Balkonlarda çamaşır ipleri yerine klimalar. Ama birkaç balkonda hâlâ ip var, hâlâ bir kırmızı havlu.
@eger #cemil_kalir -> ep_cemil
Bakkalın yerinde bir telefon dükkanı var. Camında indirim yazıları.
-> ep_nermin

=== ep_cemil
Bakkal hâlâ orada. Tabelası yenilenmiş ama adı aynı: "CEMİL BAKKALİYESİ". Tezgahın arkasında genç bir adam. Cemil Amca'nın torunu.
Duvarda çerçeveli bir fotoğraf: Cemil Amca, tavla masası, mum ışığı. Altında küçük bir kağıt: "Dedem. 1926-2011."
Tezgahın altında, kahverengi, yıpranmış bir defter. Torun gösteriyor: "Dedemin veresiye defteri. Hiç atmadık. Son sayfasında bir sürü imza var, ne olduğunu bilmiyoruz."
Sen biliyorsun.
-> ep_nermin

=== ep_nermin
@eger nermin>=5 -> ep_nermin_iyi
-> ep_mert

=== ep_nermin_iyi
Nermin Teyze'nin balkonunda sardunyalar hâlâ kırmızı. Ama balkonda oturan, Avustralya aksanıyla Türkçe konuşan, kır saçlı bir adam. Kemal.
Annesinin son yıllarında dönmüş. Bir daha gitmemiş.
-> ep_mert

=== ep_mert
@eger #mert_ogreniyor -> ep_mert_ogretmen
@eger mert>=5 -> ep_mert_dost
-> ep_defne

=== ep_mert_ogretmen
Mert'i aramıyorsun, Mert seni buluyor. Telefonla, her hafta olduğu gibi.
Mert: Neredesin? Sokakta mısın? Ben de geliyorum, ders bitti.
Mert bir ortaokulda matematik öğretmeni. Öğrencileri ona Simit Hoca diyor. Kesirleri hâlâ simitle anlatıyor.
-> ep_defne

=== ep_mert_dost
Mert'le hâlâ konuşuyorsunuz. Her bayram, her doğum günü. Mert dolmuşçu olmadı, Kadir Amca'nın istediği gibi. Bir futbol okulu açtı, çocuklara top oynamayı öğretiyor.
Okulun adı: "Akasya Spor."
-> ep_defne

=== ep_defne
@eger #defne_kalir -> ep_defne_kalir
@eger #mektup -> ep_defne_mektup
-> ep_hasan

=== ep_defne_kalir
Defne fotoğrafçı oldu. Gerçek bir fotoğrafçı. Kitapları var, sergileri var.
İlk kitabının adı "Akasya Sokağı, 1996". Kapağında bir dut ağacı ve bir sokak lambası.
Arka kapağında sadece bir cümle: "Unutmak istemediğim her şey için."
-> ep_hasan

=== ep_defne_mektup
Defne'den hâlâ mektup geliyor. Artık e-posta, ama siz hâlâ mektup diyorsunuz.
Her yıl bir tane gerçek mektup da geliyor. Pullu. Zarfın arkasında: "Postacı amca acele et."
-> ep_hasan

=== ep_hasan
@eger #hasan_mektup -> ep_hasan_mektup
@eger #hasan_soz -> ep_hasan_soz
-> ep_son

=== ep_hasan_mektup
Hasan Abi askerden on dört mektup getirdi eve. Hepsini senin yazdığın. Hâlâ saklıyor, bir ayakkabı kutusunda.
Kırmızı kasetçalar artık çalışmıyor. Ama kaset hâlâ sende. "AKASYA 96 — HASAN."
-> ep_son

=== ep_hasan_soz
Hasan Abi döndüğünde ilk iş arsaya gitti. Sana sözünü tuttun mu diye sordu. Sen de ona anlattın. Her şeyi.
Kırmızı kasetçalar artık çalışmıyor. Ama kaset hâlâ sende. "AKASYA 96 — HASAN."
-> ep_son

=== ep_son
@yer arsa aksam
@eger #riza_park -> ep_son_park
@eger karabas>=2 -> ep_karabas
-> ep_kapanis

=== ep_son_park
Parktasın. Dut ağacı hâlâ orada, seksen yedi yaşında, gövdesi kalınlaşmış, dalları bir şemsiye gibi.
Yanında, yeşil, biraz paslanmış bir tabela: "NURİ'NİN DUTU".
@eger karabas>=2 -> ep_karabas
-> ep_kapanis

=== ep_karabas
Karabaş o kışı sizin apartmanın girişinde geçirdi. Ertesi kış sizin evde. Nine "köpek eve girmez" dedi ama her gece ona yemek ayırdı.
On dört yıl yaşadı. Arsanın, ya da parkın, ya da apartmanın önündeki küçük bahçenin köşesinde yatıyor.
-> ep_kapanis

=== ep_kapanis
Akşam iniyor. Pencereler bir bir yanıyor. Bir yerlerde bir televizyon, bir dizinin müziği.
Sokağın sonundan çocuk sesleri geliyor. Top sesi. Biri penaltı diye bağırıyor.
Gülümsüyorsun.
Bir yaz bitmişti. Otuz yıl önce. Ama belki de hiç bitmedi.
Nine haklıydı. Her şey değişir. Ama değişirken insan ne yapar, o kalır.
@bitir
`);
