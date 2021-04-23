const router = require("express").Router()
const fetch = require("node-fetch")
class SetRoutes{
    
    userExists = () => {
        router.post('/user',(req,res)=>{
            const userName = req.body.name
            try {
                fetch(`https://codeforces.com/api/user.info?handles=${userName}`)
                .then(data => data.json())
                .then(data => {
                    if (data.status === "OK") {
                        res.redirect(`/user/${userName}`)
                    } else {
                        res.send({error:"User doesn't exist!"})
                    }
                })
            } catch (error) {
                res.status(400).send("Something went wrong!")
            }
            
        })
    }


    userStats(){


        const getInfo = async (userName) => {
            try{
                const info = await fetch(`https://codeforces.com/api/user.info?handles=${userName}`)
                return info.json()
            }catch (error) {
                return error
            }
            
        }
        const getStats = async (userName) => {
            try{
                const stats =  await fetch(` https://codeforces.com/api/user.status?handle=${userName}`)
                return stats.json()
            }catch (error) {
                return null
            }
        }

        router.get('/user/:username', async (req,res)=>{
            const userName = req.params.username
            const userData = {
                info:null,
                stats:null
            }
            userData.info = await getInfo(userName)
            userData.stats = await getStats(userName)
            res.send(userData)
        })
    }

    exportRoutes(){
        module.exports = router
    }
}


const route = new SetRoutes()
route.userExists()
route.userStats()
route.exportRoutes()



