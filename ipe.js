if (Meteor.isClient) {
  Modules = new Meteor.Collection(null);
  
  loadScript = function (url) {
    console.log("Appending", url);
    $("body").append($("<script>").attr("src", url));
    Modules.insert({url: url});
  };
  
  Template.modules.events({
    'submit form': function (evt) {
      evt.preventDefault();
      loadScript($("[name=scriptUrl]").val());
    },
    'click button': function (evt) {
      evt.preventDefault();
      loadScript($(evt.target).attr("url"));
    }
  });
  
  Template.moduleList.modules = function () {
    return Modules.find();
  };
  
  Template.modules.minervaModules = function () {
    return Session.get("minervaModules");
  };
  
  HTTP.get("http://minervajs.org/lib", function (error, result) {
    Session.set("minervaModules", result.data);
  }); 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
