"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// app.use(logging):

//* MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//? $ npm i morgan

// app.use(morgan('combined'))
// app.use(morgan('common'))
// app.use(morgan('dev'))
// app.use(morgan('short'))
// app.use(morgan('tiny'))
// app.use(morgan('IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer | AGENT=":user-agent"'))
// combined: En fazla bilgi içeren Apache kombinasyon formatıdır. İstek yapan IP, kimlik doğrulama kullanıcısı, tarih ve saat, istek hattı, HTTP durum kodu, yanıt boyutu, referans veren site ve kullanıcı aracısı gibi bilgileri içerir.
// common: Bu format, Apache'nin daha az detaylı bir versiyonudur. Yalnızca IP adresi, kimlik doğrulama kullanıcısı, tarih ve saat, istek hattı, ve HTTP durum kodu gibi temel bilgileri loglar.
// dev: Geliştirme sürecinde kullanım için uygundur. Renkli çıktılarla istek metodunu, URL'yi, durum kodunu ve yanıt süresini içerir.
// short ve tiny: Bu formatlar, daha az veri içererek log dosyalarının boyutunu küçük tutar. short formatı, istek metodu, URL, durum kodu, yanıt boyutu ve yanıt süresini içerirken, tiny formatı yalnızca metod, URL ve durum kodu gibi en temel bilgileri verir.

//? Write to log file:
// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log', { flags: 'a+' })
// }))
//* File system flags(dosya açma modu) =>  https://nodejs.org/api/fs.html#file-system-flags
//? Write to file day by day:
// const fs = require('node:fs')
// const now = new Date()
// console.log(typeof now, now)
// const today = now.toISOString().split('T')[0]
// console.log(typeof today, today)
// app.use(morgan('combined', {
// stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// }))

// const morgan = require('morgan')
// const fs = require('node:fs')

// const now = new Date()
// // console.log(typeof now, now)
// const today = now.toISOString().split('T')[0]
// // console.log(typeof today, today)
// // app.use(morgan('combined', {
// //     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// // }))

// module.exports = morgan('combined', {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
// })

// morgan modülünü yükleme, bu modül HTTP request logları için kullanılır
const morgan = require("morgan");

// Dosya sistemi modülünü yükleme, log dosyalarını yazmak için gerekli
const fs = require("node:fs");

// Bugünün tarihini ISO formatında alır ve gün ayırıcı olan 'T' karakterine göre bölerek
// sadece tarih kısmını (YYYY-MM-DD) alır
// const today = new Date().toISOString().split("T")[0];" // YYYY-MM-DD"
const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

// Morgan için yapılandırma nesnesi oluşturma. 'combined' formatında loglama yapar,
// yani Apache'nin combined formatında detaylı log bilgileri sağlar. Bu loglar,
// IP adresi, tarih, HTTP metodu, URL, HTTP status kodu, cevap boyutu, referans alanı ve kullanıcı aracısı gibi bilgileri içerir.

// Yapılandırılmış Morgan middleware'ını dışa aktararak diğer dosyalarda kullanılabilir hale getirme
module.exports = morgan("combined", {
	// Yeni bir yazma akışı oluşturarak her gün için yeni bir log dosyası yaratılır.
	// Log dosyaları "./logs" dizini altında, tarih isimli dosyalarda saklanır (örn: "2021-06-01.log").
	// 'a+' kipi, dosyanın var olup olmadığını kontrol eder, varsa dosyanın sonuna ekler, yoksa dosyayı oluşturur.
	stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});
