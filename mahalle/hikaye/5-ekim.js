HIKAYE.push(String.raw`
=== b5_basla
@bolum 5
@yer arsa sabah
Ekim'in son cumartesi. Gökyüzü yıkanmış gibi mavi. Rüzgar dut ağacının sararmış yapraklarını teker teker koparıp arsaya serpiyor.
Sabahın sekizinde arsadasınız. Kimse sizi uyandırmadı. Kimse uyumadı.
Mert ipleri balkondan balkona geriyor. İplere renkli kağıt bayraklar, kağıtlara el yazısıyla harfler: A-K-A-S-Y-A K-E-R-M-E-S-İ.
Selim imza masasını kuruyor. Üç tükenmez kalem, bir kalın defter, kenarına bir de cetvel koyuyor, satırlar düzgün olsun diye.
Karabaş'ın boynunda kırmızı bir kurdele. Defne bağlamış. Karabaş bundan hiç memnun değil.
@eger #cemil_destek -> b5_cemil_masa
-> b5_masalar

=== b5_cemil_masa
Cemil Amca, bakkaldan dört masa çıkarmış. Üstlerine örtüler, örtülerin üstünde kasalar dolusu gazoz. Bir de kocaman bir tabela, el yazısıyla: "BUGÜN HER ŞEY YARI FİYAT. HESAP SONRA."
Veresiye defteri imza masasında, Selim'in defterinin yanında. Yüz kırk iki imza, bir yazdan.
-> b5_masalar

=== b5_masalar
@yer arsa ogle
Öğleye doğru arsa doluyor.
@eger #nermin_destek -> b5_nermin
@eger nermin>=3 -> b5_nermin_az
-> b5_sergi_kontrol

=== b5_nermin
Nermin Teyze bütün apartmanı seferber etmiş. Tepsi tepsi börek, tencere tencere sarma, revani, irmik helvası, bir de nereden bulunduğu bilinmeyen bir pasta.
Nermin Teyze masanın başında, önünde bir kutu, kutunun üstünde: "BAĞIŞ — ARSA İÇİN".
Nermin Teyze: Börek isteyen önce imza atar! Kural bu!
Sırada imza atmayan kalmıyor.
@etki imza+1
-> b5_sergi_kontrol

=== b5_nermin_az
Nermin Teyze bir tepsi börek getirmiş. Masaya bırakıyor, sonra kendi balkonuna çıkıp oradan izliyor. Yukarıdan ara sıra bağırıyor: "Börek bitti mi? Bir tepsi daha var!"
-> b5_sergi_kontrol

=== b5_sergi_kontrol
@eger #sergi -> b5_sergi
-> b5_oyunlar

=== b5_sergi
@yer arsa ogleden_sonra
Dut ağacının dallarından apartmanın duvarına kadar ipler gerilmiş. İplere mandallarla büyük fotoğraflar asılmış. Erol Amca bütün gece basmış.
"AKASYA SOKAĞI, 1996. Fotoğraflar: Defne Şahin."
İnsanlar duruyor. Bakıyor. Gülüyor, parmakla gösteriyor.
Nermin Teyze balkonda, sepetini indirirken. Cemil Amca tavla oynarken, mum ışığında. Hasan Abi omuzlarda, kırmızı yazmalı. Mert penaltıdan sonra dizlerinin üstünde. Nine merdivende, çocuklar etrafında.
Ve sen. Dolmuş giderken. Yüzün.
Hasan Abi'nin annesi fotoğrafın önünde duruyor, elini fotoğrafa değdiriyor, ağlıyor.
Bir adam fotoğraf makinesiyle dolaşıyor. Gerçek bir muhabir, kimliği boynunda asılı. Defne'nin fotoğraflarının fotoğrafını çekiyor.
Muhabir: Bunları kim çekti?
Defne öne çıkıyor. Sesi titrek.
Defne: Ben.
@ani sergi
@bayrak gazete
-> b5_oyunlar

=== b5_oyunlar
@yer arsa ogleden_sonra
Öğleden sonra arsa bir lunapark gibi. Çocuklar her yerde. Kadir Amca dolmuşla Üst Sokak'tan, çarşıdan, durağın orada bekleyenlerden kim varsa getiriyor.
Selim'in imza defterinin sayfaları doluyor. Bir sayfa, iki sayfa, beş sayfa.
Burak'la Barış çuval yarışı düzenlemiş, patates çuvallarıyla. Nermin Teyze kahve pişirip fal bakıyor, fal başına bir imza. Defne dut ağacının altına bir sandalye koymuş, "FOTOĞRAF: 1 İMZA" yazmış.
Nereye gidiyorsun?
* Çuval yarışı. Mert seni bekliyor. {mert+1} -> b5_cuval
* Nermin Teyze'nin kahve falı. {nermin+1} -> b5_fal
* [#defne_tanisti] Defne'nin fotoğraf köşesi. {defne+1} -> b5_foto_kose

=== b5_cuval
Çuvala giriyorsun, beline kadar çekiyorsun. Yanında Mert, öbür yanında Tolga'nın küçük kardeşi, bir de Selim.
Burak düdük çalıyor. Zıplıyorsunuz.
Selim ilk zıplayışta düşüyor. Tolga'nın kardeşi ikincide. Sen ve Mert baş başa, zıplıyorsunuz, zıplıyorsunuz, çizgiye yaklaşıyorsunuz.
Son zıplayışta ikiniz birden düşüyorsunuz, çizginin tam üstüne. Toz bulutu.
Burak: Berabere!
Mert tozun içinden gülerek doğruluyor.
Mert: Biz hep berabereyiz zaten.
-> b5_tolga

=== b5_fal
Nermin Teyze fincanı ters çeviriyor, tabağın üstünde soğumasını bekliyor. Sonra açıyor, gözlüklerini takıp içine bakıyor.
Nermin Teyze: Hımm. Bir yol görüyorum. Uzun bir yol değil, kısa. Bir sokak kadar.
Nermin Teyze: Bir ağaç var burada. Bak, şu telveyi görüyor musun? Dalları var. Ağacın altında bir kalabalık.
Nermin Teyze: Bir de kağıt. Bir kağıt sana bir haber getirecek. Islak bir kağıt.
Fincanı çeviriyor, dibine bakıyor.
Nermin Teyze: Dilek tut.
Dilek tutuyorsun. Söylemiyorsun, söylenmez.
Nermin Teyze başparmağını fincanın dibine bastırıyor, sonra kaldırıp bakıyor.
Nermin Teyze: Kabul olmuş. Ama tek başına değil. Herkesle beraber.
Fal mı, yoksa Nermin Teyze'nin bildiği bir şey mi, bilmiyorsun.
-> b5_tolga

=== b5_foto_kose
Defne'nin sandalyesine oturuyorsun. Arkada dut ağacı, sararmış yapraklar, renkli bayraklar.
Defne: Gülümse. Hayır, öyle değil. Gerçekten gülümse.
Gerçekten gülümsemek zor, kameraya bakarken. Sonra Defne objektifin arkasından dilini çıkarıyor ve gülüyorsun.
Flaş.
Defne: İşte bu. Bu gerçek.
Sonra sandalyeye Nine oturuyor. Sonra Cemil Amca, kravat takmış, gelmiş. Sonra Kadir Amca, dolmuş anahtarını göstererek. Akşama kadar Defne sokağın bütün yüzlerini çekiyor.
-> b5_tolga

=== b5_tolga
@yer arsa ogleden_sonra
Sonra Tolga geliyor. Arkasında üç arkadaşı.
Ellerini cebine sokmuş, masaların arasında dolaşıyor. Börekleri inceliyor, imza defterini parmağıyla itiyor.
Tolga: Ne kadar imza topladınız? Elli? Yüz? Amcamın bir telefonu hepsini siler.
Gazoz kasalarından birine tekme atıyor. Şişeler devriliyor, biri kırılıyor. Gazoz toprağa akıyor.
Mert öne atılıyor, yumrukları sıkılı.
@eger #tolga_karsi -> b5_tolga_karsi
* Mert'i tut. Kavga etmeyin, bugün olmaz. {mert-1} -> b5_tolga_dur
* Tolga'ya bir tabak börek uzat: Aç mısın? {cesaret+1} -> b5_tolga_borek
* Mert'le birlikte Tolga'nın üstüne yürü. {mert+1} -> b5_tolga_kavga

=== b5_tolga_karsi
Tolga seni görüyor. Okuldaki o gün aklına geliyor, yüzünden okunuyor.
Tolga: Sen yine mi?
* Evet ben. Burası bizim kermes, kural koyuyorum: kırdığını öde. {cesaret+1} -> b5_tolga_ode
* Tolga'ya bir tabak börek uzat: Aç mısın? {cesaret+1} -> b5_tolga_borek

=== b5_tolga_ode
Tolga gülüyor ama arkadaşları gülmüyor. Etrafta yetişkinler var. Herkes bakıyor.
Tolga ceplerini karıştırıyor, bozuk paralar çıkarıyor, Nermin Teyze'nin bağış kutusuna atıyor. Şıngır şıngır.
Tolga: Oldu mu?
Oldu, diyorsun. Tolga gidiyor ama gidişi gelişi gibi değil.
-> b5_orhan

=== b5_tolga_dur
Mert'in kolunu tutuyorsun. Mert sana dönüyor, gözleri yaş dolu, öfkeden.
Mert: Bırak beni!
Bırakmıyorsun. Tolga gülüyor, gidiyor.
Mert kolunu çekip kurtarıyor, kırık şişeyi toplamaya başlıyor. Bir şey söylemiyor ama sana dönüp bakmıyor da.
-> b5_orhan

=== b5_tolga_kavga
Üçünüz toprağa yuvarlanıyorsunuz. Toz, dirsek, bağırış.
Birinin burnu kanıyor. Seninki mi? Tolga'nınki mi?
Cemil Amca ikinizi de yakanızdan tutup ayırıyor. Yetmiş yaşında, ama bileği hâlâ terazi kaldıran bilek.
Cemil Amca: Kermeste kavga olmaz! Rıza'nın istediği bu, bilmiyor musunuz? Kavga çıksın, kermes bozulsun!
Utanıyorsun. Tolga da utanıyor. İkiniz de yere bakıyorsunuz.
-> b5_orhan

=== b5_tolga_borek
Tolga tabağa bakıyor. Sonra sana. Sonra yine tabağa.
Tolga: Ne?
Aç mısın, diyorsun. Nermin Teyze'nin böreği. Sokakta en iyisi.
Tolga bir an bekliyor. Arkadaşları birbirine bakıyor. Sonra Tolga tabağı alıyor. Bir lokma ısırıyor.
Tolga: ...Güzelmiş.
Kenara, dut ağacının köküne oturuyor. Börek yiyor. Sen de yanına oturuyorsun.
Tolga: Amcam beni burada top oynarken görse kızar. Aslında ben bu arsayı seviyorum. Üst Sokak'ta arsa yok. Hepsine apartman yapıldı. Amcam yaptı.
Tolga: Bizim evin yerine de apartman yaptı. Babaannemin evi. Bahçesinde incir vardı.
Böreğin son lokmasını yiyor. Elini pantolonuna siliyor.
Tolga: İmza atayım mı? Ama amcam görmesin.
Selim'in defterine küçük harflerle yazıyor: "T."
@bayrak tolga_dost
@etki imza+1
@ani tolga
-> b5_orhan

=== b5_orhan
@yer arsa aksam
Akşama doğru siyah bir araba arsanın önünde duruyor. İçinden gözlüklü, kır saçlı bir adam iniyor. Elinde bir evrak çantası.
@eger #nermin_destek -> b5_orhan_geldi
-> b5_riza

=== b5_orhan_geldi
Nermin Teyze balkondan bağırıyor.
Nermin Teyze: Orhan Bey! Geldiniz! Necati'nin hatırına!
Orhan Bey, belediye imar müdürü. Kalabalığın arasından geçip imza masasına geliyor.
Orhan Bey: Nermin Hanım çağırdı. Necati benim hocamdı. Ne var ne yok, anlatın bakalım.
@eger #imar -> b5_harita_ver
Defterleri gösteriyorsunuz. İmzaları. Orhan Bey başını sallıyor, ama yüzü ciddi.
Orhan Bey: İmza güzel. Ama imar planı değişmişse, imza tek başına yetmez. Bir belge lazım. Planın eskiden ne olduğunu gösteren bir belge.
Belge. Kağıt. Kağıtla gelen kağıtla gider. Ama elinizde kağıt yok.
-> b5_riza

=== b5_harita_ver
Nermin Teyze aşağı iniyor, elinde o sararmış rulo.
Haritayı imza masasına seriyorsunuz. Börek tepsilerini köşelerine koyuyorsunuz.
Orhan Bey gözlüklerini çıkarıp yakından bakıyor. "N.Y. 1979" imzasına parmağını değdiriyor.
Orhan Bey: Necati Yılmaz. Bu onun el yazısı. Bu planın aslı bizim arşivde olmalı.
Orhan Bey: Eğer bu arsa yeşil alanken usulsüz değiştirildiyse...
Cümlesini bitirmiyor. Bitirmesine gerek yok. Selim yanında, nefesini tutmuş.
Orhan Bey: Bu haritayı bana bırakın. Pazartesi arşive ineceğim. Söz vermiyorum ama bakacağım.
@bayrak orhan
@etki destek+1
@ani orhan
-> b5_riza

=== b5_riza
@yer arsa aksam
Güneş batarken Rıza Bey geliyor. Yürüyerek. Arabasını sokağın başında bırakmış.
Kalabalık bir an susuyor. Sonra fısıltılar.
Rıza Bey kimseye bakmadan arsanın ortasına yürüyor. Dut ağacının altına. Tabelasının dibine.
@eger #sergi -> b5_riza_foto
@eger #masal -> b5_riza_masal
Rıza Bey etrafına bakıyor. Masalara, böreklere, imza defterine.
Rıza Bey: Güzel kermes. Tebrik ederim. Kasım'ın on ikisinde iş makineleri geliyor. Herkes bilsin.
Gidiyor. Arkasında bir sessizlik bırakıyor.
-> b5_defne

=== b5_riza_foto
Fotoğrafların arasında duruyor. Bir tanesine uzun uzun bakıyor.
Defne'nin fotoğrafı değil bu. Daha eski. Siyah beyaz, kenarları tırtıklı. Cemil Amca vermiş Defne'ye, sergiye konsun diye.
Dut ağacının altında, altmışların başında, genç bir adam ve beş çocuk. Adam Cemil'in kardeşi Nuri, top elinde. Omzunda kısa pantolonlu, kafası kazınmış bir çocuk. Gülüyor, ön dişi eksik.
Fotoğrafın altında Cemil Amca'nın el yazısı: "Nuri, Rıza ve ötekiler. 1962."
Rıza Bey bu fotoğrafın önünde çok uzun süre duruyor. Elini cebine sokuyor. Çıkarıyor. Bir şey söylemiyor.
Sonra kimseye bakmadan gidiyor.
Cemil Amca: Gördü. Kendini gördü.
@bayrak riza_gordu
-> b5_defne

=== b5_riza_masal
Nine merdivenden kalkıp Rıza Bey'e doğru yürüyor. Yavaş, bastonuyla.
Nine: Rıza. Sen Hacer'in oğlu değil misin?
Rıza Bey şaşırıyor.
Nine: Annen benimle çamaşıra giderdi. Sen de peşimizden gelirdin, dut yemek için. Ağzın yüzün mor olurdu.
Rıza Bey bir şey diyemiyor.
Nine: Bir masal anlatayım mı sana? Bir zengin varmış, bir de dut ağacı...
Rıza Bey: Biliyorum Gülsüm Teyze. O masalı annem de anlatırdı.
Sesi alçak. Gidiyor. Ama yavaş gidiyor.
@bayrak riza_gordu
-> b5_defne

=== b5_defne
@yer arsa gece
Kermes bitiyor. Masalar toplanıyor, bayraklar sökülüyor. Arsa yine toz ve dut yaprağı.
Defne dut ağacının dibinde oturuyor. Yanına oturuyorsun.
@eger #gazete -> b5_defne_kalir
Defne: Babam bugün söyledi. Fabrika kapanıyor. Aralık'ta Köln'e dönüyoruz.
Bir süre konuşmuyorsun.
Defne: Kermes çok güzeldi. Ama benim için bir şey değiştirmedi.
@bayrak defne_gider
* Sana her hafta yazacağım. Söz. {defne+2} #mektup -> b5_defne_mektup
* Elini tut. Hiçbir şey söyleme. {defne+1} -> b5_defne_sessiz

=== b5_defne_kalir
Defne'nin gözleri parlıyor. Saklayamıyor.
Defne: Biliyor musun ne oldu? Muhabir babama kartını verdi. Gazetenin baskı atölyesi usta arıyormuş. Babam pazartesi gidiyor. Ve eğer olursa...
Defne: Eğer olursa kalıyoruz.
Sonra fotoğraf makinesini sana uzatıyor.
Defne: Bugün bir tane bile kendi fotoğrafım yok. Hep ben çektim. Bir tane çeker misin? Burada. Dutun altında.
Makineyi alıyorsun. Vizörden bakıyorsun. Defne gülüyor, arkasında dut, arkasında sokak lambası.
Flaş.
@bayrak defne_kalir
@etki defne+1
@ani defne_foto
-> b5_bitis

=== b5_defne_mektup
Defne cebinden bir kağıt çıkarıyor. Köln'deki adresi. Önceden yazmış.
Defne: Ben de yazacağım. Postacı amca acele et.
Gülüyorsunuz. Biraz ağlarken, biraz gülerek. Hangisinin hangisi olduğunu kimse bilemez.
@ani defne_foto
-> b5_bitis

=== b5_defne_sessiz
Elini tutuyorsun. Defne'nin eli soğuk.
Uzun süre öyle oturuyorsunuz. Sokak lambası yanıyor. Karabaş gelip ayaklarınızın dibine yatıyor.
Defne: Bunu unutmayacağım.
@ani defne_foto
-> b5_bitis

=== b5_bitis
@yer oda gece
Gece, yatağında, kermesin bütün seslerini tekrar tekrar duyuyorsun. Gazozun fısıltısı. Nermin Teyze'nin "börek isteyen imza atar!" sesi. Tolga'nın tekmesi.
Kasım'ın on ikisi. On yedi gün.
Kasetçalarda Hasan Abi'nin kaseti. Sesi kısık.
-> b5_baba

=== b5_baba
@yer balkon gece
Uyuyamıyorsun. Balkona çıkıyorsun.
Babam orada. Vardiyaya gitmemiş bu gece, izin almış. Elinde çay, bakışı arsada.
Babam: Sen de mi uyuyamadın?
Yanına oturuyorsun. Gece serin, ekim kokuyor. Uzaklarda bir vapur düdüğü.
Babam: Bugün kermesi gördüm. Pencereden. Bütün sokak oradaydı. Ben bu sokakta otuz yıldır yaşıyorum, bütün sokağı hiç bir arada görmemiştim.
Babam: Sizin yaptığınız bir şey var. Ne olursa olsun, onu kimse alamaz.
* Baba, on ikisinde arsaya gelir misin? {cesaret+1} #baba_gelir -> b5_baba_gel
* Ya hiçbir şey değişmezse baba? -> b5_baba_korku

=== b5_baba_gel
Babam çayını bitiriyor. Uzun süre bir şey demiyor.
Babam: Ben hayatımda hiçbir şeye itiraz etmedim. Fabrikada, askerde, hiçbir yerde. Başımı eğdim, işimi yaptım.
Babam: Ama çocuğum bana gel diyorsa gelirim.
Elini saçlarının arasında gezdiriyor.
Babam: Gelirim.
@not Babam gelecek.
-> b6_basla

=== b5_baba_korku
Babam düşünüyor.
Babam: Değişmezse değişmez. Ama sen değiştin. Bu yaz. Ben gördüm.
Babam: Bir arsa gider, bir arsa gelir. Ama bir insan bir kere büyür.
Bardağını sana uzatıyor. Son yudum çay, soğumuş, şekerli.
Babam: Hadi yat. Yarın uzun bir gün.
-> b6_basla
`);
