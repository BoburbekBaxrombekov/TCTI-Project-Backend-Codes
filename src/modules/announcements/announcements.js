const {allAnnouncements, newAnnouncement, delAnnouncement, editAnnouncement} = require('./model')

module.exports = {
    GET: async(req, res) => {
        try{
            const announcements = await allAnnouncements()
            const sortedArray = announcements.sort((a, b) => {
                if (a.date > b.date) {
                    return -1;
                  }
                  if (a.date < b.date) {
                    return 1;
                  }
                  return 0;
            })
            res.send(sortedArray)
        } catch(err) {
            console.log(err.message)
        }
    },
    POST: async(req, res) => {
        try {
            const { 
                img,
                title_uz,
                body_uz,
                title_ru,
                body_ru,
                title_en,
                body_en,
                date,
                sort
            } = req.body
            await newAnnouncement(
                img,
                title_uz,
                body_uz,
                title_ru,
                body_ru,
                title_en,
                body_en,
                date,
                sort
                )
            res.send("ok")
        } catch(err) {
            console.log(err.message)
        }
    },
    DELETE: async(req, res) => {
        try {
            const { 
                id
            } = req.body
            await delAnnouncement(id)
            res.send("ok")
        } catch(err) {
            console.log(err.message)
        }
    },
    EDIT: async(req, res) => {
        try {
            const { 
                img, title_uz, body_uz, title_ru, body_ru, title_en, body_en, id
            } = req.body
            await editAnnouncement(img, title_uz, body_uz, title_ru, body_ru, title_en, body_en, id)
            res.send("ok")
        } catch(err) {
            console.log(err.message)
        }
    }
}