$(function(){
    

    var index={
        
        
        
        init:function(){
            var _this=this;

            this.logoImg=$("#logo .logo-img");
            this.logoMusic=$("#logo #logo-music");
            this.logoMusicName=$("#logo #logo-music-name");
            this.logoLoading=$("#logo .loading");
            this.logoMusicPrev=$("#logo #logo-music-prev");
            this.logoMusicPlay=$("#logo #logo-music-play");
            this.logoMusicPause=$("#logo #logo-music-pause");
            this.logoMusicNext=$("#logo #logo-music-next");
            


            this.musicList={
                m1:{
                    title:"City Of Stars",
                    url:"http://7vilak.com1.z0.glb.clouddn.com/music/CityofStars.mp3"
                },
                m2:{
                    title:"City Of Stars",
                    url:"http://m1.music.126.net/LA3YLd7pwbB3ahas69xp0g==/5815316999394446.mp3"
                },
                m3:{
                    title:"City Of Stars",
                    url:"http://m1.music.126.net/mlbxi57d3o_0FiZGMaQ0kQ==/1100611139412606.mp3"
                },
                m4:{
                    title:"City Of Stars",
                    url:"http://m1.music.126.net/vPqxPb1sKzlZr09lQrWUGQ==/5700967790042070.mp3"
                },
                m5:{
                    title:"City Of Stars",
                    url:"http://m1.music.126.net/iCAbftJtsrUl9s0_K2YNeg==/1227054976611774.mp3"
                },
                m6:{
                    title:"City Of Stars",
                    url:"http://thirdyires.imusicapp.cn/res/thirdparty/1413/mp3/00/00/48/1413000048000800.mp3?deviceid=1000010404539&qd=null"
                },
                m7:{
                    title:"City Of Stars",
                    url:"http://m2.music.126.net/pO0ElyxnSVWS9eP_mprhyg==/6636652185484709.mp3"
                }
            };


            _this.loadData();
            _this.music();
            _this.musicBindEvent();
        },
    
        loadData:function(){
            $.ajax({
                url:'/api/test'
            }).done(function(data){
                console.log(data);
            })
        },
        /**
         * 显示隐藏歌名动画
         */
        showLoading:function(){
            var _this=this;
            
            _this.logoMusicName.html(_this.musicList.m1.title);
            setTimeout(function() {
                _this.logoMusicName.css('display','block');
                _this.logoMusicName.animate({
                    top: "50px",
                    opacity: 1
                }, 1000 );
                setTimeout(function() {
                    $("#logo #logo-music-name").animate({
                        top: "0px",
                        opacity: 0
                    }, 1000 );
                    setTimeout(function() {
                        _this.logoLoading.css('display','block');
                    }, 1000);
                }, 2000);
            }, 1000);
            
            
            
    
            // //显示歌名
            // setTimeout(function() {
            //     $("#logo #logo-music-name").animate({
            //         top: "50px",
            //         opacity: 1
            //     }, 3000 ).done(function(){
            //         //隐藏歌名
            //         setTimeout(function() {
            //             $("#logo #logo-music-name").animate({
            //                 top: "0px",
            //                 opacity: 0
            //             }, 3000 );
            //             logoLoading.css('display','block');
            //         }, 2000);
            //     });
                
            // }, 1000);
        },

        showMusicBtn:function(){
            var _this=this;
            _this.logoLoading.css('display','none');
            _this.logoMusicPause.css('display','block');
            _this.logoMusicPrev.css('display','block');
            _this.logoMusicNext.css('display','block');
            _this.logoMusicPrev.animate({
                left:"-120px",
                opacity:1
            },1000);
            _this.logoMusicNext.animate({
                right:"-120px",
                opacity:1
            },1000);


        },

        hideMusicBtn:function(){
            var _this=this;
            _this.logoLoading.css('display','block');
            _this.logoMusicPause.css('display','none');
            _this.logoMusicPrev.animate({
                left:"-80px",
                opacity:0
            },1000);
            _this.logoMusicNext.animate({
                right:"-80px",
                opacity:0
            },1000);
            // _this.logoMusicPrev.css('display','none');
            // _this.logoMusicNext.css('display','none');
        },

        musicBindEvent:function(){
            var _this=this;
            _this.showLoading();
            _this.logoMusic.on('mouseenter',function(){
                _this.showMusicBtn();
            });
            _this.logoMusic.on('mouseleave',function(){
                _this.hideMusicBtn();
            });
        },
    
        music:function(){
            var _this=this;
            var str="<audio id='jp_audio_0' preload='metadata' src='"+ _this.musicList.m1.url +"'></audio>";
    
            $("#logo_jplayer img").after(str);
            
        }
    }
    
    index.init();
});


