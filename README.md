# PERSONNEL API

### ERD:

![ERD](./erdPersonnelAPI.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    readme.md
    src/
        configs/
            dbConnection.js
        controllers/
            department.controller.js
            personnel.controller.js
        helpers/
            passwordEncrypt.js
        middlewares/
            errorHandler.js
            findSearchSortPage.js
        models/
            department.model.js
            personnel.model.js
        routes/
            department.router.js
            personnel.router.js
```

## Projenin isterleri

-   [x] Deparment ve Personnel tablolarımız olacak bunları birbirlerine bağlayacağız. .her deparmentın altında kendisine ait personel olacak.
-   [x] Her departmenda sadece 1 tane Lead olacak.
-   [ ] Admin veya Lead; dinamik url ile url de gelen isteğe göre response değişecek.Yani departmenlara ait personeli listelemek istediğimizde bunu tek bir url üzerinden yapacağız. departments/id/personnels
-   [x] Admin yeni personel için CRUD işlemleri yapabilecek.(admin dan kasıt yetkili olan bunu farklı isim de diyebilirsiniz.)
-   [x] Personel sadece kendi bilgilerini okuyabilir , güncelleyebilir ama silme yetkisi Adminde olacak.
-   [x] Personeli silme yetkisi sadece admin olacak.
        active olmayan personel sisteme giriş yapamaz.
-   [x] Departmentları login olan herkes okuyabilir, listeyelebilir ama Cud işlemlerini sadece admin yapacak.
-   [x] Token authentication kullanacağız. Kullanıcı logout olduğunda tokeni sileceğiz. Token işlemlerini sadece admin yapacak.
