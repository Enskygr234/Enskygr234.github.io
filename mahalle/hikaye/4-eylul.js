HIKAYE.push(String.raw`
=== b4_basla
@bolum 4
@yer okul sabah
Eylül, bir sabah aniden geliyor. Akşamlar serinliyor, dut ağacının yaprakları kenarlarından sararıyor.
Okul. Beşinci sınıf. İlkokulun son yılı.
Yeni önlük, yeni yaka, kolalı ve batıyor. Annem önceki gece ütülemiş, sabah yine ütülemiş.
Bahçede İstiklal Marşı. Güneş gözünü alıyor. Müdür uzun bir konuşma yapıyor, kimse dinlemiyor.
Sınıfa giriyorsunuz. Yeni öğretmen: Zeki Bey. Genç, sakallı, kravatı yamuk.
Zeki Bey: Yeni bir arkadaşımız var. Defne. Almanya'dan geldi.
Defne kapıda. Önlüğü yeni, yakası çok beyaz.
Arka sıradan bir ses:
Tolga: Almancı! Hoş geldin Almancı!
Tolga. Bu yıl sizin sınıfta. Okul bölgesi değişmiş.
Sınıf gülüyor. Defne'nin yanakları kızarıyor ama başını kaldırıp yürüyor. Boş sıra senin yanında.
* Ayağa kalk: Onun adı Defne. {cesaret+2 defne+2} #tolga_karsi -> b4_ayaga
* Zeki Bey'e bak, bir şey yapmasını bekle. -> b4_ogretmen
* Defne yanına oturunca kulağına fısılda: Tolga'yı boşver. {defne+1} -> b4_fisilti

=== b4_ayaga
Sandalyen gıcırdıyor. Bütün sınıf sana dönüyor.
Onun adı Defne, diyorsun. Sesin titriyor ama yüksek çıkıyor.
Sessizlik. Zeki Bey kaşlarını kaldırıyor. Sonra gülümsüyor.
Zeki Bey: Haklısın. Onun adı Defne. Tolga, sen de adını kullanmayı öğreneceksin. Hem de bu dönem.
Tolga sana bakıyor. O bakışı tanıyorsun. Teneffüste görüşürüz bakışı.
Defne yanına oturuyor. Bir şey demiyor ama sıranın altından elini uzatıp serçe parmağınla serçe parmağını kancalıyor. Bir saniye. Sonra bırakıyor.
@ani okul
-> b4_mert

=== b4_ogretmen
Zeki Bey tebeşiri masaya bırakıyor.
Zeki Bey: Bu sınıfta lakap yok. Herkes adıyla çağrılır.
Sınıf susuyor. Tolga omuz silkiyor.
Defne yanına oturuyor. Çantasını açıp defterlerini diziyor, tek tek, düzgünce. Bir şey söylemiyor. Sen de söylemiyorsun.
@ani okul
-> b4_mert

=== b4_fisilti
Defne yanına oturuyor. Kulağına eğiliyorsun.
Defne fısıldayarak cevap veriyor:
Defne: Köln'de bana Türkin derlerdi. Burada Almancı. Ben neyim o zaman?
Bilmiyorsun. Ama bir şey söylemen lazım.
Sen Akasya Sokağı'lısın, diyorsun.
Defne bir an düşünüyor. Sonra sırasının köşesine pergelle küçük bir dut yaprağı kazıyor.
@ani okul
-> b4_mert

=== b4_mert
@yer okul ogle
Matematik dersi. Zeki Bey tahtaya bir problem yazıyor.
"Bir fırıncı 48 simidi 6 eşit tepsiye dizmiştir. Tepsilerin dörtte biri satılmıştır. Kaç simit satılmıştır?"
Sınıf sessiz. Kimse el kaldırmıyor.
@eger #mert_ogreniyor -> b4_mert_simit
Mert sırasına gömülüyor, gözleri pencerede. Zeki Bey ona bakmıyor, iyi ki.
-> b4_hasan_mektup

=== b4_mert_simit
Sonra bir el kalkıyor. Mert'in eli.
Bütün sınıf dönüp bakıyor. Mert de kendi eline bakıyor, sanki onu kaldıran o değilmiş gibi.
Mert: On iki. On iki simit. Çünkü kırk sekizin dörtte biri... yani kırk sekiz simidi dört kişiye bölersen... on iki.
Zeki Bey tebeşiri bırakıyor.
Zeki Bey: Aferin. Doğru. Simitle mi düşündün?
Mert: Hocam, ben her şeyi simitle düşünüyorum artık.
Sınıf gülüyor ama bu sefer onunla gülüyorlar. Mert sana bakıp göz kırpıyor.
Akşam Kadir Amca sizin kapıyı çalıyor. Elinde bir tepsi baklava.
Kadir Amca: Öğretmeni çağırdı beni. Oğlun değişmiş dedi. Bu senin işin, biliyorum.
@etki mert+1
@bayrak kadir
-> b4_hasan_mektup

=== b4_hasan_mektup
@yer bakkal ogleden_sonra
Okul çıkışı bakkala uğradığınızda Cemil Amca tezgahın üstünde bir zarf sallıyor.
Cemil Amca: Sivas'tan mektup var! Hasan'dan! Ali okusun diye bana bıraktı, gözlükleri kırılmış.
Zarfın üstünde kocaman, eğri büğrü harfler: "AKASYA SOKAĞI ÇOCUKLARINA. CEMİL BAKKALİYESİ ELİYLE."
Cemil Amca gözlüğünü takıp okuyor. Yüksek sesle, bir şiir okur gibi.
Cemil Amca: "Sevgili ufaklıklar. Burası soğuk. Eylülde kar yağdı, inanır mısınız? Komutan beni mutfağa verdi, günde iki çuval patates soyuyorum. Ellerim patates oldu."
Gülüyorsunuz.
Cemil Amca: "Gece nöbette sizin arsayı düşünüyorum. Dut ağacını. Tolga'ları yendiğinizi babamdan duydum. Aferin. Ama asıl maç daha bitmedi, biliyorum."
@eger #hasan_mektup -> b4_hasan_cevap
-> b4_hasan_son

=== b4_hasan_cevap
Cemil Amca sana bakıyor, gözlüğünün üstünden.
Cemil Amca: "Bir de, mektubunu aldım. Postacı amca acele etmiş, dört günde geldi. Koğuşta herkese okudum. Bizim çavuş bile güldü. Bir daha yaz."
Mert dirseğiyle seni dürtüyor. Kulakların ısınıyor.
@etki hasan+1
-> b4_hasan_son

=== b4_hasan_son
Cemil Amca: "Arsaya göz kulak olun. Rıza'nın dişine dokunmayın ama gözünü de kaçırmayın. Hepinizi özledim. Hasan."
Cemil Amca mektubu katlayıp vitrinin camına, iç tarafa, bantla yapıştırıyor. Sokaktan geçen herkes okuyabilsin diye.
Akşama kadar sokaktaki herkes vitrinin önünde durup okuyor. Nermin Teyze iki kere okuyor. İkincisinde gözlerini siliyor.
-> b4_plan

=== b4_plan
@yer arsa aksam
Okuldan sonra dut ağacının altında toplanıyorsunuz. Sen, Mert, Selim, ikizler. Defne. Karabaş da geliyor, ortaya yatıyor, toplantıya katılıyor.
Tabelanın üstündeki "BURASI BİZİM" yazısını biri silmiş. Birisi yeniden yazmış. Birisi yine silmiş. Bu bir savaş.
Mert ortaya oturuyor.
Mert: Kasım'a iki ay var. Ne yapacağız?
Selim gözlüğünü düzeltiyor.
Selim: Babam diyor ki belediyeye imza verirsek bir şey olabilir. Çok imza. Yüzlerce.
Defne: Ve bir şenlik. Köln'de biz okulda yapardık. Fest. Herkes gelir, yemek yer, oyun oynar, para toplanır. Gazeteciler gelir.
Burak: Kermes!
Barış, kolu artık alçısız: Kermes!
@eger #imar -> b4_plan_harita
-> b4_plan_karar

=== b4_plan_harita
Herkes sana bakıyor çünkü sen bir şey biliyorsun.
Nermin Teyze'nin haritasını anlatıyorsun. Yetmiş dokuz. Yeşil kare. Çocuk parkı. "N.Y." imzası.
Selim'in gözleri büyüyor.
Selim: Bu çok önemli. Babam avukatlık bürosunda katip. Eğer plan değiştirilmişse ve kimse sorulmamışsa... Buna itiraz edilebilir!
Mert: İtiraz ne demek?
Selim: Hayır demek. Kağıtla hayır demek.
@bayrak itiraz
-> b4_plan_karar

=== b4_plan_karar
Mert dalla toprağa büyük harflerle yazıyor: KERMES. İMZA.
Mert: Ekim'in son cumartesi. Arsada. Herkes çağrılacak. Bütün sokak. Üst Sokak bile.
Ama bunun için yetişkinler lazım. Masa lazım, izin lazım, yemek lazım. Kimin yanına gideceğinize karar vermeniz lazım. Bu hafta okul var, ödev var, en fazla iki kişiyle konuşabilirsin.
@ani kermes_plan
@eger #defne_tanisti -> b4_defne_yemek
-> b4_hub

=== b4_defne_yemek
@yer defne aksam
Toplantıdan sonra Defne kolundan çekiyor.
Defne: Annem seni yemeğe çağırdı. Hayır deme, Apfelkuchen yaptı.
Defne'lerin evi Köln kokuyor. Öyle diyor Defne, sen Köln'ün nasıl koktuğunu bilmiyorsun. Tarçın, kahve ve ıslak karton kutu.
Defne'nin annesi Gül Teyze ince, hızlı konuşan bir kadın. Türkçesi Almanca kelimelerle dolu, her cümlede bir "also" var.
Masada mercimek çorbası ve patatesli bir şey. Kartoffelsalat, diyor Gül Teyze. Patates salatası ama sirkeli, soğuk.
Gül Teyze: Defne seni çok anlatıyor. Arsayı, maçı, Mert'i. Köln'de hiç böyle anlatmazdı.
Defne çatalıyla tabağını eşeliyor.
Defne: Anne!
Gül Teyze gülüyor.
Gül Teyze: Also, ne dedim ki? Doğruyu söyledim.
Yemekten sonra Defne seni odasına götürüyor. Duvarda bir harita, Köln'den İstanbul'a kırmızı kalemle çizilmiş bir çizgi.
Defne: Biz arabayla geldik. Üç gün. Avusturya, Yugoslavya... yani artık başka ülkeler. Bulgaristan. Her sınırda babam pasaportları gösterdi, annem ağladı.
Defne: Köln'de bize yabancı derlerdi. Burada da Almancı diyorlar. Ben bir yerde yabancı olmamak istiyorum. Bir yerde sadece Defne olmak istiyorum.
* Burada sen Defne'sin. Bizim sol bek. {defne+2} -> b4_defne_yemek_iyi
* Belki herkes biraz yabancıdır bir yerde. Nine de köyden geldi. {defne+1 nine+1} -> b4_defne_yemek_nine

=== b4_defne_yemek_iyi
Defne gülüyor, gözlerini kaçırarak.
Defne: Sol bek. Bu iyi bir şey mi?
Bizim için en iyisi, diyorsun.
Gül Teyze kapıdan iki dilim Apfelkuchen uzatıyor. Elmalar yumuşak, üstü şekerli. Nine'nin revanisinden sonra dünyanın en iyi tatlısı. Ama bunu Nine'ye söylemeyeceksin.
-> b4_hub

=== b4_defne_yemek_nine
Defne düşünüyor.
Defne: Ninen de mi göçmen?
Bir köyden bir şehre. Bir tarladan bir apartmana. Belki o da bir göç.
Defne: Belki herkes bir yerden bir yere gidiyor. Kimse tam olarak bir yerin değil.
Defne: Ama arsa herkesin. Belki o yüzden önemli.
Gül Teyze kapıdan iki dilim Apfelkuchen uzatıyor. Elmalar yumuşak, üstü şekerli.
-> b4_hub

=== b4_hub
@yer sokak aksam
@eger gun>=2 -> b4_rıza
Kimi ziyaret edeceksin?
* [!#z_cemil] Cemil Amca. Bakkalın önü kermes için tam yer. {gun+1 #z_cemil} -> b4_z_cemil
* [!#z_nermin] Nermin Teyze. Herkesi o tanır. {gun+1 #z_nermin} -> b4_z_nermin
* [!#z_kadir] Kadir Amca. Dolmuşla belediyeye götürebilir. {gun+1 #z_kadir} -> b4_z_kadir
* [!#z_defne] Defne'nin evi. Babası fotoğrafları basabilir. {gun+1 #z_defne} -> b4_z_defne
* [#muhtar !#z_muhtar] Hasan Abi'nin babası. Muhtarla arkadaş. {gun+1 #z_muhtar} -> b4_z_muhtar

=== b4_z_cemil
@yer bakkal aksam
Cemil Amca kermesi dinliyor. Bulmacasını kapatıyor.
@eger cemil>=4 -> b4_z_cemil_evet
Cemil Amca: Kermes, imza... Siz çocuksunuz. Rıza'nın avukatları var, adamları var. Ben karışmayayım evladım, bakkalı da almak istiyor, başıma iş açmayayım.
Ama sen tam kapıdan çıkarken seslenip bir kasa gazozu kapının önüne koyuyor.
Cemil Amca: Bunu kermese götürün. Kimseye benden demeyin.
@etki cemil+1
-> b4_hub

=== b4_z_cemil_evet
Cemil Amca ayağa kalkıyor. Gözlüğünü çıkarıyor.
Cemil Amca: Bakkalın önü sizin. Masaları ben veririm, gazozu ben veririm. Bir de...
Tezgahın altından kahverengi veresiye defterini çıkarıyor. Son sayfayı açıyor.
Sayfada, bir yaz boyunca, düzgün el yazısıyla tutulmuş bir liste var. İsimler. Mahallenin isimleri. Her ismin yanında bir imza.
Cemil Amca: Temmuzdan beri herkes alışverişe geldiğinde imzalattım. Arsaya hayır diyenler. Yüz kırk iki kişi.
Cemil Amca: Sen bana bir yolu bulunur dedin ya. Ben de buldum bir yol.
@etki destek+1
@bayrak cemil_destek
@ani defter
-> b4_hub

=== b4_z_nermin
@yer balkon aksam
Nermin Teyze kermesi dinlerken ellerini birbirine vuruyor.
@eger nermin>=4 -> b4_z_nermin_evet
Nermin Teyze: Kermes mi? Yaparım, yaparım. Börek yaparım, sarma yaparım. Ama bu işler kermesle olmaz yavrum. Bu işler belediyede olur.
Börek sözü, sarma sözü. Bu da bir şey.
@etki nermin+1
-> b4_hub

=== b4_z_nermin_evet
Nermin Teyze: Kermes mi? Yaparım! Börek, sarma, revani. Hem de bütün apartmanı yaptırırım, ben söylersem yaparlar.
Sonra sesini alçaltıyor.
Nermin Teyze: Bir şey daha. Necati'nin belediyeden bir arkadaşı var. Orhan Bey. Şimdi imar müdürü. Onu kermese çağırırım. Necati'nin hatırına gelir. O haritayı ona göstereceğiz.
@etki destek+1
@bayrak nermin_destek
-> b4_hub

=== b4_z_kadir
@yer sokak aksam
Kadir Amca dolmuşunu yıkıyor. Hortumdan su fışkırıyor, köpükler asfalta akıyor.
@eger #kadir -> b4_z_kadir_evet
@eger mert>=5 -> b4_z_kadir_evet
Kadir Amca: Kermes. İmza. Belediye. Bunlar çocuk işi değil. Rıza'yla uğraşmayın, o adamın kolu uzun.
Hortumu kapatıyor.
Kadir Amca: Ama kermes günü dolmuş arsanın önünde durur. Gelen olursa Üst Sokak'tan, aşağıdan, çarşıdan, bedava getiririm. O kadarını yaparım.
-> b4_hub

=== b4_z_kadir_evet
Kadir Amca hortumu bırakıyor. Su ayakkabılarına akıyor, umursamıyor.
Kadir Amca: Benim oğlum el kaldırmış derste. Biliyor musun ben hayatımda bir kere bile el kaldırmadım.
Kadir Amca: İmzaları belediyeye ben götürürüm. Dolmuşla. Bütün mahalleyi götürürüm istersen. Ben şoförüm, yolu bilirim.
@etki destek+1
@bayrak kadir_destek
-> b4_hub

=== b4_z_defne
@yer defne gece
Defne'nin evi hâlâ yarı kutularla dolu. Duvarlarda Köln'den fotoğraflar, iki kuleli kilise, nehir, yağmur.
Banyonun kapısında bir kağıt: "GİRMEYİN — KARANLIK ODA".
Defne'nin babası Erol Bey, ama herkes Erol Amca diyor, kafasını çıkarıyor.
Erol Amca: Gel bakalım. Işığı kapat ama. Kırmızı ışık var sadece.
İçerisi kırmızı. Leğenlerde sıvılar, ipte asılı kağıtlar. Defne bir kağıdı leğene daldırıyor.
Beyaz kağıtta yavaş yavaş, sanki uzaktan geliyormuş gibi, bir görüntü beliriyor.
Arsa. Dut ağacı. Sen, Mert, Hasan Abi, Karabaş. İlk akşam.
Defne: Bütün yaz bunları çektim. Otuz altı poz, sekiz film. Hepsi burada.
@eger defne>=5 -> b4_z_defne_evet
Defne: Kermeste asarız belki. Ama kim bakar ki?
@ani karanlik_oda
-> b4_hub

=== b4_z_defne_evet
Erol Amca ışık kutusunun önünde, negatiflere bakıyor.
Erol Amca: Bunlar iyi. Çok iyi. Ben Köln'de bir gazetede baskıcıydım biliyor musun? Bunları büyütebilirim. Afiş gibi. Bir sergi.
Defne: Bir sergi! "Akasya Sokağı, 1996." Herkes kendini görür. Rıza bile görür.
Erol Amca: Bir de gazeteden tanıdığım biri var. Muhabir. Belki gelir.
Defne seni kırmızı ışıkta, ıslak kağıtların arasında kucaklıyor. Kimyasallar kokuyor. Ama güzel bir koku.
@etki destek+1
@bayrak sergi
@ani karanlik_oda
-> b4_hub

=== b4_z_muhtar
@yer sokak aksam
Hasan Abi'nin babası Ali Amca kahvede, okey masasında. Seni görünce kalkıyor.
Ali Amca: Hasan'ın emaneti. Gel otur. Hasan mektup yazdı, sizi sordu.
Kermesi anlatıyorsun. İmzaları.
Ali Amca: Muhtar Hayri benim çocukluk arkadaşım. Ona söylerim, kermesin iznini o çıkarır. İmzaların üstüne mühür de basar. Muhtarlık mühürü. Belediyede ağırlığı olur.
@etki destek+1
@bayrak muhtar_destek
-> b4_hub

=== b4_rıza
@yer bakkal aksam
Hafta biterken, bir akşam bakkala gittiğinde içeride biri var.
Takım elbiseli, göbekli, saçları jöleli bir adam. Altın bir saat. Parfüm kokusu sabun kokusunu bastırmış.
Rıza Bey.
Cemil Amca tezgahın arkasında, kollarını kavuşturmuş.
Rıza Bey: Cemil Ağabey, sana iyilik yapıyorum. Bu fiyatı kimse vermez.
Cemil Amca: Ben sana fiyat sordum mu Rıza?
Rıza Bey seni görüyor. Gülümsüyor. Altın dişi parlıyor.
Rıza Bey: Ooo, kermesçilerden biri. Duydum, duydum. İmza topluyormuşsunuz.
Sana eğiliyor.
Rıza Bey: Ben de bu mahallede büyüdüm biliyor musun? Şu karşıdaki apartman yokken orada bir gecekondu vardı, bizim ev. O arsada ben de top oynadım. O dutu ben de yedim.
Rıza Bey: Ama büyüdüm. Büyüyünce anlarsın. Arsalar top oynamak için değil, ev yapmak için.
* O zaman neden yıkmak istiyorsun? Sen de orada oynadın. {cesaret+2} #riza_soru -> b4_riza_soru
* Hiçbir şey deme. Gözlerinin içine bak. {cesaret+1} -> b4_riza_bak
* Cemil Amca'nın arkasına geç. {cemil+1} -> b4_riza_geri

=== b4_riza_soru
Rıza Bey'in gülümsemesi bir an donuyor. Sadece bir an.
Rıza Bey: Neden mi? Çünkü...
Cümleyi bitirmiyor. Saatine bakıyor.
Rıza Bey: Çünkü iş bu. Hadi, iyi akşamlar.
Çıkıyor. Kapının zili arkasından uzun uzun çınlıyor.
Cemil Amca sana bakıyor. Gözlerinde bir şey var. Gurur mu, korku mu, ayırt edemiyorsun.
Cemil Amca: Rıza'nın susup gittiğini ilk defa görüyorum. Elli yıldır.
@bayrak riza_dusundu
-> b4_bitis

=== b4_riza_bak
Rıza Bey'in gözlerinin içine bakıyorsun. Kahverengi gözler, yorgun gözler. Altında torbalar.
Bir süre bakışıyorsunuz. Rıza Bey önce gözünü kaçırıyor.
Rıza Bey: Neyse. Cemil Ağabey, düşün taşın. Teklifim duruyor.
Gidiyor.
-> b4_bitis

=== b4_riza_geri
Cemil Amca'nın arkasına geçiyorsun. Cemil Amca elini omzuna koyuyor.
Cemil Amca: Bu çocuklar benim misafirim Rıza. Sen değilsin. Kapı orada.
Rıza Bey gülüyor ama gülüşü ağzında kalıyor. Gidiyor.
-> b4_bitis

=== b4_bitis
@yer oda gece
O gece masanda oturup bir şey yapıyorsun.
@eger #hasan_mektup -> b4_mektup_hasan
@eger #mektup -> b4_mektup_defne
Kermes için bir afiş çiziyorsun. Renkli kalemlerle. Dut ağacı, bir top, bir sürü insan.
Altına büyük harflerle yazıyorsun: AKASYA KERMESİ. HERKES DAVETLİ.
Annem kapıdan bakıyor. Bir şey demiyor. Sadece ışığı kapatmadan gidiyor.
-> b5_basla

=== b4_mektup_hasan
Hasan Abi'ye mektup yazıyorsun. Kareli defterden kopardığın bir sayfaya.
"Sevgili Hasan Abi, Sivas soğuk mu? Burada her şey yolunda. Bir de kötü haber var: arsayı Rıza Bey alıyor ama biz kermes yapacağız..."
Bir sayfa doluyor. İki sayfa. Kasetçalarda onun kaseti, sessizce dönüyor.
Zarfın arkasına yazıyorsun: Postacı amca acele et.
@ani mektup
-> b5_basla

=== b4_mektup_defne
Defne'nin söylediğini düşünüyorsun. Mektup. Pullu.
Henüz gitmedi ama bir gün gidebilir. Ona şimdiden bir mektup yazıyorsun, göndermeyeceğin bir mektup.
"Sevgili Defne, eğer bunu Köln'de okuyorsan..."
Yazıyorsun, buruşturuyorsun. Yeniden yazıyorsun. Sonunda bir cümlede karar kılıyorsun:
"Sen gitsen bile Akasya Sokağı'nda bir yerin var."
Mektubu katlayıp çekmeceye koyuyorsun.
@ani mektup
-> b5_basla
`);
