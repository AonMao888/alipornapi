const express = require('express');
const app = express();
const xvideos = require('xvideosx');
const nswfparse = require('nswfparse');
const spankbang = require('spankbang');
const pornpic = require('porn-picture');
const redtube = require('redtube');
const cors = require('cors');


var r = new redtube({output:'json'});
app.use(cors({
    origin: "*",
}))


app.get('/',(req,res)=>{
    res.send('home page')
})
app.get('/xvideo',async(req,res)=>{
    let pagequ = req.query.page;
    if(!pagequ){
        pagequ = 1;
        res.end('Required page query!')
    }
    const fresh = await xvideos.videos.fresh({page:pagequ});
    res.json(fresh);
})

//get xvideo list
app.get('/xvideo/videos',async(req,res)=>{
    let pagequ = req.query.page;
    const vids = await xvideos.videos.newFresh({page:pagequ});
    res.json(vids);
})

//get xvideo details
app.get('/xvideo/details',async(req,res)=>{
    let url = req.query.url;
    const vids = await xvideos.videos.details({url});
    res.json(vids);
})

//get xvideo dashborad
app.get('/xvideo/dashboard',async(req,res)=>{
    let pagequ = req.query.page;
    const data = await xvideos.videos.dashboard({page:pagequ});
    res.json(data);
})

//get nswfdata
app.get('/nswf',(req,res)=>{
    let limit = req.query.limit;
    let page = req.query.page;
    let tag1 = req.query.tag1;
    let tag2 = req.query.tag2;

    let options = {
        tags:[tag1,tag2],
        numPage: page,
        limit: limit,
        remove_empty: true,
        parse_tags: true,
        random: false,
    }
    nswfparse.r34(options).then((payload)=>{
        res.json(payload);
        console.log(payload);
    }).catch((error)=>{
        res.send('Error')
    })
})

//get random nswf reddit real image
app.get('/nswf/reddit',(req,res)=>{
    let name = req.query.name;
    nswfparse.redditCustom([name])
    .then((all)=>{
        res.json(all)
    }).catch(e=>{
        res.status(404).json(e)
    })
})

//get spankbang data
app.get('/spankbang',async(req,res)=>{
    const fresh = await spankbang.videos.fresh();
    res.json(fresh);
})

//get spankbang trending data
app.get('/spankbang/trending',async(req,res)=>{
    let pagequ = req.query.page;
    const fresh = await spankbang.videos.sections.trending({pagequ});
    res.json(fresh);
})

//get spankbang video details
app.get('/spankbang/details',async(req,res)=>{
    let url = req.query.url;
    const fresh = await spankbang.videos.details({url});
    res.json(fresh);
})

//get spankbang porn stars data
app.get('/spankbang/pornstars',async(req,res)=>{
    const stars = await spankbang.pstars();
    res.json(stars);
})

//get spankbang channels data
app.get('/spankbang/channels',async(req,res)=>{
    let cate = req.query.category;
    if(cate == 'hot'){
        const channel = await spankbang.channels.hot();
        res.json(channel);
    }else if(cate == 'new'){
        const channel = await spankbang.channels.newChannels();
        res.json(channel);
    }else if(cate == 'popular'){
        const channel = await spankbang.channels.popular();
        res.json(channel);
    }else if(cate == 'name'){
        const channel = await spankbang.channels.name();
        res.json(channel);
    }
})

//get random porn picture
app.get('/pornpic',async(req,res)=>{
    let cate = req.query.category;
    if(cate == 'random'){
        let img = await pornpic.nsfw.random();
        res.json({"img":img})
    }else if (cate == 'thighs') {
        let img = await pornpic.nsfw.thighs();
        res.json({"img":img})
    }else if (cate == 'ass') {
        let img = await pornpic.nsfw.ass();
        res.json({"img":img})
    }else if (cate == 'panties') {
        let img = await pornpic.nsfw.panties();
        res.json({"img":img})
    }else if (cate == 'cosplay') {
        let img = await pornpic.nsfw.cosplay();
        res.json({"img":img})
    }else if (cate == 'pussy') {
        let img = await pornpic.nsfw.pussy();
        res.json({"img":img})
    }else if (cate == 'teen') {
        let img = await pornpic.nsfw.teen();
        res.json({"img":img})
    }else if (cate == 'catgirl') {
        let img = await pornpic.nsfw.catGirl();
        res.json({"img":img})
    }else if (cate == 'hentairule34') {
        let img = await pornpic.hentai.rule34();
        res.json({"img":img})
    }else if (cate == 'hentairandom') {
        let img = await pornpic.hentai.random();
        res.json({"img":img})
    }
})

//get redtube search data
app.get('/redtube/search',(req,res)=>{
    let q = req.query.q;
    r.search({search:q},function(err,response){
        if(!err)
            res.json(response);
            console.log(response);
    });
})

//get redtube video
app.get('/redtube/video',(req,res)=>{
    let id = req.query.id;
    r.getVideoById({video_id:id,thumbsize:'all'},function(err,response){
        if(!err)
            res.json(response);
            console.log(response);
    });
})

app.get('/pornhub',async(req,res)=>{
    let q = req.query.q;
   
})

app.listen(80,()=>{console.log('Server started with port 80');})