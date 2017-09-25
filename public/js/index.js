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
            this.playList=$("#play-list");
            this.isShowName=false;
            this.isPlay=true;
            this.audio={};
            


            this.musicList={
                m1:{
                    title:"某某某某",
                    url:"public/music/moumoumoumou.mp3"
                    //url:"http://7vilak.com1.z0.glb.clouddn.com/music/CityofStars.mp3"
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
            _this.nav();
            _this.search();
            _this.music();
            _this.musicBindEvent();
        },
    
        /**
         * ajax获取数据
         */
        loadData:function(){
            $.ajax({
                url:'/db/save'
            }).done(function(data){
                console.log(data);
            })
        },
        /**
         * 显示隐藏歌名动画
         */
        showLoading:function(){
            var _this=this;
            this.isShowName=false;
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
                        _this.isShowName=false;
                    }, 1000);
                }, 2000);
            }, 1000);
        },

        /**
         * 导航条
         */
        nav:function(){
            var _this=this;
            var item132=$("#menu-item-132");
            var item132Sub=$("#menu-item-132 .sub-menu");
            var item143=$("#menu-item-143");
            var item143Sub=$("#menu-item-143 .sub-menu");
            item132.on('mouseenter',function(){
                console.log(item132Sub.css("top"));
                if(item132Sub.css("top")=="36px"||item132Sub.css("left")=="0px"){
                    item132Sub.css('display','block');
                    item132Sub.css('left','-16px');
                    item132Sub.animate({
                        top:"48px",
                        opacity:1
                    },300);
                }
            });
            item132.on('mouseleave',function(){
                item132Sub.css('left','-16px');
                if(item132Sub.css("top")=="48px"){
                    item132Sub.animate({
                        top:"36px",
                        opacity:0
                    },300);
                }
            });
            item143.on('mouseenter',function(){
                console.log(item143Sub.css("top"));
                if(item143Sub.css("top")=="36px"||item143Sub.css("left")=="0px"){
                    item143Sub.css('display','block');
                    item143Sub.css('left','-8px');
                    item143Sub.animate({
                        top:"48px",
                        opacity:1
                    },300);
                }
            });
            item143.on('mouseleave',function(){
                item143Sub.css('left','-8px');
                if(item143Sub.css("top")=="48px"){
                    item143Sub.animate({
                        top:"36px",
                        opacity:0
                    },300);
                }
            });
        },

        search:function(){
            $("#search-form input").on('focus',function(){
                $(this).css('width','120px');
            });
            $("#search-form input").on('blur',function(){
                $(this).css('width','40px');
            });
        },

        showMusicBtn:function(){
            var _this=this;
            if(_this.logoMusicPrev.css("left")=="-80px"){
                _this.logoLoading.css('display','none');
                if(!_this.isShowName&&_this.isPlay){
                    _this.logoMusicPause.css('display','block');
                }
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
            }
        },

        hideMusicBtn:function(){
            var _this=this;
            if(_this.logoMusicPrev.css("left")=="-120px"){
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
            }
        },

        showPlayList:function(){
            var _this=this;
            _this.playList.css('display','block');
            if(_this.playList.css("bottom")=="-240px"){
                _this.playList.animate({
                    bottom:"0px"
                },500);
            }
        },

        hidePlayList:function(){
            var _this=this;
            if(_this.playList.css("bottom")=="0px"){
                _this.playList.animate({
                    bottom:"-240px"
                },500);
                setTimeout(function() {
                    _this.playList.css('display','none');
                }, 500);
            }
        },

        musicBindEvent:function(){
            var _this=this;
            var hideTimer="";
            _this.showLoading();
            _this.logoMusic.on('mouseover',function(){
                if(_this.playList.css('bottom')=="0px"&&hideTimer!=""){
                    clearTimeout(hideTimer);
                }
                
            });
            _this.playList.on('mouseover',function(){
                if(_this.playList.css('bottom')=="0px"&&hideTimer!=""){
                    clearTimeout(hideTimer);
                }
                
            });

            _this.logoMusic.on('mouseenter',function(){
                _this.showMusicBtn();
                _this.showPlayList();
            });
            _this.logoMusic.on('mouseleave',function(){
                hideTimer=setTimeout(function() {
                    _this.hideMusicBtn();
                    _this.hidePlayList();
                }, 800);
            });
            _this.playList.on('mouseenter',function(){
                _this.showMusicBtn();
                _this.showPlayList();
            });
            _this.playList.on('mouseleave',function(){
                hideTimer=setTimeout(function() {
                    _this.hideMusicBtn();
                    _this.hidePlayList();
                }, 800);
            });
            _this.logoMusicPause.on('click',function(){
                if(_this.isPlay){
                    _this.logoMusicPause.css('display','none');
                    _this.logoMusicPlay.css('display','block');
                    $("#play-list .list-control").removeClass("list-pause");
                    $("#play-list .list-control").addClass("list-play");
                    _this.isPlay=false;
                    _this.audio.pause();
                }
            });
            _this.logoMusicPlay.on('click',function(){
                if(!_this.isPlay){
                    _this.logoMusicPause.css('display','block');
                    _this.logoMusicPlay.css('display','none');
                    $("#play-list .list-control").removeClass("list-play");
                    $("#play-list .list-control").addClass("list-pause");
                    _this.isPlay=true;
                    
                    _this.audio.play();
                }
            });
            
            
        },
    
        music:function(){
            var _this=this;
            var str="<audio id='jp_audio_0' preload='metadata' src='"+ _this.musicList.m1.url +"'></audio>";
    
            $("#logo_jplayer img").after(str);

            _this.audio=document.getElementById("jp_audio_0");
            _this.audio.play();
        }
    }
    
    index.init();
});


