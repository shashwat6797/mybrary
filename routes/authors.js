const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors
router.get('/', async (req,res)=> {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '')
    {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query.name
        })
    }catch{
        res.redirect('/')
    }
})
//New authors
router.get('/new', (req,res)=> {
    res.render('authors/new', {author: new Author()})
})
//Create authors
router.post('/new', (req, res)=> {
    const authors = new Author({
        name: req.body.name
    })
    authors.save().then(()=>{
        res.redirect('/authors')
    }).catch((err)=>{
        res.render('authors/new', 
        {
            author: authors,
            errorMessage: 'Error Occurred'
        })
    })  
    // res.send(req.body.name  )
})

module.exports = router