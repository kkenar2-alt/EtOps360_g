# EtOps 360 Gelistirme Standartlari

- Tek buyuk kod dosyasi yapilmayacak.
- Backend katmanlari: Api, Contracts, Application, Domain, Infrastructure.
- Frontend katmanlari: components, features, lib, types.
- UI soft modern renklerde, sol modul menu + ust filtre + detay paneli duzeninde olacak.
- Elle veri girisi yerine kart tabanli combo secimleri kullanilacak.
- Ozet satirdan detaya gidilecek; detayda lot, tutar ve audit trail gorunecek.
- Tarih gibi kisa alanlar gereksiz genis tutulmayacak; tabloda sutun genisligi kullanici tarafindan degistirilebilir olacak.
- Uretimde demo token kullanilmayacak; SSO/MFA, RBAC/ABAC, audit log, secrets vault ve rate limit zorunlu.
- Kart PAN/CVV saklanmayacak.
- Logo veritabanina kontrolsuz insert/update yapilmayacak.
