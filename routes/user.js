const express = require("express");
const router = express.Router();
const db = require('../models/db')

const data = {
    title: "Popüler Kurslar31",
    categories: ["Web Geliştirme", "Programlama", "Mobil Uygulamalar", "Veri Analizi", "Ofis Uygulamaları"],
    blogs: [{
            blogid: 1,
            title: "Komple Uygulamalı Web Geliştirme",
            description: "Sıfırdan ileri seviyeye 'Web Geliştirme",
            image: "1.jpeg"
        },
        {
            blogid: 2,
            title: "Python ile Sıfırdan İleri Seviye Python Programlama",
            description: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı",
            image: "2.jpeg"
        },
        {
            blogid: 3,
            title: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
            description: "Modern javascript dersleri ile (ES6 & ES7+) Nodejs",
            image: "3.jpeg"
        }
    ]
}

router.use("/blogs/:blogid", function (req, res) {
    res.render("users/blog-details");
});

router.use("/blogs", function (req, res) {
    db.execute("SELECT * FROM blog")
        .then(result => {
            db.execute("SELECT * FROM category")
                .then(queryResult => {
                   // const sonuc = queryResult[0] Burada sonuc değişkeni atayarak bütün bilgileri alıyoruz
                    //console.log(sonuc[1].name) Burada da atanan değer içerisindeki alanları seçebiliyoruz. Mesela title, desc, id 
                    res.render("users/index", {
                        title: "Popüler Kurs",
                        blogs: result[0],
                        categories: queryResult[0]
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


router.use("/", function (req, res) {
    db.execute("SELECT * FROM blog")
        .then(result => {
            db.execute("SELECT * FROM category")
                .then(queryResult => {
                    res.render("users/index", {
                        title: "Popüler K",
                        blogs: result[0],
                        categories: queryResult[0]
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})
module.exports = router;