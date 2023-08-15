const express = require("express");
const router = express.Router();

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
    res.render("users/blogs", data);
});

router.use("/", function (req, res) {
    res.render("users/index", data); //Burada data üzerinden title bilgisine ulaşılabilir. ejs ile <%=title%>
});

module.exports = router;