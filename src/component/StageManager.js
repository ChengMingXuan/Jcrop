  /**
   * StageManager
   * Provides basic stage-specific functionality
   */
  // var StageManager = function(core){{{
  var StageManager = function(core){
    this.core = core;
    this.ui = core.ui;
    this.init();
  };
  // }}}

  $.extend(StageManager.prototype,{
    // init: function(){{{
    init: function(){
      this.setupEvents();
      this.dragger = new StageDrag(this);
    },
    // }}}
    // tellConfigUpdate: function(options){{{
    tellConfigUpdate: function(options){
      for(var i=0,m=this.ui.multi,l=m.length;i<l;i++)
        if (m[i].setOptions && (m[i].linked || (this.core.opt.linkCurrent && m[i] == this.ui.selection)))
          m[i].setOptions(options);
    },
    // }}}
    // startDragHandler: function(){{{
    startDragHandler: function(){
      var t = this;
      return function(e){
        if (!e.button || t.core.opt.is_ie_lt9) return t.dragger.start(e);
      };
    },
    // }}}
    // removeEvents: function(){{{
    removeEvents: function(){
      this.core.event.off('.jcrop-stage');
      this.core.container.off('.jcrop-stage');
    },
    // }}}
    // setupEvents: function(){{{
    setupEvents: function(){
      var t = this, c = t.core;

      c.event.on('configupdate.jcrop-stage',function(e){
        t.tellConfigUpdate(c.opt)
        c.container.trigger('cropconfig',[c,c.opt]);
      });

      this.core.container
        .on('mousedown.jcrop.jcrop-stage',this.startDragHandler());
    }
    // }}}
  });