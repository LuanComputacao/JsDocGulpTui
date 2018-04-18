/**
 * This module is to control the element Marketing Video
 * 
 * @memberOf Assessment
 * 
 * @constructor
 * 
 * @property {object} elements
 * @property {string} elements.video - Video element ID
 * @property {string} elements.fakePoster - Video fake poster HTML class
 * @property {string} elements.media - Video HTML element class
 * @property {object} models
 * @property {object} models.player - VideoJS(from plugin) object
 */
 var MarketingVideo = {
    elements: {
        video: 'js-marketing-video',
        fakePoster: '.js-video-presentation-fake-poster',
        media: '.js-video-presentation-video'
    },
    models: {
        player: null
    },

    /**
     * @property {object} init - Starts all actions to init the
     */
     init: function(parametro) {
        if(document.getElementById(this.elements.video) !== null) {
            this.models.player = videojs(this.elements.video);
            this.methods.flipCover();
            this.watchers.play()
        }
    },
    /**
     * @property {object} watchers - Functions to watch the elements
     */
     watchers: {
        /**
         * Watch for videojs play action
         * @memberOf MarketingVideo
         */
         play: function() {
            MarketingVideo.models.player.one('play', function() {
                MarketingVideo.methods.handlePlay();
            });
        }
    },
    /**
     * @property {object} methods - MarketingVideo methods
     */
     methods: {
        /**
         * Changes the fake video cover.
         * It prevents to load the default player of the browser
         * 
         * @memberOf Assessment.MarketingVideo
         * 
         * @param {string} argumento - Argumento
         */
         flipCover: function(argumento) {
            var _this = MarketingVideo;
            $(_this.elements.fakePoster).hide();
            $(_this.elements.media).css('display', 'flex');
        },
        /**
         * The play action handlers.
         * 
         * @memberOf Assessment.MarketingVideo
         */
         handlePlay: function() {
            if(typeof ga !== 'undefined'){
                ga('send',
                    'event',
                    'Marketing',
                    'Play video',
                    'Play TeamSHIFT marketing video on the home page');
            }
        }
    }
};
