HIKAYE.push(String.raw`
=== b3_basla
@bolum 3
@yer sokak ogle
Ağustos. Sıcak artık bir hava değil, bir ağırlık. Sokağa çöken, perdeleri kıpırdatmayan, köpekleri bile susturan bir ağırlık.
Tabela hâlâ orada. Birisi geceleyin üstüne tebeşirle bir şey yazmış: "BURASI BİZİM". Kim yazdı, kimse bilmiyor. Herkes biliyor.
-> b3_deniz

=== b3_deniz
@yer sokak sabah
Bir pazar sabahı, Kadir Amca'nın dolmuşu sizin kapının önünde korna çalıyor.
Kadir Amca: Florya! Florya'ya gidenler! Çocuklar bedava, nineler yarı fiyat!
Mert dolmuşun ön koltuğunda, kafası camdan dışarıda. Yazın başında söylediği deniz gerçek oluyor.
Nine bir sepet hazırlamış: dolma, haşlanmış yumurta, domates, bir şişe ayran, bir de karpuz. Karpuzu Mert'le birlikte dolmuşa taşıyorsunuz, iki kişi zor kaldırıyorsunuz.
@eger #defne_tanisti -> b3_deniz_defne
Selim, ikizler, Selim'in annesi. Dolmuş doluyor, Kadir Amca kasetçalara bir kaset sokuyor, herkes şarkıya katılıyor.
-> b3_deniz_yol

=== b3_deniz_defne
Defne en arkaya, cam kenarına oturuyor. Fotoğraf makinesini kucağına almış.
Defne: Türkiye'de deniz nasıl? Kuzey Denizi gibi mi? Gri ve soğuk mu?
Mert arkasına dönüyor, gözleri büyümüş.
Mert: Gri mi? Deniz gri olur mu?
Defne: Bizimki öyleydi.
Mert: Bekle de gör.
-> b3_deniz_yol

=== b3_deniz_yol
@yer sokak ogle
Yol uzun. Sıcak. Camlar açık, rüzgar saçlarınızı karıştırıyor. Bir simitçi dolmuşa yanaşıyor, Kadir Amca hepsini alıyor.
Sonra bir virajdan dönünce birden, ağaçların arasından, mavi.
Kimse bir şey söylemiyor. Sadece Mert:
Mert: İşte!
@eger #defne_tanisti -> b3_deniz_defne_gor
-> b3_kumsal

=== b3_deniz_defne_gor
Defne camdan sarkıyor. Ağzı açık.
Defne: Bu... bu mavi. Gerçekten mavi.
Fotoğraf makinesini kaldırıyor ama sonra indiriyor.
Defne: Bunu fotoğraflasam kimse inanmaz.
-> b3_kumsal

=== b3_kumsal
@yer deniz ogleden_sonra
Florya'nın kumu sıcak, ayaklarını yakıyor. Hasır şemsiyelerin altında aileler, radyolar, tavla şakırtıları. Mısırcı bağırıyor, dondurmacı bağırıyor, cankurtaran düdük çalıyor.
Nine şemsiyenin gölgesine kuruluyor, sepeti açıyor, kimseye sormadan herkese dolma dağıtmaya başlıyor. Yan şemsiyedeki yabancılara bile.
Herkes denize koşuyor. Mert hariç.
Mert kumda oturuyor, bir çubukla kuma çizgiler çiziyor.
Mert: Sen git. Ben sonra gelirim. Şey, karnım tok. Yemekten sonra yarım saat girilmezmiş.
Daha hiçbir şey yemedi.
Yanına oturuyorsun. Mert kulağına eğiliyor, sesini alçaltıyor.
Mert: Yüzme bilmiyorum. Kimseye söyleme. Ölürüm söylersen.
* Gel, ben öğreteyim. Sığ yerde, kimse görmez. {mert+2} #mert_yuzme -> b3_yuzme
* Söylemem. Kumdan kale yapalım o zaman. {mert+1} -> b3_kumdan_kale
* Gül: Deniz kenarında doğmuş adam yüzme bilmiyor! {mert-2} -> b3_gul

=== b3_yuzme
Sığ yere gidiyorsunuz, suyun dizinize geldiği yere. Sonra beline.
Mert'in ellerini tutuyorsun. Mert sırtüstü yatıyor, gözleri kocaman, nefesini tutuyor.
Ellerini bırak, diyorsun. Su seni taşır.
Mert: Taşımaz! Taşımaz!
Taşıyor.
Mert bir saniye, iki saniye, üç saniye su üstünde kalıyor. Sonra gözleri parlıyor.
Mert: Taşıyor! Su beni taşıyor!
Akşama kadar köpek yüzmesiyle on metre gidiyor. On metre ama dünyanın en uzun on metresi.
@ani deniz
-> b3_deniz_aksam

=== b3_kumdan_kale
Islak kumdan bir kale yapıyorsunuz. Sonra bir sur. Sonra bir hendek, hendeğe su taşıyorsunuz.
Mert ellerini kuma gömüp bir şey yapıyor. Bir ağaç. Kumdan bir dut ağacı. Altına iki taş: kale.
Mert: Bu bizim arsa. Rıza buna dokunamaz. Denizin içinde.
Sonra bir dalga geliyor, hepsini alıp götürüyor.
Bir süre ikiniz de bakıyorsunuz. Sonra Mert yeniden yapmaya başlıyor. Daha yukarıya, dalgaların gelemeyeceği yere.
@ani deniz
-> b3_deniz_aksam

=== b3_gul
Gülüyorsun. Mert'in yüzü kızarıyor, sonra beyazlıyor.
Mert kalkıp gidiyor. Akşama kadar nine'nin şemsiyesinin altında oturuyor, kimseyle konuşmuyor.
Dönüş yolunda dolmuşta yanına oturmuyor.
@not Mert bunu unutmayacak.
-> b3_deniz_aksam

=== b3_deniz_aksam
@yer sokak aksam
Güneş denize inerken dolmuşa doluşuyorsunuz. Herkes kumlu, tuzlu, yanık.
Karpuz bitti, dolmalar bitti, ayran bitti. Nine'nin sepetinde sadece boş kaplar ve bir avuç deniz kabuğu. Kabukları Defne toplamış, nineye vermiş, saklasın diye.
Kadir Amca kaseti yeniden başa sarıyor. Dolmuş şarkı söyleyerek İstanbul'a dönüyor.
Sen cam kenarında, başını cama yaslamış, ışıkların akışını izliyorsun. Uyuyakalıyorsun.
Uyandığında Akasya Sokağı'ndasınız ve tabela, sokak lambasının altında, hâlâ orada.
-> b3_mahalle

=== b3_mahalle
@yer sokak ogle
@eger #cam_odedik -> b3_nermin_cay
@eger #sepet -> b3_nermin_sepet
-> b3_nermin_yol

=== b3_nermin_cay
@yer balkon ogleden_sonra
Pazar. Söz verildiği gibi Nermin Teyze'nin balkonundasınız. Sen, Mert, Selim, ikizler. Defne de geliyor, elinde annesinin yaptığı bir kek: Apfelkuchen, diyor, elmalı kek.
Nermin Teyze ince belli bardaklarda çay koyuyor. Balkon küçük, siz kalabalıksınız, sardunyalar eziliyor ama kimse şikayet etmiyor.
Nermin Teyze: Benim oğlan da bu balkonda büyüdü. Kemal. Şimdi Avustralya'da. Sidney'de. On iki yıldır gelmedi.
Bardağını çeviriyor.
Nermin Teyze: Bir mektup yazar yılbaşında. Bir de telefon eder bayramlarda. Orada saat başka, gece yarısı arar. Ben hep uyanık beklerim.
-> b3_nermin_ortak

=== b3_nermin_sepet
@yer balkon ogleden_sonra
Nermin Teyze'nin sepeti her sabah aşağı iniyor, her sabah sen dolduruyorsun. Ekmek, peynir, gazete. Bazen bir paket sigara, ama o sigara için değil, diyor, kocasının markası, ara sıra açıp kokluyor.
Bugün sepetin içinde bir not var: "ÇIK YUKARI, ÇAY VAR."
Çıkıyorsun. Balkon küçük, sardunyalar kırmızı, çaylar ince belli bardaklarda.
Nermin Teyze: Benim oğlan da senin gibiydi. Kemal. Şimdi Avustralya'da. On iki yıldır gelmedi.
-> b3_nermin_ortak

=== b3_nermin_ortak
Nermin Teyze aşağıya, tabelaya bakıyor.
Nermin Teyze: Rahmetli Necati belediyede çalışırdı. Otuz yıl. İmar müdürlüğünde. Haritaları eve getirirdi, şu masaya yayardı, ben de çay koyardım.
Nermin Teyze: O arsa, yetmiş dokuzdaki planda yeşil alan olarak geçerdi. Park olacaktı. Çocuk parkı. Necati kendi çizmişti o yeşili, kalemle. Hatırlıyorum.
Sesi titriyor.
Nermin Teyze: Sonra bir gün haritalar değişti. Yeşil gitti. Kimse sormadı nasıl gitti.
* Bu çok önemli, Nermin Teyze. O harita hâlâ var mı? {nermin+1 cesaret+1} #imar -> b3_nermin_harita
* Necati Amca'yı anlatır mısın? {nermin+2} -> b3_nermin_necati

=== b3_nermin_harita
Nermin Teyze kalkıyor, içeri giriyor. Bir süre dolapların, çekmecelerin sesi geliyor.
Geri geldiğinde elinde rulo yapılmış, sararmış bir kağıt var.
Masaya seriyorsunuz. Çay bardaklarını köşelerine koyuyorsunuz ki kapanmasın.
Bir harita. Sokaklar, ince çizgiler, numaralar. Ve Akasya Sokağı'nın sonunda, küçük, kalemle boyanmış yeşil bir kare.
Altında, el yazısıyla: "Çocuk parkı. N.Y. 1979."
Nermin Teyze: Bu kopyası. Aslı belediyede olmalı. Olmalı ama... kim bilir.
Kağıtla gelen kağıtla gider. Bu cümle aklında çınlıyor.
@ani harita
@not Bu harita bir şeyleri değiştirebilir.
-> b3_karanlik

=== b3_nermin_necati
Nermin Teyze'nin yüzü değişiyor. Sanki yıllardır biri bunu sormasını bekliyormuş.
Nermin Teyze: Necati bıyıklıydı. Sigarayı bırakamadı, öyle gitti. Her akşam bakkala inerdi, Cemil'le tavla oynardı. Hep yenilirdi ama hep giderdi.
Nermin Teyze: Bir de haritaları çok severdi. Şu arsanın haritasını kendi çizmişti. Park olacaktı orası. Yeşil alan.
Aklına bir şey takılıyor.
* O harita hâlâ duruyor mu? {cesaret+1} #imar -> b3_nermin_harita
* Necati Amca'yı tanımak isterdim. {nermin+1} -> b3_nermin_veda

=== b3_nermin_veda
Nermin Teyze elini elinin üstüne koyuyor. Eli küçük ve kuru, ama sıcak.
Nermin Teyze: O da seni severdi. Herkesi severdi o.
Gözleri ıslanıyor. Bir şey diyemiyorsun. Çayını içiyorsun. O da çayını içiyor. Bazen bu yeterli.
-> b3_karanlik

=== b3_nermin_yol
Nermin Teyze'nin balkonunda kimse yok. Sadece sardunyalar ve boş bir sandalye.
Son zamanlarda balkona eskisi kadar çıkmıyor. Belki sıcaktan. Belki yalnızlıktan.
* Kapısını çal. Bir bardak su iste, sohbet aç. {nermin+1} -> b3_nermin_kapi
* Geç git. -> b3_karanlik

=== b3_nermin_kapi
@yer balkon ogleden_sonra
Kapı uzun süre açılmıyor. Sonra zincir sesi, anahtar sesi.
Nermin Teyze: Sen misin? Gel, gel. Su değil çay içeriz.
Balkona çıkıyorsunuz. Nermin Teyze konuştukça konuşuyor: oğlu Kemal, Avustralya, kocası Necati, belediye, eski haritalar.
-> b3_nermin_ortak

=== b3_karanlik
@yer sokak aksam
O akşam elektrikler kesiliyor.
@bayrak elektrik_yok
Televizyonların sesi aynı anda susuyor. Bir saniye, iki saniye. Sonra bütün sokaktan aynı ses: "Off!"
Sonra kapılar açılıyor. İnsanlar kendiliğinden aşağı iniyor. Taburelerle, minderlerle, gaz lambalarıyla, mumlarla.
Akasya Sokağı yıllardır olmadığı kadar kalabalık.
@yer sokak gece
Hasan Abi motorunun yanında, kasetçaları pilleriyle çalıştırıyor. Eski bir türkü. Annelerden biri eşlik ediyor, sonra bir başkası.
Cemil Amca bakkalın önüne bir masa çıkarmış, mum yakmış, tavlayı açmış. Rakibi yok.
Defne'nin babası, Almanya'dan getirdikleri bir el feneriyle çocuklara ışıktan tavşanlar, kuşlar yapıyor.
Nine merdivenin basamağına oturmuş, çocuklar etrafını sarmış. Masal istiyorlar.
Herkes bir yerde. Sen nereye gidiyorsun?
* Cemil Amca'nın tavlasına otur. {cemil+2} -> b3_tavla
* Ninenin masalını dinle. {nine+1} -> b3_masal
* Mert ve Defne çatıya çıkıyor. Peşlerinden git. {mert+1 defne+1} -> b3_cati

=== b3_tavla
@yer bakkal gece
Cemil Amca zarları avucunda çalkalıyor.
Cemil Amca: Necati'den sonra karşıma kimse oturmadı. Bilir misin oynamayı?
Biraz biliyorsun. Babam öğretmişti, bir bayram. Pullar beyaz ve kahverengi, mum ışığında titriyor.
Oynuyorsunuz. Cemil Amca hile yapmıyor ama acıma da yapmıyor. Kaybediyorsun. Bir el daha. Yine kaybediyorsun.
Üçüncü elde Cemil Amca bir şey söylüyor, pullara bakarak, sana değil.
Cemil Amca: Rıza dün geldi. Bakkalı da almak istiyor. Apartmanın altına market yapacakmış. Büyük, ışıklı, otomatik kapılı.
Cemil Amca: Satmazsam bakkalın önünü inşaatla kapatacakmış. Müşteri gelemezmiş. Ben kendiliğinden çekilirmişim.
Zarlar. Bir altı, bir altı. Düşeş.
Cemil Amca: Ne dersin? Satayım mı?
* Satma Cemil Amca. Bu sokak sensiz olmaz. {cemil+2} #cemil_kalir -> b3_tavla_satma
* Bilmiyorum. Sen ne istiyorsun? {cemil+1} -> b3_tavla_soru

=== b3_tavla_satma
Cemil Amca bir an sana bakıyor. Mum alevi gözlüklerinde iki küçük nokta.
Cemil Amca: Bu sokak bensiz olmaz demek. Yetmiş yaşında adamım. Sen bilmezsin ama sokaklar herkessiz olur.
Ama zarları bir daha atarken gülümsüyor.
Cemil Amca: Satmam. Rıza beni mezara götürsün önce. Hadi at zarları.
Bu sefer sen kazanıyorsun. Sanırım bırakıyor. Sanırım bırakmıyor. Hiç bilemeyeceksin.
@ani tavla
-> b3_hasan

=== b3_tavla_soru
Cemil Amca uzun süre düşünüyor.
Cemil Amca: Ben mi? Ben Nuri'yle oturup çay içmek isterdim. Bir de Necati'yle tavla oynamak. Bunlar olmuyor artık.
Cemil Amca: Bakkal kalsa ne olur, gitse ne olur. Ama içimde bir şey satma diyor. O şey sen misin bilmiyorum.
@ani tavla
-> b3_hasan

=== b3_masal
@yer sokak gece
Nine gaz lambasını dizine yaklaştırıyor. Yüzü aşağıdan aydınlanıyor, bütün kırışıkları gölgeli birer yol gibi.
Nine: Evvel zaman içinde, kalbur saman içinde, bir dut ağacı varmış.
Çocuklar susuyor. Sen de susuyorsun.
Nine: Bu ağaç bir köyün tam ortasındaymış. Herkes gölgesinde dinlenirmiş, herkes dutunu yermiş. Bir gün bir zengin gelmiş, demiş ki bu ağaç benim. Köylüler demiş ki, bu ağacı kimse dikmedi, hepimiz büyüttük.
Nine: Zengin bir balta getirmiş. Kesmeye kalkmış. Ama ağacın gölgesinde o kadar çok çocuk oynuyormuş ki baltayı nereye vursa bir çocuk varmış.
Nine: Zengin beklemiş. Çocuklar büyür, gider, demiş. Ama çocuklar büyüdükçe kendi çocuklarını getirmişler. Zengin yaşlanmış, beklemiş, beklemiş... Sonunda o da ağacın gölgesine oturup dut yemiş.
Nine susuyor.
Selim: Sonra ne olmuş?
Nine: Sonrası yok. Ağaç hâlâ orada.
Bütün çocuklar arsanın köşesindeki dut ağacına bakıyor. Karanlıkta, sadece siluet.
@ani masal
@bayrak masal
-> b3_hasan

=== b3_cati
@yer cati gece
Çatıya çıkan merdiven pas kokuyor. Kapıyı itiyorsun ve gökyüzü birden üstüne düşüyor.
Yıldızlar. Elektrik yokken İstanbul'da bu kadar yıldız olduğunu bilmiyordun.
Mert ve Defne çatının kenarında, eski bir kilimin üstünde uzanmışlar. Yanlarına uzanıyorsun.
Defne: Köln'de de yıldızlar görünmez. Hep bulut.
Mert: Şu Samanyolu mu?
Defne: Hayır o bir uçak. Yanıp sönüyor bak.
Gülüyorsunuz. Sonra bir süre kimse konuşmuyor.
Defne: Babamın işi iyi gitmiyor. Fabrika maaşları ödemedi iki aydır. Annem dün gece ağladı. Babam diyor ki eğer kışa kadar düzelmezse Köln'e döneriz.
Mert doğruluyor.
Mert: Dönemezsin. Daha yeni geldin.
Defne: Ben de gitmek istemiyorum. İlk defa... İlk defa bir yer benim yerim gibi.
@bayrak almanya
* Gitmeyeceksin. Bir yolunu bulacağız. {defne+2} -> b3_cati_soz
* Köln'e gitsen bile yazarız birbirimize. {defne+1} #mektup -> b3_cati_mektup
* Mert'e bak: Sen bir şey söyle. {mert+1} -> b3_cati_mert

=== b3_cati_soz
Defne sana dönüyor. Yıldızların altında gözleri parlıyor.
Defne: Herkes bir yolunu bulacağız diyor. Arsa için de, benim için de. Siz Türkler hep böyle mi?
Mert: Biz Akasya Sokağı'yız. Biz hep böyleyiz.
Defne gülüyor, fotoğraf makinesini kaldırıyor. Flaş. Gökyüzü bir anlığına beyaz.
Defne: Bu fotoğraf çıkmayacak. Çok karanlık. Ama ben yine de bileceğim.
@ani yildizlar
-> b3_hasan

=== b3_cati_mektup
Defne bir süre düşünüyor.
Defne: Mektup. Gerçek mektup mu? Pullu?
Pullu. Kuşlu pullar, Atatürk'lü pullar. Zarfın arkasına adresi yazarsın, bir de "Postacı amca acele et" yazarsın.
Defne: Postacı amca acele et.
Kelimeleri ağzında deniyor, gülüyor.
Defne: Tamam. Ama sen de yazacaksın. Söz.
@ani yildizlar
-> b3_hasan

=== b3_cati_mert
Mert yıldızlara bakıyor. Boğazını temizliyor.
Mert: Ben... Şey. Sen gidersen sol bek kim olacak?
Defne dirseğiyle Mert'i dürtüyor.
Defne: Sadece bu mu?
Mert: Bir de... penaltıyı kim atacak.
Mert'in kulakları karanlıkta bile kızarıyor. Bunu görebiliyorsun, yemin edersin.
@ani yildizlar
-> b3_hasan

=== b3_hasan
@yer sokak gece
@etki !#elektrik_yok
Elektrikler geri geliyor. Sokak lambaları bir bir yanıyor, televizyonlar yeniden konuşuyor.
Kimse hemen içeri girmiyor ama. Bir süre daha oturuyorlar. Sanki bir şeyin bittiğini fark etmişler gibi.
Hasan Abi motorunun yanında duruyor. Seni çağırıyor.
Hasan Abi: Gel bakayım ufaklık.
Kasetçaları motordan çözüyor. Kırmızı, eski, bir kenarı bantlı.
Hasan Abi: Yarın gidiyorum. Bunu askere götüremem, alırlar. Sende kalsın.
-> b3_asker

=== b3_asker
@yer sokak sabah
Asker uğurlaması sabah erkenden başlıyor.
Davul, zurna. Hasan Abi'nin annesi ağlıyor, babası ağlamamaya çalışıyor. Bütün sokak aşağıda.
Hasan Abi'yi omuzlara alıyorlar. Elinde bayrak, başında kırmızı bir yazma, boynunda annesinin taktığı bir nazarlık.
"Asker yolu bekliyor" diye bağırıyorlar. Davulcu ritmi hızlandırıyor. Mert de bağırıyor, sen de.
Bir dolmuş geliyor. Kadir Amca'nın dolmuşu. Süslenmiş, kurdeleler.
Hasan Abi inmeden önce sana eğiliyor.
Hasan Abi: Ben gelene kadar arsaya göz kulak ol. Söz mü?
* Söz Hasan Abi. Döndüğünde arsa burada olacak. {hasan+2 cesaret+1} #hasan_soz -> b3_asker_soz
* Sana mektup yazarım. Her ay. {hasan+2} #hasan_mektup -> b3_asker_mektup
* Ağlamamaya çalış. Başını salla. {hasan+1} -> b3_asker_sessiz

=== b3_asker_soz
Hasan Abi seni saçlarından karıştırıyor.
Hasan Abi: Aferin sana. Bak, babam muhtarla askerlik arkadaşı. Ona söyledim, sizin işinizle ilgilenecek. Bir şey lazım olursa babama gidin.
@bayrak muhtar
-> b3_asker_son

=== b3_asker_mektup
Hasan Abi gülüyor.
Hasan Abi: Her ay mı? Sen yazarsın da ben okur muyum bilmem. Neyse, yaz. Mahalleden haber yaz. Arsadan, maçtan. Tolga'yı yenerseniz önce bana yazın.
Bir kağıda adres yazıp veriyor. Bir birlik adı, bir şehir. Sivas.
@ani asker
-> b3_asker_son

=== b3_asker_sessiz
Başını sallıyorsun. Boğazında bir yumru.
Hasan Abi anlıyor. Bir şey demeden yumruğunu omzuna hafifçe vuruyor.
-> b3_asker_son

=== b3_asker_son
Dolmuş hareket ediyor. Sokağın sonunda kornaya basıyor. Bir, iki, üç.
Sonra gidiyor.
Davul susuyor. Zurnacı enstrümanını kılıfına koyuyor. Kalabalık dağılıyor.
Kırmızı kasetçalar elinde. İçinde bir kaset var. Üstüne tükenmezle yazılmış: "AKASYA 96 — HASAN".
@ani asker
@eger #defne_tanisti -> b3_defne_foto
-> b4_basla

=== b3_defne_foto
Defne yanına geliyor, fotoğraf makinesini indiriyor.
Defne: Hepsini çektim. Dolmuşu, davulu, Hasan Abi'yi. Ama biliyor musun en güzeli hangisi olacak?
Defne: Senin yüzün. Dolmuş giderken. Onu çektim.
Ne diyeceğini bilemiyorsun.
Defne: Merak etme. Kimseye göstermem.
-> b4_basla
`);
