HIKAYE.push(String.raw`
=== basla
@bolum 1
@yer oda sabah
Sabahın yedisi. Perdenin aralığından giren güneş, yorganın üstünde sarı bir çizgi çiziyor.
Dışarıda simitçinin sesi, uzaklarda bir martı, mutfakta çaydanlığın fokurtusu.
Bugün okulun son günü. Bugün karne günü.
Ninenin terlikleri koridorda sürtünüyor. Kapı aralanıyor.
Nine: Kalk bakalım kuzum. Karne almaya uykulu gidilmez.
@isim
Nine: Hadi {ad}, çayın soğuyor.
-> c1_kahvalti

=== c1_kahvalti
@yer mutfak sabah
Mutfak masasında beyaz peynir, domates, bir de ninenin kendi yaptığı vişne reçeli var.
Radyoda haberler: dolar yine artmış, Ankara'da yine bir toplantı. Kimse dinlemiyor.
Annem çoktan atölyeye gitmiş. Babamın vardiyası sabaha kadar sürdü, içeride uyuyor.
Nine: Türkçe nasıl olacak bakalım? Bu dönem kitap okudun mu sen?
Okudun. Biraz. Çoğunlukla Mert'le top oynadın.
* Nine, takdir alacağım bak gör. {cesaret+1} -> c1_kahvalti_iddia
* Bilmem... Matematik biraz kötü olabilir. {nine+1} -> c1_kahvalti_durust
* Reçelli ekmeği ağzına tıkıştırıp sırıt. -> c1_kahvalti_sirit

=== c1_kahvalti_iddia
Nine gözlüğünün üstünden bakıyor. O bakış, yetmiş iki yılın bütün iddialı çocuklarını görmüş bir bakış.
Nine: Alırsan bir lira bende. Almazsan bulaşıklar sende.
Elini uzatıyor. Tokalaşıyorsunuz. Avucu un kokuyor.
@bayrak iddia
-> c1_yola

=== c1_kahvalti_durust
Nine kaşığı bırakıyor, elini başına koyuyor.
Nine: Matematik herkese kötü gelir kuzum. Dedene de kötü gelirdi, yine de bir ömür terazi tuttu. Sen dürüst ol yeter.
Çayına bir şeker daha atıyor. Sana göz kırpıyor.
-> c1_yola

=== c1_kahvalti_sirit
Nine gülüyor, ağzının kenarında un izi.
Nine: Ağzın doluyken cevap verilmez, iyi kurtardın.
-> c1_yola

=== c1_yola
@yer sokak sabah
Akasya Sokağı her sabahki gibi uyanıyor.
Dört katlı, sıvaları dökülmüş apartmanlar. Balkonlarda çamaşır ipleri, iplerde tişörtler, nevresimler, bir tane de kırmızı havlu.
Köşede Cemil Amca'nın bakkalı. Önünde gazete yığını, kapıda asılı file içinde toplar.
Sokağın sonunda, iki apartmanın arasında boş arsa. Taşlardan yapılmış iki kale. Burası sizin.
Arsanın kenarında Karabaş yatıyor. Sokağın köpeği. Kimsenin değil, herkesin.
Mert: {ad}! Hadi be, geç kalıyoruz!
Mert sokağın öbür ucundan koşarak geliyor. Gömleği yarı yarıya pantolonundan çıkmış, saçlarına annesi su sürmüş, çoktan kurumuş.
Mert: Bugün karne ver, yarın tatil! Üç ay, kardeşim. Üç ay top, üç ay deniz, üç ay dondurma.
* Hangi deniz? Biz denize hiç gitmedik ki. -> c1_yola_deniz
* Üç ay top! Üst Sokak'ı yeneceğiz bu yaz. {mert+1} -> c1_yola_top

=== c1_yola_deniz
Mert omuz silkiyor.
Mert: Florya'ya gideriz. Hasan Abi götürür. Motoru var adamın.
Hasan Abi'nin motoru iki kişiyi zor taşıyor. Üç kişi Florya'ya giderse yolda dağılırsınız. Ama söylemiyorsun. Yaz bu, yazın her şey mümkün.
-> c1_okul

=== c1_yola_top
Mert yumruğunu havaya kaldırıyor.
Mert: İşte budur! Tolga'nın burnunu sürteceğiz. Geçen yaz yediğimiz beş golü unutmadım ben.
Unutmamış. Kimse unutmamış. Beşe sıfır. Mert o akşam yemek yememişti.
-> c1_okul

=== c1_okul
@yer okul ogle
Okulun bahçesi bayram yeri gibi. Veliler kapıda, öğrenciler ağaçların gölgesinde, öğretmenler elde kalın dosyalar.
Sınıf öğretmeniniz Saadet Hanım karneleri tek tek veriyor. Her ismi okuyuşunda biraz daha yorgun.
Saadet Hanım: {ad}.
Kalkıyorsun. Karne ince bir mavi kağıt ama elinde bir kiremit kadar ağır.
Açıyorsun.
@eger #iddia -> c1_karne_iddia
Türkçe beş. Hayat Bilgisi beş. Matematik üç. Teşekkür belgesi.
Fena değil. Hiç fena değil.
@ani karne
-> c1_mert_karne

=== c1_karne_iddia
Türkçe beş. Hayat Bilgisi beş. Matematik üç. Teşekkür belgesi.
Takdir değil. Teşekkür.
Ninenin bulaşıkları gözünün önüne geliyor. Bir tencere, iki tava, bir de o kocaman sarı leğen.
@not Nine bu iddiayı unutmayacak.
@ani karne
-> c1_mert_karne

=== c1_mert_karne
Bahçede, çeşmenin yanında Mert karnesine bakıyor. Bakıyor, bakıyor, kapatıyor. Sonra bir daha açıyor, sanki notlar değişecekmiş gibi.
Mert: Matematik bir. Fen iki.
Sesi kısık. Mert'in sesi hiç kısık olmaz.
Mert: Babam beni öldürür. Yaz boyu dışarı çıkamam. Maç da yok, hiçbir şey yok.
* Yanındasın: Yazın beraber çalışırız, eylülde bütünlemeyi geçersin. {mert+2} #mert_ders -> c1_mert_destek
* Şaka yap: En azından bir'i yazmak kolay, düz çizgi. {mert+1} -> c1_mert_saka
* Karneyi saklasın: Babana bugün gösterme, maçtan sonra göster. -> c1_mert_sakla

=== c1_mert_destek
Mert sana bakıyor. Sonra karnesine. Sonra yine sana.
Mert: Ciddi misin? Her gün mü?
Her gün değil tabii. Hafta içi, öğleden sonra, bir saat. Sonra maç.
Mert: Bir saat matematik, üç saat maç. Anlaştık.
Elini uzatıyor, tükürmeden tokalaşıyorsunuz. Tükürmek ilkokulda kaldı.
@not Mert bunu hatırlayacak.
-> c1_bakkal

=== c1_mert_saka
Mert bir an bakıyor, sonra kahkahayı basıyor. Çeşmenin başındaki kızlar dönüp bakıyor.
Mert: Düz çizgi! Haklısın be. Babama da öyle söyleyeyim. Oğlum düz çizgi çekmeyi öğrenmiş, de.
Gülüyorsunuz. Ama yol boyunca Mert karnesini cebinde sıkı sıkı tutuyor.
-> c1_bakkal

=== c1_mert_sakla
Mert'in gözleri parlıyor.
Mert: Dahi misin sen? Akşama kadar saklarım. Babam akşam haberleri izlerken veririm, sesini çıkaramaz.
Karneyi katlayıp tişörtünün altına, pantolonunun belinin arasına sıkıştırıyor.
Bu planın bir yerinde bir sorun var gibi. Ama tam neresi, çıkaramıyorsun.
@bayrak mert_sakladi
-> c1_bakkal

=== c1_bakkal
@yer bakkal ogle
Cemil Amca'nın bakkalı serin. İçerisi her zaman serin, her zaman sabun, kahve ve eski kağıt kokar.
Raflarda deterjan kutuları, makarna paketleri, kavanozlarda bonbon şekerler. Tezgahın üstünde terazi ve kalın, kahverengi bir defter: veresiye defteri. Yarısı mahallenin borcu.
Cemil Amca gözlüğünü burnunun ucuna indirmiş, bulmaca çözüyor.
Cemil Amca: Ooo, karneciler gelmiş. Göster bakalım.
Karneni uzatıyorsun. Cemil Amca bakıyor, kaşlarını kaldırıyor.
Cemil Amca: Teşekkür. Aferin. Teşekkür alana bakkaldan hediye var.
Kavanozları gösteriyor.
Cemil Amca: Ya bir sakız, ya bir gazoz. Seçimini yap.
Mert arkada, karnesi hâlâ cebinde. Onun hediyesi yok, belli.
* Bir Turbo sakız al. İçinden araba resmi çıkacak. -> c1_bakkal_sakiz
* Gazozu al, Mert'le yarı yarıya iç. {mert+1} -> c1_bakkal_gazoz
* Hediyeyi Mert'e ver: Asıl ona lazım, Cemil Amca. {mert+1 cemil+1} -> c1_bakkal_mert

=== c1_bakkal_sakiz
Kağıdı açıyorsun. İçinden küçük, parlak bir resim çıkıyor: kırmızı bir yarış arabası. Ferrari!
Mert'in ağzı açık kalıyor.
Mert: Ferrari mi? Ben üç yıldır Ferrari bekliyorum! Üç yıldır Toros çıkıyor!
Sakız pembe ve sert, beş dakika sonra tadı kaçacak. Ama resim sende kalacak.
@bayrak ferrari
@ani turbo
-> c1_bakkal_cemil

=== c1_bakkal_gazoz
Cemil Amca dolaptan buz gibi bir şişe çıkarıyor, tezgahın kenarına vurup kapağı açıyor. Fıss.
Bir yudum sen, bir yudum Mert. Burnunuzdan köpük kaçıyor.
Mert: Bu ne güzel gazoz be.
Mert'in biraz önceki kısık sesi gitmiş.
-> c1_bakkal_cemil

=== c1_bakkal_mert
Cemil Amca gözlüğünü çıkarıp sana uzun uzun bakıyor.
Cemil Amca: Sen böyle şeyleri nereden öğrendin bakayım?
Kavanozdan bir sakız alıp Mert'e veriyor. Sonra bir tane de sana. Defterine bir şey yazmıyor.
Cemil Amca: Bunlar benden. Hesap yok.
Mert sakızı açıyor. İçinden kırmızı bir araba çıkıyor.
Mert: FERRARİ!
Bakkalın camları titriyor.
@bayrak ferrari_mert
@ani turbo
-> c1_bakkal_cemil

=== c1_bakkal_cemil
Kapıdan çıkarken Cemil Amca seslenmiyor ama radyosunun sesini açıyor. Eski bir şarkı, ne dediği anlaşılmıyor, bir kadın sesi.
Cemil Amca ellerini tezgaha dayamış, dışarıya, sokağın sonuna bakıyor. Arsaya.
Bir şey söyleyecek gibi oluyor. Sonra vazgeçip bulmacasına dönüyor.
-> c1_kamyon

=== c1_kamyon
@yer sokak ogle
Sokağın girişinden korna sesleri geliyor.
Beyaz, tozlu bir minibüs. Üstünde iple bağlanmış koltuklar, bir çamaşır makinesi, bir bisiklet. Plakası garip: siyah harfler, beyaz zemin, solda mavi bir şerit. Bir K harfi.
Mert: Almancı bunlar! Bak plakaya.
Minibüs, sokağın ortasındaki boş daireye, üç numaranın önüne duruyor. Uzun süredir kimse oturmuyordu orada.
Arka kapı açılıyor. Bir adam, bir kadın, bir de senin yaşlarında bir kız iniyor.
Kızın boynunda bir fotoğraf makinesi asılı. Gerçek bir fotoğraf makinesi, filmli olanlardan.
Elinde bir karton kutu taşıyor. Kutu ağır, kız küçük. İkinci adımda kutunun dibi açılıyor.
Kitaplar, kasetler, bir sürü fotoğraf kaldırıma saçılıyor.
Karabaş bunu bekliyormuş gibi fırlıyor ve ağzına bir şey kapıp arsaya doğru koşuyor.
Kız: Hey! Nein, nein! Dur!
* Karabaş'ın peşinden koş. {cesaret+1 karabas+1 defne+1} -> c1_karabas_kos
* Kaldırımdaki fotoğrafları toplamasına yardım et. {defne+2} -> c1_kitap_topla
* Mert'le uzaktan izle. -> c1_uzaktan

=== c1_karabas_kos
Koşuyorsun. Sandaletlerin kaldırım taşlarında şaklıyor.
Karabaş arsanın ortasında durmuş, ağzındakini toprağa bırakmış, kuyruğunu sallıyor. Kaçmak için değil, oynamak için almış.
Bir defter. Mavi kaplı, köşeleri kıvrık.
Yanına çömeliyorsun. Karabaş'ın burnu ıslak, gözleri sarı.
* Karabaş'ın başını okşa, sonra defteri al. {karabas+1} -> c1_karabas_okşa
* Defteri hemen kap, kız bekliyor. -> c1_karabas_kap

=== c1_karabas_okşa
Karabaş başını eline yaslıyor. Kulağının arkasında eski bir yara izi var.
Defteri alıyorsun, Karabaş itiraz etmiyor. Sadece peşinden geliyor, sanki onu da geri götürecekmişsin gibi.
@bayrak karabas_dost
-> c1_defter_teslim

=== c1_karabas_kap
Defteri kapıyorsun. Karabaş hafifçe homurdanıyor, sonra sıkılıp gölgeye geri yatıyor.
-> c1_defter_teslim

=== c1_defter_teslim
@yer sokak ogle
Kız minibüsün yanında, kucağında yeniden doldurulmuş kutu.
Defteri uzatıyorsun. Biraz salyalı. Kenarı biraz yırtık.
Kız: Danke. Yani... sağ ol.
Türkçesi düzgün ama kelimeler ağzında biraz yabancı, kalıba tam oturmayan bir anahtar gibi.
Defne: Ben Defne. Bu benim fotoğraf defterim. Bütün... şeyler var içinde. Köln'deki şeyler.
* Ben {ad}. Hoş geldin Akasya Sokağı'na. {defne+1} -> c1_defne_tanis
* Köln neresi? Almanya'da mı? -> c1_defne_koln

=== c1_defne_tanis
Defne gülümsüyor. İlk defa.
Defne: Burası Akasya mı? Ama hiç akasya yok.
Haklı. Sokağın adı akasya ama tek bir akasya ağacı yok. Sadece arsanın köşesinde yaşlı bir dut ağacı.
Defne: Belki dut ağacını akasya sandılar.
@bayrak defne_tanisti
-> c1_nermin

=== c1_defne_koln
Defne başını sallıyor.
Defne: Almanya'da. Çok yağmur yağar. Burada neden hiç yağmur yok?
Haziran'da İstanbul'a yağmur yağmaz, diyorsun. Defne bunu kaydedecekmiş gibi bakıyor.
@bayrak defne_tanisti
-> c1_nermin

=== c1_kitap_topla
Çömeliyorsun, fotoğrafları topluyorsun. Bazıları yüzüstü, bazıları ters dönmüş.
Bir kilise, iki kuleli, gri gökyüzüne yükselen. Bir nehir. Yağmurda bisiklet süren bir çocuk. Bir pastanenin camı. Bir sürü yabancı yüz. Hepsi bir yerlere bakıyor.
Kız yanına çömeliyor.
Defne: Bunları ben çektim. Hepsini.
Elindeki fotoğrafı alıyor, tozunu üflüyor.
Defne: Ben Defne. Köln'den geldik. Babam artık burada çalışacak. Annem diyor ki burası bizim yerimiz. Ama ben bilmiyorum.
* Ben {ad}. Burası da güzel, göreceksin. {defne+1} -> c1_kitap_iyi
* Ben de burada doğdum ama hâlâ bilmiyorum. {defne+1} -> c1_kitap_durust

=== c1_kitap_iyi
Defne etrafa bakıyor. Çamaşır ipleri, kedi, simitçi, toz.
Defne: Belki. Fotoğrafı çekilince güzel olur her yer.
@bayrak defne_tanisti
-> c1_karabas_geri

=== c1_kitap_durust
Defne şaşırıyor. Sonra gülüyor, gerçekten gülüyor.
Defne: Sen tuhaf birisin. Bu iyi bir şey.
@bayrak defne_tanisti
-> c1_karabas_geri

=== c1_karabas_geri
Bu sırada Karabaş geri geliyor, ağzında mavi kaplı bir defter. Defne'nin ayaklarının dibine bırakıyor, sanki armağan ediyormuş gibi.
Defne: Mein Album! Sen hırsız mısın, kahraman mısın?
Karabaş kuyruğunu sallıyor. İkisi de, diyor.
-> c1_nermin

=== c1_uzaktan
Mert'le duvara yaslanıp izliyorsunuz.
Mert: Almancılar zengin olur. Bak, çamaşır makineleri bile var.
Kız kitapları tek başına topluyor. Annesi minibüsün içinde bir şey arıyor, babası kapıcıyla tartışıyor.
Karabaş bir süre sonra kendiliğinden geri geliyor, ağzındaki mavi defteri kızın önüne bırakıyor.
Kız defteri göğsüne bastırıyor. Sonra size dönüp bakıyor. Uzun uzun.
Selam bile vermeden içeri giriyor.
Mert: Hava atıyor.
Belki. Ya da belki kimse yardım etmedi diye.
@not Defne bunu fark etti.
-> c1_nermin

=== c1_nermin
@yer sokak ogle
Yukarıdan bir ses.
Nermin Teyze: Kuzum! {ad}! Bak buraya!
İkinci katın balkonunda Nermin Teyze. Başında çiçekli bir yazma, elinde bir ip. İpin ucunda hasır bir sepet, yavaş yavaş iniyor.
Nermin Teyze: Bakkaldan iki ekmek al, bir de yarım kilo beyaz peynir. Paralar sepette. Cemil'e söyle, tam yağlı olsun, geçen seferki yağsızdı, ben yağsız yemem.
Sepet burnunun dibinde sallanıyor. İçinde buruşuk paralar, bir de kocaman bir not: "CEMİL TAM YAĞLI!!"
Mert kulağına eğiliyor.
Mert: Nermin Teyze'ye yardım edersen akşama kadar seni konuşur. Etmezsen yine konuşur ama kötü konuşur.
* Sepeti al, bakkala koş. {nermin+2} -> c1_sepet
* Duymamış gibi yap, Mert'le arsaya kaç. {nermin-1 mert+1} -> c1_sepet_kac

=== c1_sepet
Bakkala gidip geliyorsun. Cemil Amca notu okuyunca gülüyor, en yağlı peyniri seçiyor, üstüne bir avuç zeytin koyuyor.
Cemil Amca: Bunu söyleme ona. Zeytin benden.
Sepet yukarı çıkıyor. Nermin Teyze içine bakıyor, zeytinleri görüyor, bir şey söylemiyor ama yüzü yumuşuyor.
Nermin Teyze: Allah razı olsun yavrum. Sen akıllı çocuksun, ben bilirim.
Sepet bir daha iniyor. İçinde bir avuç leblebi şekeri.
@ani sepet
@bayrak sepet
-> c1_aksam

=== c1_sepet_kac
Arsaya doğru koşarken arkanızdan sesler geliyor.
Nermin Teyze: Bu çocuklar sağır mı oldu! Ah ah, eskiden böyle miydi! Eskiden çocuklar...
Gerisini duymuyorsun. Ama sokağın yarısı duyuyor.
Akşama kadar sokağın yarısı senin sağır olduğunu konuşacak.
-> c1_aksam

=== c1_aksam
@yer arsa aksam
Akşam olurken arsa başka bir yere dönüşüyor. Toz altın gibi parlıyor, dut ağacının gölgesi uzayıp sokağa kadar geliyor.
Uzaktan bir motor sesi. Tıkırtılı, öksürüklü, ama inatçı.
Hasan Abi geliyor. Mahallenin abisi. On dokuz yaşında, siyah bir deri ceketi var ama yazın da giyiyor. Motorunun arkasında bir kasetçalar bağlı.
Motoru arsanın kenarında durduruyor. Kasetçaların sesini kısıyor.
Hasan Abi: Ne oluyor ufaklıklar? Karneler nasıl?
Mert hemen karnesini arkasına saklıyor.
Hasan Abi: Anladım, anladım. Bak, size haber getirdim. Üst Sokak'tan Tolga cumartesi maç istiyor. Revanş diyorlar.
Mert: Geçen sene revanşı onlar aldı zaten!
Hasan Abi: Bu sefer siz alırsınız. Ben hakem olurum. Ama ben gidince kim hakem olacak bilmem.
* Gitmek mi? Nereye gidiyorsun? -> c1_hasan_asker
* Cumartesi geleceğiz, söyle Tolga'ya! {cesaret+1 hasan+1} -> c1_hasan_mac

=== c1_hasan_asker
Hasan Abi bir sigara çıkarıyor, sonra size bakıp geri koyuyor.
Hasan Abi: Askere, ufaklık. Ağustosta. Celbim geldi. On beş ay.
On beş ay. Bir yaz, bir kış, bir yaz daha, bir parça da kış.
Hasan Abi: Ağlamak yok. Dönünce yine buradayım. Bu arsa da burada.
Arsaya bakıyor. Sözleri havada biraz uzun kalıyor.
@bayrak asker_biliyor
@etki hasan+1
-> c1_aksam_son

=== c1_hasan_mac
Hasan Abi gülüyor, motorunun gidonuna vuruyor.
Hasan Abi: İşte budur! Ben söylerim Tolga'ya. Çok konuşan gol yer, de.
Sonra sesini alçaltıyor.
Hasan Abi: Bu benim son yazım burada ufaklıklar. Ağustosta askerdeyim. O yüzden kazanın, tamam mı? Bana bir hediye verin.
-> c1_aksam_son

=== c1_aksam_son
Güneş apartmanların arkasına iniyor. Pencereler bir bir yanıyor. Biri televizyonu açıyor, dizinin müziği sokağa taşıyor.
@eger #defne_tanisti -> c1_flas
-> c1_bitis

=== c1_flas
Bir anda bir flaş.
Defne arsanın girişinde, fotoğraf makinesi gözünde.
Defne: Kıpırdamayın! Bir tane daha.
Sen, Mert, Hasan Abi, motor, Karabaş. Dut ağacı, arkada apartmanların pembe duvarları. Bir flaş daha.
Defne: Bu benim burada çektiğim ilk fotoğraf. Burası için.
Hasan Abi: Almanya'dan fotoğrafçı mı getirdiniz lan?
Defne: Ben fotoğrafçı değilim. Ben sadece unutmak istemiyorum.
@ani ilk_aksam
-> c1_bitis

=== c1_bitis
@yer sokak gece
Gece sokağa iniyor. Cırcır böcekleri başlıyor. Nine balkonda, elinde tespih, aşağı bakıyor.
Nine: Hadi kuzum, yemek!
Merdivenleri çıkarken arkana bakıyorsun.
Sokak lambasının altında Cemil Amca kepengi indiriyor. Nermin Teyze'nin balkonunda televizyonun mavi ışığı. Üç numaranın penceresinde yabancı perdeler.
-> c1_yemek

=== c1_yemek
@yer mutfak gece
Mutfakta lamba yanıyor, pencere açık, sokaktan televizyon sesleri giriyor.
Masada mercimek çorbası, pilav, bir tabak da cacık. Annem atölyeden yeni gelmiş, parmak uçları iplik tozundan beyaz. Babam vardiyaya gitmeden önce oturmuş, gözleri uykulu.
Annem: Hani karne? Göster bakalım.
Karneyi uzatıyorsun. Annem okurken dudakları kıpırdıyor, notları sessizce tekrarlıyor. Sonra babama veriyor.
Babam uzun süre bakıyor. Babam hep uzun süre bakar. Fabrikada vidaları da böyle kontrol ediyordur diye düşünürsün.
Babam: Matematik üç.
Bir an sessizlik. Nine kaşığını bırakıyor.
Babam: Benimki ikiydi. Senin yaşındayken.
Sonra karneyi katlayıp cebine koyuyor. Göğüs cebine, sigara paketinin yanına. Vardiyada arkadaşlarına gösterecek. Bunu biliyorsun çünkü geçen yıl da öyle yaptı.
@eger #iddia -> c1_yemek_iddia
-> c1_yemek_arsa

=== c1_yemek_iddia
Nine boğazını temizliyor.
Nine: Birileri takdir alacağını iddia etmişti bu sabah.
Annem kaşlarını kaldırıyor. Babam gülümsüyor, ilk defa bu akşam.
Nine: Bulaşıklar kimde bu gece?
* Bende nine. Söz söz. {nine+1} -> c1_bulasik
* Ama teşekkür de bir şeydir! -> c1_yemek_itiraz

=== c1_bulasik
Bir tencere, iki tava, sarı leğen. Ellerin buruşana kadar yıkıyorsun.
Nine arkandan geliyor, bir kurulama bezi alıp yanında duruyor. Bir şey demeden kuruluyor. İddiayı kaybettin ama yalnız değilsin.
-> c1_yemek_arsa

=== c1_yemek_itiraz
Nine gülüyor.
Nine: Teşekkür bir şeydir, doğru. Yarısını sen yıka, yarısını ben.
Pazarlıkla yarım bulaşık. Fena değil.
-> c1_yemek_arsa

=== c1_yemek_arsa
Babam çayını karıştırırken pencereden dışarı bakıyor.
Babam: Bugün arsada adamlar vardı. Metreyle bir şey ölçüyorlardı. Takım elbiseli biri de vardı.
Annem: Kim?
Babam: Bilmem. Belki belediyedendir.
Bir an kimse bir şey demiyor. Sonra babam sana dönüyor.
Babam: O arsada ben de top oynadım biliyor musun? Nuri Abi hakemdi. Cemil Amca'nın kardeşi. Düdüğü yoktu, ıslıkla çalardı. Islığı bütün sokaktan duyulurdu.
Babam ıslık çalıyor. İki parmağı ağzında, ince, keskin. Nine "Gece gece!" diye azarlıyor ama o da gülüyor.
* Cumartesi maçımız var baba. Gelir misin? {cesaret+1} #baba_mac -> c1_baba_mac
* Nuri Amca'yı anlat. -> c1_baba_nuri

=== c1_baba_mac
Babam saatine bakıyor. Cumartesi sabahı vardiyadan çıkıyor, öğlene kadar uyuyor. Ama.
Babam: Uyumam o zaman. Pencereden izlerim. Gol atarsan ıslık çalarım, anlarsın.
@not Babam söz verdi.
-> c1_yemek_son

=== c1_baba_nuri
Babam çayından bir yudum alıyor.
Babam: Nuri Abi otobüs şoförüydü. Akşamları işten gelir, ayakkabılarını çıkarır, çıplak ayakla hakemlik yapardı. Haksızlık yapanı oyundan atardı, kim olursa olsun. Kendi yeğenini bile attı bir kere.
Babam: Öldüğünde bütün mahalle cenazesine gitti. Arsadan geçerken herkes durdu. Kimse bir şey demedi, ama herkes durdu.
Dışarıda bir köpek havlıyor. Karabaş.
-> c1_yemek_son

=== c1_yemek_son
Babam kalkıyor, ceketini alıyor, saçlarını karıştırıp çıkıyor. Kapı kapanırken merdivenden ayak sesleri iniyor, iniyor, sonra sokak.
Penceren açık. Yatağında yatarken sokağın sesleri bir bir sönüyor. Son televizyon, son köpek, son ayak sesi.
Bir yaz başlıyor. Henüz ne kadar uzun süreceğini bilmiyorsun.
-> b2_basla
`);
