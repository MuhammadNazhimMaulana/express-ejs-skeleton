class HomeController{

    index = (req, res) => {
        return res.render('home', {
            layout: 'layouts/main',
            title: 'Halaman Home'
        });
    }

    about = (req, res) => {
        return res.render('about', {
            layout: 'layouts/main',
            title: 'Halaman About'
        });
    }

}

module.exports = HomeController